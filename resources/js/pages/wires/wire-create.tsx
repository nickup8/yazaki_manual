import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

import { Head, router, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Провода', href: '/wires' },
    { title: 'Создание провода', href: '/wires/create' },
];

export default function WireCreate({ wire_types, wire_colors, success }: { wire_types: any[]; wire_colors: any[]; success: string }) {
    const { data, errors, processing, setData, post, reset } = useForm({
        wire_key: '',
        description: '',
        wire_type_id: '',
        wire_color_base_id: '',
        wire_color_add_id: '',
        cross_section: '',
    });

    console.log(success);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const rawValue = data.cross_section.replace(',', '.');
        const floatValue = parseFloat(rawValue);

        if (isNaN(floatValue)) {
            alert('Введите корректное число в поле "Сечение"');
            return;
        }

        router.post(
            route('wires.store'),
            {
                ...data,
                cross_section: floatValue.toFixed(2),
            },
            {
                onSuccess: () => reset(),
            },
        );
    };

    const handleReset = () => {
        reset();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Создание провода" />
            <div className="flex h-full flex-1 flex-col overflow-x-auto rounded-xl p-4">
                <Heading title="Создание провода" />
                <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex gap-2">
                        <div className="w-[280px]">
                            <Label htmlFor="wire_key">Код провода</Label>
                            <Input
                                id="wire_key"
                                type="text"
                                value={data.wire_key}
                                onChange={(e) => setData('wire_key', e.target.value)}
                                disabled={processing}
                            />
                            <InputError message={errors.wire_key} />
                        </div>
                        <div className="w-[280px]">
                            <Label htmlFor="cross_section">Сечение</Label>
                            <Input
                                id="cross_section"
                                type="text"
                                value={data.cross_section}
                                onChange={(e) => setData('cross_section', e.target.value)}
                                disabled={processing}
                            />
                            <InputError message={errors.cross_section} />
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="description">Описание</Label>
                            <Input
                                id="description"
                                type="text"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                disabled={processing}
                            />
                            <InputError message={errors.description} />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div>
                            <Label htmlFor="wire_type">Тип провода</Label>
                            <Select value={data.wire_type_id} onValueChange={(value) => setData('wire_type_id', value)} disabled={processing}>
                                <SelectTrigger className="w-[280px]">
                                    <SelectValue placeholder="Выберите тип провода" />
                                </SelectTrigger>
                                <SelectContent>
                                    {wire_types.map((type) => (
                                        <SelectItem key={type.id} value={String(type.id)}>
                                            {type.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.wire_type_id} />
                        </div>

                        <div>
                            <Label htmlFor="color_base">Базовый цвет</Label>
                            <Select
                                value={data.wire_color_base_id}
                                onValueChange={(value) => setData('wire_color_base_id', value)}
                                disabled={processing}
                            >
                                <SelectTrigger className="w-[280px]">
                                    <SelectValue placeholder="Базовый цвет" />
                                </SelectTrigger>
                                <SelectContent>
                                    {wire_colors.map((color) => (
                                        <SelectItem key={color.id} value={String(color.id)}>
                                            <span className="flex items-center">
                                                <span className="mr-2 inline-block h-4 w-4 border" style={{ backgroundColor: color.hex }} />
                                                <span>{color.name}</span>
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.wire_color_base_id} />
                        </div>

                        <div>
                            <Label htmlFor="color_add">Доп. цвет</Label>
                            <Select
                                value={data.wire_color_add_id}
                                onValueChange={(value) => setData('wire_color_add_id', value)}
                                disabled={processing}
                            >
                                <SelectTrigger className="w-[280px]">
                                    <SelectValue placeholder="Доп. цвет" />
                                </SelectTrigger>
                                <SelectContent>
                                    {wire_colors.map((color) => (
                                        <SelectItem key={color.id} value={String(color.id)}>
                                            <span className="flex items-center">
                                                <span className="mr-2 inline-block h-4 w-4 border" style={{ backgroundColor: color.hex }} />
                                                <span>{color.name}</span>
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="default" type="submit" disabled={processing}>
                            Создать
                        </Button>
                        <Button variant="outline" type="button" onClick={handleReset}>
                            Сбросить
                        </Button>
                    </div>
                </form>

                <div className="mt-8">
                    <HeadingSmall
                        title="Пример отображения"
                        description="Так провод будет выглядеть на схеме. Начните заполнять поля для создания провода"
                    />
                    <div className="mt-4">
                        <div className="mb-0.5 text-center">
                            {data.description ? data.description : <span className="text-sm text-gray-500">Описание провода</span>}
                        </div>
                        <div className="relative flex w-full items-center border border-sidebar-border/70 dark:border-sidebar-border">
                            <div
                                className="relative flex h-10 w-full items-center justify-center px-4 text-sm text-gray-500"
                                style={{
                                    backgroundColor: wire_colors.find((c) => String(c.id) === data.wire_color_base_id)?.hex || 'transparent',
                                }}
                            >
                                {!data.wire_color_base_id && <span>Цвет провода</span>}
                            </div>
                            {data.wire_color_add_id && (
                                <div
                                    className="absolute top-1/2 h-1 w-full -translate-y-1/2"
                                    style={{
                                        backgroundColor: wire_colors.find((c) => String(c.id) === data.wire_color_add_id)?.hex || 'transparent',
                                    }}
                                ></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
