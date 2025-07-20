'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const Dashboard = () => {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
        router.replace('/login');
        }
    }, [user, loading, router]);

    if (loading) return <div>Loading...</div>;
    if (!user) return null;
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md">
            <h1 className="text-2xl font-bold mb-2">Welcome, {user?.user?.name || user?.user?.username}!</h1>
            <p className="text-gray-700">You are now logged in to the dashboard.</p>
            <button
                onClick={logout}
                className='mt-4 px-4 py-2 bg-red-500 text-white rounded'
            >
                Logout
            </button>
        </div>
        </div>
    );
};

export default Dashboard;
