import { DynamicFormProps } from '@/types';
import { useForm } from 'react-hook-form';
import ControlledInput from './controlled-input';
import { Button } from './ui/button';

export default function DynamicForm<T extends Record<string, any>>({ fields, defaultValues, onSubmit }: DynamicFormProps<T>) {
    const {
        control,
        handleSubmit,
        reset,
        formState: { isLoading },
    } = useForm<T>({
        defaultValues,
    });

    return (
        <div className="mb-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-wrap gap-2">
                    {fields.map((f) => (
                        <ControlledInput key={f.name as string} fieldConfig={f} control={control} />
                    ))}
                </div>

                <div className="mt-2 flex gap-2">
                    <Button type="submit">{isLoading ? 'Загрузка...' : 'Применить'}</Button>
                    <Button type="button" variant="outline" onClick={() => reset()}>
                        Сбросить
                    </Button>
                </div>
            </form>
        </div>
    );
}
