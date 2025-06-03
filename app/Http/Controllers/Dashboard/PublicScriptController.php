<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Script;
use Inertia\Inertia;

class PublicScriptController extends Controller
{
  /**
   * Display a public script
   */
  public function show(string $slug)
  {
    $script = Script::with('author:id,name')->where('slug', $slug)->first();
    if (!$script) {
      abort(404);
    }

    if (!$script->is_public) {
      abort(404);
    }

    return Inertia::render("scripts/public/item", [
      'script' => $script,
    ]);
  }

  /**
   * Display list of global & public scripts.
   */
  public function index()
  {
    $global_scripts = Script::with('author:id,name')
      ->where('is_public', true)
      ->where('is_global', true)
      ->orderBy('updated_at', 'desc')
      ->get();

    return Inertia::render('scripts/public/index', [
      'scripts' => $global_scripts,
    ]);
  }
}
