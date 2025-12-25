import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  FileText, 
  Download, 
  Filter, 
  Search, 
  Calendar,
  MapPin,
  User,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Brain,
  Users,
  Activity,
  Stethoscope,
  Pill,
  Phone,
  Mail
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { exportPatientsToCSV, exportReportsToCSV } from './utils/csvExport';

export function HealthReports({ 
  patients, 
  healthReports, 
  onAddPatient, 
  onAddHealthReport
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeTab, setActiveTab] = useState('patients');
  const [reportSearchTerm, setReportSearchTerm] = useState('');
  const [reportStatusFilter, setReportStatusFilter] = useState('all');
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [showNewReport, setShowNewReport] = useState(false);

  const [newPatient, setNewPatient] = useState({
    name: '',
    age: '',
    gender: 'Male',
    phone: '',
    email: '',
    village: '',
    district: '',
    diseases: '',
    symptoms: ''
  });
  const [newReport, setNewReport] = useState({
    title: '',
    district: '',
    reporter: '',
    type: 'surveillance',
    cases: '',
    severity: 'low',
    description: ''
  });


  const filteredPatients = patients.filter(patient => 
    (statusFilter === 'all' || patient.status === statusFilter) &&
    (patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     patient.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
     patient.district.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredReports = healthReports.filter(report => 
    (reportStatusFilter === 'all' || report.status === reportStatusFilter) &&
    (report.title.toLowerCase().includes(reportSearchTerm.toLowerCase()) ||
     report.district.toLowerCase().includes(reportSearchTerm.toLowerCase()) ||
     report.reporter.toLowerCase().includes(reportSearchTerm.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'under_treatment': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const completedPatients = patients.filter(p => p.status === 'completed');
  const pendingPatients = patients.filter(p => p.status === 'pending');
  const totalPatients = patients.length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h1>Health Records Management</h1>
        </div>
        <p className="text-gray-600">Patient portfolios and health surveillance system</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl">{totalPatients}</p>
                <p className="text-sm text-gray-600">Total Patients</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-gray-50" onClick={() => setStatusFilter('completed')}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl">{completedPatients.length}</p>
                <p className="text-sm text-gray-600">Completed Cases</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-gray-50" onClick={() => setStatusFilter('pending')}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl">{pendingPatients.length}</p>
                <p className="text-sm text-gray-600">Pending Cases</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl">3</p>
                <p className="text-sm text-gray-600">High Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="patients">Patient Portfolios</TabsTrigger>
          <TabsTrigger value="reports">Health Reports</TabsTrigger>
        </TabsList>

        {/* Patient Portfolios Tab */}
        <TabsContent value="patients" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Patient Portfolios</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => exportPatientsToCSV(filteredPatients)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button size="sm" onClick={() => setShowAddPatient(true)}>
                    <User className="w-4 h-4 mr-2" />
                    Add Patient
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              {/* Patient Portfolio Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPatients.map((patient) => (
                  <Card 
                    key={patient.id} 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedPatient(patient)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4>{patient.name}</h4>
                          <p className="text-sm text-gray-600">{patient.age} years, {patient.gender}</p>
                        </div>
                        <Badge className={getStatusColor(patient.status)}>
                          {patient.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{patient.village}, {patient.district}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{patient.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>Last visit: {patient.lastVisit}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          {patient.diseases.length} condition(s)
                        </span>
                        <span className="text-blue-600">
                          View Details →
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Health Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Health Reports & Status</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => exportReportsToCSV(filteredReports)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button size="sm" onClick={() => setShowNewReport(true)}>
                    <FileText className="w-4 h-4 mr-2" />
                    New Report
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search reports..."
                    value={reportSearchTerm}
                    onChange={(e) => setReportSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select 
                  value={reportStatusFilter} 
                  onChange={(e) => setReportStatusFilter(e.target.value)}
                  className="px-3 py-2 border rounded-md text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="under_review">Under Review</option>
                </select>
              </div>

              {/* Reports List */}
              <div className="space-y-4">
                {filteredReports.map((report) => (
                  <div
                    key={report.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4>{report.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{report.district}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>{report.reporter}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{report.date}</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={getStatusColor(report.status)}>
                          {report.status.replace('_', ' ')}
                        </Badge>
                        <span className={`text-sm ${getSeverityColor(report.severity)}`}>
                          {report.cases} cases
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>


      </Tabs>

      {/* Patient Details Modal */}
      {selectedPatient && (
        <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <User className="w-6 h-6 text-blue-600" />
                <span>{selectedPatient.name} - Patient Portfolio</span>
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Patient Information */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Patient Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600">Patient ID</p>
                      <p>{selectedPatient.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Age & Gender</p>
                      <p>{selectedPatient.age} years, {selectedPatient.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Contact</p>
                      <p>{selectedPatient.phone}</p>
                      <p className="text-sm text-blue-600">{selectedPatient.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p>{selectedPatient.village}</p>
                      <p>{selectedPatient.district}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <Badge className={getStatusColor(selectedPatient.status)}>
                        {selectedPatient.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Registered</p>
                      <p>{selectedPatient.registeredDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Last Visit</p>
                      <p>{selectedPatient.lastVisit}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Diseases and Prescriptions */}
              <div className="lg:col-span-2 space-y-6">
                {/* Diseases */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Stethoscope className="w-5 h-5 text-red-600" />
                      <span>Medical Conditions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedPatient.diseases.map((disease, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <h4>{disease.name}</h4>
                            <Badge className={getStatusColor(disease.status)}>
                              {disease.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                              <p>Diagnosed Date</p>
                              <p className="text-gray-900">{disease.diagnosedDate}</p>
                            </div>
                            <div>
                              <p>Severity</p>
                              <p className={getSeverityColor(disease.severity)}>
                                {disease.severity}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Prescriptions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Pill className="w-5 h-5 text-green-600" />
                      <span>Prescriptions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedPatient.prescriptions.map((prescription) => (
                        <div key={prescription.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4>{prescription.medicine}</h4>
                              <p className="text-sm text-gray-600">
                                {prescription.dosage} for {prescription.duration}
                              </p>
                            </div>
                            <Badge className={getStatusColor(prescription.status)}>
                              {prescription.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            Prescribed on: {prescription.prescribedDate}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Follow-ups */}
                {selectedPatient.followUps.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <Activity className="w-5 h-5 text-blue-600" />
                        <span>Follow-up History</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedPatient.followUps.map((followUp, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm text-gray-600">{followUp.date}</p>
                              <p className="text-sm text-blue-600">{followUp.doctor}</p>
                            </div>
                            <p className="text-gray-900">{followUp.notes}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Add Patient Modal */}
      {showAddPatient && (
        <Dialog open={showAddPatient} onOpenChange={setShowAddPatient}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <User className="w-6 h-6 text-blue-600" />
                <span>Add New Patient</span>
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2">Full Name *</label>
                <Input
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Age *</label>
                <Input
                  type="number"
                  value={newPatient.age}
                  onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                  placeholder="Enter age"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Gender *</label>
                <select 
                  value={newPatient.gender}
                  onChange={(e) => setNewPatient({...newPatient, gender: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">Phone Number *</label>
                <Input
                  value={newPatient.phone}
                  onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                  placeholder="+91 9876543210"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Email</label>
                <Input
                  type="email"
                  value={newPatient.email}
                  onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Village *</label>
                <Input
                  value={newPatient.village}
                  onChange={(e) => setNewPatient({...newPatient, village: e.target.value})}
                  placeholder="Enter village name"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">District *</label>
                <select 
                  value={newPatient.district}
                  onChange={(e) => setNewPatient({...newPatient, district: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Select District</option>
                  <option value="Kohima">Kohima</option>
                  <option value="Dimapur">Dimapur</option>
                  <option value="Mokokchung">Mokokchung</option>
                  <option value="Imphal East">Imphal East</option>
                  <option value="Aizawl">Aizawl</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">Symptoms</label>
                <Input
                  value={newPatient.symptoms}
                  onChange={(e) => setNewPatient({...newPatient, symptoms: e.target.value})}
                  placeholder="Describe symptoms"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm mb-2">Suspected Diseases</label>
                <Input
                  value={newPatient.diseases}
                  onChange={(e) => setNewPatient({...newPatient, diseases: e.target.value})}
                  placeholder="Enter suspected diseases"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setShowAddPatient(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                onAddPatient(newPatient);
                setShowAddPatient(false);
                setNewPatient({
                  name: '', age: '', gender: 'Male', phone: '', email: '',
                  village: '', district: '', diseases: '', symptoms: ''
                });
              }}>
                Add Patient
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* New Report Modal */}
      {showNewReport && (
        <Dialog open={showNewReport} onOpenChange={setShowNewReport}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-blue-600" />
                <span>Create New Health Report</span>
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm mb-2">Report Title *</label>
                <Input
                  value={newReport.title}
                  onChange={(e) => setNewReport({...newReport, title: e.target.value})}
                  placeholder="Enter report title"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">District *</label>
                <select 
                  value={newReport.district}
                  onChange={(e) => setNewReport({...newReport, district: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Select District</option>
                  <option value="Kohima">Kohima</option>
                  <option value="Dimapur">Dimapur</option>
                  <option value="Mokokchung">Mokokchung</option>
                  <option value="Imphal East">Imphal East</option>
                  <option value="Aizawl">Aizawl</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">Reporter Name *</label>
                <Input
                  value={newReport.reporter}
                  onChange={(e) => setNewReport({...newReport, reporter: e.target.value})}
                  placeholder="Enter reporter name"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Report Type *</label>
                <select 
                  value={newReport.type}
                  onChange={(e) => setNewReport({...newReport, type: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="surveillance">Surveillance</option>
                  <option value="assessment">Assessment</option>
                  <option value="investigation">Investigation</option>
                  <option value="intervention">Intervention</option>
                  <option value="survey">Survey</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2">Number of Cases</label>
                <Input
                  type="number"
                  value={newReport.cases}
                  onChange={(e) => setNewReport({...newReport, cases: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Severity Level</label>
                <select 
                  value={newReport.severity}
                  onChange={(e) => setNewReport({...newReport, severity: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm mb-2">Description</label>
                <textarea
                  value={newReport.description}
                  onChange={(e) => setNewReport({...newReport, description: e.target.value})}
                  placeholder="Enter detailed description of the report"
                  className="w-full px-3 py-2 border rounded-md h-24"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setShowNewReport(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                onAddHealthReport(newReport);
                setShowNewReport(false);
                setNewReport({
                  title: '', district: '', reporter: '', type: 'surveillance',
                  cases: '', severity: 'low', description: ''
                });
              }}>
                Create Report
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}


    </div>
  );
}