
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function getAuthUser() {
  const cookieStore = await cookies(); 
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, "12-ejrfewjf-333-hvgjdfkhgk");

    return decoded as { id: string };
  } 
  
  catch (e) {
    return null;
  }
}