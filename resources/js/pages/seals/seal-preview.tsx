import HeadingSmall from '@/components/heading-small';

export default function SealPreview({
    color,
    seal_key,
    seal_spn,
    seal_supplier,
    description,
}: {
    color: string;
    seal_key: string;
    seal_spn: string;
    seal_supplier: string;
    description: string;
}) {
    const color_seal = color ? color : '000';
    return (
        <>
            <HeadingSmall
                title="Пример отображения"
                description="Так уплотнитель будет выглядеть на схеме. Начните заполнять поля для создания уплотнителя"
            />
            <div className="mt-2 flex w-full flex-col items-center justify-center gap-2">
                <div className="flex flex-col items-center">
                    <div className="text-lg">{seal_key}</div>
                    <div className="flex gap-2">
                        <div className="text-sm text-gray-500">{seal_spn}</div>
                        {seal_supplier && (
                            <>
                                <span className="text-sm text-gray-500">|</span>
                                <div className="text-sm text-gray-500">{seal_supplier}</div>
                            </>
                        )}
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="74" height="64" viewBox="0 0 74 64" fill="none">
                    <rect x="33" y="11" width="41" height="42" style={{ fill: color_seal }} />
                    <path d="M22 0H31C32.6569 0 34 1.34315 34 3V61C34 62.6569 32.6569 64 31 64H22V0Z" fill={color_seal} />
                    <path d="M0 0H11C12.6569 0 14 1.34315 14 3V61C14 62.6569 12.6569 64 11 64H0V0Z" fill={color_seal} />
                    <rect x="14" y="9" width="8" height="46" fill={color_seal} />
                </svg>
            </div>
        </>
    );
}
