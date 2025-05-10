// Debug environment variables
console.log('Cognito Config:', {
  UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
  ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
  Region: import.meta.env.VITE_AWS_REGION,
});

export const cognitoConfig = {
  UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID || '',
  ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID || '',
  Region: import.meta.env.VITE_AWS_REGION || 'us-east-1',
};

// Cognito API endpoints
export const cognitoEndpoints = {
  token: `https://cognito-idp.${cognitoConfig.Region}.amazonaws.com/${cognitoConfig.UserPoolId}/.well-known/jwks.json`,
  authorize: `https://${cognitoConfig.UserPoolId}.auth.${cognitoConfig.Region}.amazoncognito.com/oauth2/authorize`,
  tokenEndpoint: `https://${cognitoConfig.UserPoolId}.auth.${cognitoConfig.Region}.amazoncognito.com/oauth2/token`,
  userInfo: `https://${cognitoConfig.UserPoolId}.auth.${cognitoConfig.Region}.amazoncognito.com/oauth2/userInfo`,
}; 