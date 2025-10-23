import React, { useState } from 'react';

// --- Helper Components & Mocks (Self-contained for preview) ---
// In a real Laravel project, you would import these from the files created by `breeze:install`.
// They are defined here to make the component previewable.

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

const AuthenticatedLayout = ({ user, header, children }) => (
    <div className="min-h-screen bg-gray-100 font-sans">
        <nav className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center font-bold text-gray-800">Community Tracker</div>
                    <div className="flex items-center text-gray-600">{user.name}</div>
                </div>
            </div>
        </nav>
        {header && (
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
            </header>
        )}
        <main>{children}</main>
    </div>
);

// Mock Head and Link components for preview
const Head = ({ title }) => {
    React.useEffect(() => { console.log(`Setting document title to: ${title}`); }, [title]);
    return null;
};
const Link = ({ href, className, children }) => <a href={href} className={className}>{children}</a>;

// --- Main Edit Component ---
export default function Edit() {
    const auth = { user: { name: 'Current User' } };
    const issue = {
        id: 1,
        title: 'Flickering Streetlight',
        location: 'Corner of Oak & Maple',
        description: 'The streetlight at this corner has been flickering for several days, creating a potential safety hazard at night.',
        photo_path: 'issue_photos/existing_photo.jpg',
    };
    const errors = {};
    const [data, setData] = useState({
        title: issue.title,
        location: issue.location,
        description: issue.description,
        photo: null,
    });
    const [processing, setProcessing] = useState(false);

    const handleOnChange = (event) => {
        const { name, value, type, files } = event.target;
        setData(previousData => ({
            ...previousData,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);
        console.log('Submitting updated data:', data);
        setTimeout(() => {
            setProcessing(false);
            const messageBox = document.createElement('div');
            messageBox.textContent = 'Issue updated successfully! (Simulation)';
            messageBox.style.cssText = 'position:fixed;top:1rem;right:1rem;padding:1rem;background-color:#4CAF50;color:white;border-radius:5px;box-shadow:0 2px 5px rgba(0,0,0,0.2);z-index:1000;';
            document.body.appendChild(messageBox);
            setTimeout(() => document.body.removeChild(messageBox), 3000);
        }, 1500);
    };

    return (
        <AuthenticatedLayout
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
        </AuthenticatedLayout>
    );
}

