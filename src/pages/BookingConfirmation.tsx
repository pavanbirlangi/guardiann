
import React from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Check, Download, Calendar } from "lucide-react";

// Mock data for institutions (simplified)
const mockInstitutionsData = {
  schools: [
    {
      id: 1,
      name: "Greenfield International School",
      address: "123 Education Lane, Delhi",
      thumbnail: "https://images.unsplash.com/photo-1613896640137-bb5b31496315?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
  ],
  colleges: [
    {
      id: 1,
      name: "National Institute of Technology",
      address: "101 College Road, Delhi",
      thumbnail: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
  ],
  coaching: [
    {
      id: 1,
      name: "Brilliant Tutorials",
      address: "303 Coaching Street, Delhi",
      thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
  ],
  "pg-colleges": [
    {
      id: 1,
      name: "Indian Institute of Management",
      address: "505 MBA Road, Bangalore",
      thumbnail: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
  ]
};

const BookingConfirmation = () => {
  const { category, id } = useParams<{category: string, id: string}>();
  
  if (!category || !id || !mockInstitutionsData[category as keyof typeof mockInstitutionsData]) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Booking not found</h1>
          <p>We couldn't find details for this booking.</p>
          <Link to="/categories">
            <Button className="mt-4">Back to Categories</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const institutions = mockInstitutionsData[category as keyof typeof mockInstitutionsData];
  const institution = institutions.find(inst => inst.id === Number(id));

  if (!institution) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Booking not found</h1>
          <p>We couldn't find details for this booking.</p>
          <Link to={`/categories/${category}`}>
            <Button className="mt-4">Back to Listing</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  // Generate random booking details
  const bookingId = "SSC" + Math.floor(10000 + Math.random() * 90000);
  const bookingDate = new Date();
  const visitDate = new Date();
  visitDate.setDate(bookingDate.getDate() + 3); // Visit date 3 days from now

  return (
    <Layout>
      <div className="bg-gray-50 py-12">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Success header */}
              <div className="bg-green-50 p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-green-800 mb-2">Booking Confirmed!</h1>
                <p className="text-green-700">
                  Your visit to {institution.name} has been successfully scheduled.
                </p>
              </div>
              
              {/* Booking details */}
              <div className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <img
                    src={institution.thumbnail}
                    alt={institution.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="font-semibold text-xl">{institution.name}</h2>
                    <p className="text-gray-600 text-sm">{institution.address}</p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm text-gray-500 mb-1">Booking ID</h3>
                      <p className="font-semibold">{bookingId}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500 mb-1">Booking Date</h3>
                      <p>{bookingDate.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500 mb-1">Visit Date</h3>
                      <p>{visitDate.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500 mb-1">Visit Time</h3>
                      <p>10:00 AM</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500 mb-1">Amount Paid</h3>
                      <p className="font-semibold">₹2,000</p>
                    </div>
                    <div>
                      <h3 className="text-sm text-gray-500 mb-1">Payment Status</h3>
                      <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        Successful
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium mb-2">What's Next?</h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span>You will receive a confirmation email with your booking details.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span>Our representative will contact you 24 hours before your scheduled visit.</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span>Please carry your booking ID and a valid ID proof during your visit.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Receipt
                  </Button>
                  <Button className="flex items-center gap-2" variant="outline">
                    <Calendar className="h-4 w-4" />
                    Add to Calendar
                  </Button>
                </div>
              </div>
              
              {/* Footer */}
              <div className="border-t p-6">
                <p className="text-center text-gray-600 text-sm mb-4">
                  Thank you for choosing SchoolSeeker Connect.
                </p>
                <div className="text-center">
                  <Link to="/">
                    <Button variant="link">
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingConfirmation;
