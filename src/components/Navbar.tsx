
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X, User, Search } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleAuthClick = () => {
    navigate("/auth");
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <motion.header 
      className="sticky top-0 z-50 bg-white shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <motion.span 
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-education-600 to-education-400"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            SchoolSeeker
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile ? (
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/categories" className="text-sm font-medium hover:text-education-600 transition-colors">
                Explore
              </Link>
              <Link to="/about" className="text-sm font-medium hover:text-education-600 transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-sm font-medium hover:text-education-600 transition-colors">
                Contact
              </Link>
            </nav>

            <div className="hidden md:flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-education-600 text-education-600 hover:bg-education-50"
                onClick={handleAuthClick}
              >
                Login
              </Button>
              <Button 
                size="sm" 
                className="bg-education-600 hover:bg-education-700"
                onClick={handleAuthClick}
              >
                Sign Up
              </Button>
            </div>
          </div>
        ) : (
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && menuOpen && (
        <motion.div 
          className="fixed inset-0 z-50 bg-white"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
        >
          <div className="container pt-4">
            <div className="flex items-center justify-between mb-8">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-education-600 to-education-400">
                  SchoolSeeker
                </span>
              </Link>
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <nav className="flex flex-col space-y-6 text-lg">
              <Link 
                to="/categories" 
                className="py-2 border-b border-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Explore
              </Link>
              <Link 
                to="/about" 
                className="py-2 border-b border-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="py-2 border-b border-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>

              <div className="pt-6 flex flex-col space-y-3">
                <Button 
                  variant="outline" 
                  className="border-education-600 text-education-600 hover:bg-education-50 w-full"
                  onClick={handleAuthClick}
                >
                  Login
                </Button>
                <Button 
                  className="bg-education-600 hover:bg-education-700 w-full"
                  onClick={handleAuthClick}
                >
                  Sign Up
                </Button>
              </div>
            </nav>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
