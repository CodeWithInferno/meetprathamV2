import React, { useState, useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css'; // or whichever theme you prefer

export default function CodeBlock({ children, language = "javascript" }) {
  const [copied, setCopied] = useState(false);

  // Re-run highlight on the <code> element anytime the children change
  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }, [children]);

  const handleCopy = async () => {
    // Copy the code string to the user’s clipboard
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative my-4 rounded-md overflow-hidden bg-gray-900 group">
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-1 rounded bg-gray-800 text-gray-300 
                   opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Copy code"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      
      {/* Actual code block */}
      <pre className={`p-4 text-sm text-gray-100`}>
        <code className={`language-${language}`}>
          {children}
        </code>
      </pre>
    </div>
  );
}
