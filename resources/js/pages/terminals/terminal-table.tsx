import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';

export default function TerminalTable({ terminals }: any) {
    const columns = [
        {
            accessorKey: 'terminal_key',
            header: 'Код терминала',
            enableSorting: false,
        },
        {
            accessorKey: 'terminal_spn',
            header: 'SPN терминала',
            enableSorting: false,
            cell: ({ row }: any) => (row.original.terminal_spn ? row.original.terminal_spn : '-'),
        },
        {
            accessorKey: 'terminal_supplier',
            header: 'Поставщик терминала',
            enableSorting: false,
            cell: ({ row }: any) => (row.original.terminal_supplier ? row.original.terminal_supplier : '-'),
        },
        {
            accessorKey: 'description',
            header: 'Описание',
            enableSorting: false,
            cell: ({ row }: any) => (row.original.description ? row.original.description : '-'),
        },
        {
            accessorKey: 'created_at',
            header: 'Дата создания',
            enableSorting: false,
            cell: ({ row }: any) => new Date(row.original.created_at).toLocaleString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' }),
        },
        {
            accessorKey: 'updated_at',
            header: 'Дата обновления',
            enableSorting: false,
            cell: ({ row }: any) => new Date(row.original.updated_at).toLocaleString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' }),
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
    return <DataTable columns={columns} data={terminals} />;
}
