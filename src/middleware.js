import { NextResponse } from 'next/server';
import { verifyToken } from './lib/jose';

export function middleware(req) {
  const token = req.cookies.get('token')?.value;
  console.log('Token in middleware:', token); // Debugging line

console.log(verifyToken(token))
  if (!token || !verifyToken(token)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard'],
};
