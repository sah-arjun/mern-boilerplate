import LoginForm from '@/components/LoginForm';
import AuthLayout from '@/components/AuthLayout';

export default function Home() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
