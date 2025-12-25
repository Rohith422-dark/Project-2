// Utility functions for CSV export functionality

export interface CSVExportOptions {
  filename?: string;
  headers?: string[];
  excludeFields?: string[];
}

/**
 * Converts array of objects to CSV format and triggers download
 */
export function exportToCSV<T extends Record<string, any>>(
  data: T[],
  options: CSVExportOptions = {}
): void {
  if (!data || data.length === 0) {
    alert('No data available to export');
    return;
  }

  const {
    filename = 'export.csv',
    headers,
    excludeFields = []
  } = options;

  // Get all unique keys from the data objects, excluding specified fields
  const allKeys = Array.from(
    new Set(
      data.flatMap(item => Object.keys(item))
    )
  ).filter(key => !excludeFields.includes(key));

  // Use provided headers or generate from data keys
  const csvHeaders = headers || allKeys.map(key => 
    key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
  );

  // Create CSV content
  const csvContent = [
    // Headers row
    csvHeaders.join(','),
    // Data rows
    ...data.map(item => 
      allKeys.map(key => {
        let value = item[key];
        
        // Handle different data types
        if (value === null || value === undefined) {
          value = '';
        } else if (typeof value === 'object') {
          // Handle arrays and objects
          if (Array.isArray(value)) {
            value = value.map(v => 
              typeof v === 'object' ? JSON.stringify(v) : v
            ).join('; ');
          } else {
            value = JSON.stringify(value);
          }
        } else if (typeof value === 'string' && value.includes(',')) {
          // Escape commas in strings
          value = `"${value.replace(/"/g, '""')}"`;
        }
        
        return value;
      }).join(',')
    )
  ].join('\n');

  // Create and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

/**
 * Export patient data with custom formatting
 */
export function exportPatientsToCSV(
  patients: any[],
  options: CSVExportOptions = {}
): void {
  const processedData = patients.map(patient => ({
    'Patient ID': patient.id,
    'Name': patient.name,
    'Age': patient.age,
    'Gender': patient.gender,
    'Phone': patient.phone,
    'Email': patient.email || 'N/A',
    'Village': patient.village,
    'District': patient.district,
    'Status': patient.status,
    'Registered Date': patient.registeredDate,
    'Last Visit': patient.lastVisit,
    'Diseases': patient.diseases?.map((d: any) => d.name).join('; ') || 'None',
    'Current Disease Status': patient.diseases?.map((d: any) => `${d.name}: ${d.status}`).join('; ') || 'None',
    'Active Prescriptions': patient.prescriptions?.filter((p: any) => p.status === 'ongoing').length || 0,
    'Total Follow-ups': patient.followUps?.length || 0
  }));

  exportToCSV(processedData, {
    filename: options.filename || `patients_export_${new Date().toISOString().split('T')[0]}.csv`
  });
}

/**
 * Export health reports data with custom formatting
 */
export function exportReportsToCSV(
  reports: any[],
  options: CSVExportOptions = {}
): void {
  const processedData = reports.map(report => ({
    'Report ID': report.id,
    'Title': report.title,
    'District': report.district,
    'Reporter': report.reporter,
    'Date': report.date,
    'Status': report.status,
    'Number of Cases': report.cases,
    'Severity': report.severity,
    'Type': report.type
  }));

  exportToCSV(processedData, {
    filename: options.filename || `health_reports_export_${new Date().toISOString().split('T')[0]}.csv`
  });
}

/**
 * Export water quality data with custom formatting
 */
export function exportWaterQualityToCSV(
  waterSources: any[],
  options: CSVExportOptions = {}
): void {
  const processedData = waterSources.map(source => ({
    'Source ID': source.id,
    'Name': source.name,
    'Location': source.location,
    'Status': source.status,
    'Last Tested': source.lastTested,
    'pH Level': source.ph,
    'Turbidity (NTU)': source.turbidity,
    'Bacteria': source.bacteria,
    'Temperature (°C)': source.temperature,
    'Quality Rating': source.quality,
    'Risk Level': source.riskLevel,
    'WHO pH Compliance': source.ph >= 6.5 && source.ph <= 8.5 ? 'Yes' : 'No',
    'WHO Turbidity Compliance': source.turbidity <= 5 ? 'Yes' : 'No'
  }));

  exportToCSV(processedData, {
    filename: options.filename || `water_quality_export_${new Date().toISOString().split('T')[0]}.csv`
  });
}