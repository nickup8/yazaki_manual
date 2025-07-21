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

export default function CrimpStandardsIndex() {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Кримп стандарты',
            href: '/crimp_standards',
        },
    ];

    const [fileProcessing, setfileProcessing] = useState(false);
    const [progress, setProgress] = useState<UploadProgress>({
        percentage: 0,
        total: null,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, reset } = useForm({});

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setfileProcessing(true);
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
                setfileProcessing(false);
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
            <Head title="Кримп стандарты" />
            <div className="p-4">
                <Heading title="Кримп стандарты" />
                <div className="mb-4 flex">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild variant="ghost" size="icon" className="border border-sidebar-border/50">
                                <Link href="/crimp_standards/create">
                                    <Plus />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Создать стандарт</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild variant="ghost" size="icon" className="ml-2 border border-sidebar-border/50">
                                <Link href={route('crimp_standards.index', { all: true })}>
                                    <CloudDownload />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Показать все стандарты</TooltipContent>
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
                                    disabled={fileProcessing}
                                />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>Импорт из файла</TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </AppLayout>
    );
}
