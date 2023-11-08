import { NextRequest } from 'next/server';
import { createNextResponse } from '@/utils/api/response';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    };

    const djangoResponse = await fetch('http://0.0.0.0:8000/account/token/', fetchOptions);

    if (djangoResponse.ok) {
      const data = await djangoResponse.json();
      const response = createNextResponse(data, 200);

      response.cookies.set('access_token', data.access, {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
      });

      response.cookies.set('refresh_token', data.refresh, {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
      });

      return response;
    } else {
      const errorData = await djangoResponse.json();
      return createNextResponse(errorData, djangoResponse.status);
    }
  } catch (error) {
    return createNextResponse({ message: 'Internal Server Error' }, 500);
  }
}
