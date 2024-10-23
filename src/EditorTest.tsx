import { Link } from "react-router-dom";

function EditorTest() {
    return (
        <div>
            <link rel="stylesheet" href="./index.css" />

            <input type="text" placeholder="enter title lol" />
            <br />
            <button><b>B</b></button>
            <button><i>i</i></button>
            <button><u>U</u></button>
            <br />
            <div contentEditable={true}></div>
        </div>
    )
}

export default EditorTest