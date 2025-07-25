import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function TerminalCreate({ success }: { success?: string }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Терминалы',
            href: '/terminals',
        },
        {
            title: 'Создание терминала',
            href: '/terminals/create',
        },
    ];

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
    }, [success]);

    const { post, processing, errors, setData, data, reset } = useForm({
        terminal_key: '',
        terminal_spn: '',
        terminal_supplier: '',
        description: '',
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('terminals.store', data), {
            onSuccess: () => reset('terminal_key', 'terminal_spn', 'terminal_supplier', 'description'),
            preserveScroll: true,
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Создание терминала" />
            <div className="p-4">
                <Heading title="Создание терминала" />
                <form className="flex flex-col gap-4" onSubmit={submit}>
                    <div className="flex gap-4">
                        <div className="w-full">
                            <Label htmlFor="terminal_key">Код терминала</Label>
                            <Input
                                id="terminal_key"
                                type="text"
                                name="terminal_key"
                                required
                                className="mt-1 block w-full"
                                onChange={(e) => setData('terminal_key', e.target.value)}
                            />
                            <InputError message={errors.terminal_key} className="mt-2" />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="terminal_spn">Номер поставщика</Label>
                            <Input
                                id="terminal_spn"
                                type="text"
                                name="terminal_spn"
                                required
                                className="mt-1 block w-full"
                                onChange={(e) => setData('terminal_spn', e.target.value)}
                            />
                            <InputError message={errors.terminal_spn} className="mt-2" />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="terminal_supplier">Поставщик</Label>
                            <Input
                                id="terminal_supplier"
                                type="text"
                                name="terminal_supplier"
                                className="mt-1 block w-full"
                                onChange={(e) => setData('terminal_supplier', e.target.value)}
                            />
                            <InputError message={errors.terminal_supplier} className="mt-2" />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="description">Описание</Label>
                            <Input
                                id="description"
                                type="text"
                                name="description"
                                required
                                className="mt-1 block w-full"
                                onChange={(e) => setData('description', e.target.value)}
                            />
                            <InputError message={errors.description} className="mt-2" />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Button type="submit" disabled={processing}>
                            Создать
                        </Button>
                        <Button type="button" variant="outline" disabled={processing}>
                            Отменить
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
