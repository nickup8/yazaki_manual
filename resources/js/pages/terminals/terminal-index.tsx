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
    const [terminal_key, setTerminalKey] = useState('');
    const [processing, setProcessing] = useState(false);
    const [progress, setProgress] = useState<UploadProgress>({
        percentage: 0,
        total: null,
    });

    console.log(terminals);

    const { reset } = useForm();

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.get(
            '/terminals',
            { terminal_key },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

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
                <div className="mb-4">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="border border-sidebar-border/50">
                                <Link href="/terminals/create">
                                    <Plus />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Создать терминал</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="ml-2 border border-sidebar-border/50">
                                <Link href={route('terminals.index', { all: true })}>
                                    <CloudDownload />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Показать все терминалы</TooltipContent>
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
                <div>
                    <form className="flex w-full gap-2 border-t border-b py-2" onSubmit={submit}>
                        <Input type="search" placeholder="Код терминала" onChange={(e) => setTerminalKey(e.target.value)} />
                        <Button type="submit">Найти</Button>
                    </form>
                </div>
                {terminals.data.length > 0 && (
                    <>
                        <div className="mt-8 mb-4 text-lg">
                            Количество проводов <span>{terminals.meta.total}</span>
                        </div>
                        <TerminalTable terminals={terminals.data} />
                        <Pagination links={terminals.meta.links} />
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
