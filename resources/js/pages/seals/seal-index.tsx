import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Tooltip } from '@radix-ui/react-tooltip';
import { AxiosProgressEvent } from 'axios';
import { CloudDownload, Import, Plus } from 'lucide-react';
import { useRef, useState } from 'react';

type UploadProgress = {
    percentage: number;
    total: number | null;
};
export default function SealIndex() {
    const bradcrumbs: BreadcrumbItem[] = [{ title: 'Уплотнители', href: '/seals' }];

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
        <AppLayout breadcrumbs={bradcrumbs}>
            <Head title="Уплотнители" />
            <div className="p-4">
                <Heading title="Уплотнители" description="Управление уплотнителями" />
                <div className="mb-4">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="border border-sidebar-border/50">
                                <Link href="/seals/create">
                                    <Plus />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Создать уплотнитель</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="ml-2 border border-sidebar-border/50">
                                <Link href={route('terminals.index', { all: true })}>
                                    <CloudDownload />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Показать все уплотнители</TooltipContent>
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
            </div>
        </AppLayout>
    );
}
