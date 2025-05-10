
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import the mock data
import { mockInstitutionsData } from "@/data/mockInstitutionsData";

// Import the refactored components
import InstitutionHeader from "@/components/institution/InstitutionHeader";
import InstitutionGallery from "@/components/institution/InstitutionGallery";
import AboutTab from "@/components/institution/AboutTab";
import CoursesTab from "@/components/institution/CoursesTab";
import InfrastructureTab from "@/components/institution/InfrastructureTab";
import FeesTab from "@/components/institution/FeesTab";
import BookingWidget from "@/components/institution/BookingWidget";
import LocationMap from "@/components/institution/LocationMap";

const InstitutionDetails = () => {
  const { category, id } = useParams<{category: string, id: string}>();
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (!category || !id || !mockInstitutionsData[category as keyof typeof mockInstitutionsData]) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Institution not found</h1>
          <p>The institution you are looking for doesn't exist.</p>
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
          <p>The institution you are looking for doesn't exist.</p>
          <Link to={`/categories/${category}`}>
            <Button className="mt-4">Back to Listing</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  // Handle image gallery
  const handleImageClick = (imageSrc: string | null) => {
    setActiveImage(imageSrc);
  };

  return (
    <Layout>
      {/* Institution header */}
      <InstitutionHeader
        name={institution!.name}
        address={institution!.address}
        rating={institution!.rating}
        category={category!}
        id={id!}
      />

      {/* Main content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Gallery and tabs */}
          <div className="lg:col-span-2">
            <InstitutionGallery
              thumbnail={institution!.thumbnail}
              gallery={institution!.gallery}
              name={institution!.name}
              activeImage={activeImage}
              onImageClick={handleImageClick}
            />

            <Tabs defaultValue="about">
              <TabsList className="mb-6">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
                <TabsTrigger value="fees">Fees</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about">
                <AboutTab
                  name={institution!.name}
                  description={institution!.description}
                  contact={institution!.contact}
                />
              </TabsContent>
              
              <TabsContent value="courses">
                <CoursesTab courses={institution!.courses} />
              </TabsContent>
              
              <TabsContent value="infrastructure">
                <InfrastructureTab infrastructure={institution!.infrastructure} />
              </TabsContent>
              
              <TabsContent value="fees">
                <FeesTab fees={institution!.fees} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right column - Booking widget and location */}
          <div className="relative">
            <div className="lg:sticky lg:top-20 space-y-6 z-20">
              <BookingWidget 
                institution={institution!}
                category={category!}
                id={id!}
              />
              
              <LocationMap
                address={institution!.address}
                city={institution!.city}
                state={institution!.state}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InstitutionDetails;
