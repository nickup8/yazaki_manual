import { DataTable } from '@/components/ui/data-table';

export default function ApplicationTable({ applications }: any) {
    const columns = [
        {
            accessorKey: 'inventory_key_application',
            header: 'Инвентарный номер',
        },
        {
            accessorKey: 'terminal',
            header: 'Код терминала',
            cell: ({ row }: any) => row.original.terminal.terminal_key,
        },
        {
            accessorKey: 'location',
            header: 'Местоположение',
            cell: ({ row }: any) => row.original.location || '-',
        },
    ];

    return <DataTable columns={columns} data={applications} />;
}
