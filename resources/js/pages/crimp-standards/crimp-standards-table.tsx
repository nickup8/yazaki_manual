import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';

export default function CrimpStandardsTable({ crimp_standards }: any) {
    const columns = [
        {
            accessorKey: 'crimp_standard',
            header: 'Терминал',
            cell: ({ row }: any) => row.original.terminal.terminal_key,
        },
        {
            accessorKey: 'description',
            header: 'Уплотнитель',
            cell: ({ row }: any) => row.original.seal?.seal_key || '-',
        },
        {
            accessorKey: 'wire_type_1',
            header: 'Тип провода 1',
            cell: ({ row }: any) => row.original.wire_type_1?.name,
        },
        {
            accessorKey: 'wire_type_2',
            header: 'Тип провода 2',
            cell: ({ row }: any) => row.original.wire_type_2?.name || '-',
        },
        {
            accessorKey: 'cross_section_wire_1',
            header: 'Сечение провода 1',
        },
        {
            accessorKey: 'cross_section_wire_2',
            header: 'Сечение провода 2',
            cell: ({ row }: any) => row.original.cross_section_wire_2 || '-',
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
                        <DropdownMenuItem>Просмотр</DropdownMenuItem>
                        <DropdownMenuItem>Редактировать</DropdownMenuItem>
                        <DropdownMenuItem>Копировать</DropdownMenuItem>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">Удалить</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];
    return <DataTable columns={columns} data={crimp_standards} />;
}
