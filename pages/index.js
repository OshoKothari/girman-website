import { useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter from next/router
import axios from 'axios';
import EmployeeCard from '../components/EmployeeCard';
import Image from 'next/image';
import image from '../public/image.png'; // Path to your large image
import { FaSearch } from 'react-icons/fa'; // Importing the search icon

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter(); // Initialize router

  // Function to trigger the search and navigate to results page
  const handleSearch = async () => {
    if (!searchTerm) return;
    
    // Redirect to search results page with query parameter
    router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  // Function to handle the Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-100 to-sky-300">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-6 px-8 flex items-center justify-center h-24">
        <div className="flex justify-between items-center w-full max-w-5xl">
          <div className="flex items-center cursor-pointer" onClick={() => router.push('/')}>
            <Image src="/logo.svg" alt="Girman Technologies Logo" width={150} height={50} />
          </div>
          <div className="flex gap-8 items-center">
            <a href="/" className="nav-link">Search</a>
            <a href="https://girmantech.com" target="_blank" rel="noopener noreferrer" className="nav-link">Website</a>
            <a href="https://www.linkedin.com/company/girman-technologies" target="_blank" rel="noopener noreferrer" className="nav-link">LinkedIn</a>
            <a href="mailto:contact@girmantech.com" className="nav-link">Contact</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        {/* Large Image */}
        <div className="flex justify-center mb-12">
          <Image src={image} alt="Search Image" width={1000} height={500} />
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-4xl"> {/* Adjusted width to max-w-4xl for a longer box */}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown} // Handle "Enter" key press
              placeholder="Search"
              className="w-full p-3 pl-12 text-lg border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </main>
    </div>
  );
}
