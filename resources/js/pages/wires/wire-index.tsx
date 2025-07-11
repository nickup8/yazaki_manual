import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, WireColor, WireType } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Провода',
        href: '/wires',
    },
];

export default function WireIndex({
    wire_types,
    wire_colors,
    success,
    wires,
}: {
    wire_types: WireType[];
    wire_colors: WireColor[];
    success: string;
    wires: any[];
}) {
    const [wireKey, setWireKey] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTypeId, setSelectedTypeId] = useState('');
    const [selectedColorBaseId, setSelectedColorBaseId] = useState('');
    const [selectedColorAddId, setSelectedColorAddId] = useState('');

    const [isSearching, setIsSearching] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (params.get('wire_key')) setWireKey(params.get('wire_key')!);
        if (params.get('description')) setDescription(params.get('description')!);

        if (params.get('wire_type_id') && wire_types.some((t) => String(t.id) === params.get('wire_type_id'))) {
            setSelectedTypeId(params.get('wire_type_id')!);
        }

        if (params.get('wire_color_base_id') && wire_colors.some((c) => String(c.id) === params.get('wire_color_base_id'))) {
            setSelectedColorBaseId(params.get('wire_color_base_id')!);
        }

        if (params.get('wire_color_add_id') && wire_colors.some((c) => String(c.id) === params.get('wire_color_add_id'))) {
            setSelectedColorAddId(params.get('wire_color_add_id')!);
        }
    }, [wire_types, wire_colors]);

    const hasAnyFilter = wireKey || description || selectedTypeId || selectedColorBaseId || selectedColorAddId;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);

        const query: Record<string, string> = {};

        if (wireKey.trim()) query.wire_key = wireKey;
        if (description.trim()) query.description = description;
        if (selectedTypeId) query.wire_type_id = selectedTypeId;
        if (selectedColorBaseId) query.wire_color_base_id = selectedColorBaseId;
        if (selectedColorAddId) query.wire_color_add_id = selectedColorAddId;

        router.get('/wires', query, {
            preserveState: true,
            onFinish: () => setIsSearching(false),
        });
    };

    const handleReset = () => {
        setWireKey('');
        setDescription('');
        setSelectedTypeId('');
        setSelectedColorBaseId('');
        setSelectedColorAddId('');
    };

    console.log(wires);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Провода" />
            <div className="flex h-full flex-1 flex-col overflow-x-auto rounded-xl p-4">
                <Heading title="Провода" description="Управление проводами" />
                <div className="mb-4">
                    <Button variant="default">
                        <Link href="/wires/create">Добавить провод</Link>
                    </Button>
                </div>
                <form className="flex w-full flex-wrap gap-2 border-t border-b py-2" onSubmit={handleSubmit}>
                    <div>
                        <Input
                            placeholder="Код провода"
                            name="wire_key"
                            value={wireKey}
                            onChange={(e) => setWireKey(e.target.value)}
                            disabled={isSearching || isResetting}
                        />
                    </div>
                    <div>
                        <Input
                            placeholder="Описание"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={isSearching || isResetting}
                        />
                    </div>
                    <Select value={selectedTypeId} onValueChange={setSelectedTypeId} disabled={isSearching || isResetting}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Тип провода" />
                        </SelectTrigger>
                        <SelectContent>
                            {wire_types.map((type) => (
                                <SelectItem key={type.id} value={String(type.id)}>
                                    {type.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={selectedColorBaseId} onValueChange={setSelectedColorBaseId} disabled={isSearching || isResetting}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Базовый цвет" />
                        </SelectTrigger>
                        <SelectContent>
                            {wire_colors.map((color) => (
                                <SelectItem key={color.id} value={String(color.id)}>
                                    <span className="flex items-center">
                                        <span className="mr-2 inline-block h-4 w-4 border" style={{ backgroundColor: color.hex }} />
                                        <span>{color.name}</span>
                                    </span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={selectedColorAddId} onValueChange={setSelectedColorAddId} disabled={isSearching || isResetting}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Доп. цвет" />
                        </SelectTrigger>
                        <SelectContent>
                            {wire_colors.map((color) => (
                                <SelectItem key={color.id} value={String(color.id)}>
                                    <span className="flex items-center">
                                        <span className="mr-2 inline-block h-4 w-4 border" style={{ backgroundColor: color.hex }} />
                                        <span>{color.name}</span>
                                    </span>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <div className="flex gap-2">
                        <Button type="submit" disabled={isSearching || isResetting}>
                            {isSearching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Поиск
                        </Button>

                        {hasAnyFilter && (
                            <Button type="button" variant="outline" onClick={handleReset} disabled={isSearching || isResetting}>
                                {isResetting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Сбросить
                            </Button>
                        )}
                    </div>
                </form>
            </div>

            <pre>{JSON.stringify({ wires })}</pre>
        </AppLayout>
    );
}
