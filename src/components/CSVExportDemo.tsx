import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Download } from 'lucide-react';
import { exportToCSV, exportPatientsToCSV, exportReportsToCSV, exportWaterQualityToCSV } from './utils/csvExport';

// Demo data for testing
const samplePatients = [
  {
    id: 'PT001',
    name: 'John Doe',
    age: 35,
    gender: 'Male',
    phone: '+91 9876543210',
    email: 'john@example.com',
    village: 'Test Village',
    district: 'Test District',
    status: 'completed',
    registeredDate: '2024-01-10',
    lastVisit: '2024-01-20',
    diseases: [{ name: 'Typhoid', status: 'recovered' }],
    prescriptions: [{ status: 'completed' }],
    followUps: [{ date: '2024-01-15', notes: 'Test notes' }]
  }
];

const sampleReports = [
  {
    id: 'HR001',
    title: 'Test Health Report',
    district: 'Test District',
    reporter: 'Dr. Test',
    date: '2024-01-15',
    status: 'completed',
    cases: 10,
    severity: 'medium',
    type: 'surveillance'
  }
];

const sampleWaterSources = [
  {
    id: 'WS001',
    name: 'Test Well',
    location: 'Test Location',
    status: 'safe',
    lastTested: '2 hours ago',
    ph: 7.1,
    turbidity: 2.3,
    bacteria: 'none',
    temperature: 22.1,
    quality: 'good',
    riskLevel: 'low'
  }
];

export function CSVExportDemo() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>CSV Export Test Demo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={() => exportPatientsToCSV(samplePatients, { filename: 'test_patients.csv' })}
          className="w-full"
        >
          <Download className="w-4 h-4 mr-2" />
          Test Export Patients
        </Button>
        
        <Button 
          onClick={() => exportReportsToCSV(sampleReports, { filename: 'test_reports.csv' })}
          className="w-full"
        >
          <Download className="w-4 h-4 mr-2" />
          Test Export Reports
        </Button>
        
        <Button 
          onClick={() => exportWaterQualityToCSV(sampleWaterSources, { filename: 'test_water_quality.csv' })}
          className="w-full"
        >
          <Download className="w-4 h-4 mr-2" />
          Test Export Water Quality
        </Button>
        
        <Button 
          onClick={() => {
            const testData = [
              { name: 'Test Item 1', value: 100, category: 'A' },
              { name: 'Test Item 2', value: 200, category: 'B' }
            ];
            exportToCSV(testData, { filename: 'test_general.csv' });
          }}
          className="w-full"
        >
          <Download className="w-4 h-4 mr-2" />
          Test General Export
        </Button>
      </CardContent>
    </Card>
  );
}