import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';

export default function CheckInsShow({ auth, checkIn }) {
    return (
        <AppLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Check-In Details</h2>}
        >
            <Head title="Check-In Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-4">Check-In Information</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="font-medium">Fleet:</label>
                                            <p className="ml-2 inline">{checkIn.fleet.fleet_number} - {checkIn.fleet.vehicle_type}</p>
                                        </div>
                                        <div>
                                            <label className="font-medium">Check-In Time:</label>
                                            <p className="ml-2 inline">{checkIn.check_in_time}</p>
                                        </div>
                                        <div>
                                            <label className="font-medium">Latitude:</label>
                                            <p className="ml-2 inline">{checkIn.latitude}</p>
                                        </div>
                                        <div>
                                            <label className="font-medium">Longitude:</label>
                                            <p className="ml-2 inline">{checkIn.longitude}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-4">Location Map</h3>
                                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center">
                                        <span className="text-gray-500">Map Display (Placeholder)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Link
                                    href={route('check-ins.index')}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Back to Check-Ins
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
