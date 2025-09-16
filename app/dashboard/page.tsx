import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const userCookie = (await cookies()).get('user');

  if (!userCookie) {
    redirect('/login');
  }

  const user = JSON.parse(userCookie.value);

  return (
    <div>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome, {user.name}!</p>
      </div>
    </div>
  );
}
