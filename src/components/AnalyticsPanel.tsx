import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { TrendingUp, TrendingDown, Calendar, Download, Filter, BarChart3 } from 'lucide-react';
import { exportToCSV } from './utils/csvExport';
import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart 
} from 'recharts';

const monthlyData = [
  { month: 'Jan', cases: 45, waterTests: 120, alerts: 8, resolved: 6 },
  { month: 'Feb', cases: 52, waterTests: 135, alerts: 12, resolved: 9 },
  { month: 'Mar', cases: 48, waterTests: 142, alerts: 10, resolved: 8 },
  { month: 'Apr', cases: 67, waterTests: 158, alerts: 15, resolved: 12 },
  { month: 'May', cases: 89, waterTests: 175, alerts: 22, resolved: 18 },
  { month: 'Jun', cases: 134, waterTests: 192, alerts: 31, resolved: 25 },
  { month: 'Jul', cases: 156, waterTests: 205, alerts: 28, resolved: 24 }
];

const diseaseBreakdown = [
  { name: 'Diarrhea', cases: 342, percentage: 45, color: '#ef4444' },
  { name: 'Cholera', cases: 189, percentage: 25, color: '#f97316' },
  { name: 'Typhoid', cases: 152, percentage: 20, color: '#eab308' },
  { name: 'Hepatitis A', cases: 76, percentage: 10, color: '#22c55e' }
];

const districtData = [
  { district: 'Mokokchung', cases: 89, population: 45000, rate: 1.98 },
  { district: 'Kohima', cases: 67, population: 52000, rate: 1.29 },
  { district: 'Dimapur', cases: 134, population: 98000, rate: 1.37 },
  { district: 'Imphal East', cases: 78, population: 67000, rate: 1.16 },
  { district: 'Aizawl', cases: 95, population: 58000, rate: 1.64 },
  { district: 'Tura', cases: 45, population: 34000, rate: 1.32 },
  { district: 'Agartala', cases: 112, population: 85000, rate: 1.32 },
  { district: 'Itanagar', cases: 56, population: 41000, rate: 1.37 }
];

const interventionData = [
  { month: 'Jan', medical: 15, water: 8, education: 12 },
  { month: 'Feb', medical: 18, water: 12, education: 14 },
  { month: 'Mar', medical: 22, water: 15, education: 16 },
  { month: 'Apr', medical: 28, water: 18, education: 20 },
  { month: 'May', medical: 35, water: 25, education: 28 },
  { month: 'Jun', medical: 42, water: 32, education: 35 },
  { month: 'Jul', medical: 38, water: 28, education: 32 }
];

const seasonalTrends = [
  { season: 'Pre-Monsoon', avg: 45, variance: 12 },
  { season: 'Monsoon', avg: 125, variance: 28 },
  { season: 'Post-Monsoon', avg: 78, variance: 15 },
  { season: 'Winter', avg: 32, variance: 8 }
];

export function AnalyticsPanel() {
  const [timeRange, setTimeRange] = useState('7months');
  const [selectedMetric, setSelectedMetric] = useState('cases');

  return (
    <div className="space-y-6">
      {/* Analytics Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Health Analytics & Predictive Insights</CardTitle>
            <div className="flex items-center space-x-2">
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option value="30days">Last 30 Days</option>
                <option value="3months">Last 3 Months</option>
                <option value="7months">Last 7 Months</option>
                <option value="1year">Last Year</option>
              </select>
              <Button size="sm" variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  // Combine all analytics data for export
                  const analyticsData = [
                    ...monthlyData.map(item => ({ ...item, type: 'Monthly Data' })),
                    ...diseaseBreakdown.map(item => ({ ...item, type: 'Disease Breakdown' })),
                    ...districtData.map(item => ({ ...item, type: 'District Data' })),
                    ...interventionData.map(item => ({ ...item, type: 'Intervention Data' })),
                    ...seasonalTrends.map(item => ({ ...item, type: 'Seasonal Trends' }))
                  ];
                  
                  exportToCSV(analyticsData, {
                    filename: `health_analytics_${timeRange}_${new Date().toISOString().split('T')[0]}.csv`
                  });
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Cases</p>
                <p className="text-2xl font-bold">759</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  -12% vs last period
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Water Tests</p>
                <p className="text-2xl font-bold">1,127</p>
                <p className="text-xs text-blue-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +18% increase
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Alerts Sent</p>
                <p className="text-2xl font-bold">126</p>
                <p className="text-xs text-yellow-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +5% vs average
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reduction Rate</p>
                <p className="text-2xl font-bold">20%</p>
                <p className="text-xs text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  -3% decrease
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Case & Alert Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cases" fill="#ef4444" name="Cases" />
                <Line type="monotone" dataKey="alerts" stroke="#f59e0b" strokeWidth={2} name="Alerts" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Disease Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Disease Distribution Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={diseaseBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="cases"
                >
                  {diseaseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {diseaseBreakdown.map((disease) => (
                <div key={disease.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: disease.color }}></div>
                    <span>{disease.name}</span>
                  </div>
                  <span className="font-medium">{disease.cases} cases</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* District Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>District-wise Case Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {districtData.map((district) => (
              <div key={district.district} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{district.district}</span>
                    <span className="text-sm text-gray-500">
                      {district.rate}% of population
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(district.cases / Math.max(...districtData.map(d => d.cases))) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <p className="font-bold text-lg">{district.cases}</p>
                  <p className="text-xs text-gray-500">cases</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Intervention Effectiveness */}
        <Card>
          <CardHeader>
            <CardTitle>Intervention Effectiveness</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={interventionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="medical" stackId="1" stroke="#ef4444" fill="#ef4444" name="Medical Response" />
                <Area type="monotone" dataKey="water" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="Water Treatment" />
                <Area type="monotone" dataKey="education" stackId="1" stroke="#22c55e" fill="#22c55e" name="Health Education" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Seasonal Patterns */}
        <Card>
          <CardHeader>
            <CardTitle>Seasonal Pattern Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={seasonalTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="season" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avg" fill="#8884d8" name="Average Cases" />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {seasonalTrends.map((season) => (
                <div key={season.season} className="flex items-center justify-between text-sm">
                  <span>{season.season}</span>
                  <div className="flex items-center space-x-2">
                    <span>Avg: {season.avg}</span>
                    <span className="text-gray-500">±{season.variance}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Predictive Insights */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Predictive Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-medium text-red-900 mb-2">High Risk Prediction</h4>
              <p className="text-sm text-red-800 mb-3">
                Mokokchung District shows 78% probability of cholera outbreak in next 2 weeks based on water quality trends and seasonal patterns.
              </p>
              <Badge variant="destructive">Action Required</Badge>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">Resource Optimization</h4>
              <p className="text-sm text-yellow-800 mb-3">
                Deploy 2 additional medical teams to Imphal East region. Current response capacity at 65% for projected demand.
              </p>
              <Badge variant="secondary">Optimize</Badge>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Prevention Success</h4>
              <p className="text-sm text-green-800 mb-3">
                Water treatment interventions in Kohima reduced case rates by 34%. Model suggests expanding to similar areas.
              </p>
              <Badge variant="outline">Expand Program</Badge>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <h4 className="font-medium text-gray-900 mb-3">ML Model Performance</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">91%</p>
                <p className="text-sm text-gray-600">Prediction Accuracy</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">7 days</p>
                <p className="text-sm text-gray-600">Average Lead Time</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">15</p>
                <p className="text-sm text-gray-600">Outbreaks Prevented</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">2.3 hrs</p>
                <p className="text-sm text-gray-600">Avg Response Time</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}