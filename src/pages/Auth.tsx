import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, User, UserPlus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/lib/auth/AuthContext";
import { toast } from "@/components/ui/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signUp, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("login");
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Register form state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Form validation state
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});
  const [registerErrors, setRegisterErrors] = useState<Record<string, string>>({});
  const [loginError, setLoginError] = useState('');

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Clear errors when switching tabs
    setLoginErrors({});
    setRegisterErrors({});
  };

  const validateLoginForm = () => {
    const errors: Record<string, string> = {};
    
    if (!loginEmail) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(loginEmail)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!loginPassword) {
      errors.password = "Password is required";
    }
    
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateRegisterForm = () => {
    const errors: Record<string, string> = {};
    
    if (!registerName) {
      errors.name = "Name is required";
    }
    
    if (!registerEmail) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(registerEmail)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!registerPassword) {
      errors.password = "Password is required";
    } else if (registerPassword.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    
    if (!registerConfirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (registerPassword !== registerConfirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    
    if (!agreeTerms) {
      errors.terms = "You must agree to the terms and conditions";
    }
    
    setRegisterErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!validateLoginForm()) {
      return;
    }

    try {
      await signIn(loginEmail, loginPassword);
      // Stay on the current page after successful login
      toast({
        title: 'Success',
        description: 'Successfully signed in!',
      });
      // Navigate back to the previous page or home page
      const from = location.state?.from?.pathname || '/';
      navigate(from);
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Login failed');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateRegisterForm()) {
      try {
        await signUp(registerEmail, registerPassword, registerName);
        // The navigation will be handled by the AuthContext
      } catch (error) {
        // Error handling is done in the AuthContext
        console.error('Registration error:', error);
      }
    }
  };

  const handleGoogleAuth = () => {
    // This will be implemented later
    console.log('Google auth to be implemented');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">
                  Welcome to SchoolSeeker
                </CardTitle>
                <CardDescription className="text-center">
                  Find the best schools, colleges & coaching centers near you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs 
                  defaultValue="login" 
                  value={activeTab}
                  onValueChange={handleTabChange}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="login" className="text-center">
                      Login
                    </TabsTrigger>
                    <TabsTrigger value="register" className="text-center">
                      Register
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className={`pl-10 ${loginErrors.email ? 'border-red-500' : ''}`}
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                        {loginErrors.email && (
                          <p className="text-red-500 text-sm">{loginErrors.email}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <Button 
                            variant="link" 
                            className="p-0 h-auto text-xs text-education-600"
                            type="button"
                            onClick={() => navigate('/auth/forgot-password')}
                          >
                            Forgot password?
                          </Button>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            className={`pl-10 ${loginErrors.password ? 'border-red-500' : ''}`}
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                        {loginErrors.password && (
                          <p className="text-red-500 text-sm">{loginErrors.password}</p>
                        )}
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-education-600 hover:bg-education-700"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Signing in...' : 'Login'}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="register">
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            id="name"
                            placeholder="Enter your full name"
                            className={`pl-10 ${registerErrors.name ? 'border-red-500' : ''}`}
                            value={registerName}
                            onChange={(e) => setRegisterName(e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                        {registerErrors.name && (
                          <p className="text-red-500 text-sm">{registerErrors.name}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            id="register-email"
                            type="email"
                            placeholder="Enter your email"
                            className={`pl-10 ${registerErrors.email ? 'border-red-500' : ''}`}
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                        {registerErrors.email && (
                          <p className="text-red-500 text-sm">{registerErrors.email}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            id="register-password"
                            type="password"
                            placeholder="Create a password"
                            className={`pl-10 ${registerErrors.password ? 'border-red-500' : ''}`}
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                        {registerErrors.password && (
                          <p className="text-red-500 text-sm">{registerErrors.password}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-confirm-password">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input 
                            id="register-confirm-password"
                            type="password"
                            placeholder="Confirm your password"
                            className={`pl-10 ${registerErrors.confirmPassword ? 'border-red-500' : ''}`}
                            value={registerConfirmPassword}
                            onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                        {registerErrors.confirmPassword && (
                          <p className="text-red-500 text-sm">{registerErrors.confirmPassword}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="terms" 
                          checked={agreeTerms}
                          onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                          disabled={isLoading}
                        />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the{' '}
                          <Button variant="link" className="p-0 h-auto text-sm text-education-600">
                            Terms and Conditions
                          </Button>
                        </Label>
                      </div>
                      {registerErrors.terms && (
                        <p className="text-red-500 text-sm">{registerErrors.terms}</p>
                      )}
                      <Button 
                        type="submit" 
                        className="w-full bg-education-600 hover:bg-education-700"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Creating account...' : 'Create Account'}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    type="button"
                    className="w-full mt-4"
                    onClick={handleGoogleAuth}
                    disabled={isLoading}
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
