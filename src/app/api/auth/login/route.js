import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/connectDB';
import User from '@/models/User';
import { generateToken } from '@/lib/jose';

export async function POST(req) {
  const { email, password } = await req.json();
  await connectDB();

  const user = await User.findOne({ email });
  if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const token = await generateToken(user);

  const response = NextResponse.json({ message: 'Login successful' });
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return response;
}
