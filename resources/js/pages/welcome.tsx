import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import HomeLayout from '@/layouts/home-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Home',
    href: '/',
  },
];

export default function Welcome() {
  return (
    <HomeLayout breadcrumbs={breadcrumbs}>
      <Head title={`Welcome`} />

      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Scriptty</CardTitle>
            <CardDescription className="space-y-4">
              <p className="">
                Welcome to Scriptty, your go-to platform for managing and
                sharing scripts. Explore our features, create your own scripts,
                and connect with the community.
              </p>
              <Button asChild>
                <Link href="/scripts" className="text-blue-500 hover:underline">
                  Get started
                </Link>
              </Button>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </HomeLayout>
  );
}
