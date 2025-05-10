import { cognitoConfig, cognitoEndpoints } from './cognitoConfig';

interface SignUpParams {
  email: string;
  password: string;
  name: string;
}

interface SignInParams {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  error?: string;
  data?: any;
}

class CognitoAuth {
  private static instance: CognitoAuth;
  private token: string | null = null;
  private refreshToken: string | null = null;
  private clientSecret: string;

  private constructor() {
    // Initialize from localStorage if available
    this.token = localStorage.getItem('cognito_token');
    this.refreshToken = localStorage.getItem('cognito_refresh_token');
    this.clientSecret = import.meta.env.VITE_COGNITO_CLIENT_SECRET || '';
  }

  public static getInstance(): CognitoAuth {
    if (!CognitoAuth.instance) {
      CognitoAuth.instance = new CognitoAuth();
    }
    return CognitoAuth.instance;
  }

  private async calculateSecretHash(username: string): Promise<string> {
    if (!this.clientSecret) return '';
    
    const message = username + cognitoConfig.ClientId;
    const encoder = new TextEncoder();
    const messageBuffer = encoder.encode(message);
    const secretBuffer = encoder.encode(this.clientSecret);
    
    // Create a key from the secret
    const key = await crypto.subtle.importKey(
      'raw',
      secretBuffer,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    
    // Sign the message
    const signature = await crypto.subtle.sign(
      'HMAC',
      key,
      messageBuffer
    );
    
    // Convert to base64
    return btoa(String.fromCharCode(...new Uint8Array(signature)));
  }

  private async makeRequest(endpoint: string, body: any): Promise<Response> {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(body).toString(),
    });
    return response;
  }

  public async signUp({ email, password, name }: SignUpParams): Promise<AuthResponse> {
    try {
      const secretHash = await this.calculateSecretHash(email);
      
      const body = {
        ClientId: cognitoConfig.ClientId,
        Username: email,
        Password: password,
        SecretHash: secretHash,
        UserAttributes: [
          {
            Name: 'email',
            Value: email,
          },
          {
            Name: 'name',
            Value: name,
          },
        ],
      };

      const response = await fetch(
        `https://cognito-idp.${cognitoConfig.Region}.amazonaws.com/${cognitoConfig.UserPoolId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-amz-json-1.1',
            'X-Amz-Target': 'AWSCognitoIdentityProviderService.SignUp',
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Sign up failed');
      }

      return {
        success: true,
        data: {
          userSub: data.UserSub,
          userConfirmed: data.UserConfirmed,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Sign up failed',
      };
    }
  }

  public async signIn({ email, password }: SignInParams): Promise<AuthResponse> {
    try {
      const secretHash = await this.calculateSecretHash(email);
      
      const body = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: cognitoConfig.ClientId,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
          SECRET_HASH: secretHash,
        },
      };

      console.log('Sign in request:', {
        url: `https://cognito-idp.${cognitoConfig.Region}.amazonaws.com/${cognitoConfig.UserPoolId}`,
        body: { ...body, AuthParameters: { ...body.AuthParameters, PASSWORD: '***' } },
      });

      const response = await fetch(
        `https://cognito-idp.${cognitoConfig.Region}.amazonaws.com/${cognitoConfig.UserPoolId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-amz-json-1.1',
            'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      console.log('Sign in response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Sign in failed');
      }

      if (!data.AuthenticationResult) {
        throw new Error('No authentication result received');
      }

      // Store tokens
      this.token = data.AuthenticationResult.IdToken;
      this.refreshToken = data.AuthenticationResult.RefreshToken;

      // Save to localStorage
      localStorage.setItem('cognito_token', this.token);
      localStorage.setItem('cognito_refresh_token', this.refreshToken);

      return {
        success: true,
        data: {
          token: this.token,
          refreshToken: this.refreshToken,
        },
      };
    } catch (error) {
      console.error('Sign in error:', error);
      
      // Clear any existing tokens on error
      this.token = null;
      this.refreshToken = null;
      localStorage.removeItem('cognito_token');
      localStorage.removeItem('cognito_refresh_token');

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Sign in failed',
      };
    }
  }

  private async handlePasswordVerifierChallenge(
    challengeData: any,
    email: string,
    password: string,
    secretHash: string
  ): Promise<AuthResponse> {
    try {
      const { SALT, SECRET_BLOCK, SRP_B, USERNAME } = challengeData.ChallengeParameters;
      
      const verifier = await this.calculatePasswordVerifier(
        email,
        password,
        SALT,
        SECRET_BLOCK,
        SRP_B,
        new Date().toISOString()
      );

      const response = await fetch(
        `https://cognito-idp.${cognitoConfig.Region}.amazonaws.com/${cognitoConfig.UserPoolId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-amz-json-1.1',
            'X-Amz-Target': 'AWSCognitoIdentityProviderService.RespondToAuthChallenge',
          },
          body: JSON.stringify({
            ChallengeName: 'PASSWORD_VERIFIER',
            ClientId: cognitoConfig.ClientId,
            ChallengeResponses: {
              USERNAME: email,
              PASSWORD_CLAIM_SIGNATURE: verifier,
              PASSWORD_CLAIM_SECRET_BLOCK: SECRET_BLOCK,
              TIMESTAMP: new Date().toISOString(),
              SECRET_HASH: secretHash,
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Password verification failed');
      }

      this.token = data.AuthenticationResult.IdToken;
      this.refreshToken = data.AuthenticationResult.RefreshToken;

      localStorage.setItem('cognito_token', this.token);
      localStorage.setItem('cognito_refresh_token', this.refreshToken);

      return {
        success: true,
        data: {
          token: this.token,
          refreshToken: this.refreshToken,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Password verification failed',
      };
    }
  }

  private generateSRPA(): string {
    const buffer = new Uint8Array(32);
    crypto.getRandomValues(buffer);
    
    return Array.from(buffer)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  private async calculatePasswordVerifier(
    email: string,
    password: string,
    salt: string,
    secretBlock: string,
    srpB: string,
    timestamp: string
  ): Promise<string> {
    return 'PLACEHOLDER_VERIFIER';
  }

  public async signOut(): Promise<AuthResponse> {
    try {
      if (!this.token) {
        throw new Error('No active session');
      }

      const body = {
        ClientId: cognitoConfig.ClientId,
        AccessToken: this.token,
      };

      await fetch(
        `https://cognito-idp.${cognitoConfig.Region}.amazonaws.com/${cognitoConfig.UserPoolId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-amz-json-1.1',
            'X-Amz-Target': 'AWSCognitoIdentityProviderService.GlobalSignOut',
          },
          body: JSON.stringify(body),
        }
      );

      // Clear all authentication state
      this.token = null;
      this.refreshToken = null;
      localStorage.removeItem('cognito_token');
      localStorage.removeItem('cognito_refresh_token');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');

      return { success: true };
    } catch (error) {
      // Even if the API call fails, clear local state
      this.token = null;
      this.refreshToken = null;
      localStorage.removeItem('cognito_token');
      localStorage.removeItem('cognito_refresh_token');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Sign out failed',
      };
    }
  }

  public async refreshSession(): Promise<AuthResponse> {
    try {
      if (!this.refreshToken) {
        throw new Error('No refresh token available');
      }

      const body = {
        AuthFlow: 'REFRESH_TOKEN_AUTH',
        ClientId: cognitoConfig.ClientId,
        AuthParameters: {
          REFRESH_TOKEN: this.refreshToken,
        },
      };

      const response = await fetch(
        `https://cognito-idp.${cognitoConfig.Region}.amazonaws.com/${cognitoConfig.UserPoolId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-amz-json-1.1',
            'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Token refresh failed');
      }

      this.token = data.AuthenticationResult.IdToken;
      localStorage.setItem('cognito_token', this.token);

      return {
        success: true,
        data: {
          token: this.token,
        },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Token refresh failed',
      };
    }
  }

  public async confirmSignUp(email: string, code: string): Promise<AuthResponse> {
    try {
      const secretHash = await this.calculateSecretHash(email);
      
      const body = {
        ClientId: cognitoConfig.ClientId,
        Username: email,
        ConfirmationCode: code,
        SecretHash: secretHash,
      };

      const response = await fetch(
        `https://cognito-idp.${cognitoConfig.Region}.amazonaws.com/${cognitoConfig.UserPoolId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-amz-json-1.1',
            'X-Amz-Target': 'AWSCognitoIdentityProviderService.ConfirmSignUp',
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Confirmation failed');
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Confirmation failed',
      };
    }
  }

  public async forgotPassword(email: string): Promise<AuthResponse> {
    try {
      const body = {
        ClientId: cognitoConfig.ClientId,
        Username: email,
      };

      const response = await fetch(
        `https://cognito-idp.${cognitoConfig.Region}.amazonaws.com/${cognitoConfig.UserPoolId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-amz-json-1.1',
            'X-Amz-Target': 'AWSCognitoIdentityProviderService.ForgotPassword',
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Password reset request failed');
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Password reset request failed',
      };
    }
  }

  public async resetPassword(email: string, code: string, newPassword: string): Promise<AuthResponse> {
    try {
      const body = {
        ClientId: cognitoConfig.ClientId,
        Username: email,
        ConfirmationCode: code,
        Password: newPassword,
      };

      const response = await fetch(
        `https://cognito-idp.${cognitoConfig.Region}.amazonaws.com/${cognitoConfig.UserPoolId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-amz-json-1.1',
            'X-Amz-Target': 'AWSCognitoIdentityProviderService.ConfirmForgotPassword',
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Password reset failed');
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Password reset failed',
      };
    }
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public getToken(): string | null {
    return this.token;
  }
}

export const cognitoAuth = CognitoAuth.getInstance(); 