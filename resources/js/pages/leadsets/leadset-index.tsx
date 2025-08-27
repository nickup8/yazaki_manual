import Heading from '@/components/heading';
import ImportLoader from '@/components/import-loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useFileImport } from '@/hooks/use-file-import';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CloudDownload, Import, Plus } from 'lucide-react';
import { toast } from 'sonner';
import LeadsetFilterForm from './leadset-filter-form';

export default function LeadsetIndex({ leadsets }: any) {
    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Полуфабрикаты', href: '/leadsets' }];
    console.log(leadsets);
    const { fileInputRef, handleFileChange, processing, progress } = useFileImport({
        url: route('leadsets.import'),
        onSuccess: () => toast.success('Импорт успешно завершен!'),
    });
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Список проводов" />
            <div className="p-4">
                <Heading title="Полуфабрикаты" />
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
                <LeadsetFilterForm />
            </div>
            {processing && <ImportLoader percentage={progress.percentage} total={progress.total} />}
        </AppLayout>
    );
}
