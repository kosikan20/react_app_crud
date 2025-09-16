import Link from 'next/link';
import { Post } from '@/features/posts/types/post';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.id}`}>
      <div className="border p-4 rounded shadow hover:shadow-lg cursor-pointer">
        <h3 className="font-bold text-lg">{post.title}</h3>
        <p className="text-gray-700 text-sm">
          {post.body.substring(0, 100)}...
        </p>
      </div>
    </Link>
  );
}
