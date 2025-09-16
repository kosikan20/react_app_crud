'use client';
import React, { useState } from 'react';
import { User } from '@/features/users/types/user';

import { useRouter } from 'next/navigation';

interface UserFormProps {
  user?: User;
  onSubmit?: (data: { name: string; email: string }) => void;
}

export default function UserForm({ user, onSubmit }: UserFormProps) {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ name, email });
    } else {
      // Default API submit
      const method = user ? 'PUT' : 'POST';
      const url = user
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${user.id}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`;
      await fetch(url, {
        method,
        body: JSON.stringify({ name, email }),
      });
      router.push('/users');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <input
        type="text"
        placeholder="Name"
        className="border p-2 w-full rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {user ? 'Update' : 'Create'} User
      </button>
    </form>
  );
}
