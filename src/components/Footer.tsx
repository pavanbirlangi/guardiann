
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-education-600 to-education-400">
                SchoolSeeker
              </span>
            </Link>
            <p className="text-gray-600 text-sm mb-4">
              Find the best schools, colleges & coaching centers near you.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categories" className="text-sm text-gray-600 hover:text-education-600">
                  Explore
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-education-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-education-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/categories/schools" className="text-sm text-gray-600 hover:text-education-600">
                  Schools
                </Link>
              </li>
              <li>
                <Link to="/categories/colleges" className="text-sm text-gray-600 hover:text-education-600">
                  Colleges
                </Link>
              </li>
              <li>
                <Link to="/categories/coaching" className="text-sm text-gray-600 hover:text-education-600">
                  Coaching
                </Link>
              </li>
              <li>
                <Link to="/categories/pg-colleges" className="text-sm text-gray-600 hover:text-education-600">
                  PG Colleges
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-600">
                support@schoolseeker.com
              </li>
              <li className="text-sm text-gray-600">
                +91 99999 88888
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} SchoolSeeker Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
