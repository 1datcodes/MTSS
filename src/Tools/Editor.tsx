import { EditorContent, useEditor } from "@tiptap/react";
import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

// Extensions
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import Youtube from "@tiptap/extension-youtube";
import Typography from "@tiptap/extension-typography";
import TextStyle from "@tiptap/extension-text-style";
import TextStyleExtended from "./TextStyleExtended";
import FontFamily from "@tiptap/extension-font-family";

import FontSizeDropdown from "./FontSizeDropdown";

import "./Editor.css";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const topFonts = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Courier New",
  "Verdana",
  "Georgia",
  "Palatino",
  "Garamond",
  "Bookman",
  "Comic Sans MS",
  "Trebuchet MS",
  "Arial Black",
  "Impact",
  "Lucida Sans Unicode",
  "Tahoma",
  "Courier",
  "Lucida Console",
];

function Editor({ pageName }: { pageName: string }) {
  const menuRef = useRef<HTMLDivElement>(null);

  const [height] = useState("480");
  const [width] = useState("640");
  const [fonts, setFonts] = useState<string[]>([]);
  const [showFontButtons, setShowFontButtons] = useState(false);
  const [currentFont, setCurrentFont] = useState("Arial");
  const [showMoreFonts, setShowMoreFonts] = useState(false);

  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/webfonts/v1/webfonts?key=${import.meta.env.VITE_GOOGLE_FONT_API}`,
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fontList = res.data.items.map((font: any) => font.family);
        setFonts(fontList);
      } catch (err) {
        console.error("Error fetching Google Fonts:", err);
      }
    };
    fetchFonts();
  }, []);

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
      TextStyle,
      TextStyleExtended,
      FontFamily.configure({
        types: ["textStyle"],
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        toggleFontPickers(false, false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleFontChange = (font: string) => {
    setCurrentFont(font);
    toggleFontPickers(false, false);
    editor?.chain().focus().setFontFamily(font).run();
  };

  const toggleFontPickers = (normal: boolean, more: boolean) => {
    setShowFontButtons(normal);
    setShowMoreFonts(more);
  };

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
          <div className="Menubar" ref={menuRef}>
            <div className="FontManager">
              <button
                style={{ fontFamily: currentFont }}
                onClick={() => toggleFontPickers(!showFontButtons, false)}
                className="FontDropper"
              >
                {currentFont}
                <div
                  className={
                    "FontArrow" + (showFontButtons ? " is-active" : "")
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e8eaed"
                  >
                    <path d="m280-400 200-200 200 200H280Z" />
                  </svg>
                </div>
              </button>
              {showFontButtons && (
                <div className="FontButtons">
                  <button
                    className="MoreFonts"
                    style={{ fontFamily: "Arial" }}
                    onClick={() => toggleFontPickers(false, true)}
                  >
                    More Fonts
                  </button>
                  <span style={{ borderBottom: "1px solid #dddddd" }} />
                  {topFonts.map((font: string) => (
                    <button
                      key={font}
                      style={{ fontFamily: font }}
                      onClick={() => handleFontChange(font)}
                    >
                      {font === currentFont ? "✓ " : ""}
                      {font}
                    </button>
                  ))}
                </div>
              )}
              {showMoreFonts && (
                <div className="MoreFontsPopup">
                  <div className="MoreFontsPopupContent">
                    <button
                      className="ClosePopup"
                      onClick={() => toggleFontPickers(false, false)}
                    >
                      Close
                    </button>
                    <span
                      style={{
                        borderBottom: "1px solid #dddddd",
                        display: "block",
                        height: "1px",
                      }}
                    />
                    {fonts.map((fonts: string) => (
                      <button
                        key={fonts}
                        style={{ fontFamily: fonts }}
                        onClick={() => handleFontChange(fonts)}
                      >
                        {fonts === currentFont ? "✓ " : ""}
                        {fonts}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="FontSize">
              <button
                onClick={() => {
                  const currentFontSize =
                    editor?.getAttributes("textStyle").fontSize || 16;
                  editor.commands.setFontSize((parseInt(currentFontSize) + 1).toString());
                }}
                className="Increase"
              >
                A+
              </button>
              <FontSizeDropdown editor={editor} />
              <button
                onClick={() => {
                  const currentFontSize =
                    editor?.getAttributes("textStyle").fontSize || 16;
                  editor.commands.setFontSize((parseInt(currentFontSize) - 1).toString());
                }}
                className="Decrease"
              >
                A-
              </button>
            </div>
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : ""}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#6e0b0b"
              >
                <path d="M272-200v-560h221q65 0 120 40t55 111q0 51-23 78.5T602-491q25 11 55.5 41t30.5 90q0 89-65 124.5T501-200H272Zm121-112h104q48 0 58.5-24.5T566-372q0-11-10.5-35.5T494-432H393v120Zm0-228h93q33 0 48-17t15-38q0-24-17-39t-44-15h-95v109Z" />
              </svg>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "is-active" : ""}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#6e0b0b"
              >
                <path d="M200-200v-100h160l120-360H320v-100h400v100H580L460-300h140v100H200Z" />
              </svg>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              disabled={!editor.can().chain().focus().toggleStrike().run()}
              className={editor.isActive("strike") ? "is-active" : ""}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#6e0b0b"
              >
                <path d="M486-160q-76 0-135-45t-85-123l88-38q14 48 48.5 79t85.5 31q42 0 76-20t34-64q0-18-7-33t-19-27h112q5 14 7.5 28.5T694-340q0 86-61.5 133T486-160ZM80-480v-80h800v80H80Zm402-326q66 0 115.5 32.5T674-674l-88 39q-9-29-33.5-52T484-710q-41 0-68 18.5T386-640h-96q2-69 54.5-117.5T482-806Z" />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#6e0b0b"
              >
                <path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z" />
              </svg>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive("bulletList") ? "is-active" : ""}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M360-200v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360ZM200-160q-33 0-56.5-23.5T120-240q0-33 23.5-56.5T200-320q33 0 56.5 23.5T280-240q0 33-23.5 56.5T200-160Zm0-240q-33 0-56.5-23.5T120-480q0-33 23.5-56.5T200-560q33 0 56.5 23.5T280-480q0 33-23.5 56.5T200-400Zm0-240q-33 0-56.5-23.5T120-720q0-33 23.5-56.5T200-800q33 0 56.5 23.5T280-720q0 33-23.5 56.5T200-640Z" />
              </svg>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive("orderedList") ? "is-active" : ""}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M120-80v-60h100v-30h-60v-60h60v-30H120v-60h120q17 0 28.5 11.5T280-280v40q0 17-11.5 28.5T240-200q17 0 28.5 11.5T280-160v40q0 17-11.5 28.5T240-80H120Zm0-280v-110q0-17 11.5-28.5T160-510h60v-30H120v-60h120q17 0 28.5 11.5T280-560v70q0 17-11.5 28.5T240-450h-60v30h100v60H120Zm60-280v-180h-60v-60h120v240h-60Zm180 440v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360Z" />
              </svg>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive("blockquote") ? "is-active" : ""}
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M6 6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a3 3 0 0 1-3 3H5a1 1 0 1 0 0 2h1a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2H6Zm9 0a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a3 3 0 0 1-3 3h-1a1 1 0 1 0 0 2h1a5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button onClick={() => addImage()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Zm-40 80v-560 560Z" />
              </svg>
            </button>
            <button onClick={addYoutube} className="YoutubeButton">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="m160-800 80 160h120l-80-160h80l80 160h120l-80-160h80l80 160h120l-80-160h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Zm0 240v320h640v-320H160Zm0 0v320-320Z" />
              </svg>
            </button>
            <button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z" />
              </svg>
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M396-200q-97 0-166.5-63T160-420q0-94 69.5-157T396-640h252L544-744l56-56 200 200-200 200-56-56 104-104H396q-63 0-109.5 40T240-420q0 60 46.5 100T396-280h284v80H396Z" />
              </svg>
            </button>
          </div>
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  );
}

export default Editor;
