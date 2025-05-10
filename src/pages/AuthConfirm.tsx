import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth/AuthContext";

const AuthConfirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { confirmSignUp, isLoading } = useAuth();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  // Get email from location state
  const email = location.state?.email;
  
  // Redirect if no email is provided
  React.useEffect(() => {
    if (!email) {
      navigate('/auth');
    }
  }, [email, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!code.trim()) {
      setError("Please enter the verification code");
      return;
    }

    try {
      await confirmSignUp(email, code);
      // The navigation will be handled by the AuthContext
    } catch (error) {
      setError(error instanceof Error ? error.message : "Verification failed");
    }
  };

  const handleResendCode = async () => {
    // TODO: Implement resend code functionality
    console.log("Resend code functionality to be implemented");
  };

  if (!email) {
    return null; // Will redirect in useEffect
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">
                  Verify Your Email
                </CardTitle>
                <CardDescription className="text-center">
                  Please enter the verification code sent to {email}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Verification Code</Label>
                    <Input
                      id="code"
                      placeholder="Enter verification code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      disabled={isLoading}
                    />
                    {error && (
                      <p className="text-red-500 text-sm">{error}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-education-600 hover:bg-education-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Verifying..." : "Verify Email"}
                  </Button>
                  <div className="text-center">
                    <Button
                      type="button"
                      variant="link"
                      className="text-sm text-education-600"
                      onClick={handleResendCode}
                      disabled={isLoading}
                    >
                      Didn't receive the code? Resend
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthConfirm; 