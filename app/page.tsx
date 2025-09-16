import Link from 'next/link';

import { Post } from '@/features/posts/types/post';
import { User } from '@/features/users/types/user';

async function getUsers(): Promise<User[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
    cache: 'no-store',
  });
  return res.json();
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    cache: 'no-store',
  });
  return res.json();
}

export default async function Home() {
  const [users, posts] = await Promise.all([getUsers(), getPosts()]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Users</h2>
          <p className="text-gray-600 mb-4">Total Users: {users.length}</p>
          <Link
            href="/users"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Manage Users
          </Link>
        </div>

        <div className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Posts</h2>
          <p className="text-gray-600 mb-4">Total Posts: {posts.length}</p>
          <Link
            href="/posts"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            View Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
