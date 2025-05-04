import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/jose';
import connectDB from '@/lib/connectDB';
import User from '@/models/User';

export default async function DashboardPage() {
  const token = (await cookies()).get('token')?.value;
  const decoded = await verifyToken(token);

  if (!decoded) {
    return <div>Access Denied</div>;
  }
console.log(decoded)
  await connectDB();
  const user = await User.findById(decoded.id).select('-password -__v');
  console.log(user);

  return <div>Welcome, {user?.username} </div>;
}
