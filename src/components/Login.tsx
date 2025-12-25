import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Shield, Users, Heart, MapPin, AlertTriangle, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: (userType: 'admin' | 'resident', userData: any) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    location: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (userType: 'admin' | 'resident') => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const userData = {
        username: loginData.username,
        userType,
        location: loginData.location || (userType === 'admin' ? 'Regional Health Office' : 'Community'),
        permissions: userType === 'admin' ? ['full_access', 'alerts', 'analytics'] : ['report', 'view_alerts']
      };
      
      onLogin(userType, userData);
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setLoginData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Smart Health Surveillance</h1>
              <p className="text-lg text-gray-600">Early Warning System</p>
            </div>
          </div>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Protecting communities through AI-powered disease surveillance and water quality monitoring
          </p>
        </div>

        {/* Login Cards */}
        <Tabs defaultValue="admin" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Health Officials
            </TabsTrigger>
            <TabsTrigger value="resident" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Community Members
            </TabsTrigger>
          </TabsList>

          {/* Admin/Health Worker Login */}
          <TabsContent value="admin">
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Health Officials Portal</CardTitle>
                <CardDescription className="text-base">
                  Access comprehensive surveillance dashboard, analytics, and alert management
                </CardDescription>
                <div className="flex justify-center gap-2 mt-3">
                  <Badge variant="secondary" className="text-xs">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Real-time Alerts
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <MapPin className="h-3 w-3 mr-1" />
                    Geographic Mapping
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    AI Analytics
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-username">Official ID / Username</Label>
                  <Input 
                    id="admin-username"
                    type="text"
                    placeholder="Enter your official ID"
                    value={loginData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="admin-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admin-location">Health Office/Region</Label>
                  <Input 
                    id="admin-location"
                    type="text"
                    placeholder="e.g., Guwahati Regional Health Office"
                    value={loginData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => handleLogin('admin')}
                  disabled={isLoading || !loginData.username || !loginData.password}
                >
                  {isLoading ? 'Authenticating...' : 'Access Dashboard'}
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  For official use only. Unauthorized access is prohibited.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community/Resident Login */}
          <TabsContent value="resident">
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Community Portal</CardTitle>
                <CardDescription className="text-base">
                  Report health concerns, access health information, and stay informed about your community
                </CardDescription>
                <div className="flex justify-center gap-2 mt-3">
                  <Badge variant="outline" className="text-xs text-green-700 border-green-200">
                    Health Reporting
                  </Badge>
                  <Badge variant="outline" className="text-xs text-green-700 border-green-200">
                    Community Alerts
                  </Badge>
                  <Badge variant="outline" className="text-xs text-green-700 border-green-200">
                    Health Education
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="resident-username">Name or Phone Number</Label>
                  <Input 
                    id="resident-username"
                    type="text"
                    placeholder="Enter your name or registered phone number"
                    value={loginData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resident-password">Access Code</Label>
                  <div className="relative">
                    <Input 
                      id="resident-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your access code"
                      value={loginData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resident-location">Village/Area</Label>
                  <Input 
                    id="resident-location"
                    type="text"
                    placeholder="e.g., Majuli Island, Jorhat"
                    value={loginData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                  />
                </div>

                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => handleLogin('resident')}
                  disabled={isLoading || !loginData.username || !loginData.password}
                >
                  {isLoading ? 'Connecting...' : 'Access Community Portal'}
                </Button>

                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-500">
                    Don't have access? Contact your local health worker
                  </p>
                  <Button variant="link" className="text-sm">
                    Register as Community Member
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Northeastern Region Health Initiative | Ministry of Health & Family Welfare</p>
          <p>Protecting vulnerable communities through technology and community engagement</p>
        </div>
      </div>
    </div>
  );
}