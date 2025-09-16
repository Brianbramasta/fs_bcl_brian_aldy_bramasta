import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import SearchBar from '@/Components/SearchBar';

export default function ShipmentsIndex({ auth, shipments, fleets, filters }) {
    const { data, setData, get } = useForm({
        search: filters.search || '',
        status: filters.status || '',
        fleet_id: filters.fleet_id || '',
    });

    const handleSearch = (searchTerm) => {
        setData('search', searchTerm);
        get(route('shipments.index', { ...data, search: searchTerm }));
    };

    const handleFilter = (e) => {
        const { name, value } = e.target;
        setData(name, value);
        get(route('shipments.index', { ...data, [name]: value }));
    };

    const clearFilters = () => {
        setData({
            search: '',
            status: '',
            fleet_id: '',
        });
        get(route('shipments.index'));
    };

    return (
        <AppLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Shipment Management</h2>}
        >
            <Head title="Shipments" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-medium">Shipment List</h3>
                                {(auth.user.role === 'pelanggan' || auth.user.role === 'admin') && (
                                    <Link
                                        href={route('shipments.create')}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Book New Shipment
                                    </Link>
                                )}
                            </div>

                            {/* Search and Filters */}
                            <div className="mb-6">
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="md:col-span-2">
                                        <SearchBar
                                            placeholder="Search by shipment number or destination..."
                                            onSearch={handleSearch}
                                            initialValue={filters.search || ''}
                                        />
                                    </div>
                                    <div>
                                        <select
                                            name="status"
                                            value={data.status}
                                            onChange={handleFilter}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        >
                                            <option value="">All Statuses</option>
                                            <option value="pending">Pending</option>
                                            <option value="in_transit">In Transit</option>
                                            <option value="arrived">Arrived</option>
                                        </select>
                                    </div>
                                    <div>
                                        <select
                                            name="fleet_id"
                                            value={data.fleet_id}
                                            onChange={handleFilter}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        >
                                            <option value="">All Fleets</option>
                                            {fleets.map((fleet) => (
                                                <option key={fleet.id} value={fleet.id}>
                                                    {fleet.fleet_number} - {fleet.vehicle_type}
                                                </option>
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
                                                Shipment Number
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Origin
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Destination
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Fleet
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {shipments.map((shipment) => (
                                            <tr key={shipment.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{shipment.shipment_number}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{shipment.shipment_date}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{shipment.origin_location}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{shipment.destination_location}</div>
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
                                                    {shipment.fleet ? shipment.fleet.fleet_number : 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Link href={route('shipments.show', shipment.id)} className="text-blue-600 hover:text-blue-900">
                                                        View
                                                    </Link>
                                                    {(auth.user.role === 'admin' || (auth.user.role === 'pelanggan' && shipment.customer_id === auth.user.id)) && (
                                                        <Link href={route('shipments.edit', shipment.id)} className="text-indigo-600 hover:text-indigo-900 ml-3">
                                                            Edit
                                                        </Link>
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
