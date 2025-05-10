import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Calendar, Check, Download, User } from "lucide-react";

// Mock booking data
const mockBookings = [
  {
    id: "SSC12345",
    institutionName: "Greenfield International School",
    category: "schools",
    institutionId: 1,
    status: "confirmed",
    bookingDate: "2025-05-07",
    visitDate: "2025-05-10",
    visitTime: "10:00 AM",
    amount: "₹2,000",
    thumbnail: "https://images.unsplash.com/photo-1613896640137-bb5b31496315?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "SSC34567",
    institutionName: "National Institute of Technology",
    category: "colleges",
    institutionId: 1,
    status: "pending",
    bookingDate: "2025-05-06",
    visitDate: "2025-05-12",
    visitTime: "02:00 PM",
    amount: "₹2,000",
    thumbnail: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "SSC56789",
    institutionName: "Indian Institute of Management",
    category: "pg-colleges",
    institutionId: 1,
    status: "confirmed",
    bookingDate: "2025-04-30",
    visitDate: "2025-05-15",
    visitTime: "11:30 AM",
    amount: "₹2,000",
    thumbnail: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  },
];

const UserDashboard = () => {
  const { user, isAuthenticated, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("bookings");
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  
  useEffect(() => {
    console.log('Dashboard - Auth state:', { isAuthenticated, user });
    if (user) {
      setUserProfile({
        name: user.name,
        email: user.email,
        phone: userProfile.phone,
        address: userProfile.address,
      });
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated || !user) {
    console.log('Dashboard - Not authenticated, redirecting...');
    navigate('/auth');
    return null;
  }
  
  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged Out Successfully",
        description: "You have been logged out of your account",
      });
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout Failed",
        description: "An error occurred while logging out",
        variant: "destructive",
      });
    }
  };
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update user profile in localStorage
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        const updatedUser = { ...user, ...userProfile };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        
        toast({
          title: "Profile Updated",
          description: "Your profile has been updated successfully",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update Failed",
        description: "An error occurred while updating your profile",
        variant: "destructive",
      });
    }
  };
  
  const handleViewBooking = (bookingId: string, category: string, institutionId: number) => {
    navigate(`/booking-confirmation/${category}/${institutionId}`);
  };
  
  const getStatusBadge = (status: string) => {
    if (status === "confirmed") {
      return <Badge className="bg-green-500">Confirmed</Badge>;
    } else if (status === "pending") {
      return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Pending</Badge>;
    } else {
      return <Badge variant="secondary">Unknown</Badge>;
    }
  };
  
  return (
    <Layout>
      <div className="bg-gray-50 py-12">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <div className="w-full md:w-64">
                <Card className="mb-6">
                  <CardHeader>
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 bg-education-100 rounded-full flex items-center justify-center mb-4">
                        <User className="h-10 w-10 text-education-600" />
                      </div>
                      <CardTitle className="text-xl">{user.name}</CardTitle>
                      <CardDescription className="text-sm">{user.email}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
                
                <div className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start ${activeTab === "bookings" ? "bg-gray-100" : ""}`}
                    onClick={() => setActiveTab("bookings")}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    My Bookings
                  </Button>
                  <Button 
                    variant="ghost" 
                    className={`w-full justify-start ${activeTab === "profile" ? "bg-gray-100" : ""}`}
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start mt-6 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </div>
              
              {/* Main Content */}
              <div className="flex-1">
                <Card>
                  <CardHeader>
                    <CardTitle>{activeTab === "bookings" ? "My Bookings" : "My Profile"}</CardTitle>
                    <CardDescription>
                      {activeTab === "bookings" ? 
                        "Manage your institution visit bookings" : 
                        "Manage your personal information"
                      }
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {activeTab === "bookings" ? (
                      <div>
                        {mockBookings.length > 0 ? (
                          <div className="space-y-4">
                            {mockBookings.map((booking) => (
                              <div key={booking.id} className="border rounded-lg p-4">
                                <div className="flex flex-col md:flex-row gap-4">
                                  <img
                                    src={booking.thumbnail}
                                    alt={booking.institutionName}
                                    className="w-full md:w-24 h-24 object-cover rounded"
                                  />
                                  <div className="flex-1">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                                      <h3 className="font-semibold text-lg">{booking.institutionName}</h3>
                                      {getStatusBadge(booking.status)}
                                    </div>
                                    <div className="text-sm text-gray-600 mb-2">
                                      <p><span className="font-medium">Booking ID:</span> {booking.id}</p>
                                      <p><span className="font-medium">Visit Date:</span> {booking.visitDate} at {booking.visitTime}</p>
                                      <p><span className="font-medium">Amount:</span> {booking.amount}</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                      <Button
                                        size="sm"
                                        className="flex items-center gap-1"
                                        onClick={() => handleViewBooking(booking.id, booking.category, booking.institutionId)}
                                      >
                                        View Details
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="flex items-center gap-1"
                                      >
                                        <Download className="h-4 w-4" /> Receipt
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                            <h3 className="text-lg font-medium mb-2">No Bookings Yet</h3>
                            <p className="text-gray-500 mb-4">You haven't made any bookings yet.</p>
                            <Button onClick={() => navigate("/categories")}>
                              Explore Institutions
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input 
                              id="name"
                              value={userProfile.name}
                              onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email"
                              type="email"
                              value={userProfile.email}
                              onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                              readOnly
                              disabled
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input 
                              id="phone"
                              value={userProfile.phone}
                              onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input 
                              id="address"
                              value={userProfile.address}
                              onChange={(e) => setUserProfile({...userProfile, address: e.target.value})}
                            />
                          </div>
                        </div>
                        <Button type="submit" className="mt-6">
                          <Check className="mr-2 h-4 w-4" /> Save Changes
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
