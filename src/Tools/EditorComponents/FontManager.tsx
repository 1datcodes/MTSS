import { useState, useEffect, useRef } from "react";
import axios from "axios";
import FontSizeDropdown from "./FontSizeDropdown";
import "../Editor.css";

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

export const FontManager = ({ editor }: any) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [fonts, setFonts] = useState([]);
  const [showFontButtons, setShowFontButtons] = useState(false);
  const [showMoreFonts, setShowMoreFonts] = useState(false);
  const [currentFont, setCurrentFont] = useState(
    editor?.getAttributes("textStyle").fontFamily || "Arial",
  );

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
  });

  const handleFontChange = (font: string) => {
    setCurrentFont(font);
    toggleFontPickers(false, false);
    editor?.chain().focus().setFontFamily(font).run();
  };

  const toggleFontPickers = (normal: boolean, more: boolean) => {
    setShowFontButtons(normal);
    setShowMoreFonts(more);
  };

  return (
    <div className="FontManager" ref={menuRef}>
      <button
        style={{
          fontFamily: editor?.getAttributes("textStyle").fontFamily || "Arial",
        }}
        onClick={() => toggleFontPickers(!showFontButtons, false)}
        className="FontDropper"
      >
        {editor?.getAttributes("textStyle").fontFamily || "Arial"}
        <div className={"FontArrow" + (showFontButtons ? " is-active" : "")}>
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
  );
};

export const FontSize = ({ editor }: any) => {
  return (
    <div className="FontSize">
      <button
        onClick={() => {
          const currentFontSize =
            editor?.getAttributes("textStyle").fontSize || 16;
          editor.commands.setFontSize(
            (parseInt(currentFontSize) + 1).toString(),
          );
        }}
        className="Increase"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="m40-200 210-560h100l210 560h-96l-51-143H187l-51 143H40Zm176-224h168l-82-232h-4l-82 232Zm504 104v-120H600v-80h120v-120h80v120h120v80H800v120h-80Z" />
        </svg>
      </button>
      <FontSizeDropdown editor={editor} />
      <button
        onClick={() => {
          const currentFontSize =
            editor?.getAttributes("textStyle").fontSize || 16;
          editor.commands.setFontSize(
            (parseInt(currentFontSize) - 1).toString(),
          );
        }}
        className="Decrease"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="m40-200 210-560h100l210 560h-96l-51-143H187l-51 143H40Zm176-224h168l-82-232h-4l-82 232Zm384-16v-80h320v80H600Z" />
        </svg>
      </button>
    </div>
  );
};
