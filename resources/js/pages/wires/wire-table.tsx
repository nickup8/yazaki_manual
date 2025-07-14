import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Wire } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { EllipsisVertical } from 'lucide-react';

export default function WireTable({ wires }: { wires: Wire[] }) {
    const columns: ColumnDef<Wire>[] = [
        {
            accessorKey: 'wire_key',
            header: 'Код провода',
            enableSorting: false,
        },
        {
            accessorKey: 'description',
            header: 'Описание',
            enableSorting: false,
        },
        {
            accessorKey: 'wire_type',
            header: 'Тип провода',
            enableSorting: false,
            cell: ({ row }) => row.original.wire_type.name,
        },
        {
            accessorKey: 'cross_section',
            header: 'Сечение',
            enableSorting: false,
        },
        {
            accessorKey: 'wire_color_base',
            header: 'Цвет основной',
            enableSorting: false,
            cell: ({ row }) => row.original.wire_color_base.name,
        },
        {
            accessorKey: 'wire_color_add',
            header: 'Цвет дополнительный',
            enableSorting: false,
            cell: ({ row }) => row.original.wire_color_add?.name || '-',
        },
        {
            accessorKey: 'created_at',
            header: 'Дата создания',
            enableSorting: false,
            cell: ({ row }) =>
                new Date(row.original.created_at).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                }),
        },
        {
            accessorKey: 'updated_at',
            header: 'Дата обновления',
            enableSorting: false,
            cell: ({ row }) =>
                new Date(row.original.updated_at).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                }),
        },
        {
            id: 'actions',
            cell: () => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex size-8 text-muted-foreground data-[state=open]:bg-muted" size="icon">
                            <EllipsisVertical />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem>Редактировать</DropdownMenuItem>
                        <DropdownMenuItem>Копировать</DropdownMenuItem>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">Удалить</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];
    return (
        <>
            <DataTable columns={columns} data={wires} />
        </>
    );
}
