import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Users, MapPin, Phone, MessageSquare, Send, Star, Clock, Plus, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const communityReports = [
  {
    id: 1,
    reporter: 'Maya Devi (ASHA Worker)',
    location: 'Mokokchung Village',
    type: 'Health Concern',
    description: 'Multiple families reporting stomach issues after using village well water',
    timestamp: '2 hours ago',
    status: 'under_review',
    priority: 'high',
    contact: '+91 98765 43210',
    language: 'Assamese'
  },
  {
    id: 2,
    reporter: 'Ravi Sharma (Community Volunteer)',
    location: 'Kohima District',
    type: 'Water Quality',
    description: 'Unusual color and smell in community water tank since yesterday',
    timestamp: '4 hours ago',
    status: 'investigating',
    priority: 'medium',
    contact: '+91 87654 32109',
    language: 'Hindi'
  },
  {
    id: 3,
    reporter: 'Priya Nair (Resident)',
    location: 'Dimapur',
    type: 'Infrastructure',
    description: 'Water pump not working for 3 days, community needs immediate help',
    timestamp: '6 hours ago',
    status: 'resolved',
    priority: 'high',
    contact: '+91 76543 21098',
    language: 'English'
  },
  {
    id: 4,
    reporter: 'John Zeliang (Village Leader)',
    location: 'Peren District',
    type: 'Health Education',
    description: 'Request for hygiene awareness session for village children',
    timestamp: '1 day ago',
    status: 'scheduled',
    priority: 'low',
    contact: '+91 65432 10987',
    language: 'Local Dialect'
  }
];

const healthWorkers = [
  {
    id: 1,
    name: 'Maya Devi',
    role: 'ASHA Worker',
    location: 'Mokokchung',
    reports: 23,
    rating: 4.8,
    active: true
  },
  {
    id: 2,
    name: 'Ravi Sharma',
    role: 'Community Volunteer',
    location: 'Kohima',
    reports: 15,
    rating: 4.6,
    active: true
  },
  {
    id: 3,
    name: 'Sunita Rai',
    role: 'ASHA Worker',
    location: 'Dimapur',
    reports: 31,
    rating: 4.9,
    active: false
  },
  {
    id: 4,
    name: 'John Zeliang',
    role: 'Village Leader',
    location: 'Peren',
    reports: 8,
    rating: 4.4,
    active: true
  }
];

