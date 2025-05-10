
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface InstitutionHeaderProps {
  name: string;
  address: string;
  rating: number;
  category: string;
  id: string;
}

const InstitutionHeader: React.FC<InstitutionHeaderProps> = ({
  name,
  address,
  rating,
  category,
  id,
}) => {
  return (
    <div className="bg-education-700 text-white py-8">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">{name}</h1>
            <div className="flex items-center mt-2">
              <MapPin className="w-4 h-4 mr-1" />
              <p>{address}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="bg-white text-education-700 px-3 py-1 rounded-full font-semibold flex items-center">
              <span>{rating}</span>
              <span className="ml-1 text-yellow-500">★</span>
            </span>
            <Link to={`/book/${category}/${id}`}>
              <Button size="lg" className="bg-white text-education-700 hover:bg-gray-100">
                Book a Slot
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionHeader;
