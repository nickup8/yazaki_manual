import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import SealPreview from './seal-preview';

export default function SealCreate({ seal_colors, success }: { seal_colors: any; success: string }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Уплотнители',
            href: '/seals',
        },
        {
            title: 'Создание уплотнителя',
            href: '/seals/create',
        },
    ];

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
    }, [success]);

    const { data, setData, errors, processing, post, reset } = useForm({
        seal_color_id: '',
        seal_key: '',
        seal_spn: '',
        seal_supplier: '',
        description: '',
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('seals.store', data), {
            onSuccess: () => reset('seal_key', 'seal_spn', 'seal_supplier', 'description', 'seal_color_id'),
            preserveScroll: true,
        });
    };

    const selectedColor = seal_colors.data.find((color: any) => String(color.id) === String(data.seal_color_id));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Создание уплотнителя" />
            <div className="p-4">
                <Heading title="Создание уплотнителя" description="Создание уплотнителя" />
                <form className="flex flex-col gap-3" onSubmit={submit}>
                    <div className="flex gap-4">
                        <div className="w-full">
                            <Label htmlFor="seal_key">Код уплотнителя</Label>
                            <Input value={data.seal_key} onChange={(e) => setData('seal_key', e.target.value)} disabled={processing} />
                            <InputError message={errors.seal_key} />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="seal_spn">Код поставщика (SPN)</Label>
                            <Input value={data.seal_spn} onChange={(e) => setData('seal_spn', e.target.value)} disabled={processing} />
                            <InputError message={errors.seal_spn} />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="seal_supplier">Поставщик</Label>
                            <Input value={data.seal_supplier} onChange={(e) => setData('seal_supplier', e.target.value)} disabled={processing} />
                            <InputError message={errors.seal_supplier} />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-full">
                            <Label htmlFor="seal_color_id">Цвет уплотнителя</Label>
                            <Select value={data.seal_color_id} onValueChange={(value) => setData('seal_color_id', value)} disabled={processing}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Выберите цвет" />
                                </SelectTrigger>
                                <SelectContent>
                                    {seal_colors.data.map((color: any) => (
                                        <SelectItem key={color.id} value={String(color.id)}>
                                            <span className="flex items-center">
                                                <span className="mr-2 inline-block h-4 w-4 border" style={{ backgroundColor: color.color_hex }} />
                                                <span>{color.color_name}</span>
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <InputError message={errors.seal_color_id} />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="description">Описание</Label>
                            <Input value={data.description} onChange={(e) => setData('description', e.target.value)} disabled={processing} />
                            <InputError message={errors.description} />
                        </div>
                    </div>
                    <div className="mt-2 flex gap-2">
                        <Button type="submit" disabled={processing}>
                            Создать
                        </Button>
                        <Button
                            variant="outline"
                            disabled={processing}
                            type="button"
                            onClick={() => reset('seal_key', 'seal_spn', 'seal_supplier', 'description', 'seal_color_id')}
                        >
                            Сброчить форму
                        </Button>
                    </div>
                </form>
                <div className="mt-8">
                    <SealPreview
                        color={selectedColor?.color_hex ?? '#000'}
                        seal_key={data.seal_key ? data.seal_key : 'Введите код уплотнителя'}
                        seal_spn={data.seal_spn}
                        seal_supplier={data.seal_supplier}
                        description={data.description}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
