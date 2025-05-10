
import React from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container py-12"
      >
        <motion.h1 
          className="text-3xl md:text-4xl font-bold mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          About SchoolSeeker
        </motion.h1>

        <motion.div 
          className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold text-education-600 mb-4">Our Mission</h2>
            <p className="mb-6">
              At SchoolSeeker, we believe that education is the foundation of a thriving society. Our mission is to connect students and parents with the educational institutions that best match their needs, goals, and aspirations.
            </p>
            
            <h2 className="text-2xl font-semibold text-education-600 mb-4">Our Story</h2>
            <p className="mb-6">
              SchoolSeeker was founded in 2023 by a group of education enthusiasts who recognized the challenges faced by students and parents when searching for the right educational institutions. The process was often overwhelming, time-consuming, and lacked transparency.
            </p>
            <p className="mb-6">
              We set out to create a platform that simplifies this journey, providing comprehensive information, easy comparisons, and a streamlined booking process to visit institutions of interest.
            </p>
            
            <h2 className="text-2xl font-semibold text-education-600 mb-4">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-medium mb-2">Accessibility</h3>
                <p>We believe quality education should be accessible to everyone, regardless of background or location.</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-medium mb-2">Transparency</h3>
                <p>We provide honest, comprehensive information to help users make informed decisions.</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-medium mb-2">Innovation</h3>
                <p>We continuously improve our platform to better serve the evolving needs of our users.</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-xl font-medium mb-2">Community</h3>
                <p>We foster connections between students, parents, and educational institutions.</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold text-education-600 mb-4">Our Team</h2>
            <p className="mb-6">
              Our diverse team brings together expertise in education, technology, and customer service. We are united by our passion for improving educational access and outcomes for students worldwide.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default AboutUs;
