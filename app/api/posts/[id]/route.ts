import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  );
  if (!res.ok) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
  const post = await res.json();
  return NextResponse.json(post);
}
