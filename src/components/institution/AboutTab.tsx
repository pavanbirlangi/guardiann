
import React from "react";
import { Phone, Mail, Globe, Clock } from "lucide-react";

interface AboutTabProps {
  name: string;
  description: string;
  contact: {
    phone: string;
    email: string;
    website: string;
  };
}

const AboutTab: React.FC<AboutTabProps> = ({ name, description, contact }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">About {name}</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        {description}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Contact Information</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2 text-education-600" />
              <span>{contact.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-education-600" />
              <span>{contact.email}</span>
            </div>
            <div className="flex items-center">
              <Globe className="w-4 h-4 mr-2 text-education-600" />
              <span>{contact.website}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-3">Visiting Hours</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-education-600" />
              <span>Monday - Friday: 9:00 AM - 5:00 PM</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-education-600" />
              <span>Saturday: 9:00 AM - 1:00 PM</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-education-600" />
              <span>Sunday: Closed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;
