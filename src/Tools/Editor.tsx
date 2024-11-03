import { EditorContent, useEditor, BubbleMenu, FloatingMenu } from "@tiptap/react";
import { useEffect, useCallback } from "react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import "./Editor.css";

function Editor({ pageName }: { pageName: string }) {
  const editor = useEditor({
    content: localStorage.getItem(pageName),
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
    ],
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      localStorage.setItem(pageName, html);
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(localStorage.getItem(pageName));
    }
  }, [pageName, editor]);

  const setLink = useCallback(() => {
    const previousURL = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousURL);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className="Content">
      {editor && (
        <div className="Tools">
          <div className="Menubar">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : ""}
            >
              Bold
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "is-active" : ""}
            >
              Italic
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              className={editor.isActive("strike") ? "is-active" : ""}
            >
              Strike
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={
                editor.isActive("heading", { level: 1 }) ? "is-active" : ""
              }
            >
              H1
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive("heading", { level: 2 }) ? "is-active" : ""
              }
            >
              H2
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={
                editor.isActive("heading", { level: 3 }) ? "is-active" : ""
              }
            >
              H3
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 4 }).run()
              }
              className={
                editor.isActive("heading", { level: 4 }) ? "is-active" : ""
              }
            >
              H4
            </button>
            <button
              onClick={() => {
                if (editor.isActive("link")) {
                  editor.chain().focus().extendMarkRange("link").unsetLink().run();
                } else {
                  setLink();
                }
              }}
              className={editor.isActive("link") ? "is-active" : ""}>
                Link
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive("bulletList") ? "is-active" : ""}
            >
              Bullet List
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive("orderedList") ? "is-active" : ""}
            >
              Ordered List
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive("blockquote") ? "is-active" : ""}
            >
              Quote
            </button>
            <button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
            >
              Undo
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
            >
              Redo
            </button>
          </div>
          <BubbleMenu className="BubbleMenu" tippyOptions={{ duration: 100 }} editor={editor}>
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={editor.isActive("bold") ? "is-active" : ""}>
                  Bold
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={editor.isActive("italic") ? "is-active" : ""}>
                  Italic
              </button>
              <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={editor.isActive("strike") ? "is-active" : ""}>
                  Strike
              </button>
              <button
              onClick={() => {
                if (editor.isActive("link")) {
                  editor.chain().focus().extendMarkRange("link").unsetLink().run();
                } else {
                  setLink();
                }
              }}
              className={editor.isActive("link") ? "is-active" : ""}>
                Link
            </button>
          </BubbleMenu>
          
          <FloatingMenu className="FloatingMenu" tippyOptions={{ duration: 100 }} editor={editor}>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}>
                H1
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}>
                H2
            </button>
            <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}>
              Bullet List
            </button>
            <button
              onClick={() => {
                if (editor.isActive("link")) {
                  editor.chain().focus().extendMarkRange("link").unsetLink().run();
                } else {
                  setLink();
                }
              }}
              className={editor.isActive("link") ? "is-active" : ""}>
                Link
            </button>
          </FloatingMenu>
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  );
}

export default Editor;
