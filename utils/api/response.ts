import { NextResponse } from 'next/server';

export function createNextResponse(data: any, statusCode: number, cookies?: { name: string, value: string, options: any }[]) {
  const jsonBody = JSON.stringify(data);
  const response = new NextResponse(jsonBody, {
    status: statusCode,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (cookies) {
    cookies.forEach(cookie => {
      response.cookies.set(cookie.name, cookie.value, cookie.options);
    });
  }

  return response;
}
