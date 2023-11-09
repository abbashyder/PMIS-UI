import { auth } from "auth"
import { redirect } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';


export default async function LoginPage() {
  const session = await auth();
  if (session) {
    redirect('/dashboard');
  }
  return <LoginForm />;
}
