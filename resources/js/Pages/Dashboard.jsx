import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    return (
        <AppLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Welcome to the Fleet Management System!
                            <div className="mt-4">
                                {auth.user.role === 'admin' && (
                                    <p>You are logged in as an Administrator.</p>
                                )}
                                {auth.user.role === 'armada' && (
                                    <p>You are logged in as Fleet Personnel.</p>
                                )}
                                {auth.user.role === 'pelanggan' && (
                                    <p>You are logged in as a Customer.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
