import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function CheckInsCreate({ auth, fleets }) {
    const { data, setData, post, processing, errors } = useForm({
        fleet_id: fleets.length === 1 ? fleets[0].id : '',
        latitude: '',
        longitude: '',
    });

    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [locationError, setLocationError] = useState(null);

    // Get user's current location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                    setData('latitude', position.coords.latitude);
                    setData('longitude', position.coords.longitude);
                },
                (error) => {
                    setLocationError('Unable to retrieve your location. Please enter manually.');
                }
            );
        } else {
            setLocationError('Geolocation is not supported by your browser. Please enter coordinates manually.');
        }
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('check-ins.store'));
    };

    return (
        <AppLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Check In Location</h2>}
        >
            <Head title="Check In" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                {fleets.length > 1 && (
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
                                                    {fleet.fleet_number} - {fleet.vehicle_type}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.fleet_id && <div className="text-red-500 text-xs italic mt-2">{errors.fleet_id}</div>}
                                    </div>
                                )}

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="latitude">
                                        Latitude
                                    </label>
                                    <input
                                        id="latitude"
                                        type="text"
                                        value={data.latitude}
                                        onChange={(e) => setData('latitude', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                    {errors.latitude && <div className="text-red-500 text-xs italic mt-2">{errors.latitude}</div>}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="longitude">
                                        Longitude
                                    </label>
                                    <input
                                        id="longitude"
                                        type="text"
                                        value={data.longitude}
                                        onChange={(e) => setData('longitude', e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        required
                                    />
                                    {errors.longitude && <div className="text-red-500 text-xs italic mt-2">{errors.longitude}</div>}
                                </div>

                                {locationError && (
                                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4" role="alert">
                                        <span className="block sm:inline">{locationError}</span>
                                    </div>
                                )}

                                {location.latitude && location.longitude && (
                                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                                        <span className="block sm:inline">
                                            Current location detected: {location.latitude}, {location.longitude}
                                        </span>
                                    </div>
                                )}

                                <div className="flex items-center justify-between">
                                    <Link
                                        href={route('check-ins.index')}
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Check In
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
