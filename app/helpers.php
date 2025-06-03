<?php

use Hidehalo\Nanoid\Client;

/**
 * Generate a new share link for a script.
 *
 * @return string
 */
function generateSlug(): string
{
  $nanoidClient = new Client();
  return $nanoidClient->generateId($size = 21, $mode = Client::MODE_DYNAMIC);
}