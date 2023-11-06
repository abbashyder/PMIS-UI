'use client';
import { LayoutProvider } from '@/layout/context/layoutcontext';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '@/styles/layout/layout.scss';
import 'primereact/resources/primereact.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Inter } from "next/font/google";
import { AuthProvider } from '@/context/AuthProvider';

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <PrimeReactProvider>
                    <AuthProvider>
                        <LayoutProvider>{children}</LayoutProvider>
                    </AuthProvider>
                </PrimeReactProvider>
            </body>
        </html>
    );
}
