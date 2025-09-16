import { useForm } from '@inertiajs/react';

export default function SearchBar({ placeholder = 'Search...', onSearch, initialValue = '' }) {
    const { data, setData, reset } = useForm({
        search: initialValue,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(data.search);
        }
    };

    const handleClear = () => {
        reset();
        if (onSearch) {
            onSearch('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex">
            <input
                type="text"
                value={data.search}
                onChange={(e) => setData('search', e.target.value)}
                placeholder={placeholder}
                className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {data.search && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 focus:outline-none"
                >
                    Clear
                </button>
            )}
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
            >
                Search
            </button>
        </form>
    );
}
