import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { 
  AlertTriangle, 
  Heart, 
  Droplets, 
  MapPin, 
  Phone, 
  Users, 
  BookOpen,
  LogOut,
  Send,
  CheckCircle,
  XCircle,
  Clock,
  Play,
  Eye,
  Volume2,
  Search,
  GraduationCap,
  UserCheck,
  Stethoscope,
  Mail,
  Calendar,
  Award,
  HelpCircle
} from 'lucide-react';

interface CommunityDashboardProps {
  userData: any;
  onLogout: () => void;
  educationTutorials: any[];
}

export function CommunityDashboard({ userData, onLogout, educationTutorials }: CommunityDashboardProps) {
  const [reportForm, setReportForm] = useState({
    type: '',
    description: '',
    location: userData.location || '',
    urgency: 'medium'
  });
  const [showReportForm, setShowReportForm] = useState(false);
  const [showWaterReport, setShowWaterReport] = useState(false);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const [waterReportForm, setWaterReportForm] = useState({
    issueType: '',
    description: '',
    location: userData.location || '',
    urgency: 'medium'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Video tutorials from the education system
  const videoTutorials = [
    {
      id: 'VT001',
      title: 'Understanding Water-Borne Diseases',
      description: 'A comprehensive introduction to common water-borne diseases, their causes, and prevention methods. Learn about cholera, typhoid, hepatitis A, and other diseases spread through contaminated water.',
      duration: '12:45',
      views: 2847,
      likes: 189,
      language: 'English/Hindi',
      category: 'Basics',
      difficulty: 'Beginner',
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=225&fit=crop',
      instructor: 'Dr. Maya Sharma',
      topics: ['Disease Prevention', 'Water Safety', 'Public Health'],
      uploadDate: '2024-01-15'
    },
    {
      id: 'VT002',
      title: 'Safe Water Storage and Treatment',
      description: 'Learn proper techniques for storing and treating water to prevent contamination. Covers boiling, chlorination, filtration, and safe storage practices for rural communities.',
      duration: '8:30',
      views: 1923,
      likes: 142,
      language: 'Hindi/Assamese',
      category: 'Prevention',
      difficulty: 'Beginner',
      thumbnail: 'https://images.unsplash.com/photo-1541871685729-6b8b2a3b89a7?w=400&h=225&fit=crop',
      instructor: 'ASHA Worker - Rita Devi',
      topics: ['Water Treatment', 'Safe Storage', 'Community Health'],
      uploadDate: '2024-01-10'
    },
    {
      id: 'VT003',
      title: 'Recognizing Early Symptoms',
      description: 'Identify early warning signs of water-borne diseases. Learn when to seek medical help and how to provide first aid while waiting for professional care.',
      duration: '15:20',
      views: 3156,
      likes: 234,
      language: 'English/Local Dialects',
      category: 'Symptoms',
      difficulty: 'Intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=225&fit=crop',
      instructor: 'Public Health Team',
      topics: ['Symptom Recognition', 'First Aid', 'Medical Care'],
      uploadDate: '2024-01-08'
    },
    {
      id: 'VT004',
      title: 'Community Hygiene Practices',
      description: 'Essential hygiene practices for communities to prevent water-borne diseases. Covers handwashing, sanitation, waste management, and community awareness.',
      duration: '10:15',
      views: 2134,
      likes: 178,
      language: 'Hindi/Mizo',
      category: 'Hygiene',
      difficulty: 'Beginner',
      thumbnail: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=225&fit=crop',
      instructor: 'Health Inspector',
      topics: ['Hygiene', 'Sanitation', 'Community Health'],
      uploadDate: '2024-01-05'
    }
  ];

  // ASHA Workers information
  const ashaWorkers = [
    {
      id: 'ASHA001',
      name: 'Rita Devi',
      phone: '+91 76543 21098',
      email: 'rita.devi@health.gov.in',
      village: 'Kohima Village',
      district: 'Kohima',
      experience: '8 years',
      specialization: 'Maternal Health, Water-borne Diseases',
      availability: 'Monday-Saturday, 9 AM - 6 PM',
      photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      languages: ['Hindi', 'Nagamese', 'English'],
      certifications: ['ASHA Training Certificate', 'First Aid Certified', 'Community Health Worker'],
      servicesOffered: [
        'Health education and counseling',
        'Basic medical care and first aid',
        'Immunization support',
        'Maternal and child health',
        'Water quality monitoring',
        'Community health surveys'
      ]
    },
    {
      id: 'ASHA002',
      name: 'Maya Devi',
      phone: '+91 87654 32109',
      email: 'maya.devi@health.gov.in',
      village: 'Dimapur Town',
      district: 'Dimapur',
      experience: '5 years',
      specialization: 'Disease Prevention, Child Health',
      availability: 'Monday-Friday, 8 AM - 5 PM',
      photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      languages: ['Hindi', 'Assamese', 'English'],
      certifications: ['ASHA Training Certificate', 'Child Health Specialist', 'Disease Prevention Expert'],
      servicesOffered: [
        'Disease prevention education',
        'Child health monitoring',
        'Vaccination campaigns',
        'Health awareness programs',
        'Emergency response coordination',
        'Community outreach'
      ]
    },
    {
      id: 'ASHA003',
      name: 'Priya Singh',
      phone: '+91 98765 43217',
      email: 'priya.singh@health.gov.in',
      village: 'Mokokchung Valley',
      district: 'Mokokchung',
      experience: '10 years',
      specialization: 'Water Quality, Sanitation',
      availability: 'Monday-Saturday, 10 AM - 7 PM',
      photo: 'https://images.unsplash.com/photo-1594824950417-06bbde399b93?w=150&h=150&fit=crop&crop=face',
      languages: ['Hindi', 'Ao', 'English'],
      certifications: ['Senior ASHA Certificate', 'Water Quality Expert', 'Sanitation Specialist'],
      servicesOffered: [
        'Water quality testing and monitoring',
        'Sanitation guidance',
        'Community health education',
        'Disease outbreak response',
        'Health data collection',
        'Training junior ASHA workers'
      ]
    }
  ];

  const categories = ['All', 'Basics', 'Prevention', 'Symptoms', 'Hygiene'];

  const filteredVideos = videoTutorials.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Basics': return 'bg-blue-100 text-blue-800';
      case 'Prevention': return 'bg-green-100 text-green-800';
      case 'Symptoms': return 'bg-orange-100 text-orange-800';
      case 'Hygiene': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSubmitReport = () => {
    // Simulate report submission
    alert('Thank you! Your report has been submitted to local health authorities.');
    setReportForm({
      type: '',
      description: '',
      location: userData.location || '',
      urgency: 'medium'
    });
    setShowReportForm(false);
  };

  const handleSubmitWaterReport = () => {
    // Simulate water report submission
    alert('Thank you! Your water quality report has been submitted. Our team will investigate immediately.');
    setWaterReportForm({
      issueType: '',
      description: '',
      location: userData.location || '',
      urgency: 'medium'
    });
    setShowWaterReport(false);
  };

  const emergencyContacts = [
    {
      name: 'Health Emergency Helpline',
      number: '102',
      description: 'State health emergency services'
    },
    {
      name: 'District Health Officer',
      number: '+91 98765 43210',
      description: 'Direct line to district health office'
    },
    {
      name: 'Water Quality Emergency',
      number: '+91 87654 32109',
      description: 'Report urgent water contamination'
    },
    {
      name: 'ASHA Worker - Local',
      number: '+91 76543 21098',
      description: 'Community health worker for your area'
    },
    {
      name: 'Ambulance Service',
      number: '108',
      description: 'Emergency medical transport'
    }
  ];

  const activeAlerts = [
    {
      id: 1,
      type: 'Water Quality',
      message: 'Boil water before drinking - Temporary advisory for Majuli Island',
      severity: 'high',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'Health Advisory',
      message: 'Increased cases of stomach flu reported. Practice good hygiene.',
      severity: 'medium',
      time: '1 day ago'
    }
  ];

  const healthTips = [
    {
      title: 'Water Safety',
      tip: 'Always boil water for at least 1 minute before drinking, especially during monsoon season.'
    },
    {
      title: 'Hand Hygiene',
      tip: 'Wash hands with soap for 20 seconds, especially before eating and after using toilet.'
    },
    {
      title: 'Food Safety',
      tip: 'Cook food thoroughly and eat while hot. Avoid street food during outbreak alerts.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Community Health Portal</h1>
                <p className="text-sm text-gray-500">Welcome, {userData.username}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{userData.location}</p>
                <p className="text-xs text-gray-500">Community Member</p>
              </div>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Education
            </TabsTrigger>
            <TabsTrigger value="asha-workers" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              ASHA Workers
            </TabsTrigger>
            <TabsTrigger value="help" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              Help & Support
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Actions */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      className="w-full justify-start bg-red-600 hover:bg-red-700"
                      onClick={() => setShowReportForm(true)}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Report Health Issue
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setShowWaterReport(true)}
                    >
                      <Droplets className="h-4 w-4 mr-2" />
                      Report Water Problem
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setShowEmergencyContacts(true)}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Emergency Contacts
                    </Button>
                  </CardContent>
                </Card>

                {/* Health Tips */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Health Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {healthTips.map((tip, index) => (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-sm text-blue-900 mb-1">{tip.title}</h4>
                        <p className="text-xs text-blue-700">{tip.tip}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Active Alerts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      Active Health Alerts
                    </CardTitle>
                    <CardDescription>
                      Important notifications for your community
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {activeAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-start gap-3 p-4 border rounded-lg">
                        <div className={`p-2 rounded-full ${
                          alert.severity === 'high' ? 'bg-red-100' : 'bg-yellow-100'
                        }`}>
                          <AlertTriangle className={`h-4 w-4 ${
                            alert.severity === 'high' ? 'text-red-600' : 'text-yellow-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'}>
                              {alert.type}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {alert.time}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-700">{alert.message}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Community Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-full">
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-600">Safe</p>
                          <p className="text-sm text-gray-600">Water Quality Status</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-blue-600">1,247</p>
                          <p className="text-sm text-gray-600">Community Members</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-100 rounded-full">
                          <Clock className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-yellow-600">24/7</p>
                          <p className="text-sm text-gray-600">Health Monitoring</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="education" className="space-y-6">
            {/* Education Header */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h2>Health Education Videos</h2>
              </div>
              <p className="text-gray-600">Learn about water-borne disease prevention and community health</p>
            </div>

            {/* Search and Filter */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search educational videos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <select 
                    value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border rounded-md text-sm"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'All' ? 'All Categories' : category}
                      </option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <Card 
                  key={video.id} 
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-t-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-blue-600 ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge className={getDifficultyColor(video.difficulty)}>
                        {video.difficulty}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                      {video.duration}
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="mb-3">
                      <Badge className={getCategoryColor(video.category)} variant="secondary">
                        {video.category}
                      </Badge>
                    </div>
                    
                    <h3 className="mb-2 line-clamp-2">{video.title}</h3>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                      {video.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{video.instructor}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{video.views.toLocaleString()}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Volume2 className="w-4 h-4" />
                          <span>{video.language}</span>
                        </span>
                      </div>
                    </div>
                    
                    <Button className="w-full" size="sm">
                      <Play className="w-4 h-4 mr-2" />
                      Watch Video
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="asha-workers" className="space-y-6">
            {/* ASHA Workers Header */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
                <h2>ASHA Workers in Your Area</h2>
              </div>
              <p className="text-gray-600">Connect with certified community health workers</p>
            </div>

            {/* ASHA Workers Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {ashaWorkers.map((worker) => (
                <Card key={worker.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <img 
                        src={worker.photo} 
                        alt={worker.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{worker.name}</h3>
                        <p className="text-sm text-gray-600">{worker.village}, {worker.district}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {worker.experience}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {worker.specialization}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-green-600" />
                        <a href={`tel:${worker.phone}`} className="text-blue-600 hover:underline">
                          {worker.phone}
                        </a>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-blue-600" />
                        <a href={`mailto:${worker.email}`} className="text-blue-600 hover:underline">
                          {worker.email}
                        </a>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-purple-600" />
                        <span className="text-gray-600">{worker.availability}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Volume2 className="w-4 h-4 text-orange-600" />
                        <span className="text-gray-600">{worker.languages.join(', ')}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Services Offered:</h4>
                      <div className="grid grid-cols-1 gap-1">
                        {worker.servicesOffered.slice(0, 3).map((service, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>{service}</span>
                          </div>
                        ))}
                        {worker.servicesOffered.length > 3 && (
                          <p className="text-xs text-gray-500 mt-1">
                            +{worker.servicesOffered.length - 3} more services
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Certifications:</h4>
                      <div className="flex flex-wrap gap-1">
                        {worker.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <Award className="w-3 h-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* About ASHA Program */}
            <Card className="bg-blue-50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Stethoscope className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">About ASHA Workers</h3>
                    <p className="text-sm text-gray-700 mb-3">
                      ASHA (Accredited Social Health Activist) workers are trained community health volunteers 
                      who serve as the bridge between the community and the public health system. They provide 
                      essential health services, education, and support to rural communities.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Community health education</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Basic medical care and first aid</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Health awareness programs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Emergency response coordination</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="help" className="space-y-6">
            {/* Help & Support Content */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <HelpCircle className="w-8 h-8 text-white" />
                </div>
                <h2>Help & Support</h2>
              </div>
              <p className="text-gray-600">Get assistance and find answers to common questions</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Emergency Contacts Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-red-600" />
                    Emergency Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="p-2 bg-red-100 rounded-full">
                        <Phone className="h-4 w-4 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-sm">{contact.name}</h4>
                          <a 
                            href={`tel:${contact.number}`}
                            className="font-bold text-blue-600 hover:text-blue-800"
                          >
                            {contact.number}
                          </a>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{contact.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <details className="border rounded-lg p-3">
                      <summary className="font-medium cursor-pointer">How do I report a health emergency?</summary>
                      <p className="text-sm text-gray-600 mt-2">
                        For immediate emergencies, call 108 for ambulance or 102 for health emergency. 
                        You can also use the "Report Health Issue" button on the dashboard.
                      </p>
                    </details>
                    
                    <details className="border rounded-lg p-3">
                      <summary className="font-medium cursor-pointer">How do I contact my local ASHA worker?</summary>
                      <p className="text-sm text-gray-600 mt-2">
                        Visit the "ASHA Workers" tab to find contact information for ASHA workers in your area, 
                        including phone numbers and email addresses.
                      </p>
                    </details>
                    
                    <details className="border rounded-lg p-3">
                      <summary className="font-medium cursor-pointer">What should I do if my water source is contaminated?</summary>
                      <p className="text-sm text-gray-600 mt-2">
                        Immediately stop using the water source, report it using the "Report Water Problem" feature, 
                        and call the Water Quality Emergency number at +91 87654 32109.
                      </p>
                    </details>
                    
                    <details className="border rounded-lg p-3">
                      <summary className="font-medium cursor-pointer">How can I access educational materials?</summary>
                      <p className="text-sm text-gray-600 mt-2">
                        Visit the "Education" tab to access video tutorials on health awareness, 
                        disease prevention, and water safety practices.
                      </p>
                    </details>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Report Health Issue Modal */}
        <Dialog open={showReportForm} onOpenChange={setShowReportForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Submit Health Report
              </DialogTitle>
              <DialogDescription>
                Help us keep your community safe by reporting health concerns
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="report-type">Issue Type</Label>
                  <Select value={reportForm.type} onValueChange={(value) => 
                    setReportForm(prev => ({ ...prev, type: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="illness">Illness/Symptoms</SelectItem>
                      <SelectItem value="water">Water Quality</SelectItem>
                      <SelectItem value="sanitation">Sanitation Issue</SelectItem>
                      <SelectItem value="outbreak">Possible Outbreak</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select value={reportForm.urgency} onValueChange={(value) =>
                    setReportForm(prev => ({ ...prev, urgency: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location"
                  value={reportForm.location}
                  onChange={(e) => setReportForm(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Specific location or area"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  value={reportForm.description}
                  onChange={(e) => setReportForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Please describe the health concern or issue in detail..."
                  rows={4}
                />
              </div>

              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-sm text-red-800">
                  <strong>Important:</strong> For life-threatening emergencies, call <strong>108</strong> immediately.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSubmitReport} className="bg-green-600 hover:bg-green-700">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Report
                </Button>
                <Button variant="outline" onClick={() => setShowReportForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Report Water Problem Modal */}
        <Dialog open={showWaterReport} onOpenChange={setShowWaterReport}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-600" />
                Report Water Quality Issue
              </DialogTitle>
              <DialogDescription>
                Help us maintain safe drinking water for your community
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="water-issue-type">Issue Type</Label>
                  <Select value={waterReportForm.issueType} onValueChange={(value) => 
                    setWaterReportForm(prev => ({ ...prev, issueType: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue placeholder="Select water issue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contamination">Water Contamination</SelectItem>
                      <SelectItem value="color_change">Unusual Color/Smell</SelectItem>
                      <SelectItem value="supply_shortage">Water Supply Shortage</SelectItem>
                      <SelectItem value="pump_failure">Pump/Infrastructure Failure</SelectItem>
                      <SelectItem value="taste_issues">Taste Issues</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="water-urgency">Urgency Level</Label>
                  <Select value={waterReportForm.urgency} onValueChange={(value) =>
                    setWaterReportForm(prev => ({ ...prev, urgency: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="water-location">Location</Label>
                <Input 
                  id="water-location"
                  value={waterReportForm.location}
                  onChange={(e) => setWaterReportForm(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Water source location (well, tank, tap etc.)"
                />
              </div>

              <div>
                <Label htmlFor="water-description">Issue Description</Label>
                <Textarea 
                  id="water-description"
                  value={waterReportForm.description}
                  onChange={(e) => setWaterReportForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Please describe the water quality issue, when it started, number of affected families..."
                  rows={4}
                />
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> For emergency water contamination that may cause immediate health risks, 
                  please also call our emergency hotline: <strong>102</strong>
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSubmitWaterReport} className="bg-blue-600 hover:bg-blue-700">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Water Report
                </Button>
                <Button variant="outline" onClick={() => setShowWaterReport(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Emergency Contacts Modal */}
        <Dialog open={showEmergencyContacts} onOpenChange={setShowEmergencyContacts}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-red-600" />
                Emergency Contacts
              </DialogTitle>
              <DialogDescription>
                Important health and emergency contact numbers for your area
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50">
                  <div className="p-2 bg-red-100 rounded-full">
                    <Phone className="h-4 w-4 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{contact.name}</h4>
                      <a 
                        href={`tel:${contact.number}`}
                        className="text-lg font-bold text-blue-600 hover:text-blue-800"
                      >
                        {contact.number}
                      </a>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{contact.description}</p>
                  </div>
                </div>
              ))}
              
              <div className="mt-6 p-4 bg-red-50 rounded-lg">
                <h4 className="font-medium text-red-900 mb-2">Emergency Guidelines</h4>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• For life-threatening emergencies, call <strong>108</strong> (Ambulance)</li>
                  <li>• For health emergencies, call <strong>102</strong> (Health Emergency)</li>
                  <li>• Provide clear location details when calling</li>
                  <li>• Stay calm and follow operator instructions</li>
                </ul>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Video Player Modal */}
        {selectedVideo && (
          <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-3">
                  <Play className="w-6 h-6 text-blue-600" />
                  <span>{selectedVideo.title}</span>
                </DialogTitle>
                <DialogDescription>
                  Watch this educational video tutorial about {selectedVideo.category.toLowerCase()} - Duration: {selectedVideo.duration}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Video Player Placeholder */}
                <div className="relative bg-gray-900 rounded-lg">
                  <img 
                    src={selectedVideo.thumbnail} 
                    alt={selectedVideo.title}
                    className="w-full h-64 md:h-96 object-cover rounded-lg opacity-75"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                      <Play className="w-10 h-10 text-blue-600 ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded">
                    {selectedVideo.duration}
                  </div>
                </div>
                
                {/* Video Info */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="flex items-center space-x-3 mb-4">
                      <Badge className={getCategoryColor(selectedVideo.category)}>
                        {selectedVideo.category}
                      </Badge>
                      <Badge className={getDifficultyColor(selectedVideo.difficulty)}>
                        {selectedVideo.difficulty}
                      </Badge>
                    </div>
                    
                    <h2 className="mb-3">{selectedVideo.title}</h2>
                    
                    <p className="text-gray-600 mb-4">{selectedVideo.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedVideo.topics.map((topic, index) => (
                        <Badge key={index} variant="outline">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{selectedVideo.views.toLocaleString()} views</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{selectedVideo.likes} likes</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{selectedVideo.duration}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Video Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-600">Instructor</p>
                          <p>{selectedVideo.instructor}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Language</p>
                          <p>{selectedVideo.language}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Upload Date</p>
                          <p>{selectedVideo.uploadDate}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}