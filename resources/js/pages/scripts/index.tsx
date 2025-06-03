import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { sanitizeHtml } from '@/lib/utils';
import { Script } from '@/types/scripts';
import { Head, Link } from '@inertiajs/react';

export default function ScriptsPage(props: { scripts: Script[] }) {
  console.log(props);

  return (
    <AppLayout
      breadcrumbs={[{ title: 'My Scripts', href: '/dashboard/scripts' }]}
    >
      <Head title="My Scripts" />

      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-black">My Scripts</CardTitle>
            <CardDescription>
              Here you can find all your scripts. You can create, edit, and
              delete scripts.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {props.scripts.map((item) => (
              <Link
                key={item.id}
                href={route('dashboard.scripts.show', [item.slug])}
              >
                <Card className="relative h-full">
                  <Badge className="absolute top-2 right-2">
                    {item.code_lang}
                  </Badge>

                  <CardHeader>
                    <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {item.description ? (
                        <div
                          className="prose prose-sm dark:prose-invert max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: sanitizeHtml(item.description),
                          }}
                        />
                      ) : (
                        <span className="text-sm">[No description set]</span>
                      )}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
