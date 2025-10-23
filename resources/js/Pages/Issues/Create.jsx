import React, { useState } from 'react';

// --- Helper Components (Self-contained for preview) ---
// In your actual Laravel project, you would import these from the files
// created by `breeze:install`. We are defining them here so the preview works.

const InputLabel = ({ value, className = '', children, ...props }) => {
    return (
        <label {...props} className={`block font-medium text-sm text-gray-700 ` + className}>
            {value ? value : children}
        </label>
    );
};

const TextInput = React.forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : React.useRef();

    React.useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
                className
            }
            ref={input}
        />
    );
});

const InputError = ({ message, className = '', ...props }) => {
    return message ? (
        <p {...props} className={'text-sm text-red-600 ' + className}>
            {message}
        </p>
    ) : null;
};

const PrimaryButton = ({ className = '', disabled, children, ...props }) => {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
};

// Simplified layout for preview purposes
const AuthenticatedLayout = ({ user, header, children }) => (
    <div className="min-h-screen bg-gray-100">
        <nav className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center font-bold">Community Tracker</div>
                    <div className="flex items-center">{user.name}</div>
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


// --- Main Create Component ---
export default function Create() {
    // Mock user for preview
    const auth = { user: { name: 'John Doe' } };

    // Replace Inertia's useForm with React's useState
    const [data, setData] = useState({
        title: '',
        location: '',
        description: '',
        photo: null,
    });
    const [processing, setProcessing] = useState(false);
    // Mock errors for demonstration
    const [errors, setErrors] = useState({
        title: '',
        location: '',
        description: '',
        photo: ''
    });

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.type === 'file' ? event.target.files[0] : event.target.value });
    };

    const submit = (e) => {
        e.preventDefault();
        setProcessing(true);
        // In a real Inertia app, a `post()` function would handle the submission.
        // Here, we just log it to the console.
        console.log('Submitting data:', data);
        // Simulate end of processing
        setTimeout(() => setProcessing(false), 1000);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Report a New Issue</h2>}
        >
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
                                    <InputLabel htmlFor="photo" value="Photo (Optional)" />
                                    <input
                                        type="file"
                                        id="photo"
                                        name="photo"
                                        className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                        onChange={handleOnChange}
                                    />
                                    <InputError message={errors.photo} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <a href="#" className="text-sm text-gray-600 hover:text-gray-900 mr-4">
                                        Cancel
                                    </a>
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        Report Issue
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

