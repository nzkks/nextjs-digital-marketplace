'use client';

import {
  EditorContent,
  JSONContent,
  useEditor,
  type Editor,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { Button } from '@/components/ui/button';

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-5">
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        variant={
          editor.isActive('heading', { level: 1 }) ? 'default' : 'secondary'
        }
        type="button"
      >
        H1
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        variant={
          editor.isActive('heading', { level: 2 }) ? 'default' : 'secondary'
        }
        type="button"
      >
        H2
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        variant={
          editor.isActive('heading', { level: 3 }) ? 'default' : 'secondary'
        }
        type="button"
      >
        H3
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        variant={editor.isActive('bold') ? 'default' : 'secondary'}
        type="button"
      >
        Bold
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        variant={editor.isActive('italic') ? 'default' : 'secondary'}
        type="button"
      >
        Italic
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        variant={editor.isActive('strike') ? 'default' : 'secondary'}
        type="button"
      >
        Strike
      </Button>
    </div>
  );
};

const WYSIWYGEditor = ({
  json,
  setJson,
}: {
  json: JSONContent | null;
  setJson: any;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: json,
    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert prose-sm sm:prose-base min-h-[150px] focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => setJson(editor.getJSON()),
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="mt-2 min-h-[150px] rounded-lg border p-2"
      />
    </div>
  );
};

export default WYSIWYGEditor;
