
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "lucide-react";

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

const BookingPage = () => {
  const { category, id } = useParams<{category: string, id: string}>();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    notes: "",
    termsAccepted: false,
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  if (!category || !id || !mockInstitutionsData[category as keyof typeof mockInstitutionsData]) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Institution not found</h1>
          <p>The institution you are trying to book doesn't exist.</p>
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
          <h1 className="text-2xl font-bold mb-4">Institution not found</h1>
          <p>The institution you are trying to book doesn't exist.</p>
          <Link to={`/categories/${category}`}>
            <Button className="mt-4">Back to Listing</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      errors.phone = "Please enter a valid 10-digit phone number";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!formData.date) {
      errors.date = "Date is required";
    }
    
    if (!formData.time) {
      errors.time = "Time is required";
    }
    
    if (!formData.termsAccepted) {
      errors.termsAccepted = "You must agree to the terms and conditions";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real application, we would handle payment processing here
      console.log("Form submitted:", formData);
      // Navigate to confirmation page
      navigate(`/booking-confirmation/${category}/${id}`);
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Book a Visit</h1>
              <p className="text-gray-600">
                Complete the form below to schedule your visit to {institution.name}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className={formErrors.name ? "border-red-500" : ""}
                        />
                        {formErrors.name && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="10-digit mobile number"
                            className={formErrors.phone ? "border-red-500" : ""}
                          />
                          {formErrors.phone && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your@email.com"
                            className={formErrors.email ? "border-red-500" : ""}
                          />
                          {formErrors.email && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="date">Preferred Date</Label>
                          <div className="relative">
                            <Input
                              id="date"
                              name="date"
                              type="date"
                              value={formData.date}
                              onChange={handleInputChange}
                              className={formErrors.date ? "border-red-500" : ""}
                              min={new Date().toISOString().split('T')[0]}
                            />
                          </div>
                          {formErrors.date && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.date}</p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="time">Preferred Time</Label>
                          <Input
                            id="time"
                            name="time"
                            type="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            className={formErrors.time ? "border-red-500" : ""}
                          />
                          {formErrors.time && (
                            <p className="text-red-500 text-sm mt-1">{formErrors.time}</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="notes">Additional Notes (Optional)</Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          placeholder="Any specific queries or requirements"
                          rows={3}
                        />
                      </div>
                      
                      <div className="border-t pt-6">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="termsAccepted"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleCheckboxChange}
                            className="h-4 w-4 text-education-600 focus:ring-education-500 border-gray-300 rounded mr-2"
                          />
                          <Label htmlFor="termsAccepted" className="text-sm">
                            I agree to the <a href="#" className="text-education-600 hover:underline">terms and conditions</a>
                          </Label>
                        </div>
                        {formErrors.termsAccepted && (
                          <p className="text-red-500 text-sm mt-1">{formErrors.termsAccepted}</p>
                        )}
                      </div>
                      
                      <Button type="submit" className="w-full">
                        Proceed to Payment (₹2,000)
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
              
              <div>
                <div className="bg-white p-6 rounded-lg shadow-sm sticky top-20">
                  <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
                  
                  <div className="mb-4">
                    <img
                      src={institution.thumbnail}
                      alt={institution.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                  
                  <h3 className="font-medium">{institution.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{institution.address}</p>
                  
                  <div className="border-t border-b py-4 my-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Booking Fee</span>
                      <span className="font-semibold">₹2,000</span>
                    </div>
                    <p className="text-xs text-gray-500">This amount is adjustable against admission fees</p>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-4">
                    <p className="mb-2">Your booking includes:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Guided campus tour</li>
                      <li>Meeting with faculty</li>
                      <li>Admission consultation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
