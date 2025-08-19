import FormField from '@/components/form-field';
import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { Controller, useForm } from 'react-hook-form';

type FormValues = {
    leadset: string;
    description: string;
    terminal: string;
    seal: string;
};

const fields: { name: keyof FormValues; label: string; id: string; type: string }[] = [
    { name: 'leadset', label: 'S-номер', id: 'leadset', type: 'text' },
    { name: 'description', label: 'Название', id: 'description', type: 'text' },
    { name: 'terminal', label: 'Терминал', id: 'terminal', type: 'text' },
    { name: 'seal', label: 'Уплотнитель', id: 'seal', type: 'text' },
];

export default function LeadsetFilterForm({ queryParams = {} }: { queryParams?: Record<string, string> }) {
    const {
        control,
        handleSubmit,
        reset,
        formState: { isDirty, isLoading },
    } = useForm<FormValues>({
        defaultValues: { leadset: '', description: '', terminal: '', seal: '' },
    });

    const onSubmit = (values: FormValues) => {
        // Берём только непустые поля
        const filtered = Object.fromEntries(Object.entries(values).filter(([, v]) => v.trim() !== ''));

        // Не мутируем пропсы — собираем новый объект
        const params = { ...queryParams, ...filtered };

        router.get('/leadsets', params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <div className="mb-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex gap-2">
                    {fields.map((f) => (
                        <Controller
                            key={f.name}
                            name={f.name}
                            control={control}
                            render={({ field }) => (
                                <FormField
                                    id={f.id}
                                    label={f.label}
                                    type={f.type}
                                    value={field.value ?? ''}
                                    onChange={(val: string) => field.onChange(val)}
                                />
                            )}
                        />
                    ))}
                </div>

                <div className="mt-2 flex gap-2">
                    <Button type="submit">{isLoading} Применить</Button>
                    <Button type="button" variant="outline" onClick={() => reset()}>
                        Сбросить
                    </Button>
                </div>
            </form>
        </div>
    );
}
