import React from 'react';

// A helper component for pagination links.
// NOTE: In a real Inertia app, you would use Inertia's <Link> component.
// We are using standard <a> tags here to make this component previewable.
function Pagination({ links }) {
    return (
        <div className="mt-6 flex flex-wrap">
            {links.map((link, key) => {
                if (link.url === null) {
                    return <div key={key} className="mr-1 mb-1 px-4 py-3 text-sm leading-4 text-gray-400 border rounded" dangerouslySetInnerHTML={{ __html: link.label }} />;
                }
                return <a key={key} className="mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white focus:border-indigo-500 focus:text-indigo-500" href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} />;
            })}
        </div>
    );
}

// A helper component to display the status badge
const StatusBadge = ({ status }) => {
    const statusClasses = {
        submitted: 'bg-blue-500',
        in_progress: 'bg-yellow-500',
        resolved: 'bg-green-500',
    };
    const formattedStatus = status ? status.replace('_', ' ') : 'unknown';
    return (
        <span className={`inline-block rounded-full text-white px-3 py-1 text-sm font-bold capitalize ${statusClasses[status]}`}>
            {formattedStatus}
        </span>
    );
};

// This is a simplified version of the Index page for previewing purposes.
// In your actual Laravel project, you would use the AuthenticatedLayout and Inertia components.
export default function Index({ auth, issues, flash }) {

    // In a real app, 'auth' and 'flash' would be provided by Inertia.
    // We provide defaults here for the preview to work.
    const user = auth ? auth.user : { name: 'Guest' };
    const successMessage = flash ? flash.success : null;
    const issueList = issues ? issues.data : [];
    const paginationLinks = issues ? issues.links : [];


    return (
        <div className="min-h-screen bg-gray-100">
            {/* This is a simplified stand-in for AuthenticatedLayout */}
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center font-bold">Community Tracker</div>
                        <div className="flex items-center">{user.name}</div>
                    </div>
                </div>
            </nav>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">Community Issues</h2>
                        <a href="/issues/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Report New Issue
                        </a>
                    </div>
                </div>
            </header>

            <main>
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                {successMessage && (
                                    <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                                        <span className="block sm:inline">{successMessage}</span>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    {issueList.length > 0 ? (
                                        issueList.map(issue => (
                                            <div key={issue.id} className="border rounded-lg p-4 flex justify-between items-start hover:bg-gray-50 transition">
                                                <div>
                                                    <h3 className="font-bold text-lg text-blue-600">
                                                        <a href={`/issues/${issue.id}`}>{issue.title}</a>
                                                    </h3>
                                                    <p className="text-sm text-gray-600">
                                                        Reported by {issue.user.name} on {new Date(issue.created_at).toLocaleDateString()}
                                                    </p>
                                                    <p className="text-sm text-gray-500">Location: {issue.location}</p>
                                                </div>
                                                <div className="text-right flex-shrink-0">
                                                    <StatusBadge status={issue.status} />
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8">
                                            <p className="text-gray-500">No issues have been reported yet.</p>
                                            <p className="mt-2">Be the first to report one!</p>
                                        </div>
                                    )}
                                </div>
                                <Pagination links={paginationLinks} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

