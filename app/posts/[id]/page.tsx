import { Post } from '@/features/posts/types/post';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: Promise<{ id: string }>;
}

async function getPost(id: string): Promise<Post | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`,
    { cache: 'no-store' }
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function PostPage(context: PostPageProps) {
  const { id } = await context.params;
  const post = await getPost(id);

  if (!post) return notFound();

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-700">{post.body}</p>
    </div>
  );
}
