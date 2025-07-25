import FormField from '@/components/form-field';
import Heading from '@/components/heading';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { ApplicationItem, PropsResponse } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { CloudDownload, Loader2, Plus } from 'lucide-react';
import ApplicationTable from './application-table';

export default function ApplicationIndex({ applications }: { applications: PropsResponse<ApplicationItem> }) {
    const breadcrumbs = [{ title: 'Аппликаторы', href: '/applications' }];
    const { data, setData, get, processing, errors } = useForm({
        terminal: '',
        application: '',
    });
    console.log(applications);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const params = new URLSearchParams();

        if (data.terminal.trim()) params.append('terminal', data.terminal.trim());
        if (data.application.trim()) params.append('application', data.application.trim());

        const url = params.toString() ? `/applications?${params.toString()}` : '/applications';

        get(url, {
            preserveState: true,
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Аппликаторы" />
            <div className="p-4">
                <Heading title="Аппликаторы" />
                <div className="mb-4 flex">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild variant="ghost" size="icon" className="border border-sidebar-border/50">
                                <Link href={route('applications.create')}>
                                    <Plus />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Создать аппликатор</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button asChild variant="ghost" size="icon" className="ml-2 border border-sidebar-border/50">
                                <Link href={route('applications.index', { all: true })}>
                                    <CloudDownload />
                                </Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Показать все стандарты</TooltipContent>
                    </Tooltip>
                    {/* <Tooltip>
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
                    </Tooltip> */}
                </div>
                <div className="border-b pb-4">
                    <form className="flex gap-2" onSubmit={handleSubmit}>
                        <FormField
                            id="application"
                            label="Код аппликатора"
                            value={data.application}
                            onChange={(val) => setData('application', val.trim())}
                            error={errors.application}
                            type="text"
                            disabled={processing}
                        />
                        <FormField
                            id="terminal"
                            label="Код терминала"
                            value={data.terminal}
                            onChange={(val) => setData('terminal', val.trim())}
                            error={errors.terminal}
                            type="text"
                            disabled={processing}
                        />
                        <div className="flex items-end gap-2">
                            <Button disabled={processing}>
                                {processing && <Loader2 className="mr-2 animate-spin" />}
                                Показать
                            </Button>
                            <Button disabled={processing} variant="outline">
                                Сбросить
                            </Button>
                        </div>
                    </form>
                </div>
                {applications.data.length > 0 && (
                    <div className="mt-4">
                        <ApplicationTable applications={applications.data} />
                        {applications.meta.last_page > 1 && (
                            <div className="mt-2 flex justify-center">
                                <Pagination links={applications.meta.links} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
