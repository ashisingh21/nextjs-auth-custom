import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/connectDB';
import User from '@/models/User';

export async function POST(req) {
  const { username, email, password } = await req.json();
  await connectDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) return NextResponse.json({ error: 'Email already in use' }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });

  return NextResponse.json({ message: 'User registered', user });
}
