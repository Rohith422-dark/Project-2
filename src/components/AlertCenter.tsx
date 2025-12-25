import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { AlertTriangle, Bell, Send, Clock, CheckCircle, Users, MapPin, Phone } from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'Water Contamination',
    location: 'Mokokchung District',
    severity: 'high',
    status: 'active',
    description: 'High bacterial content detected in village well. Immediate action required.',
    timestamp: '2024-01-15 14:30',
    assignedTo: 'Dr. Rajesh Kumar',
    responses: 2,
    escalated: false
  },
  {
    id: 2,
    type: 'Disease Outbreak',
    location: 'Kohima Village',
    severity: 'medium',
    status: 'investigating',
    description: 'Multiple cases of diarrhea reported. Investigation team deployed.',
    timestamp: '2024-01-15 12:15',
    assignedTo: 'ASHA Worker - Maya Devi',
    responses: 1,
    escalated: false
  },
  {
    id: 3,
    type: 'Poor Water Quality',
    location: 'Dimapur Rural',
    severity: 'low',
    status: 'resolved',
    description: 'pH levels outside safe range. Water treatment applied.',
    timestamp: '2024-01-15 10:45',
    assignedTo: 'Water Quality Team',
    responses: 3,
    escalated: false
  },
  {
    id: 4,
    type: 'Emergency Response',
    location: 'Imphal East',
    severity: 'high',
    status: 'active',
    description: 'Cholera outbreak confirmed. Emergency medical team needed.',
    timestamp: '2024-01-15 09:20',
    assignedTo: 'District Health Officer',
    responses: 5,
    escalated: true
  }
];

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

export function AlertCenter() {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [newAlert, setNewAlert] = useState({
    type: '',
    location: '',
    severity: 'medium',
    description: '',
    recipients: []
  });

  const filteredAlerts = alerts.filter(alert => 
    filterStatus === 'all' || alert.status === filterStatus
  );

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active': return 'destructive';
      case 'investigating': return 'secondary';
      case 'resolved': return 'outline';
      default: return 'outline';
    }
  };

  const handleCreateAlert = () => {
    // In a real app, this would send the alert to the backend
    console.log('Creating alert:', newAlert);
    setShowCreateAlert(false);
    setNewAlert({
      type: '',
      location: '',
      severity: 'medium',
      description: '',
      recipients: []
    });
  };

  return (
    <div className="space-y-6">
      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Investigating</p>
                <p className="text-2xl font-bold">7</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Recipients</p>
                <p className="text-2xl font-bold">94</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Management */}
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
              <Button onClick={() => setShowCreateAlert(true)}>
                <Bell className="w-4 h-4 mr-2" />
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
                className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                  selectedAlert?.id === alert.id ? 'border-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => setSelectedAlert(alert)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`w-3 h-3 rounded-full mt-2 ${getSeverityColor(alert.severity)}`} />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium">{alert.type}</h4>
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
                          <span>{alert.assignedTo}</span>
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

      {/* Create Alert Modal */}
      {showCreateAlert && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Alert</CardTitle>
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
                <Button onClick={handleCreateAlert} disabled={!newAlert.type || !newAlert.location}>
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
      )}

      {/* Alert Details */}
      {selectedAlert && (
        <Card>
          <CardHeader>
            <CardTitle>Alert Details - {selectedAlert.type}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Alert Information</h4>
                <div className="space-y-2 text-sm">
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
                  <p><span className="font-medium">Status:</span> 
                    <Badge className="ml-2" variant={getStatusBadge(selectedAlert.status)}>
                      {selectedAlert.status}
                    </Badge>
                  </p>
                  <p><span className="font-medium">Timestamp:</span> {selectedAlert.timestamp}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Response Status</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Assigned To:</span> {selectedAlert.assignedTo}</p>
                  <p><span className="font-medium">Responses:</span> {selectedAlert.responses}</p>
                  <p><span className="font-medium">Escalated:</span> {selectedAlert.escalated ? 'Yes' : 'No'}</p>
                  <p><span className="font-medium">Priority:</span> {selectedAlert.severity === 'high' ? 'Urgent' : 'Normal'}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Actions</h4>
                <div className="space-y-2">
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Team
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Escalate Alert
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark Resolved
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