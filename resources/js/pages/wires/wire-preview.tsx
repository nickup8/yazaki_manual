import HeadingSmall from '@/components/heading-small';
import { WireColor } from '@/types';

interface WirePreviewProps {
    description: string;
    baseColorId: string;
    addColorId: string;
    wireColors: WireColor[];
}

export default function WirePreview({ description, baseColorId, addColorId, wireColors }: WirePreviewProps) {
    const baseColor = wireColors.find((c) => String(c.id) === baseColorId)?.hex;
    const addColor = wireColors.find((c) => String(c.id) === addColorId)?.hex;

    return (
        <div className="mt-8">
            <HeadingSmall title="Пример отображения" description="Так провод будет выглядеть на схеме. Начните заполнять поля для создания провода" />
            <div className="mt-4">
                <div className="mb-0.5 text-center">{description || <span className="text-sm text-gray-500">Описание провода</span>}</div>
                <div className="relative flex w-full items-center border border-sidebar-border/70 dark:border-sidebar-border">
                    <div
                        className="relative flex h-10 w-full items-center justify-center px-4 text-sm text-gray-500"
                        style={{ backgroundColor: baseColor || 'transparent' }}
                    >
                        {!baseColorId && <span>Цвет провода</span>}
                    </div>
                    {addColorId && (
                        <div className="absolute top-1/2 h-1 w-full -translate-y-1/2" style={{ backgroundColor: addColor || 'transparent' }} />
                    )}
                </div>
            </div>
        </div>
    );
}
