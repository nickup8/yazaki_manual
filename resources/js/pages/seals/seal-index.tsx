import FormField from '@/components/form-field';
import Heading from '@/components/heading';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Tooltip } from '@radix-ui/react-tooltip';
import { AxiosProgressEvent } from 'axios';
import { CloudDownload, Import, Loader2, Plus } from 'lucide-react';
import { useRef, useState } from 'react';
import SealTable from './seal-table';

type UploadProgress = {
    percentage: number;
    total: number | null;
};
export default function SealIndex({ seals }: { seals: any }) {
    console.log(seals);
    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Уплотнители', href: '/seals' }];

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [processing, setProcessing] = useState(false);
    const [progress, setProgress] = useState<UploadProgress>({
        percentage: 0,
        total: null,
    });

    const {
        reset,
        data,
        setData,
        processing: formProcessing,
        errors,
        isDirty,
    } = useForm({
        seal_key: '',
        seal_spn: '',
    });
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

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const query: Record<string, string> = {};
        if (data.seal_spn) query.seal_spn = data.seal_spn;
        if (data.seal_key) query.seal_key = data.seal_key;
        router.get('/seals', query, { preserveState: true });
    };

    const handleReset = () => reset();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Уплотнители" />
            <div className="p-4">
                <Heading title="Уплотнители" description="Управление уплотнителями" />
                <div className="mb-4">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild variant="ghost" size="icon" className="border border-sidebar-border/50">
                                <Link href="/seals/create">
                                    <Plus />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Создать уплотнитель</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild variant="ghost" size="icon" className="ml-2 border border-sidebar-border/50">
                                <Link href={route('seals.index', { all: true })}>
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
                <div>
                    <form className="flex w-full items-end gap-2 border-b pb-4" onSubmit={submit}>
                        <FormField
                            id="seal_key"
                            label="Код уплотнителя"
                            type="text"
                            value={data.seal_key}
                            onChange={(value) => setData('seal_key', value)}
                            error={errors.seal_key}
                            disabled={formProcessing}
                        />
                        <FormField
                            id="seal_spn"
                            label="SPN уплотнителя"
                            type="text"
                            value={data.seal_spn}
                            onChange={(value) => setData('seal_spn', value)}
                            error={errors.seal_spn}
                            disabled={formProcessing}
                        />
                        <div className="flex gap-2">
                            <Button type="submit" disabled={formProcessing}>
                                {formProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Найти
                            </Button>
                            <Button type="button" variant="outline" onClick={handleReset} disabled={formProcessing}>
                                Очистить
                            </Button>
                        </div>
                    </form>
                </div>
                {seals.data.length > 0 && (
                    <>
                        <div className="mt-4 mb-2 text-lg">
                            Количество уплотнителей: <span>{seals.meta.total}</span>
                        </div>
                        <SealTable seals={seals.data} />
                        {seals.meta.last_page > 1 && (
                            <div className="mt-2 flex justify-center">
                                <Pagination links={seals.meta.links} />
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
