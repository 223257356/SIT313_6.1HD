import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markdown';
import 'prismjs/themes/prism.css';
import ReactMarkdown from 'react-markdown';
import '../styles/PostComponent.css';
import { db } from '../utilities/firebase';
import { collection, addDoc } from 'firebase/firestore';

const initialPostContent = '# Your question title\n\nDescribe your question here.\n\n```javascript\n// Your code here\nconsole.log("Hello, World!");\n```';

const PostComponent = () => {
  const [postContent, setPostContent] = useState(initialPostContent);
  const [isPosting, setIsPosting] = useState(false);

  const handleContentChange = (code) => {
    setPostContent(code);
  };

  const handlePost = async () => {
    setIsPosting(true);
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        content: postContent,
        createdAt: new Date()
      });
      console.log("Document written with ID: ", docRef.id);
      alert('Post submitted successfully!');
      setPostContent(initialPostContent); // Reset to initial state
    } catch (error) {
      console.error('Error posting:', error);
      alert('Failed to submit post. Please try again.');
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="post-component">
      <h2>Create Your Post</h2>
      <div className="editor-section">
        <Editor
          value={postContent}
          onValueChange={handleContentChange}
          highlight={code => highlight(code, languages.markdown)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
            backgroundColor: '#f5f5f5',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
      </div>
      <button onClick={handlePost} disabled={isPosting} className="post-button">
        {isPosting ? 'Posting...' : 'Post'}
      </button>
      <h2>Preview</h2>
      <div className="preview-section">
        <ReactMarkdown
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || '')
              const lang = match && match[1] ? match[1] : 'text'
              return !inline ? (
                <Editor
                  value={String(children).replace(/\n$/, '')}
                  highlight={code => highlight(code, languages[lang] || languages.text)}
                  padding={10}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 14,
                    backgroundColor: '#f0f0f0',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                  readOnly={true}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            }
          }}
        >
          {postContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default PostComponent;
