import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn, formatBytes } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUp, MoreHorizontal } from 'lucide-react';
import ImageLightbox from './image-lightbox';

declare global {
    interface File {
        status?: 'pending' | 'uploading' | 'uploaded' | 'failed';
        data?: string;
    }
}

type ColumnsProps = {
    onDelete: (name: string) => void;
};

export function Columns({ onDelete }: ColumnsProps): ColumnDef<File>[] {
    return [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                    onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
                    aria-label='Select all'
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={value => row.toggleSelected(!!value)}
                    aria-label='Select'
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            id: 'name',
            accessorKey: 'name',
            header: ({ column }) => (
                <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    <div className='flex flex-row items-center gap-2'>
                        <p className='m-0'>name</p>
                        {column.getIsSorted() === 'asc'
                            ? <ArrowUp className='size-4' />
                            : column.getIsSorted() === 'desc'
                                ? <ArrowUp className='size-4 transform rotate-180' />
                                : <div className='size-4' />
                        }
                    </div>
                </Button>
            ),
            cell: ({ row }) => (
                <div className='flex items-center'>
                    <p className='px-3 m-0'>
                        {row.original.name}
                    </p>
                    <ImageLightbox
                        src={row.original}
                    />
                </div>
            ),
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'size',
            accessorKey: 'size',
            header: ({ column }) => (
                <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    <div className='flex flex-row items-center gap-2'>
                        <p className='m-0'>size</p>
                        {column.getIsSorted() === 'asc'
                            ? <ArrowUp className='size-4' />
                            : column.getIsSorted() === 'desc'
                                ? <ArrowUp className='size-4 transform rotate-180' />
                                : <div className='size-4' />
                        }
                    </div>
                </Button>
            ),
            cell: ({ row }) => (
                <p className='px-3 m-0'>
                    {formatBytes(row.original.size)}
                </p>
            ),
            enableSorting: true,
            enableHiding: true,
        },
        {
            id: 'status',
            accessorKey: 'status',
            header: ({ column }) => (
                <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    <div className='flex flex-row items-center gap-2'>
                        <p className='m-0'>status</p>
                        {column.getIsSorted() === 'asc'
                            ? <ArrowUp className='size-4' />
                            : column.getIsSorted() === 'desc'
                                ? <ArrowUp className='size-4 transform rotate-180' />
                                : <div className='size-4' />
                        }
                    </div>
                </Button>
            ),
            cell: ({ row }) => (
                <p className={cn('px-3 m-0', row.original.status ?? 'pending')}>
                    {row.original.status ?? 'pending'}
                </p>
            ),
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <Dialog>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>are you sure?</DialogTitle>
                            <DialogDescription>
                                this can&rsquo;t be undone (you can add the email back, but the original joined date will be lost)
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose className={buttonVariants({ variant: 'outline' })}>
                                cancel
                            </DialogClose>
                            <Button
                                variant='destructive'
                                type="button"
                                onClick={() => {
                                    onDelete(row.original.name);
                                    row.toggleSelected(false);
                                }}>
                                delete
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.name)}>
                                copy name
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <DialogTrigger className="w-full !text-destructive hover:!text-destructive">
                                    delete entry
                                </DialogTrigger>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </Dialog>
            ),
        },
    ];
};
