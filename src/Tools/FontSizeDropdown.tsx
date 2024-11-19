import { useState, useEffect, useRef } from 'react';
import './Editor.css';

const commonFontSize = [12, 14, 15, 16, 18, 20, 24, 30, 36, 48, 60, 72, 96, 108];

const FontSizeDropdown = ({ editor }: any) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const onFontSizeChange = (e: any) => {
        editor?.commands.setFontSize(e.target.value);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setDropdownOpen(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [menuRef]);

    return (
        <div className="FontSizeDropdown" ref={menuRef}>
            <input
                style={{ fontSize: "1em" }}
                value={editor?.getAttributes("textStyle")?.fontSize || ""}
                onChange={onFontSizeChange}
                onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
                <div className="FontSizePicker">
                    {commonFontSize.map((size) => (
                        <button
                            key={size}
                            onClick={() => {
                                editor?.commands.setFontSize(size);
                                setDropdownOpen(false);
                            }}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default FontSizeDropdown;