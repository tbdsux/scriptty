<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScriptLikes extends Model
{
  use HasFactory;

  protected $fillable = [
    'user_id',
    'script_id',
  ];
}
