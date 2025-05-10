
import React from "react";

interface InfrastructureTabProps {
  infrastructure: string[];
}

const InfrastructureTab: React.FC<InfrastructureTabProps> = ({ infrastructure }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Infrastructure</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {infrastructure.map((item, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
            <h3 className="font-medium">{item}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfrastructureTab;
