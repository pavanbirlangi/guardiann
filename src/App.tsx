import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { ProtectedRoute } from '@/lib/auth/ProtectedRoute';
import { Toaster } from '@/components/ui/toaster';
import { useAuth } from '@/lib/auth/AuthContext';

// Import your pages
import Index from '@/pages/Index';
import Categories from '@/pages/Categories';
import InstitutionListing from '@/pages/InstitutionListing';
import InstitutionDetails from '@/pages/InstitutionDetails';
import AboutUs from '@/pages/AboutUs';
import Contact from '@/pages/Contact';
import Auth from '@/pages/Auth';
import BookingPage from '@/pages/BookingPage';
import BookingConfirmation from '@/pages/BookingConfirmation';
import UserDashboard from '@/pages/UserDashboard';
import NotFound from '@/pages/NotFound';

// Create a wrapper component to use hooks
const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-education-600"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/institutions" element={<InstitutionListing />} />
      <Route path="/institutions/:id" element={<InstitutionDetails />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/auth" element={isAuthenticated ? <Navigate to="/user/dashboard" replace /> : <Auth />} />

      {/* Protected Routes */}
      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/:institutionId"
        element={
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/confirmation/:bookingId"
        element={
          <ProtectedRoute>
            <BookingConfirmation />
          </ProtectedRoute>
        }
      />

      {/* Catch all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
