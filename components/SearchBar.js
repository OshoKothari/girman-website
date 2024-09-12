import { useState } from 'react';
import axios from 'axios';
import EmployeeCard from '../components/EmployeeCard';
import NoResults from '../components/NoResults'; // Import the NoResults component

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [employees, setEmployees] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/employees?query=${query}`);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="search-container min-h-screen bg-gradient-to-b from-white via-sky-200 to-sky-400">
      <img src="/image.png" alt="Search" />
      <form onSubmit={handleSearch}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="search-bar"
          />
          <span className="search-icon">🔍</span>
        </div>
      </form>
      <div>
        {employees.length === 0 ? (
          <NoResults />
        ) : (
          employees.map((employee) => (
            <EmployeeCard key={employee._id} employee={employee} />
          ))
        )}
      </div>
    </div>
  );
}
