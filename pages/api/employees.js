import mongoose from 'mongoose';

// MongoDB connection function
const connectMongo = async () => {
  if (mongoose.connections[0].readyState) return; // If already connected, do nothing
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// Define employee schema
const employeeSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  city: { type: String, required: true },
  contact_number: { type: String, required: true },
});

// Use existing model if it exists, otherwise create a new one
const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);

export default async function handler(req, res) {
  // Connect to MongoDB
  await connectMongo();

  const { query } = req.query;

  // Check if the query parameter is provided
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  // Trim query to remove leading/trailing spaces
  const trimmedQuery = query.trim();

  try {
    // First, try to match the first_name
    const firstNameMatches = await Employee.find({
      first_name: { $regex: `^${trimmedQuery}`, $options: 'i' }, // Case-insensitive matching
    });

    // If matches found in first_name, return the results
    if (firstNameMatches.length > 0) {
      return res.status(200).json(firstNameMatches);
    }

    // If no matches in first_name, try last_name
    const lastNameMatches = await Employee.find({
      last_name: { $regex: `^${trimmedQuery}`, $options: 'i' }, // Case-insensitive matching
    });

    // Return the results from last_name matches (could be an empty array)
    return res.status(200).json(lastNameMatches);
  } catch (error) {
    // Handle errors (e.g., database connection or query issues)
    console.error('Error fetching data:', error);
    return res.status(500).json({ error: 'Error fetching data' });
  }
}
