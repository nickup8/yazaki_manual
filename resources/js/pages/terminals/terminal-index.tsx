import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { AxiosProgressEvent } from 'axios';
import { CloudDownload, Import, Plus } from 'lucide-react';
import { useRef, useState } from 'react';

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
export default function TerminalIndex() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [processing, setProcessing] = useState(false);
    const [progress, setProgress] = useState<UploadProgress>({
        percentage: 0,
        total: null,
    });

    const { reset } = useForm();
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
                                <Link href={route('wires.index', { all: true })}>
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
                    <form className="flex w-full gap-2 border-t border-b py-2">
                        <Input type="search" placeholder="Код терминала" />
                        <Button type="submit">Найти</Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
