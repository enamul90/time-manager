import { getAuthUser } from '@/app/lib/auth';
import { connectDB } from '@/app/lib/db';
import Task from '@/app/models/Task';


import { NextRequest, NextResponse } from 'next/server';



export async function GET(req: NextRequest, { params }: { params: { id: string } }) {

  await connectDB();
  const user = await getAuthUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });


  const data = await Task.find({ workID : params.id}).sort({ _id: -1 });

  const res = NextResponse.json({ message: 'day created ', data });
  return res;
}