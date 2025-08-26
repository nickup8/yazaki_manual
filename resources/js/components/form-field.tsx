import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Option } from '@/types';
import SelectField from './select-field';

interface FormFieldProps {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    error?: string;
    required?: boolean;
    pattern?: string;
    options?: Option[];
}

export default function FormField({ id, label, type, value, onChange, disabled = false, error, required, pattern, options }: FormFieldProps) {
    return (
        <div className="w-full">
            <Label htmlFor={id} className={disabled ? 'text-gray-400' : ' '}>
                {label} {required && <span className="text-red-500">*</span>}
            </Label>
            {type !== 'select' && (
                <>
                    <Input
                        required={required}
                        id={id}
                        type={type}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        disabled={disabled}
                        pattern={pattern}
                    />
                    <InputError message={error} />
                </>
            )}

            {type === 'select' && options && (
                <SelectField id={id} label={label} value={value} onChange={onChange} options={options} disabled={disabled} error={error} />
            )}
        </div>
    );
}
