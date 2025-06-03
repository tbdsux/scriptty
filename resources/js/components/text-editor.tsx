import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const extensions = [StarterKit];

export default function TextEditor(props: {
  value: string;
  onChange: (value: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      ...extensions,
      Placeholder.configure({
        placeholder: 'Write something about it...',
        emptyNodeClass:
          'cursor-text first:before:content-[attr(data-placeholder)] first:before:absolute first:before:top-2 first:before:left-4 first:before:text-muted-foreground before-pointer-events-none',
      }),
    ],
    content: props.value.length > 0 ? props.value : null,
    onUpdate: ({ editor }) => {
      props.onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm m-0 focus:outline-none dark:prose-invert prose-strong:text-inherit h-[100px] w-full max-w-none border border-border py-2 px-4 rounded-lg',
      },
    },
  });

  return (
    <div className="">
      <EditorContent editor={editor} />
    </div>
  );
}
