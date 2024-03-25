'use client'

import ClientPortal from '@/components/ClientPortal';
import FileTable from '@/components/table/file-table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';

export default function Home() {
    const [hideUI, setHideUI] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [dragging, setDragging] = useState(0);

    useEffect(() => {
        const handleDragEnter = () => setDragging(p => p + 1);
        const handleDragLeave = () => setDragging(p => p - 1);

        window.addEventListener('dragenter', handleDragEnter);
        window.addEventListener('dragleave', handleDragLeave);

        return () => {
            window.removeEventListener('dragenter', handleDragEnter);
            window.removeEventListener('dragleave', handleDragLeave);
        };
    }, []);

    return (
        <main className='max-w-[60rem] w-full flex flex-col'>
            <ClientPortal
                show={false}
                selector='portal'>
                <div className='w-32 h-32 bg-blue-400' />
            </ClientPortal>
            <ClientPortal
                show={!!dragging}
                selector='portal'>
                <div
                    className='w-screen h-screen bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-center'
                    onDrop={e => {
                        const files = Array.from(e.dataTransfer.files).map(file => {
                            file.status = 'pending';
                            return file;
                        });
                        setFiles(prevState => [...prevState, ...files]);
                        setDragging(0);
                        e.preventDefault();
                    }}
                    onDragOver={e => e.preventDefault()}>
                    <h1>drop files here</h1>
                </div>
            </ClientPortal>
            <h1>welcome to the jank<sup>tm</sup> file upload</h1>
            {!hideUI && (
                <>
                    <FileTable
                        files={files}
                        deleteFile={(name) => setFiles(files => files.filter(file => file.name !== name))}
                        deleteFiles={(names: string[]) => setFiles(files => files.filter(file => !names.includes(file.name)))}
                        addFiles={(files) => setFiles(prevState => [...prevState, ...files])}
                    />
                    <div className='flex-1 w-full flex items-center justify-center'>
                        <Button
                            onClick={() => { }}
                            variant='default'
                            size='lg'>
                            Upload Files
                        </Button>
                    </div>
                </>
            )}
            <Label className='absolute bottom-4 right-4 flex items-center gap-2'>
                <span>hide ui</span>
                <Checkbox
                    checked={hideUI}
                    onCheckedChange={value => setHideUI(!!value)}
                />
            </Label>
        </main >
    );
};
