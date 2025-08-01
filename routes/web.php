<?php

use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dashboard\PublicScriptController;
use App\Http\Controllers\Dashboard\ScriptController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
  return Inertia::render('welcome');
})->name('home');

Route::get('/scripts/{script}', [PublicScriptController::class, 'show'])->name('public.scripts.show');
Route::get('/scripts', [PublicscriptController::class, 'index'])->name('public.scripts.index');


Route::post('/scripts/{script}/like', [PublicScriptController::class, 'like'])->name('public.scripts.like');

Route::middleware(['auth', 'verified'])->group(function () {

  Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
  Route::get('dashboard/scripts/new', [ScriptController::class, 'create'])->name('dashboard.scripts.new');
  Route::put('dashboard/scripts/new', [ScriptController::class, 'store'])->name('dashboard.scripts.store');
  Route::get('/dashboard/scripts', [ScriptController::class, 'index'])->name('dashboard.scripts.index');
  Route::get('/dashboard/scripts/{script}', [ScriptController::class, 'show'])->name('dashboard.scripts.show');
  Route::get('/dashboard/scripts/{script}/edit', [ScriptController::class, 'edit'])->name('dashboard.scripts.edit');
  Route::post('/dashboard/scripts/{script}', [ScriptController::class, 'update'])->name('dashboard.scripts.update');
  Route::delete('/dashboard/scripts/{script}', [ScriptController::class, 'destroy'])->name('dashboard.scripts.destroy');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
