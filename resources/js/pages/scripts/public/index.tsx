import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import HomeLayout from '@/layouts/home-layout';
import { sanitizeHtml } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { Script, WithAuthor } from '@/types/scripts';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Scripts',
    href: '/scripts',
  },
];

export default function PublicScriptsPage(props: {
  scripts: WithAuthor<Script>[];
}) {
  return (
    <HomeLayout breadcrumbs={breadcrumbs}>
      <Head title={`Public Scripts`} />

      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle className="">Public Scripts</CardTitle>
            <CardDescription className="">
              <p className="">
                Here you can find all public scripts available in the system.
                These scripts are shared by users and can be viewed by anyone.
              </p>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {props.scripts.map((item) => (
                <div key={item.id}>
                  <Link
                    href={route('public.scripts.show', item.slug)}
                    className="group"
                  >
                    <Card className="relative duration-300 group-hover:border-neutral-600">
                      <CardHeader>
                        <CardTitle className="line-clamp-2 font-bold">
                          {item.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {item.description ? (
                            <div
                              className="prose prose-sm dark:prose-invert max-w-none"
                              dangerouslySetInnerHTML={{
                                __html: sanitizeHtml(item.description),
                              }}
                            />
                          ) : (
                            <span className="text-sm">
                              [No description set]
                            </span>
                          )}
                        </CardDescription>
                      </CardHeader>

                      <div className="absolute top-2 right-2">
                        <Badge>{item.code_lang}</Badge>
                      </div>

                      <CardFooter>
                        <div className="flex w-full items-center justify-between">
                          <small className="text-muted-foreground font-medium">
                            @{item.author.name}
                          </small>

                          <small className="text-muted-foreground">
                            {new Date(item.created_at).toLocaleString()}
                          </small>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </HomeLayout>
  );
}
