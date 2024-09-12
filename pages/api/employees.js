import path from 'path';
import fs from 'fs';

// Define the path to the JSON file
const dataFilePath = path.join(process.cwd(), 'data', 'user.json');

// Helper function to read data from the JSON file
const readDataFromFile = () => {
  const fileContents = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(fileContents);
};

export default function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    res.status(400).json({ error: 'Query parameter is required' });
    return;
  }

  // Trim the query string to remove leading/trailing spaces
  const trimmedQuery = query.trim().toLowerCase();

  try {
    // Read data from the JSON file
    const employees = readDataFromFile();

    // Filter employees based on the query
    const filteredEmployees = employees.filter(employee =>
      employee.first_name.toLowerCase().startsWith(trimmedQuery) ||
      employee.last_name.toLowerCase().startsWith(trimmedQuery)
    );

    res.status(200).json(filteredEmployees);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
}
