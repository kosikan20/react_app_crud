'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface EditUserProps {
  params: Promise<{ id: string }>;
}

export default function EditUserPage({ params }: EditUserProps) {
  const router = useRouter();
  const { id } = use(params);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`
      );
      const data = await res.json();
      setUser({ name: data.name, email: data.email });
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    router.push('/users');
  };

  if (!user) return <p>Loading user...</p>;

  return (
    <div className="max-w-md mx-auto mt-6 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            className="w-full border p-2 rounded"
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            className="w-full border p-2 rounded"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}
