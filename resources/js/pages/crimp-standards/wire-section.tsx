import FormField from '@/components/form-field';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function WireSection({
    index,
    data,
    errors,
    update,
    processing,
    wireTypeOptions,
    disabled = false,
}: {
    index: 1 | 2;
    data: any;
    errors: Record<string, string>;
    update: (key: string) => (val: string) => void;
    processing: boolean;
    wireTypeOptions: React.ReactNode;
    disabled?: boolean;
}) {
    const prefix = index === 1 ? '' : '2';

    return (
        <fieldset className="flex flex-wrap gap-4">
            <legend className="text-sm font-medium text-gray-600">Провод {index}</legend>

            <FormField
                id={`type_code_wire_${index}`}
                label={`Код типа провода ${index}`}
                value={data[`type_code_wire_${index}`]}
                onChange={update(`type_code_wire_${index}`)}
                error={errors[`type_code_wire_${index}`]}
                disabled={processing}
                required={index === 1}
            />
            <FormField
                id={`size_code_wire_${index}`}
                label={`Код размера провода ${index}`}
                value={data[`size_code_wire_${index}`]}
                onChange={update(`size_code_wire_${index}`)}
                error={errors[`size_code_wire_${index}`]}
                disabled={processing}
                required={index === 1}
            />
            <div className="w-[200px]">
                <Label className={disabled ? 'text-gray-400' : ''}>
                    Тип провода {index} {index === 1 && <span className="text-red-500">*</span>}
                </Label>
                <Select value={data[`wire_type_id_${index}`]} onValueChange={update(`wire_type_id_${index}`)} disabled={processing || disabled}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Выберите тип провода" />
                    </SelectTrigger>
                    <SelectContent>{wireTypeOptions}</SelectContent>
                </Select>
            </div>
            <FormField
                id={`cross_section_wire_${index}`}
                label={`Сечение провода ${index}`}
                value={data[`cross_section_wire_${index}`]}
                onChange={update(`cross_section_wire_${index}`)}
                error={errors[`cross_section_wire_${index}`]}
                disabled={processing || disabled}
                required={index === 1}
            />
        </fieldset>
    );
}
