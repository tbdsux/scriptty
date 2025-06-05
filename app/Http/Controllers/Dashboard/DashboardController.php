<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
  /**
   * Display the dashboard.
   */
  public function index(Request $request)
  {
    $total_scripts = $request->user()->scripts()->count();
    $total_public_scripts = $request->user()->scripts()->where('is_public', true)->count();
    $total_views = $request->user()->scripts()->sum('views');
    $total_likes = $request->user()->scripts()->sum('likes');

    $stats = [
      'total_scripts' => $total_scripts,
      'total_public_scripts' => $total_public_scripts,
      'total_views' => $total_views,
      'total_likes' => $total_likes,
    ];

    return Inertia::render('dashboard', [
      'stats' => $stats,
    ]);
  }
}
