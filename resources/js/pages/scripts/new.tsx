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
import { Head, useForm } from '@inertiajs/react';
import { langNames, LanguageName } from '@uiw/codemirror-extensions-langs';
import { Check, ChevronsUpDown, Code2Icon } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Create New Script',
    href: '/dashboard/scripts/new',
  },
];

export default function NewScriptsPage() {
  const form = useForm<{
    title: string;
    code: string;
    codeLang: string;
    description: string;
  }>({
    title: '',
    code: 'print("Hello World")',
    codeLang: 'python',
    description: '',
  });

  const [openCb, setOpenCb] = useState(false);

  const createNewScript: FormEventHandler = (e) => {
    e.preventDefault();

    form.put(route('dashboard.scripts.store'), {
      onSuccess: () => {
        toast.success('Script created successfully!');
        form.reset();
      },
      onError: (errors) => {
        console.log('Error', errors);
      },
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create New Script" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
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
                Create Script
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </AppLayout>
  );
}
