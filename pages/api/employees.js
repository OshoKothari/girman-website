import mongoose from 'mongoose';

const connectMongo = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI);
};

// Update schema to match provided data structure
const employeeSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  city: String,
  contact_number: String
});

const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);

export default async function handler(req, res) {
  await connectMongo();

  const { query } = req.query;

  if (!query) {
    res.status(400).json({ error: 'Query parameter is required' });
    return;
  }

  // Trim the query string to remove leading/trailing spaces
  const trimmedQuery = query.trim();

  try {
    // First check if there's a match in the first_name field
    const firstNameMatches = await Employee.find({
      first_name: { $regex: `^${trimmedQuery}`, $options: 'i' }
    });

    // If there are matches in first_name, return them
    if (firstNameMatches.length > 0) {
      res.status(200).json(firstNameMatches);
      return;
    }

    // If no matches in first_name, check last_name
    const lastNameMatches = await Employee.find({
      last_name: { $regex: `^${trimmedQuery}`, $options: 'i' }
    });

    res.status(200).json(lastNameMatches);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
}
