// resources/js/Pages/Admin/IssuesIndex.jsx
import React from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import CommunityLayout from '@/Layouts/CommunityLayout'; 

function Pagination({ links }) {
    return (
        <div className="mt-6 flex flex-wrap justify-center gap-1">
            {links.map((link, key) => {
                if (link.url === null) {
                    return (
                        <div
                            key={key}
                            className="px-4 py-2 text-sm text-gray-400 bg-white border border-gray-200 rounded-lg"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                }
                return (
                    <Link
                        key={key}
                        href={link.url}
                        className={`px-4 py-2 text-sm border rounded-lg transition ${
                            link.active
                                ? 'bg-blue-600 text-white border-blue-600 font-medium'
                                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                );
            })}
        </div>
    );
}


const StatusSelector = ({ issue }) => {
    const { data, setData, patch, processing, errors } = useForm({
        status: issue.status,
    });

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setData('status', newStatus);
        router.patch(route('admin.issues.update', issue.id), {
            status: newStatus
        }, {
            preserveScroll: true, 
            preserveState: false, 
        });
    };

    return (
        <select
            value={data.status}
            onChange={handleStatusChange}
            disabled={processing}
            className={`text-xs p-1 border rounded-md shadow-sm ${
                data.status === 'submitted' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                data.status === 'in_progress' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                'bg-green-50 text-green-700 border-green-200'
            } focus:ring-indigo-500 focus:border-indigo-500`}
        >
            <option value="submitted">Submitted</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
        </select>
    );
};


export default function IssuesIndex({ auth, issues, flash }) {
    const issueList = issues ? issues.data : [];
    const paginationLinks = issues ? issues.links : [];
    const successMessage = flash ? flash.success : null;

    return (
        <CommunityLayout 
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin - Manage Issues
                </h2>
            }
        >
            <Head title="Admin - Issues" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {successMessage && (
                         <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center shadow-sm">
                               <svg
                                className="w-5 h-5 mr-3 flex-shrink-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span className="font-medium">{successMessage}</span>
                        </div>
                    )}

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Title</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Location</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Reported By</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">View</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {issueList.length > 0 ? issueList.map((issue) => (
                                    <tr key={issue.id}>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{issue.title}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{issue.location}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{issue.user.name}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{new Date(issue.created_at).toLocaleDateString()}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                                            <StatusSelector issue={issue} />
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                             <Link href={route('issues.show', issue.id)} className="text-indigo-600 hover:text-indigo-900">
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-sm text-gray-500">
                                            No issues reported yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                         {paginationLinks.length > 3 && ( 
                                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                                    <Pagination links={paginationLinks} />
                                </div>
                         )}
                    </div>
                </div>
            </div>
        </CommunityLayout>
    );
}