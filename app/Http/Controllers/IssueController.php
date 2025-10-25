<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia; // <-- IMPORT THIS

class IssueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $issues = Issue::with('user')->latest()->paginate(10);
        return Inertia::render('Issues/Index', [
            'issues' => $issues,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Issues/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'description' => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10000',
        ]);

        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('issue_photos', 'public');
        }

        Auth::user()->issues()->create([
            'title' => $validated['title'],
            'location' => $validated['location'],
            'description' => $validated['description'],
            'photo_path' => $photoPath,
            'status' => 'submitted',
        ]);

        return redirect()->route('issues.index')->with('success', 'Issue reported successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Issue $issue)
    {
        $issue->load('user');

        return Inertia::render('Issues/Show', [
            'issue' => $issue,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Issue $issue)
    {
        if (Auth::id() !== $issue->user_id) {
            abort(430);
        }

        return Inertia::render('Issues/Edit', [
            'issue' => $issue,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Issue $issue)
    {
        if (Auth::id() !== $issue->user_id) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'description' => 'required|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10000',
        ]);
        
        $issue->update([
            'title' => $validated['title'],
            'location' => $validated['location'],
            'description' => $validated['description'],
        ]);

        if ($request->hasFile('photo')) {
            if ($issue->photo_path) {
                Storage::disk('public')->delete($issue->photo_path);
            }
            $photoPath = $request->file('photo')->store('issue_photos', 'public');
            $issue->update(['photo_path' => $photoPath]);
        }

        return redirect()->route('issues.show', $issue)->with('success', 'Issue updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Issue $issue)
    {
        if (Auth::id() !== $issue->user_id) {
            abort(403);
        }

        if ($issue->photo_path) {
            Storage::disk('public')->delete($issue->photo_path);
        }

        $issue->delete();

        return redirect()->route('issues.index')->with('success', 'Issue deleted successfully.');
    }
}

