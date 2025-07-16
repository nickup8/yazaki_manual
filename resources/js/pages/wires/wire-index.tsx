import Heading from '@/components/heading';

import Pagination from '@/components/pagination';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import ImportLoader from '@/components/import-loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFileImport } from '@/hooks/use-file-import';
import { useWireFilters } from '@/hooks/use-wire-filters';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Wire, WireColor, WireType } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { CloudDownload, Import, Plus } from 'lucide-react';
import { useState } from 'react';
import WireFilterForm from './wire-filter-form';
import WireTable from './wire-table';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Провода', href: '/wires' }];

type UploadProgress = {
    percentage: number;
    total: number | null;
};

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

export default function WireIndex({
    wire_types,
    wire_colors,
    success,
    wires,
}: {
    wire_types: WireType[];
    wire_colors: WireColor[];
    success: string;
    wires: PaginatedWires;
}) {
    const [isSearching, setIsSearching] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

    const {
        wireKey,
        setWireKey,
        description,
        setDescription,
        selectedTypeId,
        setSelectedTypeId,
        selectedColorBaseId,
        setSelectedColorBaseId,
        selectedColorAddId,
        setSelectedColorAddId,
        resetFilters,
        hasAnyFilter,
    } = useWireFilters(wire_types, wire_colors);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);
        const query: Record<string, string> = {};

        if (wireKey.trim()) query.wire_key = wireKey;
        if (description.trim()) query.description = description;
        if (selectedTypeId) query.wire_type_id = selectedTypeId;
        if (selectedColorBaseId) query.wire_color_base_id = selectedColorBaseId;
        if (selectedColorAddId) query.wire_color_add_id = selectedColorAddId;

        router.get('/wires', query, {
            preserveState: true,
            onFinish: () => setIsSearching(false),
        });
    };

    const handleReset = () => {
        setIsResetting(true);
        resetFilters();
        router.get(
            '/wires',
            {},
            {
                preserveState: true,
                onFinish: () => setIsResetting(false),
            },
        );
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
                            <Button variant="ghost" size="icon" className="border border-sidebar-border/50">
                                <Link href="/wires/create">
                                    <Plus />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Создать</TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="ml-2 border border-sidebar-border/50">
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

                <WireFilterForm
                    wire_types={wire_types}
                    wire_colors={wire_colors}
                    wireKey={wireKey}
                    description={description}
                    selectedTypeId={selectedTypeId}
                    selectedColorBaseId={selectedColorBaseId}
                    selectedColorAddId={selectedColorAddId}
                    setWireKey={setWireKey}
                    setDescription={setDescription}
                    setSelectedTypeId={setSelectedTypeId}
                    setSelectedColorBaseId={setSelectedColorBaseId}
                    setSelectedColorAddId={setSelectedColorAddId}
                    isSearching={isSearching}
                    isResetting={isResetting}
                    hasAnyFilter={hasAnyFilter}
                    handleSubmit={handleSubmit}
                    handleReset={handleReset}
                />

                {wires && (
                    <>
                        <div className="mt-8 mb-4 text-lg">
                            Количество проводов <span>{wires.meta.total}</span>
                        </div>
                        <WireTable wires={wires.data} />
                        <Pagination links={wires.meta.links} />
                    </>
                )}
            </div>
            {processing && <ImportLoader percentage={progress.percentage} total={progress.total} />}
        </AppLayout>
    );
}
