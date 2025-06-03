import CodeEditor from '@/components/code-editor';
import TextEditor from '@/components/text-editor';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/custom-form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import AppLayout from '@/layouts/app-layout';
import { codeDefaults } from '@/lib/code-defaults';
import { cn } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { Script } from '@/types/scripts';
import { Head, Link, useForm } from '@inertiajs/react';
import { langNames, LanguageName } from '@uiw/codemirror-extensions-langs';
import { ArrowLeftIcon, Check, ChevronsUpDown, Code2Icon } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Edit Script',
    href: '/dashboard/scripts/new',
  },
];

export default function EditScriptsPage(props: { script: Script }) {
  const form = useForm<{
    title: string;
    code: string;
    codeLang: string;
    description: string;
  }>({
    title: props.script.title,
    code: props.script.code,
    codeLang: props.script.code_lang,
    description: props.script.description,
  });

  const [openCb, setOpenCb] = useState(false);

  const createNewScript: FormEventHandler = (e) => {
    e.preventDefault();

    form.post(route('dashboard.scripts.update', [props.script.slug]), {
      onSuccess: () => {
        toast.success('Script updated successfully!');
        form.reset();
      },
      onError: (errors) => {
        console.log('Error', errors);
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Script" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div>
          <Button variant={'link'} asChild>
            <Link href={route('dashboard.scripts.show', [props.script.slug])}>
              <ArrowLeftIcon />
              Back
            </Link>
          </Button>
        </div>

        <Form form={form}>
          <form onSubmit={createNewScript} className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-12">
              <FormField name="title">
                <FormItem className="flex w-full flex-col">
                  <FormLabel>Title</FormLabel>
                  <FormInput className="w-full" placeholder="Script title..." />
                  <FormMessage />
                </FormItem>
              </FormField>

              <FormField name="codeLang">
                <FormItem className="flex flex-col">
                  <FormLabel>Language</FormLabel>
                  <Popover open={openCb} onOpenChange={setOpenCb}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-[250px] justify-between"
                        >
                          {form.data.codeLang
                            ? langNames.find(
                                (item) => item === form.data.codeLang,
                              )
                            : 'Select framework...'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[250px] p-0">
                      <Command>
                        <CommandInput placeholder="Search framework..." />
                        <CommandList>
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {langNames.map((item) => (
                              <CommandItem
                                key={item}
                                value={item}
                                onSelect={(currentValue) => {
                                  form.setData('codeLang', currentValue);
                                  form.setData(
                                    'code',
                                    codeDefaults[
                                      currentValue as LanguageName
                                    ] ?? '',
                                  );
                                  setOpenCb(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    form.data.codeLang === item
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                                {item}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>

            <FormField name="code">
              <FormItem className="flex flex-col">
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <CodeEditor
                    value={form.data.code}
                    onChange={(e) => {
                      form.setData('code', e);
                    }}
                    lang={form.data.codeLang as LanguageName}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField name="description">
              <FormItem className="flex flex-col">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <TextEditor
                    onChange={(e) => form.setData('description', e)}
                    value={form.data.description}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <div className="flex items-center justify-end">
              <Button type="submit">
                <Code2Icon />
                Update Script
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AppLayout>
  );
}
