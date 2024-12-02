import { useState, useEffect, useRef } from "react";
import "../Editor.css";

const alignIcons = [
    {
        direction: "left",
        icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-120v-80h720v80H120Zm0-160v-80h480v80H120Zm0-160v-80h720v80H120Zm0-160v-80h480v80H120Zm0-160v-80h720v80H120Z"/></svg>,
    },
    {
        direction: "center",
        icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-120v-80h720v80H120Zm160-160v-80h400v80H280ZM120-440v-80h720v80H120Zm160-160v-80h400v80H280ZM120-760v-80h720v80H120Z"/></svg>,
    },
    {
        direction: "right",
        icon: <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-760v-80h720v80H120Zm240 160v-80h480v80H360ZM120-440v-80h720v80H120Zm240 160v-80h480v80H360ZM120-120v-80h720v80H120Z"/></svg>,
    }
]

export const TextAlign = ({ editor }: any) => {
    const [alignMenu, setAlignMenu] = useState(false);
    const [alignDirection, setAlignDirection] = useState("left");
    const menuRef = useRef<HTMLDivElement>(null);

    const directionHandler = (direction: string) => {
        if (direction === "left") {
            editor?.chain().focus().setTextAlign("left").run();
            setAlignDirection("left");
        } else if (direction === "center") {
            editor?.chain().focus().setTextAlign("center").run();
            setAlignDirection("center");
        } else if (direction === "right") {
            editor?.chain().focus().setTextAlign("right").run();
            setAlignDirection("right");
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setAlignMenu(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [menuRef]);

    return (
        <div className="AlignDropdown" style={{ display: alignMenu ? "block" : "none" }} ref={menuRef}>
            <button
                onClick={() => setAlignMenu(!alignMenu)}
                className="OpenAlignDropdown"
            >
                {alignIcons.find((icon) => icon.direction === alignDirection)?.icon}
            </button>
            {alignMenu && (
                <div className="AlignMenu">
                    {alignIcons.map((icon) => (
                        <button
                            key={icon.direction}
                            onClick={() => directionHandler(icon.direction)}
                            className={alignDirection === icon.direction ? "is-active" : ""}
                        >
                            {icon.icon}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
};