import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function WireCreate() {
    return (
        <AppLayout>
            <Head title="Создание провода" />
            <div className="flex h-full flex-1 flex-col overflow-x-auto rounded-xl p-4">
                <Heading title="Создание провода" />
            </div>
        </AppLayout>
    );
}
