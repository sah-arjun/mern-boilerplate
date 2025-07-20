import React, { ReactNode } from 'react';
import Link from 'next/link';

type AuthLayoutProps = {
  children?: ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => (
  <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gray-50">
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      {children}

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          New user?{' '}
          <Link href="/register" className="text-blue-600 hover:underline font-semibold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  </main>
);

export default AuthLayout;
