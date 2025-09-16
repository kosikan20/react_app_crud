import { NextRequest, NextResponse } from 'next/server';
import { usersStore } from '@/features/users/data/users';

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  const user = usersStore.data.find((u) => u.id === Number(id));
  return NextResponse.json(user || {});
}

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  const data = await req.json();
  usersStore.data = usersStore.data.map((u) =>
    u.id === Number(id) ? { ...u, ...data } : u
  );
  return NextResponse.json(data);
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  usersStore.data = usersStore.data.filter((u) => u.id !== Number(id));
  return NextResponse.json({ success: true });
}
