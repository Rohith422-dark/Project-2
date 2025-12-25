import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Heart, 
  Activity, 
  AlertTriangle, 
  Droplets, 
  Shield, 
  Users, 
  MapPin, 
  TrendingUp,
  TrendingDown,
  Brain,
  Zap,
  Eye
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



const weeklyData = [
  { day: 'Mon', cases: 4, alerts: 1 },
  { day: 'Tue', cases: 6, alerts: 2 },
  { day: 'Wed', cases: 8, alerts: 1 },
  { day: 'Thu', cases: 5, alerts: 0 },
  { day: 'Fri', cases: 7, alerts: 3 },
  { day: 'Sat', cases: 6, alerts: 1 },
  { day: 'Sun', cases: 4, alerts: 0 }
];

export function DashboardContent({ alerts = [], patients = [], healthReports = [], interventions = [] }) {
  // Calculate dynamic metrics from alerts data
  const activeAlerts = alerts.filter(alert => alert.status === 'active');
  const criticalAlerts = alerts.filter(alert => alert.severity === 'high' && alert.status === 'active');
  const investigatingAlerts = alerts.filter(alert => alert.status === 'investigating');
  const recentCases = alerts.filter(alert => {
    const alertDate = new Date(alert.createdAt || alert.timestamp);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return alertDate >= weekAgo;
  });
  
  // Get recent high priority alerts for display
  const recentHighPriorityAlerts = alerts
    .filter(alert => (alert.severity === 'high' || alert.severity === 'medium') && alert.status === 'active')
    .sort((a, b) => new Date(b.createdAt || b.timestamp) - new Date(a.createdAt || a.timestamp))
    .slice(0, 2);

  // Calculate unique districts affected
  const uniqueDistricts = [...new Set(alerts.map(alert => alert.location))].length;
  const waterAlerts = alerts.filter(alert => alert.type.toLowerCase().includes('water'));
  const severeAlerts = alerts.filter(alert => alert.severity === 'high');

  const metricCards = [
    {
      id: 1,
      title: 'Total Health Reports',
      value: healthReports.length.toString(),
      change: '+12% this week',
      changeType: 'increase',
      icon: Heart,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500'
    },
    {
      id: 2,
      title: 'Total Patients',
      value: patients.length.toString(),
      change: '',
      changeType: 'neutral',
      icon: Users,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-500'
    },
    {
      id: 3,
      title: 'Critical Alerts',
      value: criticalAlerts.length.toString(),
      change: '',
      changeType: 'neutral',
      icon: AlertTriangle,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-500'
    },
    {
      id: 4,
      title: 'Water Sources at Risk',
      value: waterAlerts.length.toString(),
      change: '-8% this week',
      changeType: 'decrease',
      icon: Droplets,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-500'
    },
    {
      id: 5,
      title: 'Active Interventions',
      value: interventions.filter(i => i.status === 'active').length.toString(),
      change: '',
      changeType: 'neutral',
      icon: Shield,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-500'
    },
    {
      id: 6,
      title: 'Recent Cases',
      value: recentCases.length.toString(),
      change: '',
      changeType: 'neutral',
      icon: Activity,
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-500'
    },
    {
      id: 7,
      title: 'Districts Affected',
      value: uniqueDistricts.toString(),
      change: '',
      changeType: 'neutral',
      icon: MapPin,
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-500'
    },
    {
      id: 8,
      title: 'Prevention Score',
      value: '78%',
      change: '+15% this week',
      changeType: 'increase',
      icon: TrendingUp,
      bgColor: 'bg-cyan-50',
      iconColor: 'text-cyan-500'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Health Surveillance Dashboard</h1>
        </div>
        <p className="text-gray-600">Real-time monitoring and early warning system for water-borne disease prevention</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metricCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className={`${card.bgColor} p-4`}>
                  <div className="flex items-center justify-between mb-3">
                    <Icon className={`w-8 h-8 ${card.iconColor}`} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-gray-900">{card.value}</h3>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    {card.change && (
                      <div className="flex items-center space-x-1">
                        {card.changeType === 'increase' ? (
                          <TrendingUp className="w-3 h-3 text-red-500" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-green-500" />
                        )}
                        <span className={`text-xs ${
                          card.changeType === 'increase' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {card.change}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* AI-Powered Features Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Outbreak Prediction */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">AI Outbreak Prediction</h3>
                <p className="text-sm text-gray-600">Machine learning powered early warning system</p>
              </div>
              <Badge className="ml-auto bg-purple-100 text-purple-700">AI Powered</Badge>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900">Moderate Risk Detected</h4>
                    <p className="text-sm text-yellow-800 mt-1">
                      AI models predict 65% chance of diarrhea outbreak in Mokokchung district within next 7 days. 
                      Factors: Recent rainfall, water quality decline, seasonal patterns.
                    </p>
                    <Button size="sm" className="mt-3 bg-yellow-600 hover:bg-yellow-700">
                      View Analysis
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">91%</p>
                  <p className="text-sm text-gray-600">Prediction Accuracy</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">5.2 days</p>
                  <p className="text-sm text-gray-600">Avg Lead Time</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Active Alerts</h3>
              <Badge variant="destructive">{criticalAlerts.length} High Priority</Badge>
            </div>
            
            <div className="space-y-4">
              {recentHighPriorityAlerts.length > 0 ? (
                recentHighPriorityAlerts.map((alert, index) => (
                  <div 
                    key={alert.id} 
                    className={`p-3 border rounded-lg ${
                      alert.severity === 'high' 
                        ? 'border-red-200 bg-red-50' 
                        : 'border-orange-200 bg-orange-50'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className={`w-4 h-4 ${
                        alert.severity === 'high' ? 'text-red-600' : 'text-orange-600'
                      }`} />
                      <span className={`text-sm font-medium ${
                        alert.severity === 'high' ? 'text-red-900' : 'text-orange-900'
                      }`}>
                        {alert.type}
                      </span>
                    </div>
                    <p className={`text-sm ${
                      alert.severity === 'high' ? 'text-red-800' : 'text-orange-800'
                    }`}>
                      {alert.description.length > 60 
                        ? `${alert.description.substring(0, 60)}...` 
                        : alert.description
                      }
                    </p>
                    <p className={`text-xs mt-1 ${
                      alert.severity === 'high' ? 'text-red-600' : 'text-orange-600'
                    }`}>
                      {alert.location} • {alert.timestamp}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-3 border border-green-200 rounded-lg bg-green-50">
                  <p className="text-sm text-green-800">No active high priority alerts</p>
                </div>
              )}
            </div>
            
            <Button variant="outline" className="w-full mt-4">
              View All Alerts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Real-time Analytics */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Real-time Analytics</h3>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="cases" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.2}
                    name="Cases"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="alerts" 
                    stroke="#ef4444" 
                    fill="#ef4444" 
                    fillOpacity={0.2}
                    name="Alerts"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">AI Recommendations</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Resource Allocation</h4>
                <p className="text-sm text-blue-800">
                  Deploy additional water testing kits to Mokokchung and Imphal districts based on risk analysis.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Prevention Strategy</h4>
                <p className="text-sm text-green-800">
                  Initiate community health education program in high-risk areas before monsoon season.
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">Early Intervention</h4>
                <p className="text-sm text-purple-800">
                  Schedule water source maintenance in 3 villages showing declining quality indicators.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}