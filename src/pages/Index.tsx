
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const categoryCards = [
  {
    id: 1,
    title: "Schools",
    description: "Find the best K-12 schools in your area",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    path: "/categories/schools",
  },
  {
    id: 2,
    title: "Colleges",
    description: "Discover top colleges and universities",
    imageUrl: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    path: "/categories/colleges",
  },
  {
    id: 3,
    title: "Coaching Centers",
    description: "Expert guidance for exams and skills",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    path: "/categories/coaching",
  },
  {
    id: 4,
    title: "PG Colleges",
    description: "Advance your career with postgraduate education",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    path: "/categories/pg-colleges",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Parent",
    content: "SchoolSeeker made finding the perfect school for my daughter incredibly easy. The detailed information and booking process saved us so much time!",
  },
  {
    id: 2,
    name: "Rahul Gupta",
    role: "Student",
    content: "I was confused about which college to choose for my engineering degree. Thanks to SchoolSeeker, I found the perfect fit for my career goals.",
  },
  {
    id: 3,
    name: "Aarav Patel",
    role: "Teacher",
    content: "As an educator, I appreciate how SchoolSeeker connects students with quality institutions. The platform is intuitive and comprehensive.",
  },
];

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <motion.section 
        className="hero-section text-white py-16 md:py-24"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className="text-3xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Find the best schools, colleges & coaching centers near you
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl mb-8 text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Connect with top educational institutions and book your visit in minutes
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button size="lg" className="bg-white text-education-700 hover:bg-gray-100">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </motion.div>

            {/* Search bar */}
            <motion.div 
              className="max-w-xl mx-auto mt-8 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div className="flex items-center bg-white rounded-lg p-1.5 shadow-lg">
                <input
                  type="text"
                  placeholder="Search by city, institution or course..."
                  className="flex-grow p-2 focus:outline-none text-gray-800"
                />
                <Button className="bg-education-600 hover:bg-education-700">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Category Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Find What You're Looking For</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse through our categories and discover top educational institutions that match your requirements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryCards.map((card, index) => (
              <motion.div
                key={card.id}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <Link
                  to={card.path}
                  className="category-card group"
                >
                  <div className="relative h-64 overflow-hidden rounded-lg">
                    <img
                      src={card.imageUrl}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 text-white">
                      <h3 className="text-xl font-semibold mb-1">{card.title}</h3>
                      <p className="text-sm text-white/80">{card.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Link to="/categories">
              <Button size="lg">
                View All Categories
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="container">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Finding and booking visits to educational institutions has never been easier
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((step, index) => (
              <motion.div 
                key={step}
                className="text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="w-16 h-16 bg-education-100 rounded-full flex items-center justify-center text-education-600 mx-auto mb-4">
                  <span className="text-2xl font-bold">{step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {step === 1 ? "Select Category" : step === 2 ? "Browse Options" : "Book Your Visit"}
                </h3>
                <p className="text-gray-600">
                  {step === 1 
                    ? "Choose between schools, colleges, coaching centers, or PG colleges" 
                    : step === 2 
                    ? "Filter and compare institutions based on your specific requirements"
                    : "Secure a slot at your preferred institution with a simple booking process"}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from students, parents and educators who have found their perfect match through SchoolSeeker
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.id} 
                className="testimonial-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="py-16 bg-education-600 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Educational Institution?</h2>
            <p className="text-lg mb-8">
              Join thousands of students who have found their ideal learning environment through SchoolSeeker Connect
            </p>
            <Button size="lg" className="bg-white text-education-700 hover:bg-gray-100">
              Get Started Today
            </Button>
          </div>
        </div>
      </motion.section>
    </Layout>
  );
};

export default HomePage;
