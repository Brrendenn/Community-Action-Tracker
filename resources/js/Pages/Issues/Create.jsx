import React from 'react'; 
import { Head, Link, useForm, usePage } from '@inertiajs/react'; 

import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import CommunityLayout from '@/Layouts/CommunityLayout';

export default function Create() {
    const { auth } = usePage().props;

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
        post(route('issues.store'), {
             onSuccess: () => reset(),
        });
    };

    return (
        <CommunityLayout
            user={auth.user} 
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Report a New Issue</h2>}
        >
            <Head title="Report New Issue" /> 

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
                                        required 
                                    />
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
                                        required 
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
                                        required 
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="photo" value="Photo (Optional)" />
                                    
                                    <input
                                        type="file"
                                        id="photo"
                                        name="photo" 
                                        className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                        onChange={(e) => setData('photo', e.target.files[0])} 
                                    />
                                    <InputError message={errors.photo} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <Link href={route('issues.index')} className="text-sm text-gray-600 hover:text-gray-900 mr-4">
                                        Cancel
                                    </Link>
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        {processing ? 'Reporting...' : 'Report Issue'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </CommunityLayout>
    );
}