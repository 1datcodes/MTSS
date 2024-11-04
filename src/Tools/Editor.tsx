import {
  EditorContent,
  useEditor,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

// Extensions
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import Youtube from "@tiptap/extension-youtube";
import Typography from "@tiptap/extension-typography";

import "./Editor.css";

function Editor({ pageName }: { pageName: string }) {
  const [height, setHeight] = useState("480");
  const [width, setWidth] = useState("640");

  setWidth("640");
  setHeight("480");

  const editor = useEditor({
    content: localStorage.getItem(pageName),
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      Image,
      ImageResize,
      Youtube.configure({
        controls: false,
        nocookie: true,
      }),
      Typography,
    ],
    onUpdate: async ({ editor }) => {
      const html = editor.getHTML();
      localStorage.setItem(pageName, html);

      try {
        const devPortID = import.meta.env.VITE_DEV_PORT;
        await axios.post(
          `http://localhost:${devPortID}/api/auth/save-content`,
          {
            pageName,
            content: html,
          },
        );
      } catch (err) {
        console.error("Error saving content:", err);
      }
    },
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const devPortID = import.meta.env.VITE_DEV_PORT;
        const res = await axios.get(
          `http://localhost:${devPortID}/api/auth/get-content`,
          {
            params: { pageName },
          },
        );
        if (res.data.content) {
          editor?.commands.setContent(res.data.content);
        }
      } catch (err) {
        console.error("Error fetching content:", err);
      }
    };

    fetchContent();
  }, [pageName, editor]);

  const setLink = useCallback(() => {
    const previousURL =
      editor?.getAttributes("link").href || "https://example.com";
    const url = window.prompt("Paste the full URL", previousURL);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt(
      "Paste the Image URL",
      "https://example.com/image.jpg",
    );

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addYoutube = () => {
    const url = prompt("Paste the Youtube URL", "https://youtu.be/dQw4w9WgXcQ"); // Hidden Rick Roll

    // Add function to get width and height from user input

    if (url) {
      editor?.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, parseInt(width, 10)) || 640,
        height: Math.max(180, parseInt(height, 10)) || 480,
      });
    }
  };

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
                  editor
                    .chain()
                    .focus()
                    .extendMarkRange("link")
                    .unsetLink()
                    .run();
                } else {
                  setLink();
                }
              }}
              className={editor.isActive("link") ? "is-active" : ""}
            >
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
            <button onClick={() => addImage()}>Add Image</button>
            <button onClick={addYoutube} className="YoutubeButton">
              Insert Video
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
          <BubbleMenu
            className="BubbleMenu"
            tippyOptions={{ duration: 100 }}
            editor={editor}
          >
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
              onClick={() => {
                if (editor.isActive("link")) {
                  editor
                    .chain()
                    .focus()
                    .extendMarkRange("link")
                    .unsetLink()
                    .run();
                } else {
                  setLink();
                }
              }}
              className={editor.isActive("link") ? "is-active" : ""}
            >
              Link
            </button>
          </BubbleMenu>

          <FloatingMenu
            className="FloatingMenu"
            tippyOptions={{ duration: 100 }}
            editor={editor}
          >
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
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive("bulletList") ? "is-active" : ""}
            >
              Bullet List
            </button>
            <button
              onClick={() => {
                if (editor.isActive("link")) {
                  editor
                    .chain()
                    .focus()
                    .extendMarkRange("link")
                    .unsetLink()
                    .run();
                } else {
                  setLink();
                }
              }}
              className={editor.isActive("link") ? "is-active" : ""}
            >
              Link
            </button>
            <button onClick={addYoutube} className="YoutubeButton">
              Insert Video
            </button>
          </FloatingMenu>
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  );
}

export default Editor;
