import FormField from '@/components/form-field';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { WireType } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';

export default function CrimpStandardsCreate({ wire_types }: { wire_types: WireType[] }) {
    const breadcrumbs = [
        { title: 'Кримп стандарты', href: '/crimp_standards' },
        { title: 'Создание кримп стандарта', href: '/crimp_standards/create' },
    ];

    const { data, setData, errors, processing, reset, post } = useForm({
        terminal: '',
        seal: '',
        type_code_wire_1: '',
        size_code_wire_1: '',
        type_code_wire_2: '',
        size_code_wire_2: '',
        wire_type_id_1: '',
        cross_section_wire_1: '',
        wire_type_id_2: '',
        cross_section_wire_2: '',
        strip_length: '',
        str_tolerance: '',
        conductor_crimp_height: '',
        conductor_crimp_height_tolerance: '',
        isolation_crimp_height: '',
        isolation_crimp_height_tolerance: '',
        conductor_crimp_width_min: '',
        conductor_crimp_width_max: '',
        isolation_crimp_width_min: '',
        isolation_crimp_width_max: '',
        separation_force_wire_1: '',
        separation_force_wire_2: '',
        customer_code: '',
        placement: '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('crimp_standards.store'), {
            onSuccess: () => reset(),
            preserveScroll: true,
        });
    };

    const handleReset = () => {
        reset();
    };

    const wireTypeOptions = wire_types.map((wireType) => (
        <SelectItem key={wireType.id} value={String(wireType.id)}>
            {wireType.name}
        </SelectItem>
    ));

    const normalizeDecimal = (value: string) => value.replace(',', '.');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Создание кримп стандарта" />
            <div className="p-4">
                <Heading title="Создание кримп стандарта" />
                <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    <div className="flex gap-2">
                        <FormField
                            id="terminal"
                            label="Код терминала"
                            type="text"
                            value={data.terminal}
                            onChange={(val) => setData('terminal', val.trim())}
                            error={errors.terminal}
                            disabled={processing}
                            required
                        />
                        <FormField
                            id="seal"
                            label="Код уплотнителя"
                            type="text"
                            value={data.seal}
                            onChange={(val) => setData('seal', val.trim())}
                            error={errors.seal}
                            disabled={processing}
                        />
                    </div>
                    <div className="flex gap-2">
                        <FormField
                            id="type_code_wire_1"
                            label="Код типа провода 1"
                            type="text"
                            value={data.type_code_wire_1}
                            onChange={(val) => setData('type_code_wire_1', val.trim())}
                            error={errors.type_code_wire_1}
                            disabled={processing}
                            required
                        />
                        <FormField
                            id="size_code_wire_1"
                            label="Код размера провода 1"
                            type="text"
                            value={data.size_code_wire_1}
                            onChange={(val) => setData('size_code_wire_1', val.trim())}
                            error={errors.size_code_wire_1}
                            disabled={processing}
                            required
                        />
                        <div className="w-full">
                            <Label>
                                Тип провода 1 <span className="text-red-500">*</span>
                            </Label>
                            <Select value={data.wire_type_id_1} onValueChange={(val) => setData('wire_type_id_1', val)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Выберите тип провода" />
                                </SelectTrigger>
                                <SelectContent>{wireTypeOptions}</SelectContent>
                            </Select>
                        </div>
                        <FormField
                            id="cross_section_wire_1"
                            label="Сечение провода 1"
                            type="text"
                            value={data.cross_section_wire_1}
                            onChange={(val) => setData('cross_section_wire_1', normalizeDecimal(val.trim()))}
                            error={errors.cross_section_wire_1}
                            disabled={processing}
                            required
                        />
                    </div>
                    <div className="flex gap-2">
                        <FormField
                            id="type_code_wire_2"
                            label="Код типа провода 2"
                            type="text"
                            value={data.type_code_wire_2}
                            onChange={(val) => setData('type_code_wire_2', val.trim())}
                            error={errors.type_code_wire_2}
                            disabled={processing}
                        />
                        <FormField
                            id="size_code_wire_2"
                            label="Код размера провода 1"
                            type="text"
                            value={data.size_code_wire_2}
                            onChange={(val) => setData('size_code_wire_2', val.trim())}
                            error={errors.size_code_wire_2}
                            disabled={processing}
                        />
                        <div className="w-full">
                            <Label className={processing || data.type_code_wire_2 === '' || data.size_code_wire_2 === '' ? 'text-gray-400' : ''}>
                                Тип провода 2
                            </Label>
                            <Select
                                value={data.wire_type_id_2}
                                onValueChange={(val) => setData('wire_type_id_2', val)}
                                disabled={processing || data.type_code_wire_2 === '' || data.size_code_wire_2 === ''}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Выберите тип провода" />
                                </SelectTrigger>
                                <SelectContent>{wireTypeOptions}</SelectContent>
                            </Select>
                        </div>
                        <FormField
                            id="cross_section_wire_2"
                            label="Сечение провода 2"
                            type="text"
                            value={data.cross_section_wire_2}
                            onChange={(val) => setData('cross_section_wire_2', normalizeDecimal(val.trim()))}
                            error={errors.cross_section_wire_2}
                            disabled={processing || data.type_code_wire_2 === '' || data.size_code_wire_2 === ''}
                        />
                    </div>
                    <div className="flex gap-2">
                        <FormField
                            id="conductor_crimp_height"
                            label="C-C/H"
                            type="text"
                            value={data.conductor_crimp_height}
                            onChange={(val) => setData('conductor_crimp_height', normalizeDecimal(val.trim()))}
                            error={errors.conductor_crimp_height}
                            disabled={processing}
                            required
                        />
                        <FormField
                            id="conductor_crimp_height_tolerance"
                            label="C-C/H допуск"
                            type="text"
                            value={data.conductor_crimp_height_tolerance}
                            onChange={(val) => setData('conductor_crimp_height_tolerance', normalizeDecimal(val.trim()))}
                            error={errors.conductor_crimp_height_tolerance}
                            disabled={processing}
                            required
                        />
                        <FormField
                            id="isolation_crimp_height"
                            label="I-C/H"
                            type="text"
                            value={data.isolation_crimp_height}
                            onChange={(val) => setData('isolation_crimp_height', normalizeDecimal(val.trim()))}
                            error={errors.isolation_crimp_height}
                            disabled={processing}
                            required
                        />
                        <FormField
                            id="isolation_crimp_height_tolerance"
                            label="I-C/H допуск"
                            type="text"
                            value={data.isolation_crimp_height_tolerance}
                            onChange={(val) => setData('isolation_crimp_height_tolerance', normalizeDecimal(val.trim()))}
                            error={errors.isolation_crimp_height_tolerance}
                            disabled={processing}
                            required
                        />
                        <FormField
                            id="conductor_crimp_width_min"
                            label="C-C/W min"
                            type="text"
                            value={data.conductor_crimp_width_min}
                            onChange={(val) => setData('conductor_crimp_width_min', normalizeDecimal(val.trim()))}
                            error={errors.conductor_crimp_width_min}
                            disabled={processing}
                            required
                        />
                        <FormField
                            id="conductor_crimp_width_max"
                            label="C-C/W max"
                            type="text"
                            value={data.conductor_crimp_width_max}
                            onChange={(val) => setData('conductor_crimp_width_max', normalizeDecimal(val.trim()))}
                            error={errors.conductor_crimp_width_max}
                            disabled={processing}
                            required
                        />
                        <FormField
                            id="isolation_crimp_width_min"
                            label="I-C/W min"
                            type="text"
                            value={data.isolation_crimp_width_min}
                            onChange={(val) => setData('isolation_crimp_width_min', normalizeDecimal(val.trim()))}
                            error={errors.isolation_crimp_width_min}
                            disabled={processing}
                            required
                        />
                        <FormField
                            id="isolation_crimp_width_max"
                            label="I-C/W max"
                            type="text"
                            value={data.isolation_crimp_width_max}
                            onChange={(val) => setData('isolation_crimp_width_max', normalizeDecimal(val.trim()))}
                            error={errors.isolation_crimp_width_max}
                            disabled={processing}
                            required
                        />
                    </div>
                    <div className="flex gap-2">
                        <FormField
                            id="strip_length"
                            label="Длина зачистки"
                            type="text"
                            value={data.strip_length}
                            onChange={(val) => setData('strip_length', normalizeDecimal(val.trim()))}
                            error={errors.strip_length}
                            disabled={processing}
                            required
                        />
                        <FormField
                            id="str_tolerance"
                            label="Длина зачистки допуск"
                            type="text"
                            value={data.str_tolerance}
                            onChange={(val) => setData('str_tolerance', normalizeDecimal(val.trim()))}
                            error={errors.str_tolerance}
                            disabled={processing}
                            required
                        />
                        <div className="w-full">
                            <Label className={processing || data.type_code_wire_2 === '' || data.size_code_wire_2 === '' ? 'text-gray-400' : ''}>
                                Расположение проводов
                            </Label>
                            <Select
                                value={data.placement}
                                onValueChange={(val) => setData('placement', val)}
                                disabled={processing || data.type_code_wire_2 === '' || data.size_code_wire_2 === ''}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Выберите расположение" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Внакладку">Внакладку</SelectItem>
                                    <SelectItem value="Рядом">Рядом</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <FormField
                            id="separation_force_wire_1"
                            label="Усилие отрыва провода 1"
                            type="text"
                            value={data.separation_force_wire_1}
                            onChange={(val) => setData('separation_force_wire_1', val)}
                            error={errors.separation_force_wire_1}
                            disabled={processing}
                            required
                        />
                        <FormField
                            id="separation_force_wire_2"
                            label="Усилие отрыва провода 2"
                            type="text"
                            value={data.separation_force_wire_2}
                            onChange={(val) => setData('separation_force_wire_2', val)}
                            error={errors.separation_force_wire_2}
                            disabled={processing || data.type_code_wire_2 === '' || data.size_code_wire_2 === ''}
                        />
                        <FormField
                            id="customer_code"
                            label="Клиент"
                            type="text"
                            value={data.customer_code}
                            onChange={(val) => setData('customer_code', val.trim())}
                            error={errors.customer_code}
                            disabled={processing}
                            required
                            pattern="^[a-zA-Z0-9]+$"
                        />
                    </div>
                    <div className="mt-2 flex gap-2">
                        <Button type="submit" disabled={processing}>
                            {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Сохранить
                        </Button>
                        <Button type="reset" variant={'outline'} disabled={processing} onClick={handleReset}>
                            Очистить
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
