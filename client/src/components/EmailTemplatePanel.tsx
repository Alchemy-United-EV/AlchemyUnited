import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface TestEmailData {
  to: string;
  type: 'test' | 'lead-confirmation' | 'partner-followup' | 'admin-notification';
  testData?: {
    name?: string;
  };
}

export function EmailTemplatePanel() {
  const [testEmail, setTestEmail] = useState('');
  const [emailType, setEmailType] = useState<TestEmailData['type']>('test');
  const [testName, setTestName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const emailTypes = [
    { value: 'test', label: 'Basic Test Email', description: 'Simple connectivity test' },
    { value: 'lead-confirmation', label: 'Lead Confirmation', description: 'Thank you email to customers' },
    { value: 'partner-followup', label: 'Partner Follow-up', description: 'Partnership opportunity email' },
    { value: 'admin-notification', label: 'Admin Notification', description: 'New lead alert for admins' }
  ];

  const handleSendTestEmail = async () => {
    if (!testEmail) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        body: JSON.stringify({
          to: testEmail,
          type: emailType,
          testData: { name: testName || undefined }
        }),
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token') || ''}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to send email');
      }
      
      const result = await response.json() as { success: boolean; message: string };

      if (result.success) {
        toast({
          title: "Email Sent",
          description: "Test email sent successfully! Check your inbox.",
        });
      } else {
        toast({
          title: "Email Not Sent",
          description: "Email service may be disabled or not configured",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send test email",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const selectedType = emailTypes.find(type => type.value === emailType);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Email Template Testing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
            <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
            <span>Email Template Testing</span>
          </CardTitle>
          <CardDescription>
            Test your professional email templates with real data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="test-email">Test Email Address</Label>
              <Input
                id="test-email"
                type="email"
                placeholder="your.email@example.com"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="test-name">Test Name (optional)</Label>
              <Input
                id="test-name"
                placeholder="John Doe"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email-type">Email Template Type</Label>
            <Select value={emailType} onValueChange={(value) => setEmailType(value as TestEmailData['type'])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {emailTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedType && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>{selectedType.label}:</strong> {selectedType.description}
              </p>
            </div>
          )}

          <Button 
            onClick={handleSendTestEmail} 
            disabled={isLoading || !testEmail}
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <AlertCircle className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Test Email
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Template Features */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Template Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Design Features
              </h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Luxury brand colors (Gold #D4AF37)</li>
                <li>• Mobile-responsive layouts</li>
                <li>• Professional typography</li>
                <li>• Alchemy United branding</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                Compatibility
              </h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Outlook, Gmail, Apple Mail</li>
                <li>• Mobile email clients</li>
                <li>• Dark mode support</li>
                <li>• Inline CSS for reliability</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}