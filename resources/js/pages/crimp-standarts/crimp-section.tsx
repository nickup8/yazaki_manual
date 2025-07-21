import FormField from '@/components/form-field';

export default function CrimpSection({ data, errors, update, processing }: any) {
    return (
        <fieldset className="flex flex-wrap gap-4">
            <legend className="text-sm font-medium text-gray-600">Параметры кримпа</legend>

            <FormField
                id="conductor_crimp_height"
                label="C-C/H"
                value={data.conductor_crimp_height}
                onChange={update('conductor_crimp_height')}
                error={errors.conductor_crimp_height}
                disabled={processing}
                required
            />
            <FormField
                id="conductor_crimp_height_tolerance"
                label="C-C/H допуск"
                value={data.conductor_crimp_height_tolerance}
                onChange={update('conductor_crimp_height_tolerance')}
                error={errors.conductor_crimp_height_tolerance}
                disabled={processing}
                required
            />
            <FormField
                id="isolation_crimp_height"
                label="I-C/H"
                value={data.isolation_crimp_height}
                onChange={update('isolation_crimp_height')}
                error={errors.isolation_crimp_height}
                disabled={processing}
                required
            />
            <FormField
                id="isolation_crimp_height_tolerance"
                label="I-C/H допуск"
                value={data.isolation_crimp_height_tolerance}
                onChange={update('isolation_crimp_height_tolerance')}
                error={errors.isolation_crimp_height_tolerance}
                disabled={processing}
                required
            />
            <FormField
                id="conductor_crimp_width_min"
                label="C-C/W min"
                value={data.conductor_crimp_width_min}
                onChange={update('conductor_crimp_width_min')}
                error={errors.conductor_crimp_width_min}
                disabled={processing}
                required
            />
            <FormField
                id="conductor_crimp_width_max"
                label="C-C/W max"
                value={data.conductor_crimp_width_max}
                onChange={update('conductor_crimp_width_max')}
                error={errors.conductor_crimp_width_max}
                disabled={processing}
                required
            />
            <FormField
                id="isolation_crimp_width_min"
                label="I-C/W min"
                value={data.isolation_crimp_width_min}
                onChange={update('isolation_crimp_width_min')}
                error={errors.isolation_crimp_width_min}
                disabled={processing}
                required
            />
            <FormField
                id="isolation_crimp_width_max"
                label="I-C/W max"
                value={data.isolation_crimp_width_max}
                onChange={update('isolation_crimp_width_max')}
                error={errors.isolation_crimp_width_max}
                disabled={processing}
                required
            />
        </fieldset>
    );
}
