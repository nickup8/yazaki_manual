import DynamicForm from '@/components/dynamic-form';
import Heading from '@/components/heading';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { submitFilter } from '@/lib/utils';
import { ApplicationItem, BreadcrumbItem, FieldConfig, PropsResponse } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CloudDownload, Plus } from 'lucide-react';
import ApplicationTable from './application-table';

type FormValues = {
    terminal: string;
    application: string;
};

export default function ApplicationIndex({
    applications,
    queryParams = {},
}: {
    applications: PropsResponse<ApplicationItem>;
    queryParams: Record<string, string>;
}) {
    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Аппликаторы', href: '/applications' }];
    const fields: FieldConfig<FormValues>[] = [
        { name: 'terminal', label: 'Код терминала', type: 'text', id: 'terminal' },
        { name: 'application', label: 'Инвентарный номер', type: 'text', id: 'application' },
    ];

    const onSubmit = (values: FormValues) => {
        submitFilter({
            url: '/applications',
            values,
            preserveState: true,
            preserveScroll: true,
        });
    };

    const defaultValues = Object.fromEntries(fields.map((f) => [f.name, queryParams?.[f.name] ?? ''])) as FormValues;
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
                    {/* <form className="flex gap-2" onSubmit={handleSubmit}>
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
                    </form> */}

                    <DynamicForm fields={fields} defaultValues={defaultValues} onSubmit={onSubmit} />
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
