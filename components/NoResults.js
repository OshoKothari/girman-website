import React from 'react';
import Image from 'next/image';

const NoResults = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white via-sky-200 to-sky-400">
      <div className="relative w-48 h-48"> {/* Container for image */}
        <Image
          src="/noresult.png" // Add your no-results image here
          alt="No Results"
          layout="fill" // Fills the container
          objectFit="contain" // Maintain aspect ratio
        />
      </div>
      <h2 className="text-2xl font-semibold mt-4 text-gray-800">
        No Results Found
      </h2>
      <p className="text-gray-600 mt-2">Try searching with a different keyword.</p>
    </div>
  );
};

export default NoResults;
