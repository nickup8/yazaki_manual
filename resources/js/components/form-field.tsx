import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormFieldProps {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    error?: string;
    required?: boolean;
}

export default function FormField({ id, label, type = 'text', value, onChange, disabled = false, error, required }: FormFieldProps) {
    return (
        <div className="w-full">
            <Label htmlFor={id} className={disabled ? 'text-gray-400' : ' '}>
                {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <Input required={required} id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} />
            <InputError message={error} />
        </div>
    );
}
