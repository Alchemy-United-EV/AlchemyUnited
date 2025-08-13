import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { EarlyAccessApplication, HostApplication } from "@shared/schema";

export default function SimpleDashboard() {
  const [activeTab, setActiveTab] = useState<'early-access' | 'host'>('early-access');
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

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
    },
  });

  // Filter functions
  const filteredEarlyAccess = earlyAccessApps.filter(app => 
    `${app.firstName} ${app.lastName} ${app.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredHost = hostApps.filter(app => 
    `${app.businessName} ${app.contactFirstName} ${app.contactLastName} ${app.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const StatusBadge = ({ status }: { status: string }) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      'in-review': 'bg-blue-100 text-blue-800',
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors] || colors.pending}`}>
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="text-blue-600 hover:text-blue-800 text-sm">
            ← Back to Website
          </a>
          
          <div className="flex items-center space-x-3">
            <img 
              src="/assets/au-logo.png" 
              alt="Alchemy United Logo"
              className="h-8 w-auto"
            />
            <h1 className="text-2xl font-bold text-gray-900">
              Alchemy United Dashboard
            </h1>
          </div>
          
          <div className="w-32"></div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Early Access</h3>
            <div className="text-2xl font-bold text-yellow-600">{earlyAccessApps.length}</div>
            <p className="text-xs text-gray-500">
              {earlyAccessApps.filter(app => app.status === 'pending').length} pending approval
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Host Applications</h3>
            <div className="text-2xl font-bold text-yellow-600">{hostApps.length}</div>
            <p className="text-xs text-gray-500">
              {hostApps.filter(app => app.status === 'pending').length} pending review
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Approved Users</h3>
            <div className="text-2xl font-bold text-green-600">
              {earlyAccessApps.filter(app => app.status === 'approved').length}
            </div>
            <p className="text-xs text-gray-500">Ready for platform access</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Active Hosts</h3>
            <div className="text-2xl font-bold text-green-600">
              {hostApps.filter(app => app.status === 'approved').length}
            </div>
            <p className="text-xs text-gray-500">Partner locations</p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('early-access')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'early-access'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Early Access ({filteredEarlyAccess.length})
              </button>
              <button
                onClick={() => setActiveTab('host')}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === 'host'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Host Partners ({filteredHost.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'early-access' && (
              <div>
                {loadingEarlyAccess ? (
                  <div className="text-center py-8">Loading...</div>
                ) : (
                  <div className="space-y-4">
                    {filteredEarlyAccess.map((app) => (
                      <div key={app.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">
                              {app.firstName} {app.lastName}
                            </h3>
                            <p className="text-gray-600 text-sm">{app.email}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <StatusBadge status={app.status || 'pending'} />
                            <select
                              value={app.status || 'pending'}
                              onChange={(e) => 
                                updateEarlyAccessStatus.mutate({ id: app.id, status: e.target.value })
                              }
                              className="text-xs border border-gray-300 rounded px-2 py-1"
                            >
                              <option value="pending">Pending</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                          <div>
                            <span className="font-medium text-gray-500">Vehicle:</span>
                            <p>{app.vehicleType}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-500">Frequency:</span>
                            <p>{app.chargingFrequency}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-500">Location:</span>
                            <p>{app.location}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-500">Applied:</span>
                            <p>{app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'N/A'}</p>
                          </div>
                        </div>
                        
                        {app.interests && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <span className="font-medium text-gray-500 text-sm">Interests:</span>
                            <p className="text-sm text-gray-700 mt-1">{app.interests}</p>
                          </div>
                        )}
                      </div>
                    ))}
                    {filteredEarlyAccess.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No early access applications found.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'host' && (
              <div>
                {loadingHost ? (
                  <div className="text-center py-8">Loading...</div>
                ) : (
                  <div className="space-y-4">
                    {filteredHost.map((app) => (
                      <div key={app.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{app.businessName}</h3>
                            <p className="text-gray-600 text-sm">
                              {app.contactFirstName} {app.contactLastName} • {app.email}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <StatusBadge status={app.status || 'pending'} />
                            <select
                              value={app.status || 'pending'}
                              onChange={(e) => 
                                updateHostStatus.mutate({ id: app.id, status: e.target.value })
                              }
                              className="text-xs border border-gray-300 rounded px-2 py-1"
                            >
                              <option value="pending">Pending</option>
                              <option value="in-review">In Review</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-sm mb-3">
                          <div>
                            <span className="font-medium text-gray-500">Property:</span>
                            <p>{app.propertyType}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-500">Parking:</span>
                            <p>{app.parkingSpaces}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-500">Traffic:</span>
                            <p>{app.expectedTraffic}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-500">Timeline:</span>
                            <p>{app.timeline}</p>
                          </div>
                        </div>
                        
                        <div className="border-t pt-3 mb-3">
                          <span className="font-medium text-gray-500 text-sm">Address:</span>
                          <p className="text-sm text-gray-700">{app.propertyAddress}</p>
                        </div>
                        
                        {app.additionalInfo && (
                          <div className="border-t pt-3">
                            <span className="font-medium text-gray-500 text-sm">Additional Information:</span>
                            <p className="text-sm text-gray-700 mt-1">{app.additionalInfo}</p>
                          </div>
                        )}
                      </div>
                    ))}
                    {filteredHost.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No host applications found.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}