import FormField from '@/components/form-field';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function ApplicationCreate({ success }: { success: string }) {
    const breadcrumbs = [
        { title: 'Аппликаторы', href: '/applications' },
        { title: 'Создание аппликатора', href: '/applications/create' },
    ];

    const { data, setData, post, processing, errors, reset } = useForm({
        terminal: '',
        inventory_key: '',
        location: '',
    });

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
    }, [success]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('applications.store'), {
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                if (errors.general) {
                    toast.error(errors.general);
                }
            },
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Создание аппликатора" />
            <div className="p-4">
                <Heading title="Создание аппликатора" />
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex gap-2">
                        <FormField
                            id="inventory_key"
                            label="Инвентарный номер аппликатора"
                            type="text"
                            value={data.inventory_key}
                            onChange={(value) => setData('inventory_key', value.trim())}
                            error={errors.inventory_key}
                            disabled={processing}
                            required
                        />
                        <FormField
                            id="terminal"
                            label="Терминал"
                            type="text"
                            value={data.terminal}
                            onChange={(value) => setData('terminal', value.trim())}
                            error={errors.terminal}
                            disabled={processing}
                            required
                        />
                        <FormField
                            id="location"
                            label="Местоположение"
                            type="text"
                            value={data.location}
                            onChange={(value) => setData('location', value.trim())}
                            error={errors.location}
                            disabled={processing}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button disabled={processing}>Создать</Button>
                        <Button variant={'outline'} disabled={processing}>
                            Отменить
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
