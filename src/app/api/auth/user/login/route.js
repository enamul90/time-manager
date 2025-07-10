import { connectDB } from '@/app/lib/db';
import User from '@/app/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req, NextRequest) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });

 
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });


  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const token = jwt.sign({ id: user._id, email:email }, "12-ejrfewjf-333-hvgjdfkhgk", { expiresIn: '7d' });

  const res = NextResponse.json({ message: 'Login successful' });
  res.cookies.set('token', token, { httpOnly: true });
  return res;
}