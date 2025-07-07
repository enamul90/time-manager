
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/db';
import { getAuthUser } from '@/app/lib/auth';
import Task from '@/app/models/Task';

export async function GET(
  req: NextRequest,
   context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const user = await getAuthUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params; 

  const data = await Task.find({ workID: id }).sort({ _id: -1 });

  return NextResponse.json({ message: 'Day created', data });
}
