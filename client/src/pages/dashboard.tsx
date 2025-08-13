import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Users, Building, CheckCircle, XCircle, Clock, Search, Filter, LogOut, Shield, Mail, MessageSquare, UserPlus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import type { EarlyAccessApplication, HostApplication, Lead } from "@shared/schema";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [leadsSearchTerm, setLeadsSearchTerm] = useState("");
  const [leadsTypeFilter, setLeadsTypeFilter] = useState("all");
  const [leadsStatusFilter, setLeadsStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage] = useState(20);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  // Early Access Applications
  const { data: earlyAccessApps = [], isLoading: loadingEarlyAccess } = useQuery<EarlyAccessApplication[]>({
    queryKey: ['/api/early-access-applications'],
  });

  // Host Applications
  const { data: hostApps = [], isLoading: loadingHost } = useQuery<HostApplication[]>({
    queryKey: ['/api/host-applications'],
  });

  // Leads
  const { data: leads = [], isLoading: loadingLeads } = useQuery<Lead[]>({
    queryKey: ['/api/leads'],
  });

  // Status update mutations
  const updateEarlyAccessStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/early-access-applications/${id}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update status');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/early-access-applications'] });
      toast({ title: "Status Updated", description: "Application status has been updated successfully." });
    },
  });

  const updateHostStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/host-applications/${id}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update status');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/host-applications'] });
      toast({ title: "Status Updated", description: "Application status has been updated successfully." });
    },
  });

  // Lead status update mutation
  const updateLeadStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`/api/leads/${id}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update lead status');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/leads'] });
      toast({ title: "Lead Status Updated", description: "Lead status has been updated successfully." });
    },
  });

  const sendVerification = async (applicationId: string) => {
    try {
      const response = await fetch(`/api/send-verification/${applicationId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        const data = await response.json();
        toast({ 
          title: "Verification Sent", 
          description: "Verification email has been sent to the applicant." 
        });
        
        // For development - show the verification URL in console
        console.log('Verification URL:', data.verificationUrl);
      } else {
        throw new Error('Failed to send verification');
      }
    } catch (error) {
      console.error('Error sending verification:', error);
      toast({ 
        title: "Error", 
        description: "Failed to send verification email.", 
        variant: "destructive" 
      });
    }
  };

  // Filter functions
  const filteredEarlyAccess = earlyAccessApps.filter(app => {
    const matchesSearch = `${app.firstName} ${app.lastName} ${app.email}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredHost = hostApps.filter(app => {
    const matchesSearch = `${app.businessName} ${app.contactFirstName} ${app.contactLastName} ${app.email}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filter leads based on search, type, and status
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      (lead.name?.toLowerCase() || "").includes(leadsSearchTerm.toLowerCase()) ||
      (lead.email?.toLowerCase() || "").includes(leadsSearchTerm.toLowerCase()) ||
      (lead.company?.toLowerCase() || "").includes(leadsSearchTerm.toLowerCase()) ||
      (lead.message?.toLowerCase() || "").includes(leadsSearchTerm.toLowerCase());
    const matchesType = leadsTypeFilter === 'all' || lead.type === leadsTypeFilter;
    const matchesStatus = leadsStatusFilter === 'all' || lead.status === leadsStatusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Pagination for leads
  const totalLeads = filteredLeads.length;
  const totalPages = Math.ceil(totalLeads / leadsPerPage);
  const startIndex = (currentPage - 1) * leadsPerPage;
  const paginatedLeads = filteredLeads.slice(startIndex, startIndex + leadsPerPage);

  // Reset page when filters change
  const resetPage = () => setCurrentPage(1);

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const variants = {
      // Application statuses
      pending: { color: "bg-yellow-500", icon: Clock },
      approved: { color: "bg-green-500", icon: CheckCircle },
      rejected: { color: "bg-red-500", icon: XCircle },
      "in-review": { color: "bg-blue-500", icon: Clock },
      // Lead statuses
      new: { color: "bg-blue-500", icon: Mail },
      contacted: { color: "bg-yellow-500", icon: MessageSquare },
      converted: { color: "bg-green-500", icon: CheckCircle },
    };
    
    const variant = variants[status as keyof typeof variants] || variants.pending;
    const Icon = variant.icon;
    
    return (
      <Badge className={`${variant.color} text-white`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </Badge>
    );
  };

  // Lead status dropdown component
  const LeadStatusDropdown = ({ lead }: { lead: Lead }) => {
    const handleStatusChange = (newStatus: string) => {
      updateLeadStatus.mutate({ id: lead.id, status: newStatus });
    };

    return (
      <Select value={lead.status} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="new">New</SelectItem>
          <SelectItem value="contacted">Contacted</SelectItem>
          <SelectItem value="converted">Converted</SelectItem>
        </SelectContent>
      </Select>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Website
            </Button>
          </Link>
          
          <div className="flex items-center space-x-3">
            <img 
              src="/assets/au-logo.png" 
              alt="Alchemy United Logo"
              className="h-8 w-auto"
            />
            <h1 className="text-2xl font-bold text-gray-900 font-display">
              Alchemy United Dashboard
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="h-4 w-4" />
              <span>{user?.email}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Overview */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Early Access</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gold">{earlyAccessApps.length}</div>
              <p className="text-xs text-muted-foreground">
                {earlyAccessApps.filter(app => app.status === 'pending').length} pending approval
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Host Applications</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gold">{hostApps.length}</div>
              <p className="text-xs text-muted-foreground">
                {hostApps.filter(app => app.status === 'pending').length} pending review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gold">{leads.length}</div>
              <p className="text-xs text-muted-foreground">
                {leads.filter(lead => lead.type === 'contact').length} contact, {leads.filter(lead => lead.type === 'partner').length} partner, {leads.filter(lead => lead.type === 'waitlist').length} waitlist
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Users</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {earlyAccessApps.filter(app => app.status === 'approved').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Ready for platform access
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Hosts</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {hostApps.filter(app => app.status === 'approved').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Partner locations
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-3 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40 h-10">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="in-review">In Review</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Applications Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Tabs defaultValue="early-access" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-11">
              <TabsTrigger value="early-access" className="text-sm px-2">
                Early Access ({filteredEarlyAccess.length})
              </TabsTrigger>
              <TabsTrigger value="host-applications" className="text-sm px-2">
                Host Partners ({filteredHost.length})
              </TabsTrigger>
              <TabsTrigger value="leads" className="text-sm px-2">
                Leads ({filteredLeads.length})
              </TabsTrigger>
            </TabsList>

            {/* Early Access Tab */}
            <TabsContent value="early-access" className="space-y-4">
              {loadingEarlyAccess ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredEarlyAccess.map((app) => (
                    <Card key={app.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <CardTitle className="text-lg truncate">
                              {app.firstName} {app.lastName}
                            </CardTitle>
                            <CardDescription className="text-sm">
                              {app.email}
                            </CardDescription>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                            <StatusBadge status={app.status || 'pending'} />
                            <div className="flex gap-2">
                              <Select
                                value={app.status || 'pending'}
                                onValueChange={(status) => 
                                  updateEarlyAccessStatus.mutate({ id: app.id, status })
                                }
                              >
                                <SelectTrigger className="w-full sm:w-28 h-8 text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="approved">Approved</SelectItem>
                                  <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                              </Select>
                              
                              {app.status === 'approved' && (
                                <Button
                                  size="sm"
                                  className="h-8 px-2 text-xs bg-gold hover:bg-gold/90 text-black"
                                  onClick={() => sendVerification(app.id)}
                                >
                                  Send Invite
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm mb-3">
                          <div>
                            <p className="font-medium text-gray-500 text-xs">Vehicle</p>
                            <p className="truncate">{app.vehicleType}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-500 text-xs">Frequency</p>
                            <p className="truncate">{app.chargingFrequency}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-500 text-xs">Location</p>
                            <p className="truncate">{app.location}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-500 text-xs">Applied</p>
                            <p className="text-xs">{app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'N/A'}</p>
                          </div>
                        </div>
                        {app.interests && (
                          <div className="border-t pt-3">
                            <p className="font-medium text-gray-500 text-xs mb-1">Interests</p>
                            <p className="text-xs text-gray-700 line-clamp-2">{app.interests}</p>
                          </div>
                        )}
                        {app.referralCode && (
                          <div className="mt-2">
                            <span className="inline-block bg-gold/10 text-gold px-2 py-1 rounded text-xs font-medium">
                              Referral: {app.referralCode}
                            </span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                  {filteredEarlyAccess.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      No early access applications found.
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            {/* Host Applications Tab */}
            <TabsContent value="host-applications" className="space-y-4">
              {loadingHost ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredHost.map((app) => (
                    <Card key={app.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <CardTitle className="text-lg truncate">
                              {app.businessName}
                            </CardTitle>
                            <CardDescription className="text-sm">
                              {app.contactFirstName} {app.contactLastName} • {app.email}
                            </CardDescription>
                          </div>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                            <StatusBadge status={app.status || 'pending'} />
                            <Select
                              value={app.status || 'pending'}
                              onValueChange={(status) => 
                                updateHostStatus.mutate({ id: app.id, status })
                              }
                            >
                              <SelectTrigger className="w-full sm:w-28 h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in-review">In Review</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm mb-3">
                          <div>
                            <p className="font-medium text-gray-500 text-xs">Property</p>
                            <p className="truncate">{app.propertyType}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-500 text-xs">Parking</p>
                            <p className="truncate">{app.parkingSpaces}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-500 text-xs">Traffic</p>
                            <p className="truncate">{app.expectedTraffic}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-500 text-xs">Timeline</p>
                            <p className="truncate">{app.timeline}</p>
                          </div>
                        </div>
                        <div className="border-t pt-3 mb-3">
                          <p className="font-medium text-gray-500 text-xs mb-1">Address</p>
                          <p className="text-xs text-gray-700 line-clamp-1">{app.propertyAddress}</p>
                        </div>
                        {app.additionalInfo && (
                          <div className="border-t pt-3 mb-3">
                            <p className="font-medium text-gray-500 text-xs mb-1">Additional Information</p>
                            <p className="text-xs text-gray-700 line-clamp-3">{app.additionalInfo}</p>
                          </div>
                        )}
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                          <span>Applied: {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'N/A'}</span>
                          <span>•</span>
                          <span className="truncate">{app.partnershipInterest}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {filteredHost.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      No host applications found.
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            {/* Leads Tab */}
            <TabsContent value="leads" className="space-y-4">
              {/* Leads Search and Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search leads by name, email, or company..."
                    value={leadsSearchTerm}
                    onChange={(e) => {
                      setLeadsSearchTerm(e.target.value);
                      resetPage();
                    }}
                    className="pl-10 h-10"
                  />
                </div>
                
                <Select value={leadsTypeFilter} onValueChange={(value) => {
                  setLeadsTypeFilter(value);
                  resetPage();
                }}>
                  <SelectTrigger className="w-full sm:w-40 h-10">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="contact">Contact</SelectItem>
                    <SelectItem value="partner">Partner</SelectItem>
                    <SelectItem value="waitlist">Waitlist</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={leadsStatusFilter} onValueChange={(value) => {
                  setLeadsStatusFilter(value);
                  resetPage();
                }}>
                  <SelectTrigger className="w-full sm:w-40 h-10">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {loadingLeads ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
                </div>
              ) : (
                <>
                  {/* Leads Table */}
                  <div className="bg-white rounded-lg border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                          <tr>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Type</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Name/Email</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Company</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Phone</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Message</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {paginatedLeads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-gray-50">
                              <td className="py-3 px-4">
                                <div className="flex items-center space-x-2">
                                  {lead.type === 'contact' && <MessageSquare className="h-4 w-4 text-blue-500" />}
                                  {lead.type === 'partner' && <Building className="h-4 w-4 text-purple-500" />}
                                  {lead.type === 'waitlist' && <UserPlus className="h-4 w-4 text-green-500" />}
                                  <Badge 
                                    variant={lead.type === 'contact' ? 'default' : lead.type === 'partner' ? 'secondary' : 'outline'}
                                    className="text-xs"
                                  >
                                    {lead.type}
                                  </Badge>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="space-y-1">
                                  {lead.name && <div className="font-medium text-sm text-gray-900">{lead.name}</div>}
                                  <div className="text-sm text-gray-600">{lead.email}</div>
                                </div>
                              </td>
                              <td className="py-3 px-4 text-sm text-gray-700">
                                {lead.company || '-'}
                              </td>
                              <td className="py-3 px-4 text-sm text-gray-700">
                                {lead.phone || '-'}
                              </td>
                              <td className="py-3 px-4">
                                {lead.message ? (
                                  <div className="text-sm text-gray-700 max-w-xs truncate" title={lead.message}>
                                    {lead.message}
                                  </div>
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </td>
                              <td className="py-3 px-4">
                                <LeadStatusDropdown lead={lead} />
                              </td>
                              <td className="py-3 px-4 text-sm text-gray-600">
                                {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'N/A'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {filteredLeads.length === 0 && (
                      <div className="text-center py-12 text-gray-500">
                        {leadsSearchTerm || leadsTypeFilter !== 'all' 
                          ? 'No leads found matching your filters.' 
                          : 'No leads submitted yet.'
                        }
                      </div>
                    )}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-gray-600">
                        Showing {startIndex + 1} to {Math.min(startIndex + leadsPerPage, totalLeads)} of {totalLeads} leads
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>
                        <div className="flex items-center space-x-1">
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const pageNum = i + 1;
                            if (totalPages <= 5) {
                              return pageNum;
                            }
                            if (currentPage <= 3) {
                              return pageNum;
                            }
                            if (currentPage >= totalPages - 2) {
                              return totalPages - 4 + i;
                            }
                            return currentPage - 2 + i;
                          }).map((pageNum) => (
                            <Button
                              key={pageNum}
                              variant={currentPage === pageNum ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(pageNum)}
                              className="w-8 h-8 p-0"
                            >
                              {pageNum}
                            </Button>
                          ))}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}