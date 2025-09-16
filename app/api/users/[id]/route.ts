import { NextRequest, NextResponse } from 'next/server';
import { usersStore } from '@/features/users/data/users';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = usersStore.data.find((u) => u.id === Number(params.id));
  return NextResponse.json(user || {});
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  usersStore.data = usersStore.data.map((u) =>
    u.id === Number(params.id) ? { ...u, ...data } : u
  );
  return NextResponse.json(data);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  usersStore.data = usersStore.data.filter((u) => u.id !== Number(params.id));
  return NextResponse.json({ success: true });
}
