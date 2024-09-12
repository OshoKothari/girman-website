import { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

export default function EmployeeCard({ employee }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="card bg-white shadow-md rounded-lg p-6 m-4 hover:shadow-lg transition-shadow duration-300 max-w-xs relative">
      {/* Image Placeholder */}
      <img
        src="https://via.placeholder.com/50" // Placeholder for employee image
        alt="Profile"
        className="rounded-full w-16 h-16 mb-3 border-2 border-gray-300 transition-transform duration-300 hover:scale-110"
      />

      {/* Name */}
      <h2 className="text-xl font-bold mb-2 text-gray-800">
        {employee.first_name} {employee.last_name}
      </h2>

      {/* Address and Phone Number Section */}
      <div className="flex flex-col">
        {/* Location */}
        <div className="flex items-center mb-2">
          <FaMapMarkerAlt className="text-blue-500 mr-2" />
          <p className="text-sm text-gray-600">{employee.city}</p>
        </div>

        {/* Phone Number and Fetch Details */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <FaPhoneAlt className="text-blue-500 mr-2" />
            <p className="font-semibold text-gray-700">{employee.contact_number}</p>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-gray-800 text-white py-1 px-3 rounded-md hover:bg-gray-900 transition duration-300"
          >
            Fetch Details
          </button>
        </div>

        {/* Available on Phone */}
        <p className="text-sm text-gray-500">Available on phone</p>
      </div>

      {/* Modal for Fetch Details */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto relative">
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              Fetch Details
            </h3>
            <p className="mb-4 text-gray-700">
              Here are the details of the following employee.
            </p>
            <div className="flex flex-col items-start mb-4">
              {/* Employee Details */}
              <p className="text-lg font-semibold text-gray-800 mb-2">
                Name: {employee.first_name} {employee.last_name}
              </p>
              <p className="text-lg text-gray-700 mb-2">
                Location: {employee.city}
              </p>
              <p className="text-lg text-gray-700 mb-2">
                Contact Number: {employee.contact_number}
              </p>
              {/* Profile Image */}
              <div className="w-full flex justify-center mt-4">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="w-32 h-32 rounded-lg object-cover"
                />
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition duration-300 absolute bottom-4 right-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
