import { PageProps as InertiaPageProps } from '@inertiajs/core';
import type { route as routeFn } from 'ziggy-js';

export type PageProps<
  T extends Record<string, unknown> | unknown[] =
    | Record<string, unknown>
    | unknown[],
> = App.Data.InertiaSharedData & T;

declare module '@inertiajs/core' {
  interface PageProps extends InertiaPageProps, AppPageProps {}
}

declare global {
  const route: typeof routeFn;
}
