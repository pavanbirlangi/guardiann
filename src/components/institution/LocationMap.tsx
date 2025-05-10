
import React from "react";

interface LocationMapProps {
  address: string;
  city: string;
  state: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ address, city, state }) => {
  // In a real application, you would use a mapping service like Google Maps or Mapbox
  // For now, we'll simulate a map with a placeholder
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Location</h2>
      <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-gray-300" style={{ backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+555555(77.2090,28.6139)/77.2090,28.6139,12,0/400x200?access_token=pk.placeholder')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-2 rounded-full shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-600">
        {address}, {city}, {state}
      </p>
    </div>
  );
};

export default LocationMap;
