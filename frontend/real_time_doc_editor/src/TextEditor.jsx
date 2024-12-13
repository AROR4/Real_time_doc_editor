import React, { useState, useEffect, useRef } from 'react';

const TextEditor = ({ socket }) => {
    const [content, setContent] = useState("");
    const editorRef = useRef(null);

    // Update content from other users in real-time
    useEffect(() => {
        if (socket) {
            socket.on("content_update", (newContent) => {
                setContent(newContent);
            });
        }
    }, [socket]);

    // Send updates to the server when the content changes
    const handleChange = (e) => {
        const newContent = e.target.innerText;
        setContent(newContent);
        socket.emit("content_update", newContent);
    };

    return (
        <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={handleChange}
            style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
                minHeight: "300px",
                width: "80%",
                margin: "20px auto",
                background: "#fafafa",
            }}
        >
            {content}
        </div>
    );
};

export default TextEditor;
