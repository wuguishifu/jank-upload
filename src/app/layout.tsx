import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import neiru from '../../public/neiru.png';
import Image from 'next/image';
import { Toaster } from 'sonner';

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
            <body
                className={cn(
                    'min-h-screen bg-background font-nunito antialiased w-full relative',
                    nunito.variable,
                )}
                id='portal'>
                <Toaster richColors />
                <Image
                    placeholder='blur'
                    src={neiru}
                    alt='neiru'
                    className='absolute top-0 left-0 w-full h-full object-cover bg-white opacity-20 object-top select-none'
                />
                <div className='absolute top-0 left-0 w-full h-full flex justify-center'>
                    {children}
                </div>
            </body>
        </html>
    );
};
