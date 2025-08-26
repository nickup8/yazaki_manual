import { SubmitFilterOptions } from '@/types';
import { router } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function submitFilter<FormValues extends Record<string, any>>({
    url,
    queryParams = {},
    values,
    preserveState = true,
    preserveScroll = true,
}: SubmitFilterOptions<FormValues>) {
    // Приводим к Record<string, any>, чтобы Object.entries работал
    const entries = Object.entries(values as Record<string, any>);

    // Берём только непустые строки
    const filtered = Object.fromEntries(entries.filter(([_, v]) => (typeof v === 'string' ? v.trim() !== '' : v != null)));

    const params = { ...queryParams, ...filtered };

    router.get(url, params, { preserveState, preserveScroll });
}
