import CodeEditor from '@/components/code-editor';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { Head, Link, useForm } from '@inertiajs/react';
import { LanguageName } from '@uiw/codemirror-extensions-langs';
import { CopyIcon, PenIcon, Trash2Icon } from 'lucide-react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

export default function ScriptItemPage(props: { script: Script }) {
  const form = useForm({});

  const deleteScript: FormEventHandler = (e) => {
    e.preventDefault();

    form.delete(route('dashboard.scripts.destroy', [props.script.slug]), {
      onSuccess: () => {
        toast.success('Script deleted successfully!');
      },
      onError: (errors) => {
        console.log('Error', errors);
      },
    });
  };

  return (
    <AppLayout
      breadcrumbs={[{ title: 'My Scripts', href: '/dashboard/scripts' }]}
    >
      <Head title={`My Scripts - `} />

      <div className="p-4">
        <Card className="relative">
          <CardHeader className="">
            <CardTitle className="text-xl font-black">
              {props.script.title}
            </CardTitle>
            <CardDescription>
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
            </CardDescription>

            <div className="absolute top-2 right-2 inline-flex space-x-2">
              <Button asChild className="h-auto py-1 text-sm">
                <Link
                  href={route('dashboard.scripts.edit', [props.script.slug])}
                >
                  <PenIcon className="size-3" />
                  Edit
                </Link>
              </Button>

              <form onSubmit={deleteScript}>
                <Button
                  type="submit"
                  variant={'destructive'}
                  className="h-auto py-1 text-sm"
                >
                  <Trash2Icon className="size-3" />
                  Delete
                </Button>
              </form>
            </div>
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

            <hr className="my-4" />

            <div>
              <p className="text-muted-foreground text-sm">
                Created at: {new Date(props.script.created_at).toLocaleString()}
              </p>
              <p className="text-muted-foreground text-sm">
                Updated at: {new Date(props.script.updated_at).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
