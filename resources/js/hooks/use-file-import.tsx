import { router, useForm } from '@inertiajs/react';
import { AxiosProgressEvent } from 'axios';
import { useRef, useState } from 'react';

interface UploadProgress {
    percentage: number;
    total: number | null;
}

interface UseFileImportOptions {
    url: string; // <-- теперь путь задаётся извне
    onSuccess: () => void;
}

export function useFileImport({ url, onSuccess }: UseFileImportOptions) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [processing, setProcessing] = useState(false);
    const [progress, setProgress] = useState<UploadProgress>({
        percentage: 0,
        total: null,
    });

    const { reset } = useForm<{ file: File | null }>({ file: null });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setProcessing(true);
        setProgress({ percentage: 0, total: null });

        router.post(url, formData, {
            forceFormData: true,
            preserveScroll: true,
            onProgress: (event?: AxiosProgressEvent) => {
                if (!event?.total) return;
                const percent = Math.round((event.loaded * 100) / (event.total ?? 1));
                setProgress({ percentage: percent, total: event.total });
            },
            onSuccess,
            onError: (errors) => alert('Ошибка при импорте: ' + Object.values(errors)[0]),
            onFinish: () => {
                setProcessing(false);
                setProgress({ percentage: 0, total: null });
                if (fileInputRef.current) fileInputRef.current.value = '';
                reset();
            },
        });
    };

    return {
        fileInputRef,
        handleFileChange,
        processing,
        progress,
    };
}
