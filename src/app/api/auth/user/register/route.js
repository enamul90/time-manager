// app/api/auth/register/route.ts
import { connectDB } from '@/app/lib/db';
import User from '@/app/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  await connectDB();
  const { name, email, password } = await req.json();

  const userExists = await User.findOne({ email });
  
  if (userExists) {
    return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  const token = jwt.sign({ id: user._id, email:email }, "12-ejrfewjf-333-hvgjdfkhgk", { expiresIn: '7d' });

  const res = NextResponse.json({ message: 'Registered successfully' });
  res.cookies.set('token', token, { httpOnly: true });
  return res;
}