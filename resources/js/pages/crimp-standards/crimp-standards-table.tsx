import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CrimpStandart } from '@/types';
import { Link, router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { EllipsisVertical } from 'lucide-react';

export default function CrimpStandardsTable({
    crimp_standards,
    terminal,
    seal,
}: {
    crimp_standards: CrimpStandart[];
    terminal: string;
    seal: string;
}) {
    const columns: ColumnDef<CrimpStandart>[] = [
        {
            accessorKey: 'crimp_standard',
            header: 'Терминал',
            cell: ({ row }) => row.original.terminal.terminal_key,
        },
        {
            accessorKey: 'description',
            header: 'Уплотнитель',
            cell: ({ row }) => row.original.seal?.seal_key || '-',
        },
        {
            accessorKey: 'wire_type_1',
            header: 'Тип провода 1',
            cell: ({ row }) => row.original.wire_type_1?.name,
        },
        {
            accessorKey: 'wire_type_2',
            header: 'Тип провода 2',
            cell: ({ row }) => row.original.wire_type_2?.name || '-',
        },
        {
            accessorKey: 'cross_section_wire_1',
            header: 'Сечение провода 1',
        },
        {
            accessorKey: 'cross_section_wire_2',
            header: 'Сечение провода 2',
            cell: ({ row }) => row.original.cross_section_wire_2 || '-',
        },
        {
            accessorKey: 'customer_code',
            header: 'Клиент',
        },

        {
            accessorKey: 'created_at',
            header: 'Дата создания',
            enableSorting: false,
            cell: ({ row }) => new Date(row.original.created_at).toLocaleString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' }),
        },
        {
            accessorKey: 'updated_at',
            header: 'Дата обновления',
            enableSorting: false,
            cell: ({ row }) => new Date(row.original.updated_at).toLocaleString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' }),
        },
        {
            id: 'actions',
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex size-8 cursor-pointer text-muted-foreground data-[state=open]:bg-muted" size="icon">
                            <EllipsisVertical />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem>
                            <Link
                                href={route('crimp_standards.show', {
                                    crimp_standard: row.original.id,
                                })}
                                className="w-full"
                            >
                                Просмотр
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={route('crimp_standards.edit', { crimp_standard: row.original.id })}>Редактировать</Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => router.delete(route('crimp_standards.destroy', { crimp_standard: row.original.id }), {})}
                        >
                            Удалить
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];
    return <DataTable columns={columns} data={crimp_standards} />;
}
