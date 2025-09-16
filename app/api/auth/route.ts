import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const users = [
  { username: 'user', password: 'password', name: 'John' },
  { username: 'admin', password: '123', name: 'Admin' },
];

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    (await cookies()).set(
      'user',
      JSON.stringify({ username: user.username, name: user.name }),
      {
        httpOnly: true,
        maxAge: 60 * 60 * 24, // 24 hours
      }
    );

    return NextResponse.json({
      success: true,
      user: { username: user.username, name: user.name },
    });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
