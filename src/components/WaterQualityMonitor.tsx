import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Droplets, Thermometer, Activity, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

const waterSources = [
  {
    id: 1,
    name: 'Village Well - Mokokchung',
    location: 'Mokokchung District',
    status: 'contaminated',
    lastTested: '2 hours ago',
    ph: 6.2,
    turbidity: 15.5,
    bacteria: 'detected',
    temperature: 24.5,
    quality: 'poor'
  },
  {
    id: 2,
    name: 'River Source - Kohima',
    location: 'Kohima Village',
    status: 'safe',
    lastTested: '4 hours ago',
    ph: 7.1,
    turbidity: 2.3,
    bacteria: 'none',
    temperature: 22.1,
    quality: 'good'
  },
  {
    id: 3,
    name: 'Borewell - Dimapur',
    location: 'Dimapur Rural',
    status: 'testing',
    lastTested: '6 hours ago',
    ph: 7.8,
    turbidity: 4.1,
    bacteria: 'pending',
    temperature: 25.2,
    quality: 'pending'
  },
  {
    id: 4,
    name: 'Spring Water - Imphal',
    location: 'Imphal East',
    status: 'contaminated',
    lastTested: '1 hour ago',
    ph: 5.9,
    turbidity: 18.2,
    bacteria: 'detected',
    temperature: 23.8,
    quality: 'poor'
  },
  {
    id: 5,
    name: 'Community Tank - Aizawl',
    location: 'Aizawl District',
    status: 'safe',
    lastTested: '3 hours ago',
    ph: 7.3,
    turbidity: 3.1,
    bacteria: 'none',
    temperature: 21.9,
    quality: 'good'
  }
];

const weeklyTrends = [
  { day: 'Mon', contaminated: 12, safe: 45, testing: 8 },
  { day: 'Tue', contaminated: 15, safe: 42, testing: 10 },
  { day: 'Wed', contaminated: 18, safe: 38, testing: 12 },
  { day: 'Thu', contaminated: 14, safe: 44, testing: 9 },
  { day: 'Fri', contaminated: 11, safe: 47, testing: 7 },
  { day: 'Sat', contaminated: 9, safe: 49, testing: 6 },
  { day: 'Sun', contaminated: 13, safe: 43, testing: 8 }
];

const qualityDistribution = [
  { name: 'Good', value: 65, fill: '#22c55e' },
  { name: 'Fair', value: 20, fill: '#eab308' },
  { name: 'Poor', value: 15, fill: '#ef4444' }
];

export function WaterQualityMonitor() {
  const [selectedSource, setSelectedSource] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredSources = waterSources.filter(source => 
    filterStatus === 'all' || source.status === filterStatus
  );

  const getQualityColor = (quality) => {
    switch (quality) {
      case 'good': return 'text-green-600 bg-green-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'safe': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'contaminated': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'testing': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Droplets className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Sources</p>
                <p className="text-2xl font-bold">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Safe Sources</p>
                <p className="text-2xl font-bold">132</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Contaminated</p>
                <p className="text-2xl font-bold">18</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-sm font-medium text-gray-600">Under Testing</p>
                <p className="text-2xl font-bold">6</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Water Quality Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="safe" fill="#22c55e" name="Safe" />
                <Bar dataKey="contaminated" fill="#ef4444" name="Contaminated" />
                <Bar dataKey="testing" fill="#eab308" name="Testing" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quality Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Quality Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={qualityDistribution}>
                <RadialBar dataKey="value" cornerRadius={10} />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {qualityDistribution.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                  <span className="text-sm">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Water Sources List */}
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
              <Button size="sm">
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
                className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                  selectedSource?.id === source.id ? 'border-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => setSelectedSource(source)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {getStatusIcon(source.status)}
                      <span className="font-medium">{source.name}</span>
                      <Badge className={getQualityColor(source.quality)}>
                        {source.quality}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{source.location}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">pH:</span> {source.ph}
                      </div>
                      <div>
                        <span className="font-medium">Turbidity:</span> {source.turbidity} NTU
                      </div>
                      <div>
                        <span className="font-medium">Bacteria:</span> {source.bacteria}
                      </div>
                      <div>
                        <span className="font-medium">Temp:</span> {source.temperature}°C
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        source.status === 'safe' ? 'secondary' :
                        source.status === 'contaminated' ? 'destructive' : 'outline'
                      }
                    >
                      {source.status}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{source.lastTested}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Water Quality Analysis */}
      {selectedSource && (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Analysis - {selectedSource.name}</CardTitle>
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
      )}
    </div>
  );
}