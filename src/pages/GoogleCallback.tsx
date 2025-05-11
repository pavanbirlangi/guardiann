import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/lib/auth/AuthContext';

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const { setSessionFromToken } = useAuth(); // assume this sets the auth tokens in context
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code) {
      setError('No authorization code found.');
      return;
    }

    const exchangeCodeForToken = async () => {
      try {
        const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID;
        const clientSecret = import.meta.env.VITE_COGNITO_CLIENT_SECRET;
        const redirectUri = import.meta.env.VITE_REDIRECT_URI;
        const domain = import.meta.env.VITE_COGNITO_DOMAIN;

        const authHeader = btoa(`${clientId}:${clientSecret}`);

        const body = new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: clientId,
          redirect_uri: redirectUri,
          code
        });

        const response = await fetch(`https://${domain}/oauth2/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${authHeader}`
          },
          body
        });

        if (!response.ok) {
          throw new Error(`Token request failed: ${response.statusText}`);
        }

        const data = await response.json();

        // You should have: id_token, access_token, refresh_token
        await setSessionFromToken(data); // you’ll write this in AuthContext

        navigate('/');
      } catch (err: any) {
        setError(err.message || 'Login failed.');
      }
    };

    exchangeCodeForToken();
  }, [searchParams, navigate, setSessionFromToken]);

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-gray-600 text-lg">Logging in with Google...</div>
    </div>
  );
};

export default GoogleCallback;
