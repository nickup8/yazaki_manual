import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { EllipsisVertical } from 'lucide-react';

export default function LeadsetTable({ leadsets }: { leadsets: any }) {
    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'leadset',
            header: 'Leadset',
        },
        {
            accessorKey: 'description',
            header: 'Описание',
        },
        {
            accessorKey: 'cable_class',
            header: 'Класс провода',
        },
        {
            accessorKey: 'batch_size',
            header: 'Размер партии',
        },
        {
            accessorKey: 'vendor_code',
            header: 'Код заказчика',
        },
        {
            accessorKey: 'created_at',
            header: 'Дата создания',
            cell: ({ row }) =>
                new Date(row.original.created_at).toLocaleString('ru-RU', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                }),
        },
        {
            accessorKey: 'updated_at',
            header: 'Дата обновления',
            cell: ({ row }) =>
                new Date(row.original.updated_at).toLocaleString('ru-RU', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                }),
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex size-8 text-muted-foreground data-[state=open]:bg-muted" size="icon">
                            <EllipsisVertical />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem asChild>
                            <Link href={route('leadsets.show', { leadset: row.original.id })}>Просмотр</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={route('leadsets.edit', { leadset: row.original.id })}>Редактировать</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Копировать</DropdownMenuItem>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">Удалить</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];
    return <DataTable columns={columns} data={leadsets} />;
}
