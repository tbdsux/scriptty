<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('scripts', function (Blueprint $table) {
      $table->id();
      $table->timestamps();
      $table->text("code");
      $table->string('title');
      $table->text('description')->default('');
      $table->string('code_lang');
      $table->string('slug')->unique();
      $table->foreignId('user_id')->constrained()->onDelete('cascade');
      $table->integer('views')->default(0);
      $table->integer('likes')->default(0);
      $table->boolean('is_public')->default(false);
      $table->boolean('is_global')->default(false);
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('scripts');
  }
};
