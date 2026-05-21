import React, { useState, useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.min.css';

const CodePreview = ({ code, language = 'html', children }) => {
    const [activeTab, setActiveTab] = useState('preview'); // 'preview' | 'code'
    const [copied, setCopied] = useState(false);
    const codeRef = useRef(null);

    // Efek ini jalan setiap kali tab berubah ke 'code' atau isi 'code' berubah
    useEffect(() => {
        if (activeTab === 'code' && codeRef.current) {
            // Reset atribut biar hljs mau nge-highlight ulang kalau code berubah
            delete codeRef.current.dataset.highlighted;
            hljs.highlightElement(codeRef.current);
        }
    }, [code, activeTab]);

    const copyCode = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-[var(--radius-m)] border border-line overflow-hidden mb-[var(--m)]">

            {/* Header: Tabs + Copy Button */}
            <div className="flex items-center justify-between px-[var(--m)] py-2 bg-sidebar border-b border-line">
                <div className="flex gap-1">
                    <button
                        onClick={() => setActiveTab('preview')}
                        className={`px-3 py-1 text-sm rounded-md transition-all cursor-pointer ${
                            activeTab === 'preview'
                                ? 'bg-surface shadow-sm font-medium text-primary'
                                : 'text-link hover:text-primary hover:bg-surface hover:shadow-sm hover:font-medium'
                        }`}
                    >
                        Preview
                    </button>
                    <button
                        onClick={() => setActiveTab('code')}
                        className={`px-3 py-1 text-sm rounded-md transition-all cursor-pointer ${
                            activeTab === 'code'
                                ? 'bg-surface shadow-sm font-medium text-primary'
                                : 'text-link hover:text-primary hover:bg-surface hover:shadow-sm hover:font-medium'
                        }`}
                    >
                        Code
                    </button>
                </div>

                {/* Copy Button (hanya muncul di tab Code) */}
                {activeTab === 'code' && (
                    <button
                        onClick={copyCode}
                        className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md border transition-all cursor-pointer ${
                            copied
                                ? 'bg-green-50 border-green-300 text-green-600'
                                : 'bg-surface border-line text-link hover:text-primary'
                        }`}
                    >
                        {/* Icon Copy */}
                        {!copied ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                            </svg>
                        ) : (
                            /* Icon Check */
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        )}
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                )}
            </div>

            {/* Tab: Preview */}
            {activeTab === 'preview' && (
                <div className="p-[var(--m)]">
                    {children ? children : <span className="text-sm text-link">No preview slot provided.</span>}
                </div>
            )}

            {/* Tab: Code */}
            {activeTab === 'code' && (
                <div className="overflow-auto max-h-[500px]">
          <pre className="!m-0 !rounded-none">
            <code className={`language-${language}`} ref={codeRef}>
              {code}
            </code>
          </pre>
                </div>
            )}
        </div>
    );
};

export default CodePreview;