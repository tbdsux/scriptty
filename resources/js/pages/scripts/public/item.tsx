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
import { Form } from '@/components/ui/custom-form';
import { useTypedPageProps } from '@/composables/use-typed-page-props';
import HomeLayout from '@/layouts/home-layout';
import { sanitizeHtml } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { Script, WithAuthor } from '@/types/scripts';
import { Head, useForm } from '@inertiajs/react';
import { LanguageName } from '@uiw/codemirror-extensions-langs';
import { CopyIcon, ThumbsUpIcon } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Scripts',
    href: '/scripts',
  },
];

export default function PublicScriptItemPage(props: {
  script: WithAuthor<Script>;
  hasUserLiked: boolean;
}) {
  const { flash } = useTypedPageProps<{
    flash: {
      success?: string;
      error?: string;
      info?: string;
    };
  }>().props;

  const form = useForm<{
    slugId: string;
  }>({
    slugId: props.script.slug,
  });

  const handleLike: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    form.post(route('public.scripts.like', [props.script.slug]));
  };

  useEffect(() => {
    if (flash.success) {
      toast.success(flash.success);
    }
    if (flash.error) {
      toast.error(flash.error);
    }
    if (flash.info) {
      toast.info(flash.info);
    }
  }, [flash]);

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

                <div className="inline-flex items-center gap-2">
                  <Button className="h-auto py-1 text-xs" variant={'outline'}>
                    <CopyIcon className="size-3" />
                    Copy
                  </Button>

                  {props.hasUserLiked ? (
                    <Badge
                      variant={'secondary'}
                      className="h-auto py-1 text-xs"
                    >
                      <ThumbsUpIcon className="size-3" />
                      Liked ({props.script.likes})
                    </Badge>
                  ) : (
                    <Form form={form}>
                      <form onSubmit={handleLike}>
                        <Button
                          type="submit"
                          className="h-auto cursor-pointer py-1 text-xs"
                          variant={'secondary'}
                        >
                          <ThumbsUpIcon className="size-3" />
                          Like ({props.script.likes})
                        </Button>
                      </form>
                    </Form>
                  )}
                </div>
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

          <CardFooter className="flex flex-col items-start justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
            <div className="">
              <p className="text-muted-foreground text-sm">
                Author: <strong>@{props.script.author.name}</strong>
              </p>

              <p className="text-muted-foreground text-xs">
                <strong>{props.script.views}</strong> views
              </p>
            </div>

            <div>
              <p className="text-muted-foreground text-xs">
                Created at: {new Date(props.script.created_at).toLocaleString()}
              </p>
              <p className="text-muted-foreground text-xs">
                Updated at: {new Date(props.script.updated_at).toLocaleString()}
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </HomeLayout>
  );
}
