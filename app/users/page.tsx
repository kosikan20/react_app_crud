'use client';
import React, { useState, useEffect } from 'react';
import UserCard from '@/features/users/components/UserCard';
import { User } from '@/features/users/types/user';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`, {
      cache: 'no-store',
    });
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserDeleted = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  if (!users.length) return <p className="p-4">No users found.</p>;

  return (
    <div className="p-6">
      {users.map((user) => (
        <UserCard key={user.id} user={user} onDeleted={handleUserDeleted} />
      ))}
    </div>
  );
}
