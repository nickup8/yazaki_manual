import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData, WireColor, WireType } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';

import FormField from '@/components/form-field';
import SelectField from '@/components/select-field';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { toast } from 'sonner';
import WirePreview from './wire-preview';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Провода', href: '/wires' },
    { title: 'Создание провода', href: '/wires/create' },
];

export default function WireCreate({ wire_types, wire_colors, success }: { wire_types: WireType[]; wire_colors: WireColor[]; success: string }) {
    const { data, errors, processing, setData, post, reset } = useForm({
        wire_key: '',
        description: '',
        wire_type_id: '',
        wire_color_base_id: '',
        wire_color_add_id: '',
        cross_section: '',
    });

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
    }, [success]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const rawValue = data.cross_section.replace(',', '.');
        const floatValue = parseFloat(rawValue);

        if (isNaN(floatValue)) {
            alert('Введите корректное число в поле "Сечение"');
            return;
        }

        // Обновляем cross_section в локальном состоянии в формате с двумя знаками после запятой
        setData('cross_section', floatValue.toFixed(2));

        // Отправляем форму
        post(route('wires.store'), {
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.general) {
                    toast.error(errors.general);
                }
            },
        });
    };

    console.log(usePage<SharedData>().props);

    const handleReset = () => reset();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Создание провода" />
            <div className="flex h-full flex-1 flex-col overflow-x-auto rounded-xl p-4">
                <Heading title="Создание провода" />

                <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex gap-2">
                        <FormField
                            id="wire_key"
                            label="Код провода"
                            value={data.wire_key}
                            onChange={(val) => setData('wire_key', val)}
                            disabled={processing}
                            error={errors.wire_key}
                        />

                        <FormField
                            id="cross_section"
                            label="Сечение"
                            value={data.cross_section}
                            onChange={(val) => setData('cross_section', val)}
                            disabled={processing}
                            error={errors.cross_section}
                        />

                        <FormField
                            id="description"
                            label="Описание"
                            value={data.description}
                            onChange={(val) => setData('description', val)}
                            disabled={processing}
                            error={errors.description}
                        />
                    </div>

                    <div className="flex gap-2">
                        <SelectField
                            id="wire_type"
                            label="Тип провода"
                            value={data.wire_type_id}
                            onChange={(val) => setData('wire_type_id', val)}
                            options={wire_types.map((type) => ({
                                value: String(type.id),
                                label: type.name,
                            }))}
                            disabled={processing}
                            error={errors.wire_type_id}
                        />

                        <SelectField
                            id="color_base"
                            label="Базовый цвет"
                            value={data.wire_color_base_id}
                            onChange={(val) => setData('wire_color_base_id', val)}
                            options={wire_colors.map((color) => ({
                                value: String(color.id),
                                label: (
                                    <span className="flex items-center">
                                        <span className="mr-2 inline-block h-4 w-4 rounded-sm border" style={{ backgroundColor: color.hex }} />
                                        <span>{color.name}</span>
                                    </span>
                                ),
                            }))}
                            disabled={processing}
                            error={errors.wire_color_base_id}
                        />

                        <SelectField
                            id="color_add"
                            label="Доп. цвет"
                            value={data.wire_color_add_id}
                            onChange={(val) => setData('wire_color_add_id', val)}
                            options={wire_colors.map((color) => ({
                                value: String(color.id),
                                label: (
                                    <span className="flex items-center">
                                        <span className="mr-2 inline-block h-4 w-4 rounded-sm border" style={{ backgroundColor: color.hex }} />
                                        <span>{color.name}</span>
                                    </span>
                                ),
                            }))}
                            disabled={processing}
                            error={errors.wire_color_add_id}
                        />
                    </div>

                    <div className="flex gap-2">
                        <Button variant="default" type="submit" disabled={processing}>
                            Создать
                        </Button>
                        <Button variant="outline" type="button" onClick={handleReset} disabled={processing}>
                            Сбросить
                        </Button>
                    </div>
                </form>

                <WirePreview
                    description={data.description}
                    baseColorId={data.wire_color_base_id}
                    addColorId={data.wire_color_add_id}
                    wireColors={wire_colors}
                />
            </div>
        </AppLayout>
    );
}
