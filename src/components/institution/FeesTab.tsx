
import React from "react";

interface FeesTabProps {
  fees: Record<string, string>;
}

const FeesTab: React.FC<FeesTabProps> = ({ fees }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Fee Structure</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-4 border">Course/Level</th>
              <th className="text-left p-4 border">Fee</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(fees).map(([level, fee], index) => (
              <tr key={index} className={index % 2 ? 'bg-gray-50' : 'bg-white'}>
                <td className="p-4 border capitalize">{level.replace(/([A-Z])/g, ' $1').trim()}</td>
                <td className="p-4 border">{fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        * Additional fees may apply for extracurricular activities, transportation, and other services.
      </p>
    </div>
  );
};

export default FeesTab;
