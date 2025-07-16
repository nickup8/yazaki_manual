import { Loader2 } from 'lucide-react';

interface ImportLoaderProps {
    percentage: number;
    total: number | null;
}

export default function ImportLoader({ percentage, total }: ImportLoaderProps) {
    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/70 text-white">
            <Loader2 className="mb-4 h-12 w-12 animate-spin" />
            <div className="mb-2 text-lg">Импорт файла...</div>
            {total !== null ? (
                <div className="text-xl font-bold">
                    {percentage}% ({Math.round(total / 1024)} КБ)
                </div>
            ) : (
                <div className="text-xl font-bold">Загрузка...</div>
            )}
        </div>
    );
}
