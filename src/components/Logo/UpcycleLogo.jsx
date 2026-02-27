import React from 'react';

export const UpcycleLogo = ({ size = 32, theme = 'dark', showText = true, className = '' }) => {
    // The mark is always the brand orange accent
    const markColor = '#f97316';
    // Text color updated to green theme color as requested
    const textColor = '#059669';

    return (
        <div
            className={`upcycle-logo ${className}`}
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: size * 0.25
            }}
        >
            <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke={markColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
            >
                <path d="M7 8v6a5 5 0 0 0 10 0V7a5 5 0 0 0-8.5-3.5" />
                <polyline points="11.5 1.5 8.5 3.5 10.5 6.5" />
            </svg>
            {showText && (
                <span
                    style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontWeight: 600,
                        fontSize: size * 1.1,
                        color: textColor,
                        letterSpacing: '-0.02em',
                        lineHeight: '1',
                        margin: 0,
                        padding: 0
                    }}
                >
                    Upcycle
                </span>
            )}
        </div>
    );
};
