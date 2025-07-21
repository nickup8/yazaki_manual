import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function CrimpStandartsCreate() {
    const breadcrumbs = [
        { title: 'Кримп стандарты', href: '/crimp_standarts' },
        { title: 'Создание кримп стандарта', href: '/crimp_standarts/create' },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Создание кримп стандарта" />
            <div className="p-4">
                <Heading title="Создание кримп стандарта" />
            </div>
        </AppLayout>
    );
}
