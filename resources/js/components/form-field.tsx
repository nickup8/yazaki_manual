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
}

export default function FormField({ id, label, type = 'text', value, onChange, disabled = false, error }: FormFieldProps) {
    return (
        <div className="w-[280px]">
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} />
            <InputError message={error} />
        </div>
    );
}
