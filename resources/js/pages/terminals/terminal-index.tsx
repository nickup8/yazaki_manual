import FormField from '@/components/form-field';
import Heading from '@/components/heading';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { AxiosProgressEvent } from 'axios';
import { CloudDownload, Import, Loader2, Plus } from 'lucide-react';
import { useRef, useState } from 'react';
import TerminalTable from './terminal-table';

type UploadProgress = {
    percentage: number;
    total: number | null;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Терминалы',
        href: '/terminals',
    },
];
export default function TerminalIndex({ terminals, pagination }: { terminals: any; pagination: any }) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [processing, setProcessing] = useState(false);
    const [progress, setProgress] = useState<UploadProgress>({
        percentage: 0,
        total: null,
    });

    const { reset, errors, data, setData } = useForm({
        terminal_key: '',
        terminal_spn: '',
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const query: Record<string, string> = {};
        if (data.terminal_spn) query.terminal_spn = data.terminal_spn;
        if (data.terminal_key) query.terminal_key = data.terminal_key;
        router.get('/terminals', query, { preserveState: true });
    };

    const handleReset = () => reset();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setProcessing(true);
        setProgress({ percentage: 0, total: null });

        router.post(route('terminals.import'), formData, {
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
                router.visit('/terminals', { only: ['terminals'], preserveState: true });
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
            <Head title="Терминалы" />
            <div className="p-4">
                <Heading title="Терминалы" description="Управление терминалами" />
                <div className="mb-4 flex">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild variant="ghost" size="icon" className="border border-sidebar-border/50">
                                <Link href="/terminals/create">
                                    <Plus />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Создать терминал</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild variant="ghost" size="icon" className="ml-2 border border-sidebar-border/50">
                                <Link href={route('terminals.index', { all: true })}>
                                    <CloudDownload />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Показать все терминалы</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="relative ml-2">
                                <Button variant="ghost" size="icon" className="border border-sidebar-border/50">
                                    <Import />
                                </Button>
                                <Input
                                    ref={fileInputRef}
                                    type="file"
                                    name="file"
                                    accept=".xlsx,.csv,.txt"
                                    className="absolute top-0 left-0 h-full w-full cursor-pointer opacity-0"
                                    onChange={handleFileChange}
                                    disabled={processing}
                                />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>Импорт из файла</TooltipContent>
                    </Tooltip>
                </div>
                <div>
                    <form className="flex w-full items-end gap-4 border-b pb-4" onSubmit={submit}>
                        {/* <Input type="search" placeholder="Код терминала" onChange={(e) => setTerminalKey(e.target.value)} /> */}

                        <FormField
                            id="terminal_key"
                            label="Код терминала"
                            value={data.terminal_key}
                            onChange={(val) => setData('terminal_key', val)}
                            disabled={processing}
                            error={errors.terminal_key}
                        />
                        <FormField
                            id="terminal_spn"
                            label="Код поставщика (SPN)"
                            value={data.terminal_spn}
                            onChange={(val) => setData('terminal_spn', val)}
                            disabled={processing}
                            error={errors.terminal_spn}
                        />
                        <div className="flex gap-2">
                            <Button type="submit" disabled={processing}>
                                {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Найти
                            </Button>
                            <Button type="button" variant="outline" onClick={handleReset}>
                                Очистить
                            </Button>
                        </div>
                    </form>
                </div>
                {terminals.data.length > 0 && (
                    <>
                        <div className="mt-4 mb-2 text-lg">
                            Количество проводов <span>{terminals.meta.total}</span>
                        </div>
                        <TerminalTable terminals={terminals.data} />
                        {terminals.meta.last_page > 1 && (
                            <div className="mt-2 flex justify-center">
                                <Pagination links={terminals.meta.links} />
                            </div>
                        )}
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
