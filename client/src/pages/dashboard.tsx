import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Users, Building, CheckCircle, XCircle, Clock, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import type { EarlyAccessApplication, HostApplication } from "@shared/schema";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Early Access Applications
  const { data: earlyAccessApps = [], isLoading: loadingEarlyAccess } = useQuery<EarlyAccessApplication[]>({
    queryKey: ['/api/early-access-applications'],
  });

  // Host Applications
  const { data: hostApps = [], isLoading: loadingHost } = useQuery<HostApplication[]>({
    queryKey: ['/api/host-applications'],
  });

  // Status update mutations
  const updateEarlyAccessStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await fetch(`/api/early-access-applications/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
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
      const response = await fetch(`/api/host-applications/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
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

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const variants = {
      pending: { color: "bg-yellow-500", icon: Clock },
      approved: { color: "bg-green-500", icon: CheckCircle },
      rejected: { color: "bg-red-500", icon: XCircle },
      "in-review": { color: "bg-blue-500", icon: Clock },
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Website
              </Button>
            </Link>
            <img 
              src="/assets/au-logo.png" 
              alt="Alchemy United Logo"
              className="h-8 w-auto"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">
            Alchemy United Dashboard
          </h1>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Overview */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
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
          className="flex flex-col sm:flex-row gap-4 mb-6"
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
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
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
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="early-access">
                Early Access Applications ({filteredEarlyAccess.length})
              </TabsTrigger>
              <TabsTrigger value="host-applications">
                Host Applications ({filteredHost.length})
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
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              {app.firstName} {app.lastName}
                            </CardTitle>
                            <CardDescription>
                              {app.email} • {app.phone}
                            </CardDescription>
                          </div>
                          <div className="flex items-center space-x-2">
                            <StatusBadge status={app.status || 'pending'} />
                            <Select
                              value={app.status || 'pending'}
                              onValueChange={(status) => 
                                updateEarlyAccessStatus.mutate({ id: app.id, status })
                              }
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="font-medium text-gray-500">Vehicle</p>
                            <p>{app.vehicleType}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-500">Charging Frequency</p>
                            <p>{app.chargingFrequency}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-500">Location</p>
                            <p>{app.location}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-500">Applied</p>
                            <p>{new Date(app.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        {app.interests && (
                          <div className="mt-4">
                            <p className="font-medium text-gray-500 text-sm">Interests</p>
                            <p className="text-sm text-gray-700 mt-1">{app.interests}</p>
                          </div>
                        )}
                        {app.referralCode && (
                          <div className="mt-2">
                            <p className="font-medium text-gray-500 text-sm">Referral Code</p>
                            <p className="text-sm text-gray-700">{app.referralCode}</p>
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
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              {app.businessName}
                            </CardTitle>
                            <CardDescription>
                              {app.contactFirstName} {app.contactLastName} • {app.email}
                            </CardDescription>
                          </div>
                          <div className="flex items-center space-x-2">
                            <StatusBadge status={app.status || 'pending'} />
                            <Select
                              value={app.status || 'pending'}
                              onValueChange={(status) => 
                                updateHostStatus.mutate({ id: app.id, status })
                              }
                            >
                              <SelectTrigger className="w-32">
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
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                          <div>
                            <p className="font-medium text-gray-500">Property Type</p>
                            <p>{app.propertyType}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-500">Parking Spaces</p>
                            <p>{app.parkingSpaces}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-500">Expected Traffic</p>
                            <p>{app.expectedTraffic}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-500">Timeline</p>
                            <p>{app.timeline}</p>
                          </div>
                        </div>
                        <div className="border-t pt-4">
                          <p className="font-medium text-gray-500 text-sm">Address</p>
                          <p className="text-sm text-gray-700">{app.propertyAddress}</p>
                        </div>
                        {app.additionalInfo && (
                          <div className="mt-4">
                            <p className="font-medium text-gray-500 text-sm">Additional Information</p>
                            <p className="text-sm text-gray-700 mt-1">{app.additionalInfo}</p>
                          </div>
                        )}
                        <div className="mt-4 text-xs text-gray-400">
                          Applied: {new Date(app.createdAt).toLocaleDateString()} • 
                          Partnership: {app.partnershipInterest}
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
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}