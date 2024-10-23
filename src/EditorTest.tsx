import { Link } from "react-router-dom";
import { useRef } from "react";

function EditorTest() {
    const contentEditableRef = useRef<HTMLDivElement>(null);

    const execCommand = (command: string) => {
        document.execCommand(command, false, null);
    }

    return (
        <div>
            <link rel="stylesheet" href="./index.css" />

            <input type="text" placeholder="enter title lol" />
            <br />
            <button onClick={() => execCommand('bold')}><b>B</b></button>
            <button onClick={() => execCommand('italic')}><i>i</i></button>
            <button onClick={() => execCommand('underline')}><u>U</u></button>
            <br />
            <div contentEditable={true}></div>
        </div>
    )
}

export default EditorTest