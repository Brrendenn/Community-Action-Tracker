import { usePage, Head, Link, router } from "@inertiajs/react";
import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const StatusBadge = ({ status }) => {
    const statusClasses = {
        submitted: "text-blue-700 bg-blue-100",
        in_progress: "text-yellow-700 bg-yellow-100",
        resolved: "text-green-700 bg-green-100",
    };
    const formattedStatus = status ? status.replace("_", " ") : "unknown";
    return (
        <span
            className={`inline-block rounded-full px-3 py-1 text-sm font-semibold capitalize ${
                statusClasses[status] || "bg-gray-200 text-gray-800"
            }`}
        >
            {formattedStatus}
        </span>
    );
};

export default function Show({ auth, issue, flash }) {

    const deleteIssue = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete this issue?")) {
            router.delete(route("issues.destroy", issue.id));
            const messageBox = document.createElement('div');
            messageBox.textContent = 'Issue deleted!';
            messageBox.style.cssText = 'position:fixed;top:1rem;right:1rem;padding:1rem;background-color:#4CAF50;color:white;border-radius:5px;box-shadow:0 2px 5px rgba(0,0,0,0.2);z-index:1000;';
            document.body.appendChild(messageBox);
            setTimeout(() => document.body.removeChild(messageBox), 3000);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Issue Details
                </h2>
            }
        >
            <Head title={issue.title} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {flash &&
                        flash.success && (
                            <div
                                className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                                role="alert"
                            >
                                <span className="block sm:inline">
                                    {flash.success}
                                </span>
                            </div>
                        )}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 md:p-8 text-gray-900">
                            <div className="mb-6">
                                <Link
                                    href={route("issues.index")}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    &larr; Back to all issues
                                </Link>
                            </div>

                            <div className="flex justify-between items-start">
                                <h1 className="text-3xl font-bold mb-2">
                                    {issue.title}
                                </h1>
                                <StatusBadge status={issue.status} />
                            </div>

                            <div className="text-sm text-gray-600 mb-4 border-b pb-4">
                                <p>
                                    <strong>Location:</strong> {issue.location}
                                </p>
                                <p>
                                    <strong>Reported by:</strong>{" "}
                                    {issue.user ? issue.user.name : "Unknown"}{" "}
                                    on{" "}
                                    {new Date(
                                        issue.created_at
                                    ).toLocaleString()}
                                </p>
                            </div>

                            <div className="prose max-w-none mb-6">
                                <p>{issue.description}</p>
                            </div>

                            {issue.photo_path && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold mb-2">
                                        Attached Photo
                                    </h3>
                                    <img
                                        src={`/storage/${issue.photo_path}`}
                                        alt={`Photo for ${issue.title}`}
                                        className="max-w-lg w-full rounded-lg border shadow"
                                    />
                                </div>
                            )}

                            {auth.user && auth.user.id === issue.user_id && (
                                <div className="mt-8 border-t pt-4 flex items-center space-x-4">
                                    <Link
                                        href={route("issues.edit", issue.id)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={deleteIssue}
                                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
                                    >
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
