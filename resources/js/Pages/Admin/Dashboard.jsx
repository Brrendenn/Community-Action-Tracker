import CommunityLayout from "@/Layouts/CommunityLayout";
import { Head, Link } from "@inertiajs/react";

function StatCard({ title, value, color = 'bg-white' }) {
    return (
        <div className={`rounded-lg p-6 shadow ${color}`}>
            <div className="text-sm font-medium uppercase text-gray-500">{title}</div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">{value}</div>
        </div>
    );
}

export default function Dashboard({ auth, stats }) {
    return (
        <CommunityLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <StatCard title="Total Issues" value={stats.total_issues} />
                        <StatCard title="Pending Issues" value={stats.pending_issues} color="bg-yellow-50" />
                        <StatCard title="In-Progress Issues" value={stats.in_progress_issues} color="bg-blue-50" />
                        <StatCard title="Resolved Issues" value={stats.resolved_issues} color="bg-green-50" />
                        <StatCard title="Total Users" value={stats.total_users} />
                    </div>

                    <div className="mt-8 overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium">Quick Links</h3>
                            <p className="mt-4">
                                <Link
                                    href={route('admin.issues.index')}
                                    className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none"
                                >
                                    Go to Manage All Issues
                                </Link>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </CommunityLayout>
    );
}