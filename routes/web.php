<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\IssueController; 
use App\Http\Controllers\Admin\AdminIssueController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// CHANGE THIS ROUTE to redirect to our issues page
Route::get('/', function () {
    return redirect()->route('issues.index');
});

Route::get('/issues', function () {
    return Inertia::render('Issues/Index');
})->middleware(['auth', 'verified'])->name('issues.index');

Route::middleware(['auth', 'verified'])->group(function () { 
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::resource('issues', IssueController::class);
});

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/issues', [AdminIssueController::class, 'index'])->name('issues.index');
    Route::patch('/issues/{issue}', [AdminIssueController::class, 'update'])->name('issues.update');
});

require __DIR__.'/auth.php';