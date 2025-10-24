import CommunityLayout from '@/Layouts/CommunityLayout';
import { Head, Link, useForm} from '@inertiajs/react';
import React, { useState } from 'react';

const InputLabel = ({ value, className = '', children, ...props }) => (
    <label {...props} className={`block font-medium text-sm text-gray-700 ` + className}>
        {value ? value : children}
    </label>
);

const TextInput = React.forwardRef(({ type = 'text', className = '', ...props }, ref) => (
    <input
        {...props}
        type={type}
        className={'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' + className}
        ref={ref}
    />
));

const InputError = ({ message, className = '', ...props }) => (
    message ? <p {...props} className={'text-sm text-red-600 ' + className}>{message}</p> : null
);

const PrimaryButton = ({ className = '', disabled, children, ...props }) => (
    <button
        {...props}
        className={
            `inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                disabled && 'opacity-25'
            } ` + className
        }
        disabled={disabled}
    >
        {children}
    </button>
);

export default function Edit({ auth, issue, errors }) {
    const { data, setData, post, processing } = useForm({
        title: issue.title,
        location: issue.location,
        description: issue.description,
        photo: null,
        _method: 'PUT'
    });

    const handleOnChange = (event) => {
        const { name, value, type, files } = event.target;
        setData(name, type === 'file' ? files[0] : value);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('issues.update', issue.id));
    };

    return (
        <CommunityLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Issue: "{issue.title}"</h2>}
        >
            <Head title="Edit Issue" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 md:p-8 text-gray-900">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="title" value="Issue Title" />
                                    <TextInput
                                        id="title"
                                        name="title"
                                        value={data.title}
                                        className="mt-1 block w-full"
                                        onChange={handleOnChange}
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
                                        onChange={handleOnChange}
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
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="photo" value="Replace Photo (Optional)" />
                                    <input
                                        type="file"
                                        id="photo"
                                        name="photo"
                                        className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                        onChange={handleOnChange}
                                    />
                                    {issue.photo_path && <p className="text-sm text-gray-500 mt-2">A photo is currently attached. Uploading a new one will replace it.</p>}
                                    <InputError message={errors.photo} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end mt-6">
                                    <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 mr-4">
                                        Cancel
                                    </Link>
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        {processing ? 'Updating...' : 'Update Issue'}
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

