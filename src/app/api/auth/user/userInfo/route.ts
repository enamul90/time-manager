import { getAuthUser } from '@/app/lib/auth';
import { connectDB } from '@/app/lib/db';
import User from '@/app/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {

  await connectDB();
  const user =  await getAuthUser()


  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userInfo = await User.findOne({ _id: user.id }).select('-password');
  const res = NextResponse.json({ message: 'user data', data:userInfo });
  return res;
}