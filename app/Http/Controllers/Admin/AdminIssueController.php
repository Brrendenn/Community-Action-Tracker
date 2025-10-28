<?php

namespace App\Http\Controllers\Admin; // Make sure namespace matches the folder structure

use App\Http\Controllers\Controller; // Ensure Controller is imported
use App\Models\Issue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminIssueController extends Controller
{

    public function index()
    {
        $issues = Issue::with('user')->latest()->paginate(20); 
        return Inertia::render('Admin/IssuesIndex', [
            'issues' => $issues,
        ]);
    }


    public function update(Request $request, Issue $issue)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:submitted,in_progress,resolved',
        ]);

        $issue->update(['status' => $validated['status']]);

        return redirect()->route('admin.issues.index')->with('success', 'Issue status updated successfully!');
    }
}