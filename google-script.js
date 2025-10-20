// Copy this code to your Google Apps Script project
// Deploy as Web App with these settings:
// - Execute as: Me
// - Who has access: Anyone

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Prepare row data
    const rowData = [
      new Date().toISOString(),
      data.name || '',
      data.mobile || '',
      data.dob || '',
      data.gender || '',
      data.employmentType || '',
      data.companyName || '',
      data.monthlyIncome || '',
      data.houseType || '',
      JSON.stringify(data.familyMembers || []),
      data.twoWheelersCount || 0,
      JSON.stringify(data.twoWheelerInsurance || {}),
      data.fourWheelersCount || 0,
      JSON.stringify(data.fourWheelerInsurance || {}),
      JSON.stringify(data.healthInsurance || {}),
      JSON.stringify(data.termInsurance || {}),
      JSON.stringify(data.lifeInsurance || {}),
      JSON.stringify(data.loans || {}),
      JSON.stringify(data.creditCards || {}),
      data.financialScore || 0
    ];
    
    // Append row to sheet
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Data saved successfully',
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString(),
      timestamp: new Date().toISOString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'Google Apps Script is working correctly',
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

// Optional: Function to set up the sheet with headers
function setupSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  const headers = [
    'Timestamp',
    'Name',
    'Mobile',
    'Date of Birth',
    'Gender',
    'Employment Type',
    'Company Name',
    'Monthly Income',
    'House Type',
    'Family Members',
    '2-Wheelers Count',
    '2-Wheeler Insurance',
    '4-Wheelers Count',
    '4-Wheeler Insurance',
    'Health Insurance',
    'Term Insurance',
    'Life Insurance',
    'Loans',
    'Credit Cards',
    'Financial Score'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.setFrozenRows(1);
}