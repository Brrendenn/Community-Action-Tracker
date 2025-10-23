import React from 'react';

// --- Helper Components & Mocks (Self-contained for preview) ---
// In a real Laravel + Inertia project, you would import these from their
// respective files. They are defined here to make this component previewable.

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

// Mock Head component (does nothing in preview)
const Head = ({ title }) => {
    React.useEffect(() => {
        // This simulates the behavior of setting the document's title
        console.log(`Setting document title to: ${title}`);
    }, [title]);
    return null;
};

// Mock Link component (renders as a standard anchor tag for preview)
const Link = ({ href, className, children }) => (
    <a href={href} className={className}>{children}</a>
);

// The StatusBadge component is already self-contained
const StatusBadge = ({ status }) => {
    const statusClasses = {
        submitted: 'text-blue-700 bg-blue-100',
        in_progress: 'text-yellow-700 bg-yellow-100',
        resolved: 'text-green-700 bg-green-100',
    };
    const formattedStatus = status ? status.replace('_', ' ') : 'unknown';
    return (
        <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold capitalize ${statusClasses[status] || 'bg-gray-200 text-gray-800'}`}>
            {formattedStatus}
        </span>
    );
};


// --- Main Show Component ---
export default function Show() {
    // --- Mock Data (for preview purposes) ---
    // In a real Inertia app, this data would be passed as props from the Laravel controller.
    const auth = {
        user: {
            id: 1,
            name: 'Jane Doe',
        }
    };
    const issue = {
        id: 1,
        title: 'Large Pothole on Elm Street',
        location: 'In front of 123 Elm Street',
        description: 'There is a large and dangerous pothole in the middle of the road. It has been there for over a week and is getting worse. Several cars have been seen swerving to avoid it.',
        status: 'submitted',
        photo_path: 'issue_photos/placeholder.jpg',
        user_id: 1, // This user owns the issue
        user: {
            name: 'Jane Doe',
        },
        created_at: new Date().toISOString(),
    };
    const flash = {
        success: 'Issue details loaded successfully!',
    };

    const deleteIssue = (e) => {
        e.preventDefault();
        // The confirm dialog will not work in all preview environments, but the logic is sound.
        if (window.confirm('Are you sure you want to delete this issue?')) {
            // In a real app, `router.delete` would make a network request.
            console.log(`Simulating deletion of issue #${issue.id}`);
            // We use a simple message box as a substitute for alert()
            const messageBox = document.createElement('div');
            messageBox.textContent = 'Issue deleted! (Simulation)';
            messageBox.style.cssText = 'position:fixed;top:1rem;right:1rem;padding:1rem;background-color:#4CAF50;color:white;border-radius:5px;box-shadow:0 2px 5px rgba(0,0,0,0.2);z-index:1000;';
            document.body.appendChild(messageBox);
            setTimeout(() => document.body.removeChild(messageBox), 3000);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Issue Details</h2>}
        >
            <Head title={issue.title} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                     {flash.success && (
                        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{flash.success}</span>
                        </div>
                    )}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 md:p-8 text-gray-900">
                            <div className="mb-6">
                                <Link href="#" className="text-blue-500 hover:text-blue-700">
                                    &larr; Back to all issues
                                </Link>
                            </div>

                            <div className="flex justify-between items-start">
                                <h1 className="text-3xl font-bold mb-2">{issue.title}</h1>
                                <StatusBadge status={issue.status} />
                            </div>

                            <div className="text-sm text-gray-600 mb-4 border-b pb-4">
                                <p><strong>Location:</strong> {issue.location}</p>
                                <p><strong>Reported by:</strong> {issue.user.name} on {new Date(issue.created_at).toLocaleString()}</p>
                            </div>

                            <div className="prose max-w-none mb-6">
                                <p>{issue.description}</p>
                            </div>

                            {issue.photo_path && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold mb-2">Attached Photo</h3>
                                    {/* Using a placeholder image for the preview as local storage is not accessible */}
                                    <img src={`https://placehold.co/600x400/e2e8f0/64748b?text=Issue+Photo`} alt="Issue Photo" className="max-w-lg w-full rounded-lg border shadow" />
                                </div>
                            )}

                            {auth.user.id === issue.user_id && (
                                <div className="mt-8 border-t pt-4 flex items-center space-x-4">
                                    <Link href="#" className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition">
                                        Edit
                                    </Link>
                                    <button onClick={deleteIssue} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition">
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

