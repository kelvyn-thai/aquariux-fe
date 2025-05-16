"use client";

import { Blockquote } from "@tiptap/extension-blockquote";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { TextQuote } from "lucide-react";
import { twMerge } from "tailwind-merge";

const Tiptap = () => {
  const editor = useEditor({
    extensions: [Blockquote, StarterKit],
    content: "<p>Hello World! 🌎️</p>",
    autofocus: true,
    editable: true,
  });

  if (!editor) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={twMerge(
          "w-8 p-2 bg-gray-300 text-black rounded-xl",
          editor.isActive("blockquote") && "text-purple-500"
        )}
      >
        <TextQuote className="w-4 h-4" />
      </button>
      <EditorContent editor={editor} className="m-auto w-3/4 min-w-1/2 mt-6" />
    </>
  );
};

export default Tiptap;
