import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';

export default function FleetsShow({ auth, fleet }) {
    return (
        <AppLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fleet Details</h2>}
        >
            <Head title="Fleet Details" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-4">Fleet Information</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="font-medium">Fleet Number:</label>
                                            <p className="ml-2 inline">{fleet.fleet_number}</p>
                                        </div>
                                        <div>
                                            <label className="font-medium">Vehicle Type:</label>
                                            <p className="ml-2 inline">{fleet.vehicle_type}</p>
                                        </div>
                                        <div>
                                            <label className="font-medium">Availability:</label>
                                            <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                fleet.availability === 'available'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {fleet.availability}
                                            </span>
                                        </div>
                                        <div>
                                            <label className="font-medium">Capacity:</label>
                                            <p className="ml-2 inline">{fleet.capacity} kg</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-4">Associated Shipments</h3>
                                    {fleet.shipments && fleet.shipments.length > 0 ? (
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Shipment Number
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Status
                                                        </th>
                                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Destination
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                    {fleet.shipments.map((shipment) => (
                                                        <tr key={shipment.id}>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <Link href={route('shipments.show', shipment.id)} className="text-blue-600 hover:text-blue-900">
                                                                    {shipment.shipment_number}
                                                                </Link>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                    shipment.status === 'pending'
                                                                        ? 'bg-yellow-100 text-yellow-800'
                                                                        : shipment.status === 'in_transit'
                                                                            ? 'bg-blue-100 text-blue-800'
                                                                            : 'bg-green-100 text-green-800'
                                                                }`}>
                                                                    {shipment.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                                {shipment.destination_location}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500">No shipments assigned to this fleet.</p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-between">
                                <Link
                                    href={route('fleets.index')}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Back to Fleets
                                </Link>
                                {auth.user.role === 'admin' && (
                                    <div>
                                        <Link
                                            href={route('fleets.edit', fleet.id)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            href={route('fleets.destroy', fleet.id)}
                                            method="delete"
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Delete
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
