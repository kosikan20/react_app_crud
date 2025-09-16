import { notFound } from 'next/navigation';
import Link from 'next/link';
import { User } from '@/features/users/types/user';

interface UserPageProps {
  params: Promise<{ id: string }>;
}

async function getUser(id: string): Promise<User | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`,
    {
      cache: 'no-store',
    }
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function UserPage(context: UserPageProps) {
  const { id } = await context.params;
  const user = await getUser(id);

  if (!user) return notFound();

  return (
    <div className="max-w-md mx-auto mt-6 p-6 border rounded shadow">
      <h1 className="text-3xl font-bold mb-4">{user.name}</h1>
      <p className="text-gray-700 mb-2">
        <strong>Email:</strong> {user.email}
      </p>
      <div className="flex space-x-2 mt-4">
        <Link
          href={`/users/${user.id}/edit`}
          className="bg-yellow-400 px-4 py-2 rounded text-white hover:bg-yellow-500"
        >
          Edit
        </Link>
        <Link
          href="/users"
          className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600"
        >
          Back to Users
        </Link>
      </div>
    </div>
  );
}
