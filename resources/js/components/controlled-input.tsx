// ControlledInput.tsx
import { FieldConfig } from '@/types';
import { memo, ReactElement } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import FormField from './form-field';

type ControlledInputProps<T extends FieldValues> = {
    fieldConfig: FieldConfig<T>;
    control: Control<T>;
};

function ControlledInputInner<T extends FieldValues>({ fieldConfig, control }: ControlledInputProps<T>) {
    return (
        <Controller
            name={fieldConfig.name as Path<T>} // строго указываем Path<T>
            control={control}
            render={({ field }) => (
                <FormField {...field} id={fieldConfig.id} label={fieldConfig.label} type={fieldConfig.type} options={fieldConfig.options} />
            )}
        />
    );
}

const ControlledInput = memo(ControlledInputInner) as <T extends FieldValues>(props: ControlledInputProps<T>) => ReactElement;

export default ControlledInput;
