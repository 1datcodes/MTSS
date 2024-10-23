import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

function HomePage() {
    const [content, setContent] = useState(localStorage.getItem('homePageContent') || '<h1>Home Page</h1>');
    const [isEditing, setIsEditing] = useState(false);
    const quillRef = useRef<HTMLDivElement>(null);
    const quillInstance = useRef<Quill | null>(null);

    useEffect(() => {
        if (quillRef.current && !quillInstance.current) {
            quillInstance.current = new Quill(quillRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ 'header': [1, 2, false] }],
                        ['bold', 'italic', 'underline'],
                        ['link', 'image'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }]
                    ]
                }
            });

            quillInstance.current.on('text-change', () => {
                setContent(quillInstance.current!.root.innerHTML);
            });
        }
    }, [isEditing]);

    useEffect(() => {
        if (quillInstance.current && isEditing) {
            quillInstance.current.root.innerHTML = content;
            quillInstance.current.enable();
            quillInstance.current.focus();
        } else if (quillInstance.current) {
            quillInstance.current.disable();
        }
    }, [isEditing, content]);

    useEffect(() => {
        localStorage.setItem('homePageContent', content);
    }, [content]);

    const handleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
        if (!quillRef.current?.contains(event.relatedTarget)) {
            setIsEditing(false);
        }
    };

    return (
        <div onBlur={handleBlur}>
            {isEditing ? (
                <div ref={quillRef} style={{ height: '500px' }} />
            ) : (
                <div
                    dangerouslySetInnerHTML={{ __html: content }}
                    onClick={handleClick}
                    style={{ cursor: 'pointer' }}
                />
            )}
            <Link to="/resources">Resources</Link>
            <br />
            <Link to="/supports">Supports</Link>
        </div>
    );
}

export default HomePage;