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
    $script = Script::where('slug', $slug)->first();
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
}
