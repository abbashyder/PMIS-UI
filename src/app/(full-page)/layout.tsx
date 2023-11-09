import React from 'react';


export default function FullPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}
