"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export function TiptapEditor({
  name,
  defaultValue = "",
}: {
  name: string;
  defaultValue?: string;
}) {
  const [html, setHtml] = useState(defaultValue);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content: defaultValue,
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "min-h-[250px] rounded-b-card bg-background px-4 py-3 outline-none [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic",
      },
    },
  });

  useEffect(() => {
    return () => editor?.destroy();
  }, [editor]);

  if (!editor) return null;

  const buttons: { label: string; icon: string; action: () => void; active?: boolean }[] = [
    { label: "Bold", icon: "FaBold", action: () => editor.chain().focus().toggleBold().run(), active: editor.isActive("bold") },
    { label: "Italic", icon: "FaItalic", action: () => editor.chain().focus().toggleItalic().run(), active: editor.isActive("italic") },
    { label: "H2", icon: "FaHeading", action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), active: editor.isActive("heading", { level: 2 }) },
    { label: "Bullet List", icon: "FaListUl", action: () => editor.chain().focus().toggleBulletList().run(), active: editor.isActive("bulletList") },
    { label: "Numbered List", icon: "FaListOl", action: () => editor.chain().focus().toggleOrderedList().run(), active: editor.isActive("orderedList") },
    { label: "Quote", icon: "FaQuoteRight", action: () => editor.chain().focus().toggleBlockquote().run(), active: editor.isActive("blockquote") },
  ];

  return (
    <div className="overflow-hidden rounded-card border border-black/10">
      <div className="flex flex-wrap gap-1 border-b border-black/10 bg-card p-2">
        {buttons.map((btn) => (
          <button
            key={btn.label}
            type="button"
            title={btn.label}
            onClick={btn.action}
            className={`flex h-8 w-8 items-center justify-center rounded transition-colors ${
              btn.active ? "bg-primary text-white" : "text-text hover:bg-background"
            }`}
          >
            <Icon name={btn.icon} />
          </button>
        ))}
      </div>
      <EditorContent editor={editor} />
      <input type="hidden" name={name} value={html} readOnly />
    </div>
  );
}
