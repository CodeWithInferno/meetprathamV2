'use client';
import React, { useState, useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; // A great, readable theme

export default function CodeBlock({ children, language }) {
  const codeRef = useRef(null);
  const [copied, setCopied] = useState(false);

  // Use a ref to target this specific code block for highlighting
  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [children]); // Re-run only when the code content changes

  const handleCopy = async () => {
    if (children) {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative my-6 rounded-lg overflow-hidden bg-[#282c34] group">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 px-3 py-1 rounded-md bg-gray-700/50 text-xs font-semibold text-gray-300 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-600/70"
        aria-label="Copy code"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      
      <pre className="p-4 text-sm leading-relaxed overflow-x-auto">
        <code ref={codeRef} className={`language-${language || 'plaintext'}`}>
          {children}
        </code>
      </pre>
    </div>
  );

}