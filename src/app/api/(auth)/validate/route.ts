// pages/api/auth/validate.ts
import { NextRequest } from 'next/server';
import { createNextResponse } from '@/utils/api/response';

export async function POST(request: NextRequest) {
  try {
    // Extract the token from the httpOnly cookie
    const tokenObject = request.cookies.get('access_token');
    let tokenValue;

    // Check if the tokenObject is indeed an object and has a 'value' property
    if (tokenObject && typeof tokenObject === 'object' && 'value' in tokenObject) {
      // Extract the token value from the token object
      tokenValue = tokenObject.value;
      // console.log('Extracted Token Value:', tokenValue);
    } else {
      // Handle the case where the token is not in the expected format
      // console.error('Token is not in the expected format:', tokenObject);
      return createNextResponse({ message: 'Token format is incorrect.' }, 400);
    }

    if (!tokenValue) {
      return createNextResponse({ message: 'Authentication token not found.' }, 401);
    }

    // Replace with the actual URL of your Django backend endpoint for token validation
    const djangoValidateTokenUrl = 'http://0.0.0.0:8000/account/token/validate/';

    // Now use tokenValue in your fetch call
    const djangoResponse = await fetch(djangoValidateTokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: tokenValue,
      }),
    });

    // Log the response status and body for debugging
    // console.log(`Response Status: ${djangoResponse.status}`);
    // const responseBody = await djangoResponse.json();
    // console.log('Response Body:', responseBody);

    if (djangoResponse.ok) {
      // The token is valid
      return createNextResponse({ isAuthenticated: true }, 200);
    } else {
      // The token is not valid
      return createNextResponse({ isAuthenticated: false }, djangoResponse.status);
    }
  } catch (error) {
    return createNextResponse({ message: 'Internal Server Error' }, 500);
  }
}
