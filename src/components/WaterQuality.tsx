import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { 
  Droplets, 
  Thermometer, 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  MapPin,
  TrendingUp,
  TrendingDown,
  Brain,
  Zap,
  Beaker,
  Download,
  User
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, RadialBarChart, RadialBar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { exportWaterQualityToCSV } from './utils/csvExport';

const waterSources = [
  {
    id: 'WS001',
    name: 'Village Well - Mokokchung',
    location: 'Mokokchung District',
    status: 'contaminated',
    lastTested: '2 hours ago',
    ph: 6.2,
    turbidity: 15.5,
    bacteria: 'detected',
    temperature: 24.5,
    quality: 'poor',
    riskLevel: 'high'
  },
  {
    id: 'WS002',
    name: 'River Source - Kohima',
    location: 'Kohima Village',
    status: 'safe',
    lastTested: '4 hours ago',
    ph: 7.1,
    turbidity: 2.3,
    bacteria: 'none',
    temperature: 22.1,
    quality: 'good',
    riskLevel: 'low'
  },
  {
    id: 'WS003',
    name: 'Borewell - Dimapur',
    location: 'Dimapur Rural',
    status: 'testing',
    lastTested: '6 hours ago',
    ph: 7.8,
    turbidity: 4.1,
    bacteria: 'pending',
    temperature: 25.2,
    quality: 'pending',
    riskLevel: 'medium'
  },
  {
    id: 'WS004',
    name: 'Spring Water - Imphal',
    location: 'Imphal East',
    status: 'contaminated',
    lastTested: '1 hour ago',
    ph: 5.9,
    turbidity: 18.2,
    bacteria: 'detected',
    temperature: 23.8,
    quality: 'poor',
    riskLevel: 'high'
  }
];

const qualityTrends = [
  { day: 'Mon', ph: 7.2, turbidity: 3.1, bacteria: 0 },
  { day: 'Tue', ph: 7.0, turbidity: 4.2, bacteria: 1 },
  { day: 'Wed', ph: 6.8, turbidity: 5.8, bacteria: 2 },
  { day: 'Thu', ph: 6.5, turbidity: 8.1, bacteria: 3 },
  { day: 'Fri', ph: 6.3, turbidity: 12.4, bacteria: 4 },
  { day: 'Sat', ph: 6.1, turbidity: 15.2, bacteria: 5 },
  { day: 'Sun', ph: 6.2, turbidity: 14.8, bacteria: 4 }
];

const riskDistribution = [
  { name: 'Low Risk', value: 65, fill: '#22c55e' },
  { name: 'Medium Risk', value: 20, fill: '#eab308' },
  { name: 'High Risk', value: 15, fill: '#ef4444' }
];

export function WaterQuality({ testResults, onAddTestResult }) {
  const [selectedSource, setSelectedSource] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [showTestInterface, setShowTestInterface] = useState(false);
  const [testForm, setTestForm] = useState({
    location: '',
    ph: '',
    turbidity: '',
    temperature: '',
    bacteria: '',
    tester: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiAlerts, setAiAlerts] = useState([]);

  const filteredSources = waterSources.filter(source => 
    filterStatus === 'all' || source.status === filterStatus
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-green-100 text-green-800';
      case 'contaminated': return 'bg-red-100 text-red-800';
      case 'testing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'contaminated': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'testing': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Water Quality Monitoring</h1>
        </div>
        <p className="text-gray-600">Real-time water quality monitoring and contamination detection</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Droplets className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-sm text-gray-600">Total Sources</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +5 this week
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
                <p className="text-2xl font-bold text-gray-900">132</p>
                <p className="text-sm text-gray-600">Safe Sources</p>
                <p className="text-xs text-gray-500">85% of total</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">18</p>
                <p className="text-sm text-gray-600">Contaminated</p>
                <p className="text-xs text-red-600 flex items-center mt-1">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  -3 from last week
                </p>
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
                <p className="text-2xl font-bold text-gray-900">6</p>
                <p className="text-sm text-gray-600">Under Testing</p>
                <p className="text-xs text-gray-500">Real-time monitoring</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Water Quality Standards */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <Beaker className="w-6 h-6 text-blue-600" />
            <span>Water Quality Standards & Precautions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Standards */}
            <div>
              <h3 className="mb-4">Acceptable Limits</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p>pH Level</p>
                    <p className="text-sm text-gray-600">Measures acidity/alkalinity</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-600">6.5 - 8.5</p>
                    <p className="text-xs text-gray-500">WHO Standard</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p>Turbidity</p>
                    <p className="text-sm text-gray-600">Water clarity measure</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600">≤ 5 NTU</p>
                    <p className="text-xs text-gray-500">Safe Limit</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <p>Temperature</p>
                    <p className="text-sm text-gray-600">Optimal range</p>
                  </div>
                  <div className="text-right">
                    <p className="text-purple-600">15 - 25°C</p>
                    <p className="text-xs text-gray-500">Acceptable</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p>Bacterial Content</p>
                    <p className="text-sm text-gray-600">E.coli & Coliforms</p>
                  </div>
                  <div className="text-right">
                    <p className="text-red-600">0 CFU/100ml</p>
                    <p className="text-xs text-gray-500">Zero Tolerance</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Precautions */}
            <div>
              <h3 className="mb-4">Safety Precautions</h3>
              <div className="space-y-3">
                <div className="p-3 border-l-4 border-red-500 bg-red-50">
                  <h4 className="text-red-800">High Risk (pH &lt; 6.5 or &gt; 8.5)</h4>
                  <p className="text-sm text-red-700">Immediate treatment required. Do not consume directly.</p>
                </div>
                
                <div className="p-3 border-l-4 border-orange-500 bg-orange-50">
                  <h4 className="text-orange-800">Turbidity &gt; 5 NTU</h4>
                  <p className="text-sm text-orange-700">Filter and boil before consumption. Check for contamination.</p>
                </div>
                
                <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
                  <h4 className="text-yellow-800">Temperature &gt; 25°C</h4>
                  <p className="text-sm text-yellow-700">Store in cool place. Higher bacterial growth risk.</p>
                </div>
                
                <div className="p-3 border-l-4 border-red-600 bg-red-100">
                  <h4 className="text-red-900">Bacteria Detected</h4>
                  <p className="text-sm text-red-800">
                    <strong>Critical:</strong> Boil for 1 minute minimum. Consider chlorination.
                    Alert health authorities immediately.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-blue-900 mb-2">Emergency Contacts</h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>Health Emergency: <strong>108</strong></p>
                  <p>District Health Officer: <strong>+91-XXX-XXXXXXX</strong></p>
                  <p>Water Quality Lab: <strong>+91-XXX-XXXXXXX</strong></p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Water Sources List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Water Source Monitoring</CardTitle>
                <div className="flex items-center space-x-2">
                  <select 
                    value={filterStatus} 
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-1 border rounded-md text-sm"
                  >
                    <option value="all">All Sources</option>
                    <option value="safe">Safe</option>
                    <option value="contaminated">Contaminated</option>
                    <option value="testing">Under Testing</option>
                  </select>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => exportWaterQualityToCSV(filteredSources)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button size="sm" onClick={() => setShowTestInterface(true)}>
                    <Activity className="w-4 h-4 mr-2" />
                    Run Tests
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredSources.map((source) => (
                  <div
                    key={source.id}
                    className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedSource?.id === source.id ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => setSelectedSource(source)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getStatusIcon(source.status)}
                          <h4 className="font-medium text-gray-900">{source.name}</h4>
                          <Badge className={getStatusColor(source.status)}>
                            {source.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {source.location}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div>
                            <span className="font-medium">pH:</span> 
                            <span className={source.ph >= 6.5 && source.ph <= 8.5 ? 'text-green-600' : 'text-red-600'}>
                              {source.ph}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Turbidity:</span> 
                            <span className={source.turbidity <= 5 ? 'text-green-600' : 'text-red-600'}>
                              {source.turbidity} NTU
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Bacteria:</span> 
                            <span className={source.bacteria === 'none' ? 'text-green-600' : 'text-red-600'}>
                              {source.bacteria}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Temp:</span> {source.temperature}°C
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={`mb-1 ${getRiskColor(source.riskLevel)}`}>
                          {source.riskLevel} risk
                        </Badge>
                        <p className="text-xs text-gray-500">{source.lastTested}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Water Quality Test Results */}
          {testResults && testResults.length > 0 && testResults.some(test => test.testType === 'Water Quality') && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Water Quality Test Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testResults
                    .filter(test => test.testType === 'Water Quality')
                    .slice(0, 5)
                    .map((test) => (
                    <div
                      key={test.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4>{test.location}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                              <Activity className="w-3 h-3" />
                              <span>{test.testType}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{test.date}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <User className="w-3 h-3" />
                              <span>{test.tester}</span>
                            </span>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {test.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">pH Level</p>
                          <p className={`font-medium ${
                            test.ph && (parseFloat(test.ph) < 6.5 || parseFloat(test.ph) > 8.5) 
                              ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {test.ph || 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Turbidity</p>
                          <p className={`font-medium ${
                            test.turbidity && parseFloat(test.turbidity) > 5 
                              ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {test.turbidity ? `${test.turbidity} NTU` : 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Bacteria</p>
                          <p className={`font-medium ${
                            test.bacteria === 'Positive' ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {test.bacteria || 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Chemicals</p>
                          <p className={`font-medium ${
                            test.chemicals === 'Above limits' || test.chemicals === 'Contaminated' 
                              ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {test.chemicals || 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Temperature</p>
                          <p className="font-medium">{test.temperature ? `${test.temperature}°C` : 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* AI Insights & Analytics */}
        <div className="space-y-6">
          {/* AI Water Quality Analysis */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <CardTitle className="text-lg">AI Quality Analysis</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-900 mb-1">High Risk Alert</h4>
                  <p className="text-sm text-red-800">
                    2 sources showing rapid quality decline. AI recommends immediate intervention.
                  </p>
                </div>
                
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-1">Predictive Alert</h4>
                  <p className="text-sm text-yellow-800">
                    3 sources at risk during upcoming monsoon season based on historical patterns.
                  </p>
                </div>
                
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-1">Optimization</h4>
                  <p className="text-sm text-green-800">
                    Testing frequency can be reduced for 12 consistently safe sources.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Risk Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart cx="50%" cy="50%" innerRadius="30%" outerRadius="90%" data={riskDistribution}>
                    <RadialBar dataKey="value" cornerRadius={10} />
                    <Tooltip />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-4">
                {riskDistribution.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Real-time Monitoring */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <CardTitle className="text-lg">Real-time Monitoring</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">IoT Sensors Active</span>
                  <span className="text-lg font-bold text-green-600">47/52</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Data Points/Hour</span>
                  <span className="text-lg font-bold text-blue-600">1,248</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Alert Response Time</span>
                  <span className="text-lg font-bold text-purple-600">2.3 min</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Weekly Quality Trends */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Weekly Quality Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={qualityTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="ph" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="pH Level"
                />
                <Line 
                  type="monotone" 
                  dataKey="turbidity" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Turbidity (NTU)"
                />
                <Line 
                  type="monotone" 
                  dataKey="bacteria" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  name="Bacteria Count"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis Modal */}
      {selectedSource && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-3xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{selectedSource.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{selectedSource.location}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedSource(null)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">pH Level</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current: {selectedSource.ph}</span>
                      <span className={selectedSource.ph >= 6.5 && selectedSource.ph <= 8.5 ? 'text-green-600' : 'text-red-600'}>
                        {selectedSource.ph >= 6.5 && selectedSource.ph <= 8.5 ? 'Normal' : 'Abnormal'}
                      </span>
                    </div>
                    <Progress value={(selectedSource.ph / 14) * 100} className="h-2" />
                    <p className="text-xs text-gray-500">Safe range: 6.5 - 8.5</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Turbidity</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current: {selectedSource.turbidity} NTU</span>
                      <span className={selectedSource.turbidity <= 5 ? 'text-green-600' : 'text-red-600'}>
                        {selectedSource.turbidity <= 5 ? 'Clear' : 'Turbid'}
                      </span>
                    </div>
                    <Progress value={Math.min((selectedSource.turbidity / 20) * 100, 100)} className="h-2" />
                    <p className="text-xs text-gray-500">Safe limit: ≤ 5 NTU</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Temperature</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current: {selectedSource.temperature}°C</span>
                      <span className="text-blue-600">Normal</span>
                    </div>
                    <Progress value={(selectedSource.temperature / 40) * 100} className="h-2" />
                    <p className="text-xs text-gray-500">Acceptable range: 15 - 25°C</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Bacterial Content</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Status: {selectedSource.bacteria}</span>
                      <span className={selectedSource.bacteria === 'none' ? 'text-green-600' : 'text-red-600'}>
                        {selectedSource.bacteria === 'none' ? 'Safe' : 'Unsafe'}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className={`h-full rounded-full ${
                        selectedSource.bacteria === 'none' ? 'bg-green-500 w-0' : 'bg-red-500 w-full'
                      }`}></div>
                    </div>
                    <p className="text-xs text-gray-500">Target: No bacteria detected</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Recommended Actions</h4>
                    <p className="text-sm text-gray-600">Based on current water quality parameters</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Thermometer className="w-4 h-4 mr-2" />
                      Retest
                    </Button>
                    {selectedSource.status === 'contaminated' && (
                      <Button size="sm" variant="destructive">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Issue Alert
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Water Testing Interface */}
      {showTestInterface && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-3">
                  <Beaker className="w-6 h-6 text-blue-600" />
                  <span>Water Quality Testing Interface</span>
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setShowTestInterface(false)}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Testing Block */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <Thermometer className="w-5 h-5 text-green-600" />
                        <span>Test Results Entry</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm mb-2">Location/Source Name *</label>
                        <Input
                          value={testForm.location}
                          onChange={(e) => setTestForm({...testForm, location: e.target.value})}
                          placeholder="Enter water source location"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm mb-2">Tester Name *</label>
                        <Input
                          value={testForm.tester}
                          onChange={(e) => setTestForm({...testForm, tester: e.target.value})}
                          placeholder="Enter health worker name"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm mb-2">pH Level *</label>
                          <Input
                            type="number"
                            step="0.1"
                            min="0"
                            max="14"
                            value={testForm.ph}
                            onChange={(e) => setTestForm({...testForm, ph: e.target.value})}
                            placeholder="6.5 - 8.5"
                          />
                          <p className="text-xs text-gray-500 mt-1">Safe range: 6.5 - 8.5</p>
                        </div>
                        
                        <div>
                          <label className="block text-sm mb-2">Turbidity (NTU) *</label>
                          <Input
                            type="number"
                            step="0.1"
                            min="0"
                            value={testForm.turbidity}
                            onChange={(e) => setTestForm({...testForm, turbidity: e.target.value})}
                            placeholder="≤ 5 NTU"
                          />
                          <p className="text-xs text-gray-500 mt-1">Safe limit: ≤ 5 NTU</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm mb-2">Temperature (°C)</label>
                          <Input
                            type="number"
                            step="0.1"
                            value={testForm.temperature}
                            onChange={(e) => setTestForm({...testForm, temperature: e.target.value})}
                            placeholder="15 - 25°C"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm mb-2">Bacterial Test</label>
                          <select 
                            value={testForm.bacteria}
                            onChange={(e) => setTestForm({...testForm, bacteria: e.target.value})}
                            className="w-full px-3 py-2 border rounded-md"
                          >
                            <option value="">Select Result</option>
                            <option value="none">No Bacteria Detected</option>
                            <option value="detected">Bacteria Detected</option>
                            <option value="pending">Test Pending</option>
                          </select>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        onClick={() => {
                          setIsProcessing(true);
                          // Simulate processing
                          setTimeout(() => {
                            // Check if values exceed limits
                            const ph = parseFloat(testForm.ph);
                            const turbidity = parseFloat(testForm.turbidity);
                            
                            const newAlerts = [];
                            if (ph < 6.5 || ph > 8.5) {
                              newAlerts.push({
                                type: 'critical',
                                message: `Critical pH Alert: ${ph} detected at ${testForm.location}. Immediate action required!`,
                                location: testForm.location,
                                parameter: 'pH',
                                value: ph,
                                timestamp: new Date().toLocaleString()
                              });
                            }
                            
                            if (turbidity > 5) {
                              newAlerts.push({
                                type: 'warning',
                                message: `High Turbidity Alert: ${turbidity} NTU at ${testForm.location}. Water treatment recommended.`,
                                location: testForm.location,
                                parameter: 'turbidity',
                                value: turbidity,
                                timestamp: new Date().toLocaleString()
                              });
                            }
                            
                            if (testForm.bacteria === 'detected') {
                              newAlerts.push({
                                type: 'critical',
                                message: `Bacteria Detected at ${testForm.location}. Water unsafe for consumption!`,
                                location: testForm.location,
                                parameter: 'bacteria',
                                value: 'Positive',
                                timestamp: new Date().toLocaleString()
                              });
                            }
                            
                            // Save test result to shared state
                            const testResultData = {
                              location: testForm.location,
                              testType: 'Water Quality',
                              ph: testForm.ph,
                              turbidity: testForm.turbidity,
                              bacteria: testForm.bacteria === 'detected' ? 'Positive' : testForm.bacteria === 'none' ? 'Negative' : testForm.bacteria,
                              chemicals: ph < 6.5 || ph > 8.5 || turbidity > 5 ? 'Above limits' : 'Within limits',
                              temperature: testForm.temperature,
                              tester: testForm.tester
                            };
                            
                            onAddTestResult(testResultData);
                            
                            setAiAlerts(newAlerts);
                            setIsProcessing(false);
                            
                            // Reset form
                            setTestForm({
                              location: '', ph: '', turbidity: '', temperature: '', bacteria: '', tester: ''
                            });
                          }, 2000);
                        }}
                        disabled={!testForm.location || !testForm.ph || !testForm.turbidity || !testForm.tester || isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Clock className="w-4 h-4 mr-2 animate-spin" />
                            Processing Results...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Submit Test Results
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                {/* AI Integration Block */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <Brain className="w-5 h-5 text-purple-600" />
                        <span>AI Alert System</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <h4 className="text-blue-900 mb-2">AI Monitoring Status</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Real-time Analysis:</span>
                              <span className="text-green-600">Active</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Alert Threshold:</span>
                              <span className="text-blue-600">WHO Standards</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Response Time:</span>
                              <span className="text-purple-600">Instant</span>
                            </div>
                          </div>
                        </div>
                        
                        {aiAlerts.length === 0 ? (
                          <div className="p-6 text-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                            <Brain className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                            <p>No alerts generated</p>
                            <p className="text-sm">AI will analyze results when tests are submitted</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <h4 className="text-gray-900">Generated Alerts</h4>
                            {aiAlerts.map((alert, index) => (
                              <div key={index} className={`p-3 rounded-lg border ${
                                alert.type === 'critical' 
                                  ? 'bg-red-50 border-red-200' 
                                  : 'bg-yellow-50 border-yellow-200'
                              }`}>
                                <div className="flex items-start space-x-2">
                                  <AlertCircle className={`w-5 h-5 mt-0.5 ${
                                    alert.type === 'critical' ? 'text-red-600' : 'text-yellow-600'
                                  }`} />
                                  <div className="flex-1">
                                    <p className={`text-sm ${
                                      alert.type === 'critical' ? 'text-red-800' : 'text-yellow-800'
                                    }`}>
                                      {alert.message}
                                    </p>
                                    <p className="text-xs text-gray-600 mt-1">{alert.timestamp}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {aiAlerts.length > 0 && (
                          <div className="space-y-3 pt-4 border-t">
                            <h4 className="text-gray-900">Alert Actions</h4>
                            <div className="space-y-2">
                              <Button 
                                className="w-full" 
                                variant="destructive"
                                onClick={() => {
                                  alert('SMS alerts sent to all registered health workers and community members!');
                                }}
                              >
                                <AlertCircle className="w-4 h-4 mr-2" />
                                Send SMS Alerts to All Users
                              </Button>
                              
                              <Button 
                                className="w-full" 
                                variant="outline"
                                onClick={() => {
                                  alert('Alert notifications sent to district health authorities!');
                                }}
                              >
                                <Zap className="w-4 h-4 mr-2" />
                                Notify Health Authorities
                              </Button>
                              
                              <Button 
                                className="w-full" 
                                variant="outline"
                                onClick={() => {
                                  setAiAlerts([]);
                                }}
                              >
                                Clear Alerts
                              </Button>
                            </div>
                          </div>
                        )}
                        
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <h4 className="text-gray-900 mb-2 text-sm">SMS Alert Preview</h4>
                          <div className="text-xs text-gray-700 bg-white p-2 rounded border">
                            {aiAlerts.length > 0 ? (
                              `🚨 WATER ALERT: ${aiAlerts[0]?.message} Report any symptoms immediately. Health Dept.`
                            ) : (
                              '🚨 WATER ALERT: [Auto-generated based on test results] Report symptoms immediately. Health Dept.'
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}