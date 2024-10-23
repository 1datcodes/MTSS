import { useRef } from "react";

function EditorTest() {
    const contentEditableRef = useRef<HTMLDivElement>(null);

    let saveData = {
        "title": "Untitled",
        "content": ""
    }

    const applyStyle = (tag: string) => {
        const selection = document.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        const selectedText = range.extractContents();
        const span = document.createElement(tag);
        span.appendChild(selectedText);
        range.insertNode(span);
    };
    const generateBlogId = () => {
        return "blog_" + btoa((Date.now() << localStorage.length).toString());
    }
    const save = (id: string) => {
        localStorage.setItem(id, JSON.stringify(saveData));
    }
    const updateTitle = (event: Event) => {
        saveData.title = event.target.value;
    }
    const updateContent = (mutationsList: MutationRecord[]) => {
        alert(JSON.stringify(mutationsList))
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                console.log('Content changed to:', document.getElementById("editor").innerHTML);
            }
        }
    }
    const contentObserver = new MutationObserver(updateContent);

    return (
        <div>
            <link rel="stylesheet" href="./index.css" />

            <h1><input type="text" placeholder="enter title lol" onChange={updateTitle} class="title-editor" /></h1>
            
            <br />
            <div className="toolbar">
                <button onClick={() => applyStyle('b')}><b>B</b></button>
                <button onClick={() => applyStyle('i')}><i>i</i></button>
                <button onClick={() => applyStyle('u')}><u>U</u></button>
            </div>
            <br />
            <div ref={contentEditableRef} contentEditable={true} id="editor"></div>
        </div>
    )
}

export default EditorTest;