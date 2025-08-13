import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Mail, Calendar, FileSpreadsheet, HardDriveIcon, UserCheck, ExternalLink } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface GoogleUser {
  email: string;
  name: string;
  picture?: string;
}

interface GoogleStatus {
  connected: boolean;
  user?: GoogleUser;
  message: string;
}

export function GoogleWorkspacePanel() {
  const [status, setStatus] = useState<GoogleStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkGoogleStatus();
  }, []);

  const checkGoogleStatus = async () => {
    try {
      const response = await fetch('/api/google/status');
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error('Failed to check Google status:', error);
      setStatus({ connected: false, message: 'Unable to check Google connection' });
    }
  };

  const handleConnect = () => {
    window.location.href = '/api/google/auth?state=admin';
  };

  const handleDisconnect = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/google/disconnect', { method: 'POST' });
      if (!response.ok) throw new Error('Failed to disconnect');
      toast({
        title: "Disconnected",
        description: "Google Workspace has been disconnected successfully"
      });
      await checkGoogleStatus();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to disconnect Google Workspace",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendTestEmail = async () => {
    if (!status?.user?.email) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/google/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: status.user.email,
          subject: 'Alchemy United - Google Workspace Integration Test',
          message: `
            <h2>Google Workspace Integration Active</h2>
            <p>This email confirms that your Alchemy United platform is successfully connected to Google Workspace.</p>
            <p><strong>Connected Account:</strong> ${status.user.email}</p>
            <p><strong>Features Available:</strong></p>
            <ul>
              <li>Gmail email sending</li>
              <li>Google Sheets lead export</li>
              <li>Google Calendar appointment booking</li>
              <li>Google Drive file management</li>
            </ul>
            <p>Sent from your Alchemy United admin dashboard.</p>
          `
        })
      });
      if (!response.ok) throw new Error('Failed to send email');
      
      toast({
        title: "Email Sent",
        description: `Test email sent successfully to ${status.user.email}`
      });
    } catch (error) {
      toast({
        title: "Email Failed",
        description: "Failed to send test email",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportLeads = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/google/export-leads', { method: 'POST' });
      if (!response.ok) throw new Error('Failed to export leads');
      const data = await response.json();
      
      toast({
        title: "Export Successful",
        description: `${data.leadCount} leads exported to Google Sheets`,
        action: (
          <Button variant="outline" size="sm" asChild>
            <a href={data.spreadsheetUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Sheet
            </a>
          </Button>
        )
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export leads to Google Sheets",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSampleEvent = async () => {
    if (!status?.user?.email) return;
    
    setIsLoading(true);
    try {
      const startTime = new Date();
      startTime.setDate(startTime.getDate() + 7); // Next week
      const endTime = new Date(startTime);
      endTime.setHours(endTime.getHours() + 1); // 1 hour meeting

      const response = await fetch('/api/google/calendar-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          summary: 'Alchemy United - Lead Follow-up',
          description: 'Scheduled follow-up for potential Alchemy United partnership and EV charging network expansion discussion.',
          start: startTime.toISOString(),
          end: endTime.toISOString(),
          attendees: [status.user.email]
        })
      });
      if (!response.ok) throw new Error('Failed to create event');
      
      toast({
        title: "Event Created",
        description: "Sample calendar event created successfully"
      });
    } catch (error) {
      toast({
        title: "Event Failed",
        description: "Failed to create calendar event",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!status) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Google Workspace Integration</CardTitle>
          <CardDescription>Loading connection status...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HardDriveIcon className="w-5 h-5" />
          Google Workspace Integration
        </CardTitle>
        <CardDescription>
          Connect with Gmail, Drive, Calendar, and Sheets for enhanced business operations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Connection Status */}
        <div className="flex items-center justify-between p-4 rounded-lg border">
          <div className="flex items-center gap-3">
            {status.user?.picture && (
              <img 
                src={status.user.picture} 
                alt={status.user.name}
                className="w-10 h-10 rounded-full"
              />
            )}
            <div>
              <div className="flex items-center gap-2">
                <Badge variant={status.connected ? "default" : "secondary"}>
                  {status.connected ? "Connected" : "Disconnected"}
                </Badge>
                {status.connected && <UserCheck className="w-4 h-4 text-green-600" />}
              </div>
              {status.user && (
                <div className="text-sm text-gray-600 mt-1">
                  {status.user.name} ({status.user.email})
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-2">
            {status.connected ? (
              <Button 
                variant="outline" 
                onClick={handleDisconnect}
                disabled={isLoading}
              >
                Disconnect
              </Button>
            ) : (
              <Button onClick={handleConnect} disabled={isLoading}>
                Connect Google Workspace
              </Button>
            )}
          </div>
        </div>

        {/* Google Services */}
        {status.connected && (
          <div className="grid md:grid-cols-2 gap-4">
            {/* Gmail */}
            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold">Gmail</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Send professional emails directly from the dashboard
              </p>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleSendTestEmail}
                disabled={isLoading}
              >
                Send Test Email
              </Button>
            </div>

            {/* Google Sheets */}
            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-3">
                <FileSpreadsheet className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold">Google Sheets</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Export leads and applications to spreadsheets
              </p>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleExportLeads}
                disabled={isLoading}
              >
                Export All Leads
              </Button>
            </div>

            {/* Google Calendar */}
            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold">Google Calendar</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Schedule appointments and follow-up meetings
              </p>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleCreateSampleEvent}
                disabled={isLoading}
              >
                Create Sample Event
              </Button>
            </div>

            {/* Google Drive */}
            <div className="p-4 rounded-lg border">
              <div className="flex items-center gap-2 mb-3">
                <HardDriveIcon className="w-5 h-5 text-yellow-600" />
                <h3 className="font-semibold">Google Drive</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Store and manage business documents
              </p>
              <Button 
                size="sm" 
                variant="outline" 
                disabled
              >
                Coming Soon
              </Button>
            </div>
          </div>
        )}

        {!status.connected && (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">
              Connect your Google Workspace account to unlock powerful business features
            </p>
            <ul className="text-sm text-gray-600 space-y-1 max-w-md mx-auto">
              <li>• Send professional emails via Gmail</li>
              <li>• Export leads to Google Sheets</li>
              <li>• Schedule appointments in Google Calendar</li>
              <li>• Store documents in Google Drive</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}