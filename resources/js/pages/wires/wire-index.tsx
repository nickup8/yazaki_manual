import Heading from '@/components/heading';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Wire, WireColor, WireType } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { AxiosProgressEvent } from 'axios';
import { CloudDownload, Import, Loader2, Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import WireTable from './wire-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Провода',
        href: '/wires',
    },
];

type UploadProgress = {
    percentage: number;
    total: number | null;
};

interface PaginatedWires {
    data: Wire[];
    meta: {
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
    links: {
        first: string;
        last: string;
        next: string | null;
        prev: string | null;
    };
}

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
    const [wireKey, setWireKey] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTypeId, setSelectedTypeId] = useState('');
    const [selectedColorBaseId, setSelectedColorBaseId] = useState('');
    const [selectedColorAddId, setSelectedColorAddId] = useState('');

    const [isSearching, setIsSearching] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [progress, setProgress] = useState<UploadProgress>({
        percentage: 0,
        total: null,
    });
    const { post, setData, reset } = useForm<{ file: File | null }>({
        file: null,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (params.get('wire_key')) setWireKey(params.get('wire_key')!);
        if (params.get('description')) setDescription(params.get('description')!);

        if (params.get('wire_type_id') && wire_types.some((t) => String(t.id) === params.get('wire_type_id'))) {
            setSelectedTypeId(params.get('wire_type_id')!);
        }

        if (params.get('wire_color_base_id') && wire_colors.some((c) => String(c.id) === params.get('wire_color_base_id'))) {
            setSelectedColorBaseId(params.get('wire_color_base_id')!);
        }

        if (params.get('wire_color_add_id') && wire_colors.some((c) => String(c.id) === params.get('wire_color_add_id'))) {
            setSelectedColorAddId(params.get('wire_color_add_id')!);
        }
    }, [wire_types, wire_colors]);

    const hasAnyFilter = wireKey || description || selectedTypeId || selectedColorBaseId || selectedColorAddId;

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
        setWireKey('');
        setDescription('');
        setSelectedTypeId('');
        setSelectedColorBaseId('');
        setSelectedColorAddId('');
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setProcessing(true);
        setProgress({ percentage: 0, total: null });

        router.post(route('wires.import'), formData, {
            forceFormData: true,
            preserveScroll: true,

            onProgress: (event?: AxiosProgressEvent) => {
                if (!event || event.total === undefined) return;
                const percent = Math.round((event.loaded * 100) / (event.total ?? 1));
                setProgress({
                    percentage: percent,
                    total: event.total,
                });
            },

            onSuccess: () => {
                router.visit('/wires', { only: ['wires'], preserveState: true });
            },

            onError: (errors) => {
                console.error('Import errors:', errors);
                alert('Ошибка при импорте файла: ' + Object.values(errors)[0]);
            },

            onFinish: () => {
                setProcessing(false);
                setProgress({ percentage: 0, total: null });
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                reset();
            },
        });
    };

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
                <form className="flex w-full flex-wrap gap-2 border-t border-b py-2" onSubmit={handleSubmit}>
                    <div>
                        <Input
                            placeholder="Код провода"
                            name="wire_key"
                            value={wireKey}
                            onChange={(e) => setWireKey(e.target.value)}
                            disabled={isSearching || isResetting}
                        />
                    </div>
                    <div>
                        <Input
                            placeholder="Описание"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={isSearching || isResetting}
                        />
                    </div>
                    <Select value={selectedTypeId} onValueChange={setSelectedTypeId} disabled={isSearching || isResetting}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Тип провода" />
                        </SelectTrigger>
                        <SelectContent>
                            {wire_types.map((type) => (
                                <SelectItem key={type.id} value={String(type.id)}>
                                    {type.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={selectedColorBaseId} onValueChange={setSelectedColorBaseId} disabled={isSearching || isResetting}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Базовый цвет" />
                        </SelectTrigger>
                        <SelectContent>
                            {wire_colors.map((color) => (
                                <SelectItem key={color.id} value={String(color.id)}>
                                    <span className="flex items-center">
                                        <span className="mr-2 inline-block h-4 w-4 border" style={{ backgroundColor: color.hex }} />
                                        <span>{color.name}</span>
                                    </span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={selectedColorAddId} onValueChange={setSelectedColorAddId} disabled={isSearching || isResetting}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Доп. цвет" />
                        </SelectTrigger>
                        <SelectContent>
                            {wire_colors.map((color) => (
                                <SelectItem key={color.id} value={String(color.id)}>
                                    <span className="flex items-center">
                                        <span className="mr-2 inline-block h-4 w-4 border" style={{ backgroundColor: color.hex }} />
                                        <span>{color.name}</span>
                                    </span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={isSearching || isResetting}>
                            {isSearching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Поиск
                        </Button>

                        {hasAnyFilter && (
                            <Button type="button" variant="outline" onClick={handleReset} disabled={isSearching || isResetting}>
                                {isResetting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Сбросить
                            </Button>
                        )}
                    </div>
                </form>
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
            {processing && (
                <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/70 text-white">
                    <Loader2 className="mb-4 h-12 w-12 animate-spin" />
                    <div className="mb-2 text-lg">Импорт файла...</div>
                    {progress.total !== null ? (
                        <div className="text-xl font-bold">
                            {progress.percentage}% ({Math.round(progress.total / 1024)} КБ)
                        </div>
                    ) : (
                        <div className="text-xl font-bold">Загрузка...</div>
                    )}
                </div>
            )}
        </AppLayout>
    );
}
