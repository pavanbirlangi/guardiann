
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { School, Book, Users, Calendar } from "lucide-react";

const categories = [
  {
    id: "schools",
    title: "Schools",
    description:
      "Find the best K-12 schools in your area, from primary to senior secondary education. Compare facilities, curriculum, and more to make the best choice for your child.",
    icon: <School className="h-10 w-10" />,
    color: "bg-blue-100 text-blue-600",
    subcategories: ["Primary Schools", "Secondary Schools", "International Schools", "Boarding Schools"],
    path: "/categories/schools",
  },
  {
    id: "colleges",
    title: "Colleges",
    description:
      "Explore undergraduate colleges offering diverse courses and specializations. Find the perfect institution to kick-start your career with the right education.",
    icon: <Book className="h-10 w-10" />,
    color: "bg-green-100 text-green-600",
    subcategories: ["Engineering", "Medical", "Arts & Humanities", "Commerce & Business"],
    path: "/categories/colleges",
  },
  {
    id: "coaching",
    title: "Coaching Centers",
    description:
      "Discover coaching centers for competitive exams, skills development, and academic support. Get expert guidance to achieve your learning goals.",
    icon: <Users className="h-10 w-10" />,
    color: "bg-purple-100 text-purple-600",
    subcategories: ["Competitive Exams", "Language Learning", "Arts & Music", "Sports & Fitness"],
    path: "/categories/coaching",
  },
  {
    id: "pg-colleges",
    title: "PG Colleges",
    description:
      "Find the best postgraduate programs to advance your education and career. Compare specializations, research opportunities, and placement records.",
    icon: <Calendar className="h-10 w-10" />,
    color: "bg-amber-100 text-amber-600",
    subcategories: ["Masters Programs", "MBA", "PhD", "Specialized PG Diplomas"],
    path: "/categories/pg-colleges",
  },
];

const CategoriesPage = () => {
  return (
    <Layout>
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Explore Educational Categories
            </h1>
            <p className="text-lg text-gray-600">
              Browse through our comprehensive list of educational institutions and find the perfect fit for your learning journey
            </p>
          </div>

          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0 flex items-center justify-center p-8 md:w-64">
                    <div className={`p-6 rounded-full ${category.color}`}>{category.icon}</div>
                  </div>
                  <div className="p-8 md:flex-1">
                    <h2 className="text-2xl font-bold mb-3">{category.title}</h2>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    
                    <div className="mb-6">
                      <h3 className="text-sm uppercase text-gray-500 font-semibold mb-2">Popular subcategories:</h3>
                      <div className="flex flex-wrap gap-2">
                        {category.subcategories.map((subcat, index) => (
                          <span 
                            key={index} 
                            className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm"
                          >
                            {subcat}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-start">
                      <Link to={category.path}>
                        <Button className="bg-education-600 hover:bg-education-700">
                          Browse {category.title}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CategoriesPage;