export function CommunityReporting() {
  const [activeTab, setActiveTab] = useState('reports');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showAddWorker, setShowAddWorker] = useState(false);

  const [newWorker, setNewWorker] = useState({
    name: '',
    role: '',
    location: '',
    contact: '',
    email: '',
    specialization: '',
    languages: []
  });
  const [availableLanguages] = useState([
    'Assamese', 'Bengali', 'Hindi', 'English', 'Bodo', 'Karbi', 
    'Mising', 'Nepali', 'Manipuri', 'Nagamese'
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'under_review': return 'secondary';
      case 'investigating': return 'outline';
      case 'resolved': return 'outline';
      case 'scheduled': return 'secondary';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const handleAddWorker = () => {
    // Simulate adding worker
    alert(`Health worker ${newWorker.name} has been successfully added to the system!`);
    setNewWorker({
      name: '',
      role: '',
      location: '',
      contact: '',
      email: '',
      specialization: '',
      languages: []
    });
    setShowAddWorker(false);
  };

  const handleLanguageToggle = (language) => {
    setNewWorker(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Community Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Active Workers</p>
                <p className="text-2xl font-bold">67</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Reports</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Villages Covered</p>
                <p className="text-2xl font-bold">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-bold">2.4h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Community Hero Image */}
      <Card>
        <CardContent className="p-0">
          <div className="relative h-64 overflow-hidden rounded-lg">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1667577113456-34c59803de33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB3b3JrZXJzJTIwY29tbXVuaXR5JTIwaW5kaWF8ZW58MXx8fHwxNzU3NjA2OTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Community Health Workers"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-3xl font-bold mb-2">Community Health Network</h2>
                <p className="text-lg">Empowering communities through collaborative health monitoring</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('reports')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'reports'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Community Reports
        </button>
        <button
          onClick={() => setActiveTab('workers')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'workers'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Health Workers
        </button>
      </div>

      {/* Community Reports Tab */}
      {activeTab === 'reports' && (
        <Card>
          <CardHeader>
            <CardTitle>Community Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {communityReports.map((report) => (
                <div
                  key={report.id}
                  className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                    selectedReport?.id === report.id ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedReport(report)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium">{report.type}</h4>
                        <Badge variant={getStatusColor(report.status)}>
                          {report.status.replace('_', ' ')}
                        </Badge>
                        <span className={`text-sm font-medium ${getPriorityColor(report.priority)}`}>
                          {report.priority} priority
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{report.reporter}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{report.location}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{report.timestamp}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Health Workers Tab */}
      {activeTab === 'workers' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Community Health Workers</CardTitle>
              <Button
                onClick={() => setShowAddWorker(true)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Health Worker
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {healthWorkers.map((worker) => (
                <div key={worker.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{worker.name}</h4>
                      <p className="text-sm text-gray-600">{worker.role}</p>
                    </div>
                    <Badge variant={worker.active ? 'secondary' : 'outline'}>
                      {worker.active ? 'Active' : 'Offline'}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{worker.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="w-3 h-3" />
                      <span>{worker.reports} reports submitted</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>{worker.rating}/5.0 rating</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Phone className="w-3 h-3 mr-1" />
                      Contact
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Message
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Worker Modal/Form */}
      {showAddWorker && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Add New Health Worker</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddWorker(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Basic Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <Input 
                      placeholder="Enter full name"
                      value={newWorker.name}
                      onChange={(e) => setNewWorker({...newWorker, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select 
                      value={newWorker.role} 
                      onChange={(e) => setNewWorker({...newWorker, role: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="">Select Role</option>
                      <option value="ASHA Worker">ASHA Worker</option>
                      <option value="ANM (Auxiliary Nurse Midwife)">ANM (Auxiliary Nurse Midwife)</option>
                      <option value="Community Health Officer">Community Health Officer</option>
                      <option value="Village Leader">Village Leader</option>
                      <option value="Community Volunteer">Community Volunteer</option>
                      <option value="Health Educator">Health Educator</option>
                      <option value="Water Quality Monitor">Water Quality Monitor</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location/Area</label>
                    <Input 
                      placeholder="Village/District/Area"
                      value={newWorker.location}
                      onChange={(e) => setNewWorker({...newWorker, location: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                    <select 
                      value={newWorker.specialization} 
                      onChange={(e) => setNewWorker({...newWorker, specialization: e.target.value})}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="">Select Specialization</option>
                      <option value="Maternal Health">Maternal Health</option>
                      <option value="Child Health">Child Health</option>
                      <option value="Infectious Diseases">Infectious Diseases</option>
                      <option value="Water Quality">Water Quality</option>
                      <option value="Nutrition">Nutrition</option>
                      <option value="Emergency Response">Emergency Response</option>
                      <option value="Health Education">Health Education</option>
                      <option value="General Health">General Health</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <Input 
                      placeholder="+91 XXXXX XXXXX"
                      value={newWorker.contact}
                      onChange={(e) => setNewWorker({...newWorker, contact: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <Input 
                      type="email"
                      placeholder="email@example.com"
                      value={newWorker.email}
                      onChange={(e) => setNewWorker({...newWorker, email: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Language Skills */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Language Skills</h4>
                <p className="text-sm text-gray-600 mb-3">Select languages the health worker can communicate in:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {availableLanguages.map((language) => (
                    <label key={language} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newWorker.languages.includes(language)}
                        onChange={() => handleLanguageToggle(language)}
                        className="rounded"
                      />
                      <span className="text-sm">{language}</span>
                    </label>
                  ))}
                </div>
                {newWorker.languages.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-700">Selected languages:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {newWorker.languages.map((language) => (
                        <Badge key={language} variant="secondary" className="text-xs">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Training & Certification Note */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Training & Certification</h4>
                <p className="text-sm text-blue-800">
                  All health workers will receive mandatory training on:
                </p>
                <ul className="text-sm text-blue-800 mt-2 space-y-1">
                  <li>• Disease surveillance and reporting protocols</li>
                  <li>• Water quality testing and assessment</li>
                  <li>• Community health education techniques</li>
                  <li>• Emergency response procedures</li>
                  <li>• Digital health monitoring tools</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button 
                  onClick={handleAddWorker}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={!newWorker.name || !newWorker.role || !newWorker.location || !newWorker.contact}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Health Worker
                </Button>
                <Button variant="outline" onClick={() => setShowAddWorker(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}



      {/* Report Details Modal */}
      {selectedReport && (
        <Card>
          <CardHeader>
            <CardTitle>Report Details - {selectedReport.type}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Report Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Reporter:</span> {selectedReport.reporter}</p>
                  <p><span className="font-medium">Location:</span> {selectedReport.location}</p>
                  <p><span className="font-medium">Type:</span> {selectedReport.type}</p>
                  <p><span className="font-medium">Priority:</span> 
                    <span className={`ml-2 ${getPriorityColor(selectedReport.priority)}`}>
                      {selectedReport.priority}
                    </span>
                  </p>
                  <p><span className="font-medium">Language:</span> {selectedReport.language}</p>
                  <p><span className="font-medium">Contact:</span> {selectedReport.contact}</p>
                  <p><span className="font-medium">Submitted:</span> {selectedReport.timestamp}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Status & Actions</h4>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-sm">Current Status:</span>
                    <Badge className="ml-2" variant={getStatusColor(selectedReport.status)}>
                      {selectedReport.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact Reporter
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Assign Team
                    </Button>
                    <Button size="sm" variant="outline" className="w-full justify-start">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Update
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <h4 className="font-medium text-gray-900 mb-2">Description</h4>
              <p className="text-sm text-gray-600">{selectedReport.description}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}