// src/components/CodeDisplay.jsx
// Displays generated code with copy/download actions
import React, { useRef, useState } from 'react';

/**
 * Props:
 * @param {string} code - The code to display
 * @param {string} language - Language for syntax highlighting (default: jsx)
 */
export default function CodeDisplay({ code, language = 'jsx' }) {
  const codeRef = useRef(null);
  const [copyText, setCopyText] = useState('Copy Code');

  // A more robust method to copy code to the clipboard that works across more browsers and contexts.
  const handleCopy = () => {
    const textToCopy = codeRef.current?.innerText;
    if (!textToCopy) return;

    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;
    
    // Style the textarea to be invisible
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      setCopyText('Copied!');
      setTimeout(() => setCopyText('Copy Code'), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyText('Failed!');
       setTimeout(() => setCopyText('Copy Code'), 2000);
    }

    document.body.removeChild(textArea);
  };

  // Download code as a .jsx file
  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'GeneratedUI.jsx';
    document.body.appendChild(a); // Required for Firefox
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="w-full bg-surface border border-border rounded-lg p-4 relative shadow-inner">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-base text-gray-200">Generated Code</span>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1 rounded-md bg-primary text-white text-sm font-medium hover:bg-indigo-500 transition-all duration-200 w-24"
            aria-label="Copy code"
          >
            {copyText}
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1 rounded-md bg-accent text-white text-sm font-medium hover:bg-orange-500 transition"
            aria-label="Download code"
          >
            Download
          </button>
        </div>
      </div>
      <pre className="overflow-x-auto rounded-md bg-gray-900/70 p-4 text-sm text-green-300">
        <code ref={codeRef} className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
