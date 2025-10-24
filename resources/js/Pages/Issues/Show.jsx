import { Head, Link, router } from "@inertiajs/react";
import React from "react";
import CommunityLayout from "@/Layouts/CommunityLayout";

const StatusBadge = ({ status }) => {
    const statusConfig = {
        submitted: {
            bg: 'bg-blue-50',
            text: 'text-blue-700',
            border: 'border-blue-200',
            label: 'Submitted'
        },
        in_progress: {
            bg: 'bg-yellow-50',
            text: 'text-yellow-700',
            border: 'border-yellow-200',
            label: 'In Progress'
        },
        resolved: {
            bg: 'bg-green-50',
            text: 'text-green-700',
            border: 'border-green-200',
            label: 'Resolved'
        }
    };

    const config = statusConfig[status] || statusConfig.submitted;

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${config.bg} ${config.text} ${config.border}`}>
            {config.label}
        </span>
    );
};

export default function Show({ auth, issue, flash }) {

    const deleteIssue = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete this issue?")) {
            router.delete(route("issues.destroy", issue.id));
        }
    };

    return (
        <CommunityLayout
            user={auth.user}
            header={
                <div className="flex items-center space-x-3">
                    <Link
                        href={route("issues.index")}
                        className="text-gray-500 hover:text-gray-700 transition"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </Link>
                    <h2 className="text-xl font-semibold text-gray-900">
                        Issue Details
                    </h2>
                </div>
            }
        >
            <Head title={issue.title} />

            <div className="py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {flash && flash.success && (
                        <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center">
                            <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{flash.success}</span>
                        </div>
                    )}

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6 sm:p-8 border-b border-gray-100">
                            <div className="flex items-start justify-between mb-4">
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex-1 pr-4">
                                    {issue.title}
                                </h1>
                                <StatusBadge status={issue.status} />
                            </div>

                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="font-medium">{issue.location}</span>
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span>
                                        Reported by <span className="font-medium text-gray-900">{issue.user ? issue.user.name : 'Unknown'}</span>
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>{new Date(issue.created_at).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 sm:p-8">
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                                Description
                            </h3>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {issue.description}
                            </p>
                        </div>

                        {issue.photo_path && (
                            <div className="p-6 sm:p-8 bg-gray-50 border-t border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                                    Photo
                                </h3>
                                <div className="rounded-lg overflow-hidden border border-gray-200 bg-white">
                                    <img
                                        src={`/storage/${issue.photo_path}`}
                                        alt={`Photo for ${issue.title}`}
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        )}

                        {auth.user && auth.user.id === issue.user_id && (
                            <div className="p-6 sm:p-8 bg-gray-50 border-t border-gray-100">
                                <div className="flex flex-wrap gap-3">
                                    <Link
                                        href={route("issues.edit", issue.id)}
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        Edit Issue
                                    </Link>
                                    <button
                                        onClick={deleteIssue}
                                        className="inline-flex items-center px-4 py-2 bg-white hover:bg-red-50 text-red-600 font-medium rounded-lg border border-red-300 hover:border-red-400 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete Issue
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </CommunityLayout>
    );
}