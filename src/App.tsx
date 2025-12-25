import React, { useState } from 'react';
import { Login } from './components/Login';
import { CommunityDashboard } from './components/CommunityDashboard';
import { Sidebar } from './components/Sidebar';
import { DashboardContent } from './components/DashboardContent';
import { HealthReports } from './components/HealthReports';
import { WaterQuality } from './components/WaterQuality';
import { ActiveAlerts } from './components/ActiveAlerts';
import { Interventions } from './components/Interventions';
import { AIAssistant } from './components/AIAssistant';
import { CommunityReporting } from './components/CommunityReporting';
import { AnalyticsPanel } from './components/AnalyticsPanel';
import { Education } from './components/Education';

const initialAlerts = [
  {
    id: 'ALT001',
    type: 'Water Contamination',
    location: 'Mokokchung District',
    severity: 'high',
    status: 'active',
    description: 'High bacterial content detected in village well. Immediate action required.',
    timestamp: '2024-01-15 14:30',
    assignedTo: 'Dr. Rajesh Kumar',
    responses: 2,
    escalated: false,
    affectedPopulation: 450,
    createdAt: new Date('2024-01-15T14:30:00')
  },
  {
    id: 'ALT002',
    type: 'Disease Outbreak',
    location: 'Kohima Village',
    severity: 'medium',
    status: 'investigating',
    description: 'Multiple cases of diarrhea reported. Investigation team deployed.',
    timestamp: '2024-01-15 12:15',
    assignedTo: 'ASHA Worker - Maya Devi',
    responses: 1,
    escalated: false,
    affectedPopulation: 230,
    createdAt: new Date('2024-01-15T12:15:00')
  },
  {
    id: 'ALT003',
    type: 'Emergency Response',
    location: 'Imphal East',
    severity: 'high',
    status: 'active',
    description: 'Cholera outbreak confirmed. Emergency medical team needed.',
    timestamp: '2024-01-15 09:20',
    assignedTo: 'District Health Officer',
    responses: 5,
    escalated: true,
    affectedPopulation: 680,
    createdAt: new Date('2024-01-15T09:20:00')
  },
  {
    id: 'ALT004',
    type: 'Poor Water Quality',
    location: 'Dimapur Rural',
    severity: 'low',
    status: 'resolved',
    description: 'pH levels outside safe range. Water treatment applied.',
    timestamp: '2024-01-15 10:45',
    assignedTo: 'Water Quality Team',
    responses: 3,
    escalated: false,
    affectedPopulation: 120,
    createdAt: new Date('2024-01-15T10:45:00')
  }
];

const initialPatients = [
  {
    id: 'PT001',
    name: 'Rajesh Kumar',
    age: 45,
    gender: 'Male',
    phone: '+91 9876543210',
    email: 'rajesh.kumar@email.com',
    village: 'Kohima Village',
    district: 'Kohima',
    status: 'completed',
    registeredDate: '2024-01-10',
    lastVisit: '2024-01-20',
    diseases: [
      { name: 'Typhoid', diagnosedDate: '2024-01-12', status: 'recovered', severity: 'medium' },
      { name: 'Dehydration', diagnosedDate: '2024-01-12', status: 'recovered', severity: 'low' }
    ],
    prescriptions: [
      { 
        id: 'RX001', 
        medicine: 'Ciprofloxacin 500mg', 
        dosage: '2 times daily', 
        duration: '7 days',
        prescribedDate: '2024-01-12',
        status: 'completed'
      },
      { 
        id: 'RX002', 
        medicine: 'ORS Sachets', 
        dosage: '3 times daily', 
        duration: '5 days',
        prescribedDate: '2024-01-12',
        status: 'completed'
      }
    ],
    followUps: [
      { date: '2024-01-15', notes: 'Fever subsided, appetite improved', doctor: 'Dr. Maya Sharma' },
      { date: '2024-01-20', notes: 'Full recovery, no complications', doctor: 'Dr. Maya Sharma' }
    ]
  },
  {
    id: 'PT002',
    name: 'Anita Devi',
    age: 32,
    gender: 'Female',
    phone: '+91 9876543211',
    email: 'anita.devi@email.com',
    village: 'Dimapur Town',
    district: 'Dimapur',
    status: 'pending',
    registeredDate: '2024-01-18',
    lastVisit: '2024-01-22',
    diseases: [
      { name: 'Cholera', diagnosedDate: '2024-01-20', status: 'under_treatment', severity: 'high' },
      { name: 'Severe Dehydration', diagnosedDate: '2024-01-20', status: 'under_treatment', severity: 'medium' }
    ],
    prescriptions: [
      { 
        id: 'RX003', 
        medicine: 'Doxycycline 100mg', 
        dosage: '2 times daily', 
        duration: '10 days',
        prescribedDate: '2024-01-20',
        status: 'ongoing'
      },
      { 
        id: 'RX004', 
        medicine: 'IV Fluids', 
        dosage: 'As needed', 
        duration: '3 days',
        prescribedDate: '2024-01-20',
        status: 'ongoing'
      }
    ],
    followUps: [
      { date: '2024-01-22', notes: 'Patient responding to treatment, hydration improving', doctor: 'Dr. Rajesh Kumar' }
    ]
  },
  {
    id: 'PT003',
    name: 'Lokesh Singh',
    age: 28,
    gender: 'Male',
    phone: '+91 9876543212',
    email: 'lokesh.singh@email.com',
    village: 'Mokokchung Valley',
    district: 'Mokokchung',
    status: 'completed',
    registeredDate: '2024-01-05',
    lastVisit: '2024-01-16',
    diseases: [
      { name: 'Diarrhea', diagnosedDate: '2024-01-07', status: 'recovered', severity: 'low' }
    ],
    prescriptions: [
      { 
        id: 'RX005', 
        medicine: 'Loperamide 2mg', 
        dosage: '3 times daily', 
        duration: '3 days',
        prescribedDate: '2024-01-07',
        status: 'completed'
      },
      { 
        id: 'RX006', 
        medicine: 'Probiotics', 
        dosage: '1 capsule daily', 
        duration: '7 days',
        prescribedDate: '2024-01-07',
        status: 'completed'
      }
    ],
    followUps: [
      { date: '2024-01-10', notes: 'Symptoms resolved, bowel movements normal', doctor: 'ASHA Worker - Rita Devi' },
      { date: '2024-01-16', notes: 'Complete recovery confirmed', doctor: 'ASHA Worker - Rita Devi' }
    ]
  }
];

const initialHealthReports = [
  {
    id: 'HR001',
    title: 'Weekly Disease Surveillance Report',
    district: 'Mokokchung',
    reporter: 'Dr. Maya Sharma',
    date: '2024-01-15',
    status: 'completed',
    cases: 23,
    severity: 'medium',
    type: 'surveillance'
  },
  {
    id: 'HR002',
    title: 'Water Quality Impact Assessment',
    district: 'Kohima',
    reporter: 'ASHA Worker - Rita Devi',
    date: '2024-01-14',
    status: 'pending',
    cases: 15,
    severity: 'low',
    type: 'assessment'
  },
  {
    id: 'HR003',
    title: 'Outbreak Investigation Report',
    district: 'Imphal East',
    reporter: 'Health Inspector',
    date: '2024-01-13',
    status: 'under_review',
    cases: 34,
    severity: 'high',
    type: 'investigation'
  }
];

const initialInterventions = [
  {
    id: 'INT001',
    name: 'Water Treatment Program - Mokokchung',
    type: 'Water Treatment',
    status: 'active',
    startDate: '2024-01-10',
    endDate: '2024-02-10',
    location: 'Mokokchung District',
    progress: 75,
    effectiveness: 85,
    budget: 50000,
    beneficiaries: 1200,
    description: 'Comprehensive water treatment and distribution program'
  },
  {
    id: 'INT002',
    name: 'Community Health Education',
    type: 'Education',
    status: 'planning',
    startDate: '2024-01-20',
    endDate: '2024-03-20',
    location: 'Kohima Village',
    progress: 25,
    effectiveness: 70,
    budget: 30000,
    beneficiaries: 800,
    description: 'Educational outreach program for disease prevention'
  }
];

const initialEducationTutorials = [
  {
    id: 'EDU001',
    title: 'Water Purification Methods',
    description: 'Learn safe water treatment techniques at home',
    category: 'Water Safety',
    duration: '10 minutes',
    language: 'English',
    targetAudience: 'Community',
    createdDate: '2024-01-10',
    status: 'published'
  },
  {
    id: 'EDU002',
    title: 'Disease Prevention Basics',
    description: 'Essential hygiene practices for families',
    category: 'Health Education',
    duration: '15 minutes',
    language: 'Hindi',
    targetAudience: 'Community',
    createdDate: '2024-01-12',
    status: 'published'
  }
];

const initialTestResults = [
  {
    id: 'TEST001',
    location: 'Village Well - Kohima',
    testType: 'Water Quality',
    ph: 7.2,
    turbidity: 2.1,
    bacteria: 'Negative',
    chemicals: 'Within limits',
    date: '2024-01-15',
    status: 'completed',
    tester: 'Quality Control Team'
  },
  {
    id: 'TEST002',
    location: 'Community Center - Dimapur',
    testType: 'Disease Screening',
    results: 'No pathogens detected',
    date: '2024-01-14',
    status: 'completed',
    tester: 'Health Inspector'
  }
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<'admin' | 'resident' | null>(null);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [patients, setPatients] = useState(initialPatients);
  const [healthReports, setHealthReports] = useState(initialHealthReports);
  const [interventions, setInterventions] = useState(initialInterventions);
  const [educationTutorials, setEducationTutorials] = useState(initialEducationTutorials);
  const [testResults, setTestResults] = useState(initialTestResults);

  const handleLogin = (type: 'admin' | 'resident', data: any) => {
    setIsAuthenticated(true);
    setUserType(type);
    setUserData(data);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    setUserData(null);
    setActiveTab('dashboard');
  };

  const addAlert = (newAlert) => {
    const alertId = `ALT${String(alerts.length + 1).padStart(3, '0')}`;
    const timestamp = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    const alert = {
      ...newAlert,
      id: alertId,
      timestamp,
      status: 'active',
      responses: 0,
      escalated: false,
      affectedPopulation: Math.floor(Math.random() * 500) + 100, // Random for demo
      assignedTo: newAlert.severity === 'high' ? 'District Health Officer' : 'ASHA Worker',
      createdAt: new Date()
    };
    
    setAlerts(prev => [alert, ...prev]);
  };

  const updateAlert = (alertId, updates) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, ...updates } : alert
    ));
  };

  const addPatient = (newPatient) => {
    const patientId = `PT${String(patients.length + 1).padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];
    
    const patient = {
      ...newPatient,
      id: patientId,
      registeredDate: today,
      lastVisit: today,
      status: 'pending',
      diseases: newPatient.diseases ? [{ 
        name: newPatient.diseases, 
        diagnosedDate: today, 
        status: 'under_treatment', 
        severity: 'medium' 
      }] : [],
      prescriptions: [],
      followUps: []
    };
    
    setPatients(prev => [patient, ...prev]);
  };

  const addHealthReport = (newReport) => {
    const reportId = `HR${String(healthReports.length + 1).padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];
    
    const report = {
      ...newReport,
      id: reportId,
      date: today,
      status: 'pending',
      cases: parseInt(newReport.cases) || 0
    };
    
    setHealthReports(prev => [report, ...prev]);
  };

  const addIntervention = (newIntervention) => {
    const interventionId = `INT${String(interventions.length + 1).padStart(3, '0')}`;
    
    const intervention = {
      ...newIntervention,
      id: interventionId,
      progress: 0,
      effectiveness: 0,
      status: 'planning'
    };
    
    setInterventions(prev => [intervention, ...prev]);
  };

  const addEducationTutorial = (newTutorial) => {
    const tutorialId = `EDU${String(educationTutorials.length + 1).padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];
    
    const tutorial = {
      ...newTutorial,
      id: tutorialId,
      createdDate: today,
      status: 'published'
    };
    
    setEducationTutorials(prev => [tutorial, ...prev]);
  };

  const deleteEducationTutorial = (tutorialId) => {
    setEducationTutorials(prev => prev.filter(tutorial => tutorial.id !== tutorialId));
  };

  const addTestResult = (newTest) => {
    const testId = `TEST${String(testResults.length + 1).padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];
    
    const test = {
      ...newTest,
      id: testId,
      date: today,
      status: 'completed'
    };
    
    setTestResults(prev => [test, ...prev]);
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // Show community dashboard for residents
  if (userType === 'resident') {
    return (
      <CommunityDashboard 
        userData={userData} 
        onLogout={handleLogout}
        educationTutorials={educationTutorials}
      />
    );
  }

  // Show admin dashboard for health officials
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardContent 
            alerts={alerts} 
            patients={patients}
            healthReports={healthReports}
            interventions={interventions}
          />
        );
      case 'health-reports':
        return (
          <HealthReports 
            patients={patients}
            healthReports={healthReports}
            onAddPatient={addPatient}
            onAddHealthReport={addHealthReport}
          />
        );
      case 'water-quality':
        return <WaterQuality testResults={testResults} onAddTestResult={addTestResult} />;
      case 'active-alerts':
        return <ActiveAlerts alerts={alerts} onAddAlert={addAlert} onUpdateAlert={updateAlert} />;
      case 'interventions':
        return (
          <Interventions 
            interventions={interventions}
            onAddIntervention={addIntervention}
          />
        );
      case 'community':
        return <CommunityReporting />;
      case 'education':
        return (
          <Education 
            educationTutorials={educationTutorials}
            onAddTutorial={addEducationTutorial}
            onDeleteTutorial={deleteEducationTutorial}
            userType="admin"
          />
        );
      case 'analytics':
        return <AnalyticsPanel />;
      default:
        return (
          <DashboardContent 
            alerts={alerts} 
            patients={patients}
            healthReports={healthReports}
            interventions={interventions}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        userData={userData}
        onLogout={handleLogout}
      />
      
      <main className={`transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        {renderContent()}
      </main>
      
      <AIAssistant />
    </div>
  );
}