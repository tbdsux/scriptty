<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScriptController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    // Get user's scripts
    $scripts = auth()->user()->scripts()->orderBy('created_at', 'desc')->get()->map(function ($script) {
      return [
        'id' => $script->id,
        'title' => $script->title,
        'description' => $script->description,
        'codeLang' => $script->codeLang,
        'is_public' => $script->is_public,
        'share_global' => $script->share_global,
        'share_link' => $script->share_link,
        'created_at' => $script->created_at,
        'updated_at' => $script->updated_at,
      ];
    })->toArray();

    return Inertia::render("scripts/index", [
      'scripts' => $scripts,
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    if ($request->has('description') && is_null($request->input("description"))) {
      $request->merge(['description' => '']);
    }

    $request->validate([
      'title' => 'required|string',
      'description' => 'string',
      'code' => 'required|string',
      'codeLang' => 'required|string',
    ]);

    // Generate new share short slug
    $share_link = generateNewShareLink();

    // Create a new script
    $script = $request->user()->scripts()->create([
      'title' => $request->input('title'),
      'description' => $request->input('description'),
      'code' => $request->input('code'),
      'codeLang' => $request->input('codeLang'),
      'is_public' => false,
      'share_link' => $share_link,
    ]);

    return redirect()->route('dashboard.scripts.show', [$share_link])->with('success', 'Script created successfully.');
  }


  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return Inertia::render('scripts/new');
  }

  /**
   * Display the specified resource.
   */
  public function show(string $slug)
  {
    $script = auth()->user()->scripts()->where('share_link', $slug)->first();

    if (!$script) {
      return redirect()->route('dashboard.scripts.index')->with('error', 'Script not found.');
    }

    return Inertia::render("scripts/item", [
      'script' => $script,
    ]);
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(string $slug)
  {
    $script = auth()->user()->scripts()->where('share_link', $slug)->first();

    if (!$script) {
      return redirect()->route('dashboard.scripts.index')->with('error', 'Script not found.');
    }

    return Inertia::render("scripts/edit", [
      'script' => $script,
    ]);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $slug)
  {
    $script = auth()->user()->scripts()->where('share_link', $slug)->first();
    if (!$script) {
      return redirect()->route('dashboard.scripts.index')->with('error', 'Script not found.');
    }

    if ($request->has('description') && is_null($request->input("description"))) {
      $request->merge(['description' => '']);
    }

    $request->validate([
      'title' => 'required|string',
      'description' => 'string',
      'code' => 'required|string',
      'codeLang' => 'required|string',
    ]);

    // Update
    $script->update([
      'title' => $request->input('title'),
      'description' => $request->input('description'),
      'code' => $request->input('code'),
      'codeLang' => $request->input('codeLang'),
      'updated_at' => now(),
    ]);

    return redirect()->route('dashboard.scripts.show', [$slug])->with('success', 'Script updated successfully.');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $slug)
  {
    $script = auth()->user()->scripts()->where('share_link', $slug)->first();
    if (!$script) {
      return redirect()->route('dashboard.scripts.index')->with('error', 'Script not found.');
    }

    // Delete the script
    $script->delete();

    return redirect()->route('dashboard.scripts.index')->with('success', 'Script deleted successfully.');
  }
}
