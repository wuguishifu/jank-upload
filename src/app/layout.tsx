import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const nunito = Nunito({
    subsets: ['latin'],
    variable: '--font-nunito',
});

export const metadata: Metadata = {
    title: 'Jank Upload',
    description: 'Created by Bo Bramer',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn(
                'min-h-screen bg-background font-nunito antialiased',
                nunito.variable,
            )}>
                {children}
            </body>
        </html>
    );
};
