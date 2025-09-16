import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ShipmentsEdit({ auth, shipment, fleets }) {
    const { data, setData, put, processing, errors } = useForm({
        shipment_number: shipment.shipment_number,
        shipment_date: shipment.shipment_date,
        origin_location: shipment.origin_location,
        destination_location: shipment.destination_location,
        fleet_id: shipment.fleet_id,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('shipments.update', shipment.id));
    };

    return (
        <AppLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Shipment</h2>}
        >
            <Head title="Edit Shipment" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shipment_number">
                                        Shipment Number
                                    </label>
                                    <input
                                        id="shipment_number"
                                        type="text"
                                        value={data.shipment_number}
                                        onChange={(e) => setData('shipment_number', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                    {errors.shipment_number && <div className="text-red-500 text-xs italic mt-2">{errors.shipment_number}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shipment_date">
                                        Shipment Date
                                    </label>
                                    <input
                                        id="shipment_date"
                                        type="date"
                                        value={data.shipment_date}
                                        onChange={(e) => setData('shipment_date', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                    {errors.shipment_date && <div className="text-red-500 text-xs italic mt-2">{errors.shipment_date}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="origin_location">
                                        Origin Location
                                    </label>
                                    <input
                                        id="origin_location"
                                        type="text"
                                        value={data.origin_location}
                                        onChange={(e) => setData('origin_location', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                    {errors.origin_location && <div className="text-red-500 text-xs italic mt-2">{errors.origin_location}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="destination_location">
                                        Destination Location
                                    </label>
                                    <input
                                        id="destination_location"
                                        type="text"
                                        value={data.destination_location}
                                        onChange={(e) => setData('destination_location', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                    {errors.destination_location && <div className="text-red-500 text-xs italic mt-2">{errors.destination_location}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fleet_id">
                                        Select Fleet
                                    </label>
                                    <select
                                        id="fleet_id"
                                        value={data.fleet_id}
                                        onChange={(e) => setData('fleet_id', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    >
                                        <option value="">Select a fleet</option>
                                        {fleets.map((fleet) => (
                                            <option key={fleet.id} value={fleet.id}>
                                                {fleet.fleet_number} - {fleet.vehicle_type} ({fleet.availability})
                                            </option>
                                        ))}
                                    </select>
                                    {errors.fleet_id && <div className="text-red-500 text-xs italic mt-2">{errors.fleet_id}</div>}
                                </div>

                                <div className="flex items-center justify-between">
                                    <Link
                                        href={route('shipments.index')}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Update Shipment
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
