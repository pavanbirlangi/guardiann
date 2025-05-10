import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth/AuthContext';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-education-600">
              SchoolSeeker Connect
            </Link>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link to="/categories" className="text-gray-600 hover:text-education-600">
                    Categories
                  </Link>
                  <Link to="/user/dashboard" className="text-gray-600 hover:text-education-600">
                    Dashboard
                  </Link>
                  <Link to="/about" className="text-gray-600 hover:text-education-600">
                    About Us
                  </Link>
                  <Link to="/contact" className="text-gray-600 hover:text-education-600">
                    Contact
                  </Link>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/auth">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link to="/auth?mode=register">
                    <Button>Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-50 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">About Us</h3>
              <p className="text-gray-600">
                SchoolSeeker Connect helps you find and book visits to educational institutions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/categories" className="text-gray-600 hover:text-education-600">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-600 hover:text-education-600">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-600 hover:text-education-600">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Email: info@schoolseeker.com</li>
                <li>Phone: +1 234 567 890</li>
                <li>Address: 123 Education St, City</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-education-600">
                  Facebook
                </a>
                <a href="#" className="text-gray-600 hover:text-education-600">
                  Twitter
                </a>
                <a href="#" className="text-gray-600 hover:text-education-600">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} SchoolSeeker Connect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
