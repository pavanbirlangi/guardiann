
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface BookingWidgetProps {
  institution: any;
  category: string;
  id: string;
}

const BookingWidget: React.FC<BookingWidgetProps> = ({ institution, category, id }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm relative z-30">
      <h2 className="text-xl font-semibold mb-4">Book a Visit</h2>
      <p className="text-gray-600 mb-6">
        Schedule a visit to {institution.name} to learn more about the programs and facilities.
      </p>
      
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-medium mb-3">Booking Fee</h3>
        <p className="text-2xl font-bold text-education-700">₹2,000</p>
        <p className="text-sm text-gray-600 mt-1">
          This amount is adjustable against admission fees.
        </p>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center">
          <Check className="w-5 h-5 text-green-500 mr-2" />
          <span className="text-sm">Personalized campus tour</span>
        </div>
        <div className="flex items-center">
          <Check className="w-5 h-5 text-green-500 mr-2" />
          <span className="text-sm">Meet with faculty members</span>
        </div>
        <div className="flex items-center">
          <Check className="w-5 h-5 text-green-500 mr-2" />
          <span className="text-sm">Personalized campus tour</span>
        </div>
        <div className="flex items-center">
          <Check className="w-5 h-5 text-green-500 mr-2" />
          <span className="text-sm">Admission counseling</span>
        </div>
      </div>
      
      <Link to={`/book/${category}/${id}`} className="w-full">
        <Button size="lg" className="w-full">
          Book Your Slot
        </Button>
      </Link>
      
      <p className="text-xs text-gray-500 text-center mt-4">
        Limited slots available. Book now to secure your spot.
      </p>
    </div>
  );
};

export default BookingWidget;
