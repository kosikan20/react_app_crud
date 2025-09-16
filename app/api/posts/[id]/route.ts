import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
  const post = await res.json();
  return NextResponse.json(post);
}
