<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Script extends Model
{
  use HasFactory;

  protected $fillable = [
    "title",
    "description",
    "code",
    "code_lang",
    "is_public",
    "is_global",
    "slug",
  ];

  /**
   * The user who created the script.
   * @return BelongsTo
   */
  public function author(): BelongsTo
  {
    return $this->belongsTo(User::class, 'user_id');
  }


  /**
   * Check if the script is liked by a specific user.
   * @param int $userId
   * @return bool
   */
  public function hasUserLiked(int $userId): bool
  {
    return $this->likes()->where('user_id', $userId)->exists();
  }

  /**
   * Get the scripts created by the user.
   * @return HasMany
   */
  public function likes(): HasMany
  {
    return $this->hasMany(ScriptLikes::class);
  }
}
