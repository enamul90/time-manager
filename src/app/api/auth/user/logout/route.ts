import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {

    const response = NextResponse.json({ message: 'Registered successfully' });

    // Example: Clear specific cookies
    req.cookies.getAll().forEach(cookie => {
        response.cookies.delete(cookie.name);
    });

    response.cookies.delete('token');
    response.cookies.delete('session_id');

    return response;
}