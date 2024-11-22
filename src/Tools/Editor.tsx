import { EditorContent, useEditor } from "@tiptap/react";
import React, { useEffect } from "react";
import axios from "axios";

// Extensions
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import Youtube from "@tiptap/extension-youtube";
import Typography from "@tiptap/extension-typography";
import TextStyle from "@tiptap/extension-text-style";
import TextStyleExtended from "./EditorComponents/TextStyleExtended";
import FontFamily from "@tiptap/extension-font-family";
import FileHandler from "@tiptap-pro/extension-file-handler";

import { Menubar } from "./EditorComponents/Menubar";

import "./Editor.css";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function Editor({ pageName }: { pageName: string }) {
  const editor = useEditor({
    content: localStorage.getItem(pageName),
    extensions: [
      StarterKit,
      Underline,
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
      TextStyle,
      TextStyleExtended,
      FontFamily.configure({
        types: ["textStyle"],
      }),
      FileHandler.configure({
        allowedMimeTypes: [
          "image/png",
          "image/jpeg",
          "image/gif",
          "image/webp",
        ],
        onDrop: (currentEditor, files, pos) => {
          files.forEach((file) => {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(pos, {
                  type: "image",
                  attrs: {
                    src: fileReader.result,
                  },
                })
                .focus()
                .run();
            };
          });
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach((file) => {
            if (htmlContent) {
              // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
              // you could extract the pasted file from this url string and upload it to a server for example
              console.log(htmlContent);
              return false;
            }

            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(currentEditor.state.selection.anchor, {
                  type: "image",
                  attrs: {
                    src: fileReader.result,
                  },
                })
                .focus()
                .run();
            };
          });
        },
      }),
    ],
    onUpdate: async ({ editor }) => {
      const html = editor.getHTML();
      localStorage.setItem(pageName, html);
      try {
        await axios.post(`${API_BASE_URL}/api/auth/save-content`, {
          pageName,
          content: html,
        });
      } catch (err) {
        console.error("Error saving content:", err);
      }
    },
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/auth/get-content`, {
          params: { pageName },
        });
        if (res.data.content) {
          editor?.commands.setContent(res.data.content);
        }
      } catch (err) {
        console.error("Error fetching content:", err);
      }
    };

    fetchContent();
  }, [pageName, editor]);

  return (
    <div className="Content">
      {editor && (
        <div className="Tools">
          <Menubar editor={editor} />
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  );
}

export default Editor;
