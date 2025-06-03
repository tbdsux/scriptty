<!DOCTYPE html>
<html
  lang="{{ str_replace('_', '-', app()->getLocale()) }}"
  @class(['dark' => ($appearance ?? 'system') == 'dark'])
>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
      (function () {
        const appearance = '{{ $appearance ?? 'system' }}';

        if (appearance === 'system') {
          const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)',
          ).matches;

          if (prefersDark) {
            document.documentElement.classList.add('dark');
          }
        }
      })();
    </script>

    {{-- Inline style to set the HTML background color based on our theme in app.css --}}
    <style>
      html {
        background-color: oklch(1 0 0);
      }

      html.dark {
        background-color: oklch(0.145 0 0);
      }
    </style>

    <title inertia>{{ config('app.name', 'Scriptty') }}</title>

    <link rel="preconnect" href="https://fonts.bunny.net" />
    <link
      href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
      rel="stylesheet"
    />

    {{-- Theme Icons / Logos --}}

    <link
      media="(prefers-color-scheme: dark)"
      rel="apple-touch-icon"
      sizes="180x180"
      href="/logo/dark/apple-touch-icon.png"
    />
    <link
      media="(prefers-color-scheme: dark)"
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/logo/dark/favicon-32x32.png"
    />
    <link
      media="(prefers-color-scheme: dark)"
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/logo/dark/favicon-16x16.png"
    />
    <link
      media="(prefers-color-scheme: dark)"
      rel="manifest"
      href="/logo/dark/site.webmanifest"
    />

    <link
      media="(prefers-color-scheme: light)"
      rel="apple-touch-icon"
      sizes="180x180"
      href="/logo/light/apple-touch-icon.png"
    />
    <link
      media="(prefers-color-scheme: light)"
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/logo/light/favicon-32x32.png"
    />
    <link
      media="(prefers-color-scheme: light)"
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/logo/light/favicon-16x16.png"
    />
    <link
      media="(prefers-color-scheme: light)"
      rel="manifest"
      href="/logo/light/site.webmanifest"
    />

    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/logo/light/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/logo/light/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/logo/light/favicon-16x16.png"
    />
    <link rel="manifest" href="/logo/light/site.webmanifest" />

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
  </head>
  <body class="font-sans antialiased">
    @inertia
  </body>
</html>
