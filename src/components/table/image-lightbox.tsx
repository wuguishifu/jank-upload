'use client'

import { Cross2Icon } from '@radix-ui/react-icons';
import { useEffect, useRef, useState } from 'react';
import ClientPortal from '../ClientPortal';
import { Button } from '../ui/button';

type ImageLightboxProps = {
    src: File;
};

export default function ImageLightbox({ src }: ImageLightboxProps) {
    const [open, setOpen] = useState(false);
    const objectUrl = useRef(URL.createObjectURL(src));

    return (
        <>
            <Button
                variant='ghost'
                type='button'
                size='icon'
                className='!text-primary/30'
                onClick={() => setOpen(true)}>
                view
            </Button>
            <ClientPortal
                show={open}
                selector='portal'>
                <ImagePortal
                    objectUrl={objectUrl.current}
                    src={src}
                    setOpen={setOpen}
                />
            </ClientPortal>
        </>
    );
};

function ImagePortal({ setOpen, src, objectUrl }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>, src: File, objectUrl: string }) {

    useEffect(() => {
        function handleEscape(e: KeyboardEvent) {
            console.log(e.key);
            if (e.key === 'Escape') {
                setOpen(false);
            }
        }

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        }
    }, [setOpen]);

    return (
        <div className='absolute top-0 left-0 w-screen h-screen bg-black place-content-center animate-fade-in fill-mode-both select-none'>
            {/* eslint-disable-next-line */}
            <img
                src={objectUrl}
                className='object-contain w-full h-full pointer-events-none'
                alt={src.name}
            />
            <Button
                variant='ghost'
                className='absolute top-4 right-4 dark'
                size='icon'
                onClick={() => setOpen(false)}>
                <Cross2Icon className='size-8' color='white' />
            </Button>
            <h1 className='absolute top-4 text-white text-center w-full'>{src.name}</h1>
        </div>
    );
}
