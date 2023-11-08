import React from "react";

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}
