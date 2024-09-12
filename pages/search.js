import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeCard from '../components/EmployeeCard';
import NoResults from '../components/NoResults'; // Import NoResults component
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa'; // Importing the search icon

export default function SearchResults() {
  const router = useRouter();
  const { query } = router.query;
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/employees?query=${encodeURIComponent(query)}`);
          setEmployees(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    } else {
      setEmployees([]); // Clear employees when query is empty
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-200 to-sky-400">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-8 px-10 flex items-center h-24">
        <div className="flex items-center mr-8 cursor-pointer" onClick={() => router.push('/')}>
          <Image src="/logo.svg" alt="Girman Technologies Logo" width={180} height={70} />
        </div>
        <div className="relative flex-grow max-w-lg ml-auto">
          <input
            type="text"
            value={query || ''}
            onChange={(e) => router.push(`/search?query=${encodeURIComponent(e.target.value)}`)}
            placeholder="Search"
            className="w-full p-4 pl-14 text-lg border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        {/* Display prompt if query is empty */}
        {!query && (
          <div className="text-center text-gray-700">
            <p className="text-lg font-semibold">Enter employee name to fetch details...</p>
          </div>
        )}

        {/* Display the search term */}
        {query && employees.length === 0 && (
          <NoResults /> // Render NoResults component when no results are found
        )}

        {/* Display search results if there are any */}
        {query && employees.length > 0 && (
          <div>
            <h1 className="text-center text-2xl font-semibold mb-6">
              Search Results for: {query}
            </h1>

            {/* Search Results */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {employees.map((employee) => (
                <EmployeeCard key={employee._id} employee={employee} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
