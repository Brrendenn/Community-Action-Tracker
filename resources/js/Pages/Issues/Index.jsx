import React from 'react';
import { Head, Link } from '@inertiajs/react';
import CommunityLayout from '@/Layouts/CommunityLayout';

// Pagination component
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

// Status badge component
const StatusBadge = ({ status }) => {
    const statusConfig = {
        submitted: {
            bg: 'bg-blue-50',
            text: 'text-blue-700',
            border: 'border-blue-200',
            label: 'Submitted',
        },
        in_progress: {
            bg: 'bg-yellow-50',
            text: 'text-yellow-700',
            border: 'border-yellow-200',
            label: 'In Progress',
        },
        resolved: {
            bg: 'bg-green-50',
            text: 'text-green-700',
            border: 'border-green-200',
            label: 'Resolved',
        },
    };

    const config = statusConfig[status] || statusConfig.submitted;

    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${config.bg} ${config.text} ${config.border}`}
        >
            {config.label}
        </span>
    );
};

export default function Index({ auth, issues, flash }) {
    const user = auth ? auth.user : { name: 'Guest' };
    const successMessage = flash ? flash.success : null;
    const issueList = issues ? issues.data : [];
    const paginationLinks = issues ? issues.links : [];

    return (
        <CommunityLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Community Issues
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Track and manage community-reported issues
                        </p>
                    </div>
                    <Link
                        href={route('issues.create')}
                        className="inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        Report New Issue
                    </Link>
                </div>
            }
        >
            <Head title="Community Issues" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        {issueList.length > 0 ? (
                            <>
                                <div className="divide-y divide-gray-100">
                                    {issueList.map((issue) => (
                                        <Link
                                            key={issue.id}
                                            href={route('issues.show', issue.id)}
                                            className="block hover:bg-gray-50 transition duration-150 ease-in-out"
                                        >
                                            <div className="p-6">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-start gap-3 mb-2">
                                                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                                <svg
                                                                    className="w-5 h-5 text-blue-600"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                    viewBox="0 0 24 24"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={2}
                                                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                                                    />
                                                                </svg>
                                                            </div>
                                                            <div className="flex-1">
                                                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                                    {issue.title}
                                                                </h3>
                                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                                                                    <div className="flex items-center">
                                                                        <svg
                                                                            className="w-4 h-4 mr-1.5 text-gray-400"
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            viewBox="0 0 24 24"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={2}
                                                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                                            />
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={2}
                                                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                                            />
                                                                        </svg>
                                                                        <span>{issue.location}</span>
                                                                    </div>
                                                                    <div className="flex items-center">
                                                                        <svg
                                                                            className="w-4 h-4 mr-1.5 text-gray-400"
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            viewBox="0 0 24 24"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={2}
                                                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                                            />
                                                                        </svg>
                                                                        <span>{issue.user.name}</span>
                                                                    </div>
                                                                    <div className="flex items-center">
                                                                        <svg
                                                                            className="w-4 h-4 mr-1.5 text-gray-400"
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            viewBox="0 0 24 24"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={2}
                                                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                            />
                                                                        </svg>
                                                                        <span>
                                                                            {new Date(
                                                                                issue.created_at
                                                                            ).toLocaleDateString()}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex-shrink-0">
                                                        <StatusBadge status={issue.status} />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                {paginationLinks.length > 0 && (
                                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                                        <Pagination links={paginationLinks} />
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-16 px-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                    <svg
                                        className="w-8 h-8 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-1">
                                    No issues reported yet
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Be the first to report a community issue and help improve your
                                    neighborhood!
                                </p>
                                <Link
                                    href={route('issues.create')}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-150 ease-in-out"
                                >
                                    <svg
                                        className="w-5 h-5 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                    Report First Issue
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </CommunityLayout>
    );
}