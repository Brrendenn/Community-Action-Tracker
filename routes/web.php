<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\IssueController; // <--- ADD THIS LINE
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// CHANGE THIS ROUTE to redirect to our issues page
Route::get('/', function () {
    return redirect()->route('issues.index');
});

Route::get('/issues', function () {
    return Inertia::render('Issues/Index');
})->middleware(['auth', 'verified'])->name('issues.index');

Route::middleware(['auth', 'verified'])->group(function () { // <-- We'll put our routes inside this group
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // ADD THIS LINE! This creates all the routes for our issues.
    Route::resource('issues', IssueController::class);
});

require __DIR__.'/auth.php';