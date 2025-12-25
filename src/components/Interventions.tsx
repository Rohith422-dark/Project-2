import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { 
  Shield, 
  Calendar, 
  Users, 
  MapPin, 
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle,
  Brain,
  Target,
  Activity,
  X
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';



const effectivenessData = [
  { month: 'Jan', education: 75, medical: 85, water: 90, infrastructure: 70 },
  { month: 'Feb', education: 78, medical: 88, water: 85, infrastructure: 75 },
  { month: 'Mar', education: 82, medical: 90, water: 87, infrastructure: 80 },
  { month: 'Apr', education: 85, medical: 92, water: 89, infrastructure: 85 },
  { month: 'May', education: 88, medical: 94, water: 91, infrastructure: 88 },
  { month: 'Jun', education: 90, medical: 96, water: 93, infrastructure: 90 }
];

const interventionTypes = [
  { name: 'Water Treatment', value: 35, color: '#3b82f6' },
  { name: 'Medical Response', value: 25, color: '#ef4444' },
  { name: 'Education', value: 25, color: '#22c55e' },
  { name: 'Infrastructure', value: 15, color: '#f59e0b' }
];

export function Interventions({ interventions, onAddIntervention }) {
  const [selectedIntervention, setSelectedIntervention] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNewProgram, setShowNewProgram] = useState(false);
  const [newProgram, setNewProgram] = useState({
    name: '',
    type: 'Water Treatment',
    location: '',
    startDate: '',
    endDate: '',
    budget: '',
    beneficiaries: '',
    description: ''
  });

  const filteredInterventions = interventions.filter(intervention => 
    filterStatus === 'all' || intervention.status === filterStatus
  );

  // Calculate accurate counts based on actual data
  const activePrograms = interventions.filter(i => i.status === 'active').length;
  const completedPrograms = interventions.filter(i => i.status === 'completed').length;
  const planningPrograms = interventions.filter(i => i.status === 'planning').length;
  const totalBeneficiaries = interventions.reduce((sum, i) => sum + (i.beneficiaries || 0), 0);
  const averageEffectiveness = interventions.length > 0 
    ? Math.round(interventions.reduce((sum, i) => sum + (i.effectiveness || 0), 0) / interventions.length)
    : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Water Treatment': return 'text-blue-600';
      case 'Medical': return 'text-red-600';
      case 'Education': return 'text-green-600';
      case 'Infrastructure': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Interventions</h1>
        </div>
        <p className="text-gray-600">Health intervention programs and effectiveness monitoring</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{activePrograms}</p>
                <p className="text-sm text-gray-600">Active Programs</p>
                <p className="text-xs text-blue-600">
                  {activePrograms > 0 ? Math.round((activePrograms / interventions.length) * 100) : 0}% of total
                </p>
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
                <p className="text-2xl font-bold text-gray-900">{completedPrograms}</p>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-xs text-green-600">
                  {planningPrograms > 0 ? `${planningPrograms} in planning` : 'All deployed'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalBeneficiaries.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Beneficiaries</p>
                <p className="text-xs text-purple-600">Across all programs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{averageEffectiveness}%</p>
                <p className="text-sm text-gray-600">Avg Effectiveness</p>
                <p className="text-xs text-orange-600">
                  {interventions.length} total programs
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interventions List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Active Interventions</CardTitle>
                <div className="flex items-center space-x-2">
                  <select 
                    value={filterStatus} 
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-1 border rounded-md text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="planning">Planning</option>
                    <option value="completed">Completed</option>
                  </select>
                  <Button size="sm" onClick={() => setShowNewProgram(true)}>
                    <Shield className="w-4 h-4 mr-2" />
                    New Program
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredInterventions.map((intervention) => (
                  <div
                    key={intervention.id}
                    className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedIntervention?.id === intervention.id ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedIntervention(intervention)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-gray-900">{intervention.name}</h4>
                          <Badge className={getStatusColor(intervention.status)}>
                            {intervention.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <span className={`font-medium ${getTypeColor(intervention.type)}`}>
                            {intervention.type}
                          </span>
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{intervention.location}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{intervention.beneficiaries} beneficiaries</span>
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Progress</span>
                            <span className="font-medium">{intervention.progress}%</span>
                          </div>
                          <Progress value={intervention.progress} className="h-2" />
                          <div className="flex items-center justify-between text-sm">
                            <span>Effectiveness</span>
                            <span className="font-medium text-green-600">{intervention.effectiveness}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights & Analytics */}
        <div className="space-y-6">
          {/* AI Optimization */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <CardTitle className="text-lg">AI Optimization</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-1">Resource Efficiency</h4>
                  <p className="text-sm text-green-800">
                    Water treatment programs show 23% better outcomes when combined with education initiatives.
                  </p>
                </div>
                
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-1">Timing Optimization</h4>
                  <p className="text-sm text-blue-800">
                    Deploy medical interventions 2 weeks before monsoon season for maximum effectiveness.
                  </p>
                </div>
                
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-1">Budget Allocation</h4>
                  <p className="text-sm text-purple-800">
                    Reallocate 15% budget from infrastructure to education for better ROI in Kohima district.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-green-600" />
                <CardTitle className="text-lg">Performance Metrics</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Cost per Beneficiary</span>
                  <span className="text-lg font-bold text-blue-600">₹145</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Success Rate</span>
                  <span className="text-lg font-bold text-green-600">87%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Avg Duration</span>
                  <span className="text-lg font-bold text-purple-600">28 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">ROI</span>
                  <span className="text-lg font-bold text-orange-600">3.2x</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Intervention Types */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Intervention Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={interventionTypes}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name} ${value}%`}
                      outerRadius={60}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {interventionTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Effectiveness Trends */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Intervention Effectiveness Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={effectivenessData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="education" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  name="Education"
                />
                <Line 
                  type="monotone" 
                  dataKey="medical" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Medical"
                />
                <Line 
                  type="monotone" 
                  dataKey="water" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Water Treatment"
                />
                <Line 
                  type="monotone" 
                  dataKey="infrastructure" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  name="Infrastructure"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* New Program Modal */}
      <Dialog open={showNewProgram} onOpenChange={setShowNewProgram}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Intervention Program</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Program Name</label>
                <input
                  type="text"
                  value={newProgram.name}
                  onChange={(e) => setNewProgram({...newProgram, name: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter program name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Intervention Type</label>
                <select
                  value={newProgram.type}
                  onChange={(e) => setNewProgram({...newProgram, type: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="Water Treatment">Water Treatment</option>
                  <option value="Medical">Medical Response</option>
                  <option value="Education">Health Education</option>
                  <option value="Infrastructure">Infrastructure</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={newProgram.location}
                  onChange={(e) => setNewProgram({...newProgram, location: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="District/Village"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Beneficiaries</label>
                <input
                  type="number"
                  value={newProgram.beneficiaries}
                  onChange={(e) => setNewProgram({...newProgram, beneficiaries: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Number of people"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={newProgram.startDate}
                  onChange={(e) => setNewProgram({...newProgram, startDate: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={newProgram.endDate}
                  onChange={(e) => setNewProgram({...newProgram, endDate: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Budget (₹)</label>
              <input
                type="number"
                value={newProgram.budget}
                onChange={(e) => setNewProgram({...newProgram, budget: e.target.value})}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Program budget"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Program Description</label>
              <textarea
                value={newProgram.description}
                onChange={(e) => setNewProgram({...newProgram, description: e.target.value})}
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
                placeholder="Describe the intervention program objectives and activities"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={() => {
                  onAddIntervention(newProgram);
                  setNewProgram({
                    name: '',
                    type: 'Water Treatment',
                    location: '',
                    startDate: '',
                    endDate: '',
                    budget: '',
                    beneficiaries: '',
                    description: ''
                  });
                  setShowNewProgram(false);
                }}
                className="bg-green-600 hover:bg-green-700"
                disabled={!newProgram.name || !newProgram.location || !newProgram.startDate}
              >
                <Shield className="h-4 w-4 mr-2" />
                Create Program
              </Button>
              <Button variant="outline" onClick={() => setShowNewProgram(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Intervention Details Modal */}
      {selectedIntervention && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Intervention Details - {selectedIntervention.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Program Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">ID:</span> {selectedIntervention.id}</p>
                  <p><span className="font-medium">Type:</span> {selectedIntervention.type}</p>
                  <p><span className="font-medium">Location:</span> {selectedIntervention.location}</p>
                  <p><span className="font-medium">Start Date:</span> {selectedIntervention.startDate}</p>
                  <p><span className="font-medium">End Date:</span> {selectedIntervention.endDate}</p>
                  <p><span className="font-medium">Budget:</span> ₹{selectedIntervention.budget.toLocaleString()}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Progress & Impact</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span className="font-medium">{selectedIntervention.progress}%</span>
                    </div>
                    <Progress value={selectedIntervention.progress} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Effectiveness</span>
                      <span className="font-medium text-green-600">{selectedIntervention.effectiveness}%</span>
                    </div>
                    <Progress value={selectedIntervention.effectiveness} className="h-2" />
                  </div>
                  <p className="text-sm">
                    <span className="font-medium">Beneficiaries:</span> {selectedIntervention.beneficiaries}
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Actions</h4>
                <div className="space-y-2">
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Timeline
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Activity className="w-4 h-4 mr-2" />
                    Update Progress
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Contact Team
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}