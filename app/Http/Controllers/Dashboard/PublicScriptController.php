<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Script;
use Inertia\Inertia;

class PublicScriptController extends Controller
{
  public function like(string $slug)
  {
    // Require user to be authenticated
    if (!auth()->check()) {
      return redirect()->back()->with('error', 'You must be logged in to like a script.');
    }

    $script = Script::where('slug', $slug)->first();
    if (!$script) {
      abort(404);
    }

    if (!$script->is_public) {
      abort(404);
    }

    // Check if the user has already liked the script
    $user = auth()->user();
    if ($script->likes()->where('user_id', $user->id)->exists()) {
      error_log("User {$user->id} has already liked script {$script->id}.");
      // Do nothing
      return redirect()->back()->with('info', 'You have already liked this script.');
    }

    // Add the like
    $script->likes()->create([
      'user_id' => $user->id,
      'script_id' => $script->id,
      'created_at' => now(),
      'updated_at' => now(),
    ]);

    // Increment the `likes` count
    $script->increment('likes');
    $script->save();

    return redirect()->back()->with('success', 'You liked the script successfully.');
  }


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

    $script->increment('views');
    $script->save();

    return Inertia::render("scripts/public/item", [
      'script' => $script,
      'hasUserLiked' => auth()->check() && $script->hasUserLiked(auth()->id()),
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
