import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, CrimpStandart } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Clipboard, FileSliders } from 'lucide-react';

export default function CrimpStandardsShow({
    crimp_standards,
}: {
    crimp_standards: {
        data: CrimpStandart;
    };
}) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Кримп стандарты',
            href: '/crimp_standards',
        },
        {
            title: crimp_standards.data.terminal.terminal_key,
            href: '/crimp_standards/show',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={'Кримп стандарт ' + crimp_standards.data.terminal.terminal_key} />
            <div className="p-4">
                <div className="flex justify-between">
                    <Heading
                        title={
                            'Кримп стандарт ' +
                            crimp_standards.data.terminal.terminal_key +
                            (crimp_standards.data.seal?.seal_key ? ' ' + ' с уплотнителем ' + crimp_standards.data.seal.seal_key : '')
                        }
                    />
                    <div>
                        <Button variant="outline">
                            <Link href={route('crimp_standards.edit', { crimp_standard: crimp_standards.data.id })}>Редактировать</Link>
                        </Button>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-1">
                                <Clipboard className="h-6 w-6" />
                                <span>Провод 1</span>
                            </CardTitle>
                            <CardDescription>Информация о проводе</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>
                                <span className="text-sm text-gray-600">Код провода: </span>
                                <span className="text-lg font-bold">{crimp_standards.data.type_code_wire_1}</span>
                            </p>
                            <p>
                                <span className="text-sm text-gray-600">Код сечения: </span>
                                <span className="text-lg font-bold">{crimp_standards.data.size_code_wire_1}</span>
                            </p>
                            <p>
                                <span className="text-sm text-gray-600">Тип провода: </span>
                                <span className="text-lg font-bold">{crimp_standards.data.wire_type_1.name}</span>
                            </p>
                            <p>
                                <span className="text-sm text-gray-600">Сечение </span>
                                <span className="text-lg font-bold">{crimp_standards.data.cross_section_wire_1}</span>
                            </p>
                            <p>
                                <span className="text-sm text-gray-600">Усилие отрыва: </span>
                                <span className="text-lg font-bold">{crimp_standards.data.separation_force_wire_1}</span>
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-1">
                                <Clipboard className="h-6 w-6" />
                                <span>Провод 2</span>
                            </CardTitle>
                            <CardDescription>Информация о проводе</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>
                                <span className="text-sm text-gray-600">Код провода: </span>
                                <span className="text-lg font-bold">
                                    {crimp_standards.data.type_code_wire_2 ? crimp_standards.data.type_code_wire_2 : '-'}
                                </span>
                            </p>
                            <p>
                                <span className="text-sm text-gray-600">Код сечения: </span>
                                <span className="text-lg font-bold">
                                    {crimp_standards.data.size_code_wire_2 ? crimp_standards.data.size_code_wire_2 : '-'}
                                </span>
                            </p>
                            <p>
                                <span className="text-sm text-gray-600">Тип провода: </span>
                                <span className="text-lg font-bold">
                                    {crimp_standards.data.wire_type_2?.name ? crimp_standards.data.wire_type_2.name : '-'}
                                </span>
                            </p>
                            <p>
                                <span className="text-sm text-gray-600">Сечение </span>
                                <span className="text-lg font-bold">
                                    {crimp_standards.data.cross_section_wire_2 ? crimp_standards.data.cross_section_wire_2 : '-'}
                                </span>
                            </p>
                            <p>
                                <span className="text-sm text-gray-600">Усилие отрыва: </span>
                                <span className="text-lg font-bold">{crimp_standards.data.separation_force_wire_2}</span>
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-1">
                            <FileSliders className="h-6 w-6" />
                            <span>Параметры обжима</span>
                        </CardTitle>
                        <CardDescription>Настройки и допуски</CardDescription>
                    </CardHeader>
                    <CardContent className="flex gap-4">
                        {crimp_standards.data.placement && (
                            <div>
                                <div className="text-sm">Расположение:</div>
                                <div>
                                    <span className="font-bold">{crimp_standards.data.placement}</span>
                                </div>
                            </div>
                        )}
                        <div>
                            <div className="text-sm">Зачистка провода:</div>
                            <div>
                                <span className="font-bold">{crimp_standards.data.strip_length}</span> &plusmn;
                                {crimp_standards.data.str_tolerance}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm">Высота по жиле:</div>
                            <div>
                                <span className="font-bold">{crimp_standards.data.conductor_crimp_height}</span> &plusmn;
                                {crimp_standards.data.conductor_crimp_height_tolerance}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm">Высота по изоляции:</div>
                            <div>
                                <span className="font-bold">{crimp_standards.data.isolation_crimp_height}</span> &plusmn;
                                {crimp_standards.data.isolation_crimp_height_tolerance}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm">Ширина по жиле:</div>
                            <div>
                                <span>{crimp_standards.data.conductor_crimp_width_min} </span>&mdash;
                                <span> {crimp_standards.data.conductor_crimp_width_max}</span>
                            </div>
                        </div>
                        <div>
                            <div className="text-sm">Ширина по изоляции:</div>
                            <div>
                                <span>{crimp_standards.data.isolation_crimp_width_min} </span>&mdash;
                                <span> {crimp_standards.data.isolation_crimp_width_max}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <div className="mt-2 flex justify-between gap-4">
                    <div className="text-sm">
                        <span className="text-gray-500">Клиент: </span>
                        <span className="font-bold">{crimp_standards.data.customer_code}</span>
                    </div>

                    <div className="flex gap-4">
                        <div className="text-sm">
                            <span className="text-gray-500">Дата создания: </span>
                            <span>
                                {new Date(crimp_standards.data.created_at).toLocaleString('ru-RU', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                })}
                            </span>
                        </div>
                        <div className="text-sm">
                            <span className="text-gray-500">Дата обновления: </span>
                            <span>
                                {new Date(crimp_standards.data.updated_at).toLocaleString('ru-RU', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
