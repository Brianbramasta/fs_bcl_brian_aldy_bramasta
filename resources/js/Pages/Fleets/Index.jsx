import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import SearchBar from '@/Components/SearchBar';

export default function FleetsIndex({ auth, fleets, filters, vehicleTypes }) {
    const { data, setData, get } = useForm({
        search: filters.search || '',
        availability: filters.availability || '',
        vehicle_type: filters.vehicle_type || '',
    });

    const handleSearch = (searchTerm) => {
        setData('search', searchTerm);
        get(route('fleets.index', { ...data, search: searchTerm }));
    };

    const handleFilter = (e) => {
        const { name, value } = e.target;
        setData(name, value);
        get(route('fleets.index', { ...data, [name]: value }));
    };

    const clearFilters = () => {
        setData({
            search: '',
            availability: '',
            vehicle_type: '',
        });
        get(route('fleets.index'));
    };

    return (
        <AppLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Fleet Management</h2>}
        >
            <Head title="Fleets" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium">Fleet List</h3>
                                {auth.user.role === 'admin' && (
                                    <Link
                                        href={route('fleets.create')}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Add New Fleet
                                    </Link>
                                )}
                            </div>

                            {/* Search and Filters */}
                            <div className="mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="md:col-span-2">
                                        <SearchBar
                                            placeholder="Search by fleet number or vehicle type..."
                                            onSearch={handleSearch}
                                            initialValue={filters.search || ''}
                                        />
                                    </div>
                                    <div>
                                        <select
                                            name="availability"
                                            value={data.availability}
                                            onChange={handleFilter}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        >
                                            <option value="">All Availability</option>
                                            <option value="available">Available</option>
                                            <option value="unavailable">Unavailable</option>
                                        </select>
                                    </div>
                                    <div>
                                        <select
                                            name="vehicle_type"
                                            value={data.vehicle_type}
                                            onChange={handleFilter}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        >
                                            <option value="">All Vehicle Types</option>
                                            {vehicleTypes.map((type) => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-gray-500 hover:text-gray-700"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Fleet Number
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Vehicle Type
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Availability
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Capacity
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {fleets.map((fleet) => (
                                            <tr key={fleet.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{fleet.fleet_number}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{fleet.vehicle_type}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        fleet.availability === 'available'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {fleet.availability}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {fleet.capacity} kg
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Link href={route('fleets.show', fleet.id)} className="text-blue-600 hover:text-blue-900 mr-3">
                                                        View
                                                    </Link>
                                                    {auth.user.role === 'admin' && (
                                                        <>
                                                            <Link href={route('fleets.edit', fleet.id)} className="text-indigo-600 hover:text-indigo-900 mr-3">
                                                                Edit
                                                            </Link>
                                                            <Link href={route('fleets.destroy', fleet.id)} method="delete" className="text-red-600 hover:text-red-900">
                                                                Delete
                                                            </Link>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
