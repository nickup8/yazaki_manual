import Heading from '@/components/heading';

import Pagination from '@/components/pagination';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import DynamicForm from '@/components/dynamic-form';
import ImportLoader from '@/components/import-loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFileImport } from '@/hooks/use-file-import';
import AppLayout from '@/layouts/app-layout';
import { submitFilter } from '@/lib/utils';
import { BreadcrumbItem, FieldConfig, Wire, WireColor, WireType } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { CloudDownload, Import, Plus } from 'lucide-react';
import WireTable from './wire-table';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Провода', href: '/wires' }];

type PaginatedWires = {
    data: Wire[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    links: {
        first: string;
        last: string;
        next: string | null;
        prev: string | null;
    };
};

type FormValues = {
    wire_key: string;
    description: string;
    wire_type_id: string;
    wire_color_base_id: string;
    wire_color_add_id: string;
};

export default function WireIndex({
    wire_types,
    wire_colors,
    success,
    wires,
    queryParams,
}: {
    wire_types: WireType[];
    wire_colors: WireColor[];
    success: string;
    wires: PaginatedWires;
    queryParams: Record<string, string>;
}) {
    const fields: FieldConfig<FormValues>[] = [
        { name: 'wire_key', label: 'Код провода', id: 'wire_key', type: 'text' },
        { name: 'description', label: 'Название', id: 'description', type: 'text' },
        {
            name: 'wire_type_id',
            label: 'Тип провода',
            id: 'wire_type_id',
            type: 'select',
            options: wire_types.map((t) => ({ value: String(t.id), label: t.name })),
        },
        {
            name: 'wire_color_base_id',
            label: 'Цвет основной',
            id: 'wire_color_base_id',
            type: 'select',
            options: wire_colors.map((c) => ({ value: String(c.id), label: c.name })),
        },
        {
            name: 'wire_color_add_id',
            label: 'Цвет дополнительный',
            id: 'wire_color_add_id',
            type: 'select',
            options: wire_colors.map((c) => ({ value: String(c.id), label: c.name })),
        },
    ];

    const handleSubmit = (values: FormValues) => {
        submitFilter<FormValues>({
            url: '/wires',
            queryParams: {},
            values,
            preserveState: true,
        });
    };

    const { fileInputRef, handleFileChange, processing, progress } = useFileImport(() => {
        router.visit('/wires', { only: ['wires'], preserveState: true });
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Провода" />
            <div className="flex h-full flex-1 flex-col overflow-x-auto rounded-xl p-4">
                <Heading title="Провода" description="Управление проводами" />

                <div className="mb-4">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild variant="ghost" size="icon" className="border border-sidebar-border/50">
                                <Link href="/wires/create">
                                    <Plus />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Создать</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild variant="ghost" size="icon" className="ml-2 border border-sidebar-border/50">
                                <Link href={route('wires.index', { all: true })}>
                                    <CloudDownload />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Показать все провода</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative ml-2 overflow-hidden border border-sidebar-border/50">
                                <Import />
                                <Input
                                    ref={fileInputRef}
                                    type="file"
                                    name="file"
                                    accept=".xlsx,.csv,.txt"
                                    className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
                                    onChange={handleFileChange}
                                    disabled={processing}
                                />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Импорт из файла</TooltipContent>
                    </Tooltip>
                </div>

                <DynamicForm
                    fields={fields}
                    onSubmit={handleSubmit}
                    defaultValues={{
                        wire_key: '',
                        description: '',
                        wire_type_id: '',
                        wire_color_base_id: '',
                        wire_color_add_id: '',
                    }}
                />

                {wires && (
                    <>
                        <div className="mt-4 mb-2 text-lg">
                            Количество проводов <span>{wires.meta.total}</span>
                        </div>
                        <WireTable wires={wires.data} />
                        {wires.meta.last_page > 1 && (
                            <div className="mt-2 flex justify-center">
                                <Pagination links={wires.meta.links} />
                            </div>
                        )}
                    </>
                )}
            </div>
            {processing && <ImportLoader percentage={progress.percentage} total={progress.total} />}
        </AppLayout>
    );
}
