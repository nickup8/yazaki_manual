import FormField from '@/components/form-field';
import Heading from '@/components/heading';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { AxiosProgressEvent } from 'axios';
import { CloudDownload, Import, Loader2, Plus } from 'lucide-react';
import { useRef, useState } from 'react';
import CrimpStandardsTable from './crimp-standards-table';

type UploadProgress = {
    percentage: number;
    total: number | null;
};

export default function CrimpStandardsIndex({ crimp_standards }: { crimp_standards: any }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Кримп стандарты',
            href: '/crimp_standards',
        },
    ];

    console.log(usePage());

    const [fileProcessing, setfileProcessing] = useState(false);
    const [progress, setProgress] = useState<UploadProgress>({
        percentage: 0,
        total: null,
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const { data, setData, reset, errors, processing } = useForm({
        terminal: '',
        seal: '',
    });

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

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const query: Record<string, string> = {};
        if (data.terminal) query.terminal = data.terminal;
        if (data.seal) query.seal = data.seal;
        router.get('/crimp_standards', query, { preserveState: true });
    };

    const handleReset = () => {
        reset();
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
                <div className="border-b pb-4">
                    <form className="flex gap-2" onSubmit={submit}>
                        <FormField
                            id="terminal"
                            value={data.terminal}
                            onChange={(val) => setData('terminal', val.trim())}
                            label="Код терминала"
                            error={errors.terminal}
                        />
                        <FormField
                            id="seal"
                            value={data.seal}
                            onChange={(val) => setData('seal', val.trim())}
                            label="Код сечения"
                            error={errors.seal}
                        />
                        <div className="flex items-end gap-2">
                            <Button type="submit">
                                {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : ''}
                                Найти
                            </Button>
                            <Button type="reset" variant="outline" onClick={handleReset}>
                                Сбросить
                            </Button>
                        </div>
                    </form>
                </div>
                {crimp_standards.data.length > 0 && (
                    <>
                        <div className="mt-4 mb-2 text-lg">
                            Количество стандартов: <span>{crimp_standards.meta.total}</span>
                        </div>
                        <div>
                            <CrimpStandardsTable crimp_standards={crimp_standards.data} terminal={data.terminal} seal={data.seal} />
                        </div>
                        {crimp_standards.meta.last_page > 1 && (
                            <div className="mt-2 flex justify-center">
                                <Pagination links={crimp_standards.meta.links} />
                            </div>
                        )}
                    </>
                )}
            </div>
        </AppLayout>
    );
}
