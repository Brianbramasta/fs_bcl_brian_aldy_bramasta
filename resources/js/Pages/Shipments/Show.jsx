import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';

export default function ShipmentsShow({ auth, shipment }) {
    return (
        <AppLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Shipment Details</h2>}
        >
            <Head title="Shipment Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-4">Shipment Information</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="font-medium">Shipment Number:</label>
                                            <p className="ml-2 inline">{shipment.shipment_number}</p>
                                        </div>
                                        <div>
                                            <label className="font-medium">Shipment Date:</label>
                                            <p className="ml-2 inline">{shipment.shipment_date}</p>
                                        </div>
                                        <div>
                                            <label className="font-medium">Origin Location:</label>
                                            <p className="ml-2 inline">{shipment.origin_location}</p>
                                        </div>
                                        <div>
                                            <label className="font-medium">Destination Location:</label>
                                            <p className="ml-2 inline">{shipment.destination_location}</p>
                                        </div>
                                        <div>
                                            <label className="font-medium">Status:</label>
                                            <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                shipment.status === 'pending'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : shipment.status === 'in_transit'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'bg-green-100 text-green-800'
                                            }`}>
                                                {shipment.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-4">Fleet Information</h3>
                                    {shipment.fleet ? (
                                        <div className="space-y-3">
                                            <div>
                                                <label className="font-medium">Fleet Number:</label>
                                                <p className="ml-2 inline">{shipment.fleet.fleet_number}</p>
                                            </div>
                                            <div>
                                                <label className="font-medium">Vehicle Type:</label>
                                                <p className="ml-2 inline">{shipment.fleet.vehicle_type}</p>
                                            </div>
                                            <div>
                                                <label className="font-medium">Availability:</label>
                                                <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    shipment.fleet.availability === 'available'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {shipment.fleet.availability}
                                                </span>
                                            </div>
                                            <div>
                                                <label className="font-medium">Capacity:</label>
                                                <p className="ml-2 inline">{shipment.fleet.capacity} kg</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500">No fleet assigned to this shipment.</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <Link
                                    href={route('shipments.index')}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Back to Shipments
                                </Link>
                                {(auth.user.role === 'admin' || (auth.user.role === 'pelanggan' && shipment.customer_id === auth.user.id)) && (
                                    <Link
                                        href={route('shipments.edit', shipment.id)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Edit
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
