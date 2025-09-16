import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ShipmentsTrack({ auth, shipment, error }) {
    const { data, setData, get, processing } = useForm({
        shipment_number: '',
    });

    const submit = (e) => {
        e.preventDefault();
        get(route('shipments.track', { shipment_number: data.shipment_number }));
    };

    return (
        <AppLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Track Shipment</h2>}
        >
            <Head title="Track Shipment" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit} className="mb-8">
                                <div className="flex">
                                    <input
                                        type="text"
                                        value={data.shipment_number}
                                        onChange={(e) => setData('shipment_number', e.target.value)}
                                        placeholder="Enter shipment number"
                                        className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    />
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
                                    >
                                        Track
                                    </button>
                                </div>
                            </form>

                            {error && (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                                    <strong className="font-bold">Error: </strong>
                                    <span className="block sm:inline">{error}</span>
                                </div>
                            )}

                            {shipment && (
                                <div className="border rounded-lg p-6">
                                    <h3 className="text-xl font-bold mb-4">Shipment Details</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="text-lg font-medium mb-3">Shipment Information</h4>
                                            <div className="space-y-2">
                                                <div className="flex">
                                                    <span className="font-medium w-40">Shipment Number:</span>
                                                    <span>{shipment.shipment_number}</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="font-medium w-40">Shipment Date:</span>
                                                    <span>{shipment.shipment_date}</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="font-medium w-40">Origin:</span>
                                                    <span>{shipment.origin_location}</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="font-medium w-40">Destination:</span>
                                                    <span>{shipment.destination_location}</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="font-medium w-40">Item Details:</span>
                                                    <span>{shipment.item_details}</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="font-medium w-40">Status:</span>
                                                    <span>
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            shipment.status === 'pending'
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : shipment.status === 'in_transit'
                                                                    ? 'bg-blue-100 text-blue-800'
                                                                    : 'bg-green-100 text-green-800'
                                                        }`}>
                                                            {shipment.status}
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-lg font-medium mb-3">Fleet Information</h4>
                                            {shipment.fleet ? (
                                                <div className="space-y-2">
                                                    <div className="flex">
                                                        <span className="font-medium w-40">Fleet Number:</span>
                                                        <span>{shipment.fleet.fleet_number}</span>
                                                    </div>
                                                    <div className="flex">
                                                        <span className="font-medium w-40">Vehicle Type:</span>
                                                        <span>{shipment.fleet.vehicle_type}</span>
                                                    </div>
                                                    <div className="flex">
                                                        <span className="font-medium w-40">Availability:</span>
                                                        <span>
                                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                                shipment.fleet.availability === 'available'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : 'bg-red-100 text-red-800'
                                                            }`}>
                                                                {shipment.fleet.availability}
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p className="text-gray-500">No fleet assigned to this shipment.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
