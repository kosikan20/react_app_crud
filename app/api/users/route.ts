import { NextRequest, NextResponse } from 'next/server';
import { usersStore } from '@/features/users/data/users';
import { User } from '@/features/users/types/user';

export async function GET() {
  return NextResponse.json(usersStore.data);
}

export async function POST(req: NextRequest) {
  const data: { name: string; email: string } = await req.json();

  const newId = usersStore.data.length > 0 ? usersStore.data.length + 1 : 1;

  const newUser: User = { id: newId, ...data };
  usersStore.data.push(newUser);

  return NextResponse.json(newUser);
}
