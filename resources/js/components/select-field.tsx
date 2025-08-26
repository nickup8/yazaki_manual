import InputError from '@/components/input-error';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Option } from '@/types';

interface SelectFieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    disabled?: boolean;
    error?: string;
}

export default function SelectField({ id, label, value, onChange, options, disabled = false, error }: SelectFieldProps) {
    return (
        <div>
            <Select value={value} onValueChange={onChange} disabled={disabled}>
                <SelectTrigger className="w-[280px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {options.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <InputError message={error} />
        </div>
    );
}
