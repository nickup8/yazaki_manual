import { DataTable } from '@/components/ui/data-table';
import { ApplicationItem } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export default function ApplicationTable({ applications }: { applications: ApplicationItem[] }) {
    const columns: ColumnDef<ApplicationItem>[] = [
        {
            accessorKey: 'inventory_key_application',
            header: 'Инвентарный номер',
        },
        {
            accessorKey: 'terminal',
            header: 'Код терминала',
            cell: ({ row }) => row.original.terminal.terminal_key,
        },
        {
            accessorKey: 'location',
            header: 'Местоположение',
            cell: ({ row }) => row.original.location || '-',
        },
    ];

    return <DataTable columns={columns} data={applications} />;
}
