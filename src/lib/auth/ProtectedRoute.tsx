import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { cognitoAuth } from './cognitoAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Double-check authentication state
    const checkAuth = () => {
      const hasToken = cognitoAuth.isAuthenticated();
      console.log('ProtectedRoute - Auth check:', { isAuthenticated, hasToken, isLoading });
    };
    checkAuth();
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    // You might want to show a loading spinner here
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-education-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !cognitoAuth.isAuthenticated()) {
    console.log('ProtectedRoute - Redirecting to auth:', { isAuthenticated, hasToken: cognitoAuth.isAuthenticated() });
    // Redirect to login page but save the attempted url
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}; 