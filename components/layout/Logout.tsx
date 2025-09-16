'use client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <button
      onClick={logout}
      className="bg-red-500 px-2 py-1 rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
}
