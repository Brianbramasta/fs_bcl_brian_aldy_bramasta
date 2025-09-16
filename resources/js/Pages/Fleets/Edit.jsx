import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function FleetsEdit({ auth, fleet }) {
    const { data, setData, put, processing, errors } = useForm({
        fleet_number: fleet.fleet_number,
        vehicle_type: fleet.vehicle_type,
        capacity: fleet.capacity,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('fleets.update', fleet.id));
    };

    return (
        <AppLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Fleet</h2>}
        >
            <Head title="Edit Fleet" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fleet_number">
                                        Fleet Number
                                    </label>
                                    <input
                                        id="fleet_number"
                                        type="text"
                                        value={data.fleet_number}
                                        onChange={(e) => setData('fleet_number', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                    {errors.fleet_number && <div className="text-red-500 text-xs italic mt-2">{errors.fleet_number}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicle_type">
                                        Vehicle Type
                                    </label>
                                    <input
                                        id="vehicle_type"
                                        type="text"
                                        value={data.vehicle_type}
                                        onChange={(e) => setData('vehicle_type', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                    {errors.vehicle_type && <div className="text-red-500 text-xs italic mt-2">{errors.vehicle_type}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="capacity">
                                        Capacity (kg)
                                    </label>
                                    <input
                                        id="capacity"
                                        type="number"
                                        step="0.01"
                                        value={data.capacity}
                                        onChange={(e) => setData('capacity', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                    {errors.capacity && <div className="text-red-500 text-xs italic mt-2">{errors.capacity}</div>}
                                </div>

                                <div className="flex items-center justify-between">
                                    <Link
                                        href={route('fleets.index')}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Update Fleet
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
