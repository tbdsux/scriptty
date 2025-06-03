import CodeEditor from '@/components/code-editor';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { Head } from '@inertiajs/react';
import { LanguageName } from '@uiw/codemirror-extensions-langs';
import { CopyIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Scripts',
    href: '/scripts',
  },
];

export default function PublicScriptItemPage(props: {
  script: WithAuthor<Script>;
}) {
  return (
    <HomeLayout breadcrumbs={breadcrumbs}>
      <Head title={`${props.script.title}`} />

      <div className="p-4">
        <Card className="relative">
          <CardHeader className="">
            <CardTitle className="text-xl font-black">
              {props.script.title}
            </CardTitle>
            <CardDescription className="flex flex-col space-y-4">
              <div>
                {props.script.description ? (
                  <div
                    className="prose prose-sm dark:prose-invert max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(props.script.description),
                    }}
                  />
                ) : (
                  <span className="text-sm">[No description set]</span>
                )}
              </div>

              <div className="inline-flex items-center space-x-2">
                <Badge variant={'outline'}>
                  {props.script.is_public ? 'Public' : 'Private'}
                </Badge>
                {props.script.is_global ? (
                  <Badge variant={'outline'}>Global</Badge>
                ) : null}
              </div>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="rounded-[7.5px] border">
              <div className="flex items-center justify-between p-2">
                <Badge>{props.script.code_lang}</Badge>

                <Button className="h-auto py-1 text-xs" variant={'outline'}>
                  <CopyIcon className="size-3" />
                  Copy
                </Button>
              </div>

              <CodeEditor
                value={props.script.code}
                onChange={() => {}}
                lang={props.script.code_lang as LanguageName}
                height="800px"
                readOnly
              />
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between">
            <div className="">
              <p className="text-muted-foreground text-sm">
                Author: <strong>@{props.script.author.name}</strong>
              </p>
            </div>

            <div>
              <p className="text-muted-foreground text-sm">
                Created at: {new Date(props.script.created_at).toLocaleString()}
              </p>
              <p className="text-muted-foreground text-sm">
                Updated at: {new Date(props.script.updated_at).toLocaleString()}
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </HomeLayout>
  );
}
