import React, { createContext, useContext, useState, useEffect } from 'react';
import { cognitoAuth } from './cognitoAuth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface User {
  email: string;
  name: string;
  sub: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  confirmSignUp: (email: string, code: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, code: string, newPassword: string) => Promise<void>;
  setSessionFromToken: (tokens: {id_token: string;access_token: string;refresh_token?: string;}) => Promise<void>; 
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to decode JWT token
const decodeToken = (token: string): User | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload);
    return {
      email: payload.email,
      name: payload.name,
      sub: payload.sub,
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking authentication status...');
        const isAuth = cognitoAuth.isAuthenticated();
        console.log('Is authenticated:', isAuth);
        
        setIsAuthenticated(isAuth);
        
        if (isAuth) {
          const token = cognitoAuth.getToken();
          console.log('Token exists:', !!token);
          
          if (token) {
            const userData = decodeToken(token);
            console.log('Decoded user data:', userData);
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
        setUser(null);
        
        // Clear any stored tokens
        localStorage.removeItem('cognito_token');
        localStorage.removeItem('cognito_refresh_token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      console.log('Starting sign in process...');
      
      const response = await cognitoAuth.signIn({ email, password });
      console.log('Sign in response:', response);
      
      if (response.success && response.data?.token) {
        console.log('Sign in successful, decoding token...');
        const userData = decodeToken(response.data.token);
        console.log('Decoded user data:', userData);
        
        if (userData) {
          setIsAuthenticated(true);
          setUser(userData);
          console.log('User authenticated and data set');
          
          toast({
            title: 'Success',
            description: 'Successfully signed in!',
          });
          
          // Remove the navigation to dashboard
          // The user will stay on the current page
        } else {
          throw new Error('Failed to decode user information');
        }
      } else {
        throw new Error(response.error || 'Sign in failed');
      }
    } catch (error) {
      console.error('Sign in error in context:', error);
      setIsAuthenticated(false);
      setUser(null);
      
      // Clear any stored tokens
      localStorage.removeItem('cognito_token');
      localStorage.removeItem('cognito_refresh_token');
      
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Sign in failed',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      const response = await cognitoAuth.signUp({ email, password, name });
      
      if (response.success) {
        toast({
          title: 'Success',
          description: 'Please check your email for verification code.',
        });
        // Navigate to confirmation page or show confirmation form
        navigate('/auth/confirm', { state: { email } });
      } else {
        throw new Error(response.error || 'Sign up failed');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Sign up failed',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
  
      // Construct hosted UI logout URL
      const domain = import.meta.env.VITE_COGNITO_DOMAIN;
      const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
      const redirectUri = encodeURIComponent("http://localhost:8080"); // Update if needed
  
      const logoutUrl = `https://${domain}/logout?client_id=${clientId}&logout_uri=${redirectUri}`;
  
      // Optional: clear local storage (only if you want to do it immediately)
      localStorage.removeItem('cognito_token');
      localStorage.removeItem('cognito_access_token');
      localStorage.removeItem('cognito_refresh_token');
  
      // Redirect to hosted UI logout endpoint
      window.location.href = logoutUrl;
  
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Sign out failed',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  

  const confirmSignUp = async (email: string, code: string) => {
    try {
      setIsLoading(true);
      const response = await cognitoAuth.confirmSignUp(email, code);
      
      if (response.success) {
        toast({
          title: 'Success',
          description: 'Email verified successfully! Please sign in.',
        });
        navigate('/auth');
      } else {
        throw new Error(response.error || 'Confirmation failed');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Confirmation failed',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const setSessionFromToken = async (tokens: {
    id_token: string;
    access_token: string;
    refresh_token?: string;
  }) => {
    try {
      setIsLoading(true);
  
      const { id_token, access_token, refresh_token } = tokens;
  
      localStorage.setItem('cognito_token', id_token);
      localStorage.setItem('cognito_access_token', access_token);
      if (refresh_token) {
        localStorage.setItem('cognito_refresh_token', refresh_token);
      }
  
      const userData = decodeToken(id_token);
  
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        throw new Error('Unable to decode user info from token');
      }
    } catch (error) {
      console.error('Error setting session from token:', error);
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('cognito_token');
      localStorage.removeItem('cognito_access_token');
      localStorage.removeItem('cognito_refresh_token');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true);
      const response = await cognitoAuth.forgotPassword(email);
      
      if (response.success) {
        toast({
          title: 'Success',
          description: 'Please check your email for reset code.',
        });
        navigate('/auth/reset-password', { state: { email } });
      } else {
        throw new Error(response.error || 'Password reset request failed');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Password reset request failed',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string, code: string, newPassword: string) => {
    try {
      setIsLoading(true);
      const response = await cognitoAuth.resetPassword(email, code, newPassword);
      
      if (response.success) {
        toast({
          title: 'Success',
          description: 'Password reset successfully! Please sign in.',
        });
        navigate('/auth');
      } else {
        throw new Error(response.error || 'Password reset failed');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Password reset failed',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    signIn,
    signUp,
    signOut,
    confirmSignUp,
    forgotPassword,
    resetPassword,
    setSessionFromToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 