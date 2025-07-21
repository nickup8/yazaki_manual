import { DataTable } from '@/components/ui/data-table';
import { Seal } from '@/types';
import { ColumnDef } from '@tanstack/react-table';

export default function SealTable({ seals }: { seals: Seal[] }) {
    const columns: ColumnDef<Seal>[] = [
        {
            accessorKey: 'seal_key',
            header: 'Код уплотнителя',
        },
        {
            accessorKey: 'seal_spn',
            header: 'Код поставщика (SPN)',
        },
        {
            accessorKey: 'seal_supplier',
            header: 'Поставщик',
        },
        {
            accessorKey: 'seal_color',
            header: 'Цвет',
            enableSorting: false,
            cell: ({ row }) => row.original.seal_color.color_name,
        },
        {
            accessorKey: 'description',
            header: 'Description',
        },
    ];
    return <DataTable columns={columns} data={seals} />;
}
