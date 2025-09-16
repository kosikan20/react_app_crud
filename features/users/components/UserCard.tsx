'use client';
import React, { useState } from 'react';
import { User } from '@/features/users/types/user';
import Link from 'next/link';

interface UserCardProps {
  user: User;
  onDeleted?: (id: number) => void; // callback to update parent state
}

export default function UserCard({ user, onDeleted }: UserCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await fetch(`/api/users/${user.id}`, { method: 'DELETE' });
      onDeleted?.(user.id);
    } catch (err) {
      console.error(err);
      alert('Failed to delete user');
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="border p-4 rounded shadow flex justify-between items-center mb-2">
      <div>
        <h3 className="font-bold">{user.name}</h3>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>
      <div className="space-x-2">
        <Link
          href={`/users/${user.id}`}
          className="bg-green-400 px-3 py-1 rounded text-white hover:bg-green-500"
        >
          View
        </Link>
        <Link
          href={`/users/${user.id}/edit`}
          className="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500"
        >
          Edit
        </Link>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded shadow max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete {user.name}?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
