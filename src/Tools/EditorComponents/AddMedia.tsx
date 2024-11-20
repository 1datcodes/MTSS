import { useCallback, useState } from "react";
import "../Editor.css";

export const AddImage = ({ editor }: any) => {
  const addImage = useCallback(() => {
    const url = window.prompt(
      "Paste the Image URL",
      "https://example.com/image.png",
    );

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  return (
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
  );
};

export const AddYoutube = ({ editor }: any) => {
  const [width] = useState("640");
  const [height] = useState("480");

  const addYoutube = useCallback(() => {
    const url = prompt(
      "Paste the YouTube URL",
      "https://youtu.be/dQw4w9WgXcQ", // We do a little bit of trolling here :)
    );
    console.log(url);

    if (url) {
      console.log("editor", editor);
      editor?.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, parseInt(width, 10)) || 640,
        height: Math.max(180, parseInt(height, 10)) || 480,
      });
    }
  }, [editor]);

  return (
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
  );
};

export const AddLink = ({ editor }: any) => {
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

  return (
    <button
      onClick={() => {
        if (editor.isActive("link")) {
          editor.chain().focus().extendMarkRange("link").unsetLink().run();
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
  );
};
