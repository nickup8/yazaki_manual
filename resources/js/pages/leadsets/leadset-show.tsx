import Heading from '@/components/heading';
import DoubleCrimpCable from '@/components/mj-cable';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

export default function LeadsetShow({ leadset }: any) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Leadsets',
            href: '/leadsets',
        },
        {
            title: leadset.data.leadset,
            href: `/leadsets/${leadset.data.id}`,
        },
    ];

    console.log(leadset);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-4">
                <Heading title={leadset.data.leadset + ' - ' + leadset.data.description} />

                <div className="relative h-72 w-full">
                    <DoubleCrimpCable leadset={leadset.data} />
                </div>
            </div>
        </AppLayout>
    );
}
