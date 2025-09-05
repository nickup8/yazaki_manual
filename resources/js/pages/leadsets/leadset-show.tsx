import Heading from '@/components/heading';
import DoubleCrimpCable from '@/components/mj-cable';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import LeadsetShowCrimpTable from './leadset-show-crimp-table';

export default function LeadsetShow({ leadset, crimpStandards }: any) {
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

    const query = new URLSearchParams(window.location.search);

    const [selectedTerminal, setSelectedTerminal] = useState<number | null>(query.get('terminal') ? Number(query.get('terminal')) : null);
    const [selectedPosition, setSelectedPosition] = useState<number | null>(query.get('position') ? Number(query.get('position')) : null);
    const [selectedSeal, setSelectedSeal] = useState<number | null>(query.get('seal') ? Number(query.get('seal')) : null);
    const [selectedSealPosition, setSelectedSealPosition] = useState<number | null>(
        query.get('sealPosition') ? Number(query.get('sealPosition')) : null,
    );

    const [selectedWired, setSelectedWired] = useState<number[] | null>(null);
    const [selectedWirePosition, setSelectedWirePosition] = useState<number | null>(null);

    const handleSelectTerminal = (
        terminalId: number | null,
        position: number | null,
        sealId: number | null,
        sealPosition: number | null,
        wired: number[] | null,
    ) => {
        setSelectedTerminal(terminalId);
        setSelectedPosition(position);
        setSelectedSeal(sealId);
        setSelectedSealPosition(sealPosition);
        setSelectedWired(wired);
        router.visit(
            route('leadsets.show', {
                leadset: leadset.data.id,
                terminal: terminalId,
                position: position,
                seal: sealId,
                sealPosition: sealPosition,
                wired: wired,
            }),
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-4">
                <Heading title={leadset.data.leadset + ' - ' + leadset.data.description} />

                <div className="relative h-72 w-full">
                    <DoubleCrimpCable
                        leadset={leadset.data}
                        onSelectTerminal={handleSelectTerminal}
                        selectedTerminal={selectedTerminal}
                        selectedPosition={selectedPosition}
                        selectedSeal={selectedSeal}
                        selectedSealPosition={selectedSealPosition}
                        selectedWired={selectedWired}
                        selectedWirePosition={selectedWirePosition}
                    />
                </div>
                <div>{crimpStandards ? crimpStandards.data.length > 0 && <LeadsetShowCrimpTable crimpStandart={crimpStandards} /> : ''}</div>
            </div>
        </AppLayout>
    );
}
