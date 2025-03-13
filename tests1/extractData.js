const xlsx = require('xlsx');
const fs = require('fs');

// Path to the Excel file
const filePath = './tests/allEmail.xlsx';  // Update with your actual file path
const columnIndex = 3; // Column index (0-based) to extract data

// Read the Excel file
const workbook = xlsx.readFile(filePath);
const sheetName = workbook.SheetNames[0]; // Get the first sheet
const worksheet = workbook.Sheets[sheetName];

// Convert sheet to JSON format
const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

// Extract data from the specified column
const extractedData = jsonData.map(row => row[columnIndex]).filter(value => value !== undefined);

// Convert data to string format
const extractedText = extractedData.join('\n');

// Write extracted data to a .txt file
fs.writeFileSync('extracted_data.txt', extractedText, 'utf8');

console.log('Data successfully extracted and saved to extracted_data.txt');
