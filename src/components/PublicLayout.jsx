import React from 'react';
import PublicNavbar from './PublicNavbar/PublicNavbar';

export default function PublicLayout({ children }) {
    return (
        <div className="public-layout">
            <PublicNavbar />
            {children}
        </div>
    );
}
