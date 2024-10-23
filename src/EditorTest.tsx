import { useRef } from "react";

function EditorTest() {
    const contentEditableRef = useRef<HTMLDivElement>(null);

    const applyStyle = (tag: string) => {
        const selection = document.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        const selectedText = range.extractContents();
        const span = document.createElement(tag);
        span.appendChild(selectedText);
        range.insertNode(span);
    };

    return (
        <div>
            <link rel="stylesheet" href="./index.css" />

            <input type="text" placeholder="enter title lol" />
            <br />
            <div className="toolbar">
                <button onClick={() => applyStyle('b')}><b>B</b></button>
                <button onClick={() => applyStyle('i')}><i>i</i></button>
                <button onClick={() => applyStyle('u')}><u>U</u></button>
            </div>
            <br />
            <div ref={contentEditableRef} contentEditable={true}></div>
        </div>
    )
}

export default EditorTest;