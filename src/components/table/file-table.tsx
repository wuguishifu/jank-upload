import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Cross2Icon } from '@radix-ui/react-icons';
import { ChangeEvent, useRef } from 'react';
import { Button, buttonVariants } from '../ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Columns } from './columns';
import { DataTable } from './data-table';

type FileTableProps = {
    className?: string;
    files: File[];
    deleteFile: (name: string) => void;
    deleteFiles: (names: string[]) => void;
    addFiles: (files: File[]) => void;
};

export default function FileTable({
    className,
    files,
    deleteFile,
    deleteFiles,
    addFiles,
}: FileTableProps) {
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files) addFiles(Array.from(event.target.files).map(file => {
            file.status = 'pending';
            return file;
        }));
    }

    const hiddenFileInput = useRef<HTMLInputElement>(null);

    return (
        <DataTable
            className={className}
            columns={Columns({ onDelete: deleteFile })}
            data={files}
            Header={({ table }) => (
                <div className='flex flex-row items-center gap-2'>
                    <Input
                        placeholder='filter (name)...'
                        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                        onChange={e => table.getColumn('name')?.setFilterValue(e.target.value)}
                        className='h-8 w-[150px] lg:w-[250px]'
                    />
                    {!!table.getState().columnFilters.length && (
                        <Button
                            variant='ghost'
                            className='h-8 px-2 lg:px-3'
                            onClick={() => table.resetColumnFilters()}>
                            clear filters
                            <Cross2Icon className='ml-2 size-4' />
                        </Button>
                    )}
                </div>
            )}
            Footer={({ table }) => (
                <div className='flex flex-row items-center gap-2'>
                    {!!table.getSelectedRowModel().flatRows.length && (
                        <Dialog>
                            <DialogTrigger className={cn(
                                buttonVariants({ variant: 'destructive', size: 'sm' }),
                                'h-8'
                            )}>
                                delete selected
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>are you sure?</DialogTitle>
                                </DialogHeader>
                                <DialogDescription>
                                    you are about to delete {table.getSelectedRowModel().flatRows.length} files
                                </DialogDescription>
                                <DialogFooter>
                                    <DialogClose className={buttonVariants({ variant: 'outline' })}>
                                        cancel
                                    </DialogClose>
                                    <Button
                                        variant='destructive'
                                        type='button'
                                        onClick={() => {
                                            deleteFiles(table.getSelectedRowModel().flatRows.map((({ original: { name } }) => name)));
                                            table.toggleAllRowsSelected(false);
                                        }}>
                                        delete selected
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}
                    <input
                        type='file'
                        multiple
                        onChange={handleChange}
                        ref={hiddenFileInput}
                        className='hidden'
                        style={{ display: 'none' }}
                    />
                    <Button
                        variant='outline'
                        onClick={() => {
                            console.log('clicked');
                            hiddenFileInput.current?.click();
                        }}
                        className='h-8'>
                        add files
                    </Button>
                </div>
            )}
        />
    );
};
