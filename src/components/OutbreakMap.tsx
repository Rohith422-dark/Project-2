import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, AlertTriangle, Users, Calendar, Filter } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const outbreakData = [
  {
    id: 1,
    location: 'Mokokchung District',
    state: 'Nagaland',
    disease: 'Cholera',
    cases: 23,
    severity: 'high',
    status: 'active',
    lastUpdate: '2 hours ago',
    coordinates: { lat: 26.3219, lng: 94.5240 }
  },
  {
    id: 2,
    location: 'Kohima Village',
    state: 'Nagaland',
    disease: 'Diarrhea',
    cases: 15,
    severity: 'medium',
    status: 'monitoring',
    lastUpdate: '4 hours ago',
    coordinates: { lat: 25.6744, lng: 94.1077 }
  },
  {
    id: 3,
    location: 'Dimapur Rural',
    state: 'Nagaland',
    disease: 'Typhoid',
    cases: 8,
    severity: 'low',
    status: 'contained',
    lastUpdate: '6 hours ago',
    coordinates: { lat: 25.9044, lng: 93.7267 }
  },
  {
    id: 4,
    location: 'Imphal East',
    state: 'Manipur',
    disease: 'Hepatitis A',
    cases: 12,
    severity: 'medium',
    status: 'active',
    lastUpdate: '8 hours ago',
    coordinates: { lat: 24.8170, lng: 93.9368 }
  },
  {
    id: 5,
    location: 'Aizawl District',
    state: 'Mizoram',
    disease: 'Diarrhea',
    cases: 31,
    severity: 'high',
    status: 'active',
    lastUpdate: '1 hour ago',
    coordinates: { lat: 23.7271, lng: 92.7176 }
  }
];

const waterSources = [
  { id: 1, name: 'Village Well - Mokokchung', status: 'contaminated', quality: 'poor' },
  { id: 2, name: 'River Source - Kohima', status: 'tested', quality: 'good' },
  { id: 3, name: 'Borewell - Dimapur', status: 'testing', quality: 'pending' },
  { id: 4, name: 'Spring Water - Imphal', status: 'contaminated', quality: 'poor' },
  { id: 5, name: 'Community Tank - Aizawl', status: 'tested', quality: 'fair' }
];

export function OutbreakMap() {
  const [selectedOutbreak, setSelectedOutbreak] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredOutbreaks = outbreakData.filter(outbreak => 
    filter === 'all' || outbreak.severity === filter
  );

  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Outbreak Mapping & Geographic Analysis</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option value="all">All Severity</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Interactive Map Placeholder */}
          <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1751609492149-e93de149a832?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMHdhdGVyJTIwd2VsbCUyMGluZGlhJTIwdmlsbGFnZXxlbnwxfHx8fDE3NTc2MDY5MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="NER Region Map"
              className="w-full h-full object-cover opacity-50"
            />
            
            {/* Map Overlay */}
            <div className="absolute inset-0 bg-blue-50 bg-opacity-90">
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Interactive Map View</h3>
                  <p className="text-gray-600 mb-4">Geographic visualization of outbreak locations and water sources</p>
                  <div className="flex justify-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">High Risk</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Medium Risk</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Low Risk</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Outbreak Markers */}
            {filteredOutbreaks.map((outbreak, index) => (
              <div
                key={outbreak.id}
                className={`absolute w-6 h-6 rounded-full border-2 border-white cursor-pointer transform -translate-x-3 -translate-y-3 ${
                  outbreak.severity === 'high' ? 'bg-red-500' :
                  outbreak.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{
                  left: `${20 + index * 15}%`,
                  top: `${30 + index * 10}%`
                }}
                onClick={() => setSelectedOutbreak(outbreak)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Outbreak List */}
        <Card>
          <CardHeader>
            <CardTitle>Active Outbreaks ({filteredOutbreaks.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredOutbreaks.map((outbreak) => (
                <div
                  key={outbreak.id}
                  className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                    selectedOutbreak?.id === outbreak.id ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedOutbreak(outbreak)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{outbreak.location}, {outbreak.state}</span>
                        <Badge
                          variant={
                            outbreak.severity === 'high' ? 'destructive' :
                            outbreak.severity === 'medium' ? 'secondary' : 'outline'
                          }
                        >
                          {outbreak.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">Disease: {outbreak.disease}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{outbreak.cases} cases</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{outbreak.lastUpdate}</span>
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant={outbreak.status === 'active' ? 'destructive' : 'secondary'}
                    >
                      {outbreak.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Water Sources Status */}
        <Card>
          <CardHeader>
            <CardTitle>Water Source Monitoring</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {waterSources.map((source) => (
                <div key={source.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      source.quality === 'good' ? 'bg-green-500' :
                      source.quality === 'fair' ? 'bg-yellow-500' :
                      source.quality === 'poor' ? 'bg-red-500' : 'bg-gray-400'
                    }`} />
                    <div>
                      <p className="font-medium text-sm">{source.name}</p>
                      <p className="text-xs text-gray-500">Status: {source.status}</p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      source.quality === 'good' ? 'secondary' :
                      source.quality === 'fair' ? 'secondary' :
                      source.quality === 'poor' ? 'destructive' : 'outline'
                    }
                  >
                    {source.quality}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Outbreak Details */}
      {selectedOutbreak && (
        <Card>
          <CardHeader>
            <CardTitle>Outbreak Details - {selectedOutbreak.location}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Basic Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Location:</span> {selectedOutbreak.location}, {selectedOutbreak.state}</p>
                  <p><span className="font-medium">Disease:</span> {selectedOutbreak.disease}</p>
                  <p><span className="font-medium">Total Cases:</span> {selectedOutbreak.cases}</p>
                  <p><span className="font-medium">Severity:</span> 
                    <Badge className="ml-2" variant={
                      selectedOutbreak.severity === 'high' ? 'destructive' :
                      selectedOutbreak.severity === 'medium' ? 'secondary' : 'outline'
                    }>
                      {selectedOutbreak.severity}
                    </Badge>
                  </p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Response Status</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Status:</span> {selectedOutbreak.status}</p>
                  <p><span className="font-medium">Last Update:</span> {selectedOutbreak.lastUpdate}</p>
                  <p><span className="font-medium">Medical Team:</span> Deployed</p>
                  <p><span className="font-medium">Supplies:</span> Adequate</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Action Items</h4>
                <div className="space-y-2">
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Send Alert
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Deploy Team
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <MapPin className="w-4 h-4 mr-2" />
                    Update Status
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