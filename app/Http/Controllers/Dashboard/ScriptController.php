<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Script;
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
        'code_lang' => $script->code_lang,
        'is_public' => $script->is_public,
        'is_global' => $script->is_global,
        'slug' => $script->slug,
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
    $this->validate_script_request($request);

    // Generate new share short slug
    $slug = generateSlug();

    // Create a new script
    $script = new Script();
    $script->title = $request->input("title");
    $script->description = $request->input("description");
    $script->code = $request->input('code');
    $script->code_lang = $request->input('codeLang');
    $script->is_public = $request->input('isPublic');
    $script->is_global = $request->input('isGlobal');
    $script->slug = $slug;

    $request->user()->scripts()->save($script);

    return redirect()->route('dashboard.scripts.show', [$slug])->with('success', 'Script created successfully.');
  }

  /**
   * Validate the script request.
   * @param Request $request
   * @return void
   */
  public function validate_script_request(Request $request): void
  {
    if ($request->has('description') && is_null($request->input("description"))) {
      $request->merge(['description' => '']);
    }
    if (!$request->has('isPublic')) {
      $request->merge(['isPublic' => false]);
    }
    if (!$request->has('isGlobal')) {
      $request->merge(['isGlobal' => false]);
    }

    $request->validate([
      'title' => 'required|string',
      'description' => 'string',
      'code' => 'required|string',
      'codeLang' => 'required|string',
      'isPublic' => 'boolean',
      'isGlobal' => 'boolean',
    ]);
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
    $script = auth()->user()->scripts()->where('slug', $slug)->first();

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
    $script = auth()->user()->scripts()->where('slug', $slug)->first();

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
    $script = auth()->user()->scripts()->where('slug', $slug)->first();
    if (!$script) {
      return redirect()->route('dashboard.scripts.index')->with('error', 'Script not found.');
    }

    $this->validate_script_request($request);

    $updated_description = $request->input('description');
    if ($updated_description == "<p></p>") {
      $updated_description = "";
    }

    // Update
    $script->update([
      'title' => $request->input('title'),
      'description' => $updated_description,
      'code' => $request->input('code'),
      'code_lang' => $request->input('codeLang'),
      'updated_at' => now(),
      'is_public' => $request->input('isPublic'),
      'is_global' => $request->input('isGlobal'),
    ]);

    return redirect()->route('dashboard.scripts.show', [$slug])->with('success', 'Script updated successfully.');
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $slug)
  {
    $script = auth()->user()->scripts()->where('slug', $slug)->first();
    if (!$script) {
      return redirect()->route('dashboard.scripts.index')->with('error', 'Script not found.');
    }

    // Delete the script
    $script->delete();

    return redirect()->route('dashboard.scripts.index')->with('success', 'Script deleted successfully.');
  }
}
