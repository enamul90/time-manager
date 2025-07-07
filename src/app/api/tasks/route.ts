import { getAuthUser } from '@/app/lib/auth';
import { connectDB } from '@/app/lib/db';
import Task from '@/app/models/Task';


import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {

  await connectDB();
  const user = await getAuthUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { workID , tittle, time, description } = await req.json();

  await Task.create({ workID , tittle, time, description });

  const res = NextResponse.json({ message: 'Task created ' });
  return res;
}


export async function put(req: NextRequest) {

  await connectDB();
  const user = await getAuthUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { workID  } = await req.json();
  console.log(workID)

  const data = await Task.find({ workID}).sort({ _id: -1 });

  const res = NextResponse.json({ message: 'day created ', data });
  return res;
}