import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { DashboardStats } from '@/types/dashboard';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

export default function Dashboard(props: { stats: DashboardStats }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              Welcome to your Dashboard
            </CardTitle>
            <CardDescription>
              Here you can find an overview of your scripts and their
              statistics.
            </CardDescription>
          </CardHeader>

          <CardFooter>
            <small className="text-muted-foreground">
              Current Date:{' '}
              <strong>
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </strong>
            </small>
          </CardFooter>
        </Card>

        <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent>
              <h3 className="text-5xl font-black">
                {props.stats.total_scripts}
              </h3>
            </CardContent>
            <CardHeader>
              <CardTitle>Total Scripts</CardTitle>
              <CardDescription>
                The total number of scripts you have created.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardContent>
              <h3 className="text-5xl font-black">
                {props.stats.total_public_scripts}
              </h3>
            </CardContent>
            <CardHeader>
              <CardTitle>Public Scripts</CardTitle>
              <CardDescription>
                The total number of scripts that are public and visible to
                others.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardContent>
              <h3 className="text-5xl font-black">{props.stats.total_views}</h3>
            </CardContent>
            <CardHeader>
              <CardTitle>Total Views</CardTitle>
              <CardDescription>
                The total number of views across all your public scripts.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
