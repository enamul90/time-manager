import { getAuthUser } from '@/app/lib/auth';
import { connectDB } from '@/app/lib/db';
import WorkDays from '@/app/models/Work-day';

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {

  await connectDB();
  const user = await getAuthUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { workDay } = await req.json();

  await WorkDays.create({ userID: user.id, workday: workDay });

  const res = NextResponse.json({ message: 'day created ' });
  return res;
}


export async function GET(req: NextRequest) {

  await connectDB();
  const user = await getAuthUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const data = await WorkDays.find({ userID: user.id }).sort({ _id: -1 });

  const res = NextResponse.json({ message: 'day created ', data });
  return res;
}