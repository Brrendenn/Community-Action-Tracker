import React from 'react'; // Keep React import
import { Head, Link, useForm, usePage } from '@inertiajs/react'; // <-- Import useForm and usePage

// --- Import Helper Components ---
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Assuming you have this layout

// --- Main Create Component ---
export default function Create() {
    // Get the authenticated user from Inertia props
    const { auth } = usePage().props;

    // Use Inertia's useForm hook
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        location: '',
        description: '',
        photo: null,
    });

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.type === 'file' ? event.target.files[0] : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        // Use the 'post' method from useForm to submit to the Laravel route
        post(route('issues.store'), {
            // Optional: reset the form on success
             onSuccess: () => reset(),
        });
    };

    return (
        // Use the actual AuthenticatedLayout and pass the auth user
        <AuthenticatedLayout
            user={auth.user} // Pass the actual user object
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Report a New Issue</h2>}
        >
            <Head title="Report New Issue" /> {/* Use Inertia's Head */}

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="title" value="Issue Title" />
                                    <TextInput
                                        id="title"
                                        name="title"
                                        value={data.title}
                                        className="mt-1 block w-full"
                                        autoComplete="title"
                                        isFocused={true}
                                        onChange={handleOnChange}
                                        required // Add required if needed
                                    />
                                    {/* Display errors from Inertia */}
                                    <InputError message={errors.title} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="location" value="Location" />
                                    <TextInput
                                        id="location"
                                        name="location"
                                        value={data.location}
                                        className="mt-1 block w-full"
                                        placeholder="e.g., Corner of Main St & Park Ave"
                                        onChange={handleOnChange}
                                        required // Add required if needed
                                    />
                                    <InputError message={errors.location} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="description" value="Description" />
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        rows="5"
                                        onChange={handleOnChange}
                                        required // Add required if needed
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="photo" value="Photo (Optional)" />
                                    {/* Use a specific input for files with useForm */}
                                    <input
                                        type="file"
                                        id="photo"
                                        name="photo" // Make sure name matches the state key
                                        className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                        onChange={(e) => setData('photo', e.target.files[0])} // Directly set file data
                                    />
                                    <InputError message={errors.photo} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    {/* Use Inertia's Link for navigation */}
                                    <Link href={route('issues.index')} className="text-sm text-gray-600 hover:text-gray-900 mr-4">
                                        Cancel
                                    </Link>
                                    {/* Disable button while processing */}
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        {processing ? 'Reporting...' : 'Report Issue'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}