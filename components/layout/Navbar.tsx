import { cookies } from 'next/headers';
import Link from 'next/link';
import LogoutButton from './Logout';

export default async function Navbar() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('user');
  let user = null;

  if (userCookie) {
    try {
      user = JSON.parse(userCookie.value);
    } catch (error) {
      console.error('Error parsing user cookie:', error);
    }
  }

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between">
      <div className="font-bold text-xl">My App</div>
      <div className="flex items-center space-x-4">
        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link href="/users" className="hover:underline">
          Users
        </Link>
        <Link href="/posts" className="hover:underline">
          Posts
        </Link>
        {user ? (
          <div className="flex items-center space-x-4">
            <span>Hi {user.name}</span>
            <LogoutButton />
          </div>
        ) : (
          <Link href="/login" className="hover:underline">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
