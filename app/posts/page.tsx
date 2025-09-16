import PostCard from '@/features/posts/components/PostCard';
import { Post } from '@/features/posts/types/post';

async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    cache: 'no-store',
  });
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
