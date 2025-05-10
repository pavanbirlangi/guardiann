
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Search, Filter, Check } from "lucide-react";

// Mock data for institutions
const mockInstitutions = {
  schools: [
    {
      id: 1,
      name: "Greenfield International School",
      address: "123 Education Lane, Delhi",
      thumbnail: "https://images.unsplash.com/photo-1613896640137-bb5b31496315?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      fees: "₹80,000",
      rating: 4.7,
      city: "Delhi",
      type: "International"
    },
    {
      id: 2,
      name: "Summit Public School",
      address: "456 Learning Road, Mumbai",
      thumbnail: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      fees: "₹65,000",
      rating: 4.5,
      city: "Mumbai",
      type: "CBSE"
    },
    {
      id: 3,
      name: "Cambridge Academy",
      address: "789 Knowledge Avenue, Bangalore",
      thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      fees: "₹95,000",
      rating: 4.8,
      city: "Bangalore",
      type: "International"
    },
    {
      id: 4,
      name: "Excel Public School",
      address: "234 Education Street, Chennai",
      thumbnail: "https://images.unsplash.com/photo-1598812231682-36a66a049384?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      fees: "₹70,000",
      rating: 4.3,
      city: "Chennai",
      type: "State Board"
    }
  ],
  colleges: [
    {
      id: 1,
      name: "National Institute of Technology",
      address: "101 College Road, Delhi",
      thumbnail: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      fees: "₹1,25,000",
      rating: 4.9,
      city: "Delhi",
      type: "Engineering"
    },
    {
      id: 2,
      name: "St. Xavier's College",
      address: "202 University Lane, Mumbai",
      thumbnail: "https://images.unsplash.com/photo-1598812231682-36a66a049384?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      fees: "₹85,000",
      rating: 4.6,
      city: "Mumbai",
      type: "Arts & Science"
    },
  ],
  coaching: [
    {
      id: 1,
      name: "Brilliant Tutorials",
      address: "303 Coaching Street, Delhi",
      thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      fees: "₹45,000",
      rating: 4.5,
      city: "Delhi",
      type: "JEE/NEET"
    },
    {
      id: 2,
      name: "Excel Academy",
      address: "404 Training Road, Mumbai",
      thumbnail: "https://images.unsplash.com/photo-1522881193457-37ae97c905bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      fees: "₹35,000",
      rating: 4.4,
      city: "Mumbai",
      type: "UPSC"
    },
  ],
  "pg-colleges": [
    {
      id: 1,
      name: "Indian Institute of Management",
      address: "505 MBA Road, Bangalore",
      thumbnail: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      fees: "₹2,50,000",
      rating: 4.9,
      city: "Bangalore",
      type: "MBA"
    },
    {
      id: 2,
      name: "National Law School",
      address: "606 Masters Avenue, Delhi",
      thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      fees: "₹1,80,000",
      rating: 4.8,
      city: "Delhi",
      type: "Law"
    },
  ]
};

const categoryTitles = {
  schools: "Schools",
  colleges: "Colleges",
  coaching: "Coaching Centers",
  "pg-colleges": "Postgraduate Colleges"
};

const InstitutionListing = () => {
  const { category } = useParams<{category: string}>();
  const [filterOpen, setFilterOpen] = useState(false);
  const [cityFilter, setCityFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  if (!category || !mockInstitutions[category as keyof typeof mockInstitutions]) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
          <p>The category you are looking for doesn't exist.</p>
          <Link to="/categories">
            <Button className="mt-4">Back to Categories</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const institutions = mockInstitutions[category as keyof typeof mockInstitutions];
  const categoryTitle = categoryTitles[category as keyof typeof categoryTitles] || "Institutions";

  // Extract unique cities and types for filters
  const cities = [...new Set(institutions.map(inst => inst.city))];
  const types = [...new Set(institutions.map(inst => inst.type))];

  // Apply filters
  const filteredInstitutions = institutions.filter(inst => {
    if (cityFilter && inst.city !== cityFilter) return false;
    if (typeFilter && inst.type !== typeFilter) return false;
    return true;
  });

  // Clear all filters
  const clearFilters = () => {
    setCityFilter(null);
    setTypeFilter(null);
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-12">
        <div className="container">
          <h1 className="text-3xl font-bold mb-8">Browse {categoryTitle}</h1>

          {/* Search and filter bar */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder={`Search ${categoryTitle.toLowerCase()}...`}
                className="pl-10 p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-education-500 focus:border-education-500"
              />
            </div>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <Filter className="h-4 w-4" />
              Filter Options
            </Button>
          </div>

          {/* Filters section - conditionally rendered */}
          {filterOpen && (
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Filters</h2>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-education-600 hover:underline"
                >
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* City filter */}
                <div>
                  <h3 className="text-sm font-medium mb-3">City</h3>
                  <div className="space-y-2">
                    {cities.map(city => (
                      <label key={city} className="flex items-center">
                        <input
                          type="radio"
                          name="city"
                          checked={cityFilter === city}
                          onChange={() => setCityFilter(city)}
                          className="mr-2 h-4 w-4 text-education-600 focus:ring-education-500"
                        />
                        {city}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Type filter */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Type</h3>
                  <div className="space-y-2">
                    {types.map(type => (
                      <label key={type} className="flex items-center">
                        <input
                          type="radio"
                          name="type"
                          checked={typeFilter === type}
                          onChange={() => setTypeFilter(type)}
                          className="mr-2 h-4 w-4 text-education-600 focus:ring-education-500"
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Fee range filter - placeholder */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Fee Range</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 text-education-600 focus:ring-education-500"
                      />
                      Under ₹50,000
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 text-education-600 focus:ring-education-500"
                      />
                      ₹50,000 - ₹1,00,000
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 text-education-600 focus:ring-education-500"
                      />
                      Above ₹1,00,000
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results summary */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredInstitutions.length} {filteredInstitutions.length === 1 ? 'result' : 'results'}
              {cityFilter && ` in ${cityFilter}`}
              {typeFilter && ` for ${typeFilter}`}
            </p>
          </div>

          {/* Institution cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstitutions.map((institution) => (
              <div key={institution.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-9 relative h-48">
                  <img
                    src={institution.thumbnail}
                    alt={institution.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{institution.name}</h3>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                      <span>{institution.rating}</span>
                      <span className="ml-1 text-yellow-500">★</span>
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{institution.address}</p>
                  <div className="flex items-center text-sm mb-4">
                    <span className="text-gray-500 mr-2">Type:</span>
                    <span className="font-medium">{institution.type}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">Starting from</p>
                      <p className="font-bold text-education-600">{institution.fees}</p>
                    </div>
                    <Link to={`/institution/${category}/${institution.id}`}>
                      <Button size="sm">View Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredInstitutions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-2xl font-semibold mb-2">No results found</p>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search term</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default InstitutionListing;
