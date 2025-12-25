import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { 
  AlertTriangle, 
  Bell, 
  Send, 
  Clock, 
  CheckCircle, 
  Users, 
  MapPin, 
  Phone,
  Brain,
  Zap,
  Filter,
  Plus,
  Download
} from 'lucide-react';
import { exportToCSV } from './utils/csvExport';



const alertTemplates = [
  { id: 1, name: 'Water Contamination Alert', type: 'water' },
  { id: 2, name: 'Disease Outbreak Warning', type: 'disease' },
  { id: 3, name: 'Emergency Medical Response', type: 'emergency' },
  { id: 4, name: 'Preventive Health Advisory', type: 'prevention' }
];

const recipients = [
  { id: 1, name: 'District Health Officers', type: 'officials', count: 12 },
  { id: 2, name: 'ASHA Workers', type: 'workers', count: 45 },
  { id: 3, name: 'Medical Teams', type: 'medical', count: 8 },
  { id: 4, name: 'Village Leaders', type: 'leaders', count: 23 },
  { id: 5, name: 'Emergency Services', type: 'emergency', count: 6 }
];

export function ActiveAlerts({ alerts = [], onAddAlert, onUpdateAlert }) {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [newAlert, setNewAlert] = useState({
    type: '',
    location: '',
    severity: 'medium',
    description: '',
    recipients: []
  });

  const filteredAlerts = alerts.filter(alert => 
    (filterStatus === 'all' || alert.status === filterStatus) &&
    (filterSeverity === 'all' || alert.severity === filterSeverity)
  );

  const activeAlerts = alerts.filter(alert => alert.status === 'active');
  const highPriorityAlerts = alerts.filter(alert => alert.severity === 'high' && alert.status === 'active');
  const investigatingAlerts = alerts.filter(alert => alert.status === 'investigating');
  const resolvedToday = alerts.filter(alert => {
    const today = new Date().toDateString();
    return alert.status === 'resolved' && alert.createdAt && new Date(alert.createdAt).toDateString() === today;
  });
  const totalAffected = alerts.reduce((sum, alert) => sum + (alert.affectedPopulation || 0), 0);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return 'destructive';
      case 'investigating': return 'secondary';
      case 'resolved': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Active Alerts</h1>
        </div>
        <p className="text-gray-600">Real-time alert management and emergency response coordination</p>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{activeAlerts.length}</p>
                <p className="text-sm text-gray-600">Active Alerts</p>
                <p className="text-xs text-red-600">{highPriorityAlerts.length} high priority</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{investigatingAlerts.length}</p>
                <p className="text-sm text-gray-600">Investigating</p>
                <p className="text-xs text-gray-500">Avg response: 2.3h</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{resolvedToday.length}</p>
                <p className="text-sm text-gray-600">Resolved Today</p>
                <p className="text-xs text-green-600">87% resolution rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalAffected.toLocaleString()}</p>
                <p className="text-sm text-gray-600">People Affected</p>
                <p className="text-xs text-blue-600">Across multiple districts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alert Management */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Alert Management</CardTitle>
                <div className="flex items-center space-x-2">
                  <select 
                    value={filterStatus} 
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-1 border rounded-md text-sm"
                  >
                    <option value="all">All Alerts</option>
                    <option value="active">Active</option>
                    <option value="investigating">Investigating</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  <select 
                    value={filterSeverity} 
                    onChange={(e) => setFilterSeverity(e.target.value)}
                    className="px-3 py-1 border rounded-md text-sm"
                  >
                    <option value="all">All Severity</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      const exportData = filteredAlerts.map(alert => ({
                        'Alert ID': alert.id,
                        'Type': alert.type,
                        'Location': alert.location,
                        'Severity': alert.severity,
                        'Status': alert.status,
                        'Description': alert.description,
                        'Timestamp': alert.timestamp,
                        'Assigned To': alert.assignedTo,
                        'Responses': alert.responses,
                        'Escalated': alert.escalated ? 'Yes' : 'No',
                        'Affected Population': alert.affectedPopulation
                      }));
                      
                      exportToCSV(exportData, {
                        filename: `active_alerts_${new Date().toISOString().split('T')[0]}.csv`
                      });
                    }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button onClick={() => setShowCreateAlert(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Alert
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedAlert?.id === alert.id ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedAlert(alert)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`w-3 h-3 rounded-full mt-2 ${getSeverityColor(alert.severity)}`} />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium text-gray-900">{alert.type}</h4>
                            {alert.escalated && (
                              <Badge variant="destructive" className="text-xs">
                                Escalated
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{alert.location}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Users className="w-3 h-3" />
                              <span>{alert.affectedPopulation} affected</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{alert.timestamp}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge variant={getStatusBadge(alert.status)}>
                          {alert.status}
                        </Badge>
                        <span className="text-xs text-gray-500">{alert.responses} responses</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Alert Intelligence & Quick Actions */}
        <div className="space-y-6">
          {/* AI Alert Intelligence */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <CardTitle className="text-lg">AI Alert Intelligence</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-1">Pattern Detection</h4>
                  <p className="text-sm text-purple-800">
                    AI identified correlation between water contamination alerts and rainfall patterns in 3 districts.
                  </p>
                </div>
                
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <h4 className="font-medium text-orange-900 mb-1">Priority Recommendation</h4>
                  <p className="text-sm text-orange-800">
                    Mokokchung alert requires immediate escalation based on population density and contamination level.
                  </p>
                </div>
                
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-1">Resource Optimization</h4>
                  <p className="text-sm text-blue-800">
                    Deploy mobile testing unit to cover 3 pending alerts in Imphal region efficiently.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Bell className="w-4 h-4 mr-2" />
                  Broadcast Emergency Alert
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Deploy Response Team
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact Health Officials
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MapPin className="w-4 h-4 mr-2" />
                  View on Map
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Alert Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Alert Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {alertTemplates.map((template) => (
                  <Button 
                    key={template.id}
                    variant="ghost" 
                    className="w-full justify-start text-sm"
                    onClick={() => {
                      setNewAlert(prev => ({ ...prev, type: template.name }));
                      setShowCreateAlert(true);
                    }}
                  >
                    {template.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Alert Modal */}
      {showCreateAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Create New Alert</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowCreateAlert(false)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alert Type</label>
                    <select 
                      value={newAlert.type} 
                      onChange={(e) => setNewAlert({...newAlert, type: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="">Select Type</option>
                      <option value="Water Contamination">Water Contamination</option>
                      <option value="Disease Outbreak">Disease Outbreak</option>
                      <option value="Emergency Response">Emergency Response</option>
                      <option value="Preventive Advisory">Preventive Advisory</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <Input 
                      placeholder="Enter location"
                      value={newAlert.location}
                      onChange={(e) => setNewAlert({...newAlert, location: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Severity Level</label>
                  <select 
                    value={newAlert.severity} 
                    onChange={(e) => setNewAlert({...newAlert, severity: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <Textarea 
                    placeholder="Describe the alert details..."
                    value={newAlert.description}
                    onChange={(e) => setNewAlert({...newAlert, description: e.target.value})}
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {recipients.map((recipient) => (
                      <label key={recipient.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newAlert.recipients.includes(recipient.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setNewAlert({
                                ...newAlert,
                                recipients: [...newAlert.recipients, recipient.id]
                              });
                            } else {
                              setNewAlert({
                                ...newAlert,
                                recipients: newAlert.recipients.filter(id => id !== recipient.id)
                              });
                            }
                          }}
                          className="rounded"
                        />
                        <span className="text-sm">{recipient.name} ({recipient.count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-4">
                  <Button 
                    onClick={() => {
                      onAddAlert(newAlert);
                      setShowCreateAlert(false);
                      setNewAlert({
                        type: '',
                        location: '',
                        severity: 'medium',
                        description: '',
                        recipients: []
                      });
                    }}
                    disabled={!newAlert.type || !newAlert.location}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Alert
                  </Button>
                  <Button variant="outline" onClick={() => setShowCreateAlert(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Alert Details */}
      {selectedAlert && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Alert Details - {selectedAlert.type}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Alert Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">ID:</span> {selectedAlert.id}</p>
                  <p><span className="font-medium">Type:</span> {selectedAlert.type}</p>
                  <p><span className="font-medium">Location:</span> {selectedAlert.location}</p>
                  <p><span className="font-medium">Severity:</span> 
                    <Badge className="ml-2" variant={
                      selectedAlert.severity === 'high' ? 'destructive' :
                      selectedAlert.severity === 'medium' ? 'secondary' : 'outline'
                    }>
                      {selectedAlert.severity}
                    </Badge>
                  </p>
                  <p><span className="font-medium">Affected Population:</span> {selectedAlert.affectedPopulation}</p>
                  <p><span className="font-medium">Timestamp:</span> {selectedAlert.timestamp}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Response Status</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Assigned To:</span> {selectedAlert.assignedTo}</p>
                  <p><span className="font-medium">Responses:</span> {selectedAlert.responses}</p>
                  <p><span className="font-medium">Escalated:</span> {selectedAlert.escalated ? 'Yes' : 'No'}</p>
                  <p><span className="font-medium">Status:</span> 
                    <Badge className="ml-2" variant={getStatusBadge(selectedAlert.status)}>
                      {selectedAlert.status}
                    </Badge>
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Actions</h4>
                <div className="space-y-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => onUpdateAlert(selectedAlert.id, { responses: selectedAlert.responses + 1 })}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Team
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => onUpdateAlert(selectedAlert.id, { escalated: true, severity: 'high' })}
                    disabled={selectedAlert.escalated}
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    {selectedAlert.escalated ? 'Already Escalated' : 'Escalate Alert'}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => onUpdateAlert(selectedAlert.id, { status: 'resolved' })}
                    disabled={selectedAlert.status === 'resolved'}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {selectedAlert.status === 'resolved' ? 'Already Resolved' : 'Mark Resolved'}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-medium text-gray-900 mb-2">Description</h4>
              <p className="text-sm text-gray-600">{selectedAlert.description}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}