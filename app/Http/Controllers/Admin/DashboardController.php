<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Issue;
use App\Models\User; 
use Illuminate\Http\Request;
use Inertia\Inertia; 

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard with stats.
     */
    public function index()
    {
        // Gather all the statistics
        $stats = [
            'total_issues' => Issue::count(),
            'pending_issues' => Issue::where('status', 'submitted')->count(),
            'in_progress_issues' => Issue::where('status', 'in_progress')->count(),
            'resolved_issues' => Issue::where('status', 'resolved')->count(),
            'total_users' => User::count(),
        ];

        // Render the new Admin/Dashboard page and pass the stats
        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats
        ]);
    }
}