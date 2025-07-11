import Heading from '@/components/heading';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

import { Head } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Провода',
        href: '/wires',
    },
    {
        title: 'Создание провода',
        href: '/wires/create',
    },
];
export default function WireCreate({ wire_types, wire_colors }: { wire_types: any[]; wire_colors: any[] }) {
    const [wireKey, setWireKey] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTypeId, setSelectedTypeId] = useState('');
    const [selectedColorBaseId, setSelectedColorBaseId] = useState('');
    const [selectedColorAddId, setSelectedColorAddId] = useState('');

    const [isSearching, setIsSearching] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

    const resetForm = () => {
        setWireKey('');
        setDescription('');
        setSelectedTypeId('');
        setSelectedColorBaseId('');
        setSelectedColorAddId('');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Создание провода" />
            <div className="flex h-full flex-1 flex-col overflow-x-auto rounded-xl p-4">
                <Heading title="Создание провода" />
                <form className="flex w-full flex-col gap-4">
                    <div className="flex gap-2">
                        <div className="w-[280px]">
                            <Label htmlFor="wire_key">Код провода</Label>
                            <Input id="wire_key" type="text" />
                        </div>
                        <div className="w-[280px]">
                            <Label htmlFor="cross_section">Сечение</Label>
                            <Input id="cross_section" type="text" />
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="description">Описание</Label>
                            <Input id="description" type="text" onChange={(e) => setDescription(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div>
                            <Label htmlFor="wire_type">Тип провода</Label>
                            <Select value={selectedTypeId} onValueChange={setSelectedTypeId} disabled={isSearching || isResetting}>
                                <SelectTrigger className="w-[280px]">
                                    <SelectValue placeholder="Выберите тип провода" />
                                </SelectTrigger>
                                <SelectContent>
                                    {wire_types.map((type) => (
                                        <SelectItem key={type.id} value={String(type.id)}>
                                            {type.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="color_base">Базовый цвет</Label>
                            <Select
                                name="color_base"
                                value={selectedColorBaseId}
                                onValueChange={setSelectedColorBaseId}
                                disabled={isSearching || isResetting}
                            >
                                <SelectTrigger className="w-[280px]">
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
                        </div>
                        <div>
                            <Label htmlFor="color_add">Базовый цвет</Label>
                            <Select
                                name="color_add"
                                value={selectedColorAddId}
                                onValueChange={setSelectedColorAddId}
                                disabled={isSearching || isResetting}
                            >
                                <SelectTrigger className="w-[280px]">
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
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="default" type="submit">
                            Создать
                        </Button>
                        <Button variant="outline" type="reset" onClick={resetForm}>
                            Сбросить
                        </Button>
                    </div>
                </form>
                <div className="mt-8">
                    <HeadingSmall
                        title="Пример отображения"
                        description="Так провод будет выглядеть на схеме. Начните заполнять поля для создания провода"
                    />
                    <div className="mt-4">
                        <div className="mb-0.5 text-center">
                            {description ? (
                                description
                            ) : (
                                <span className="text-sm text-gray-500">
                                    Описание провода <b></b>
                                </span>
                            )}
                        </div>
                        <div className="relative flex w-full items-center border border-sidebar-border/70 dark:border-sidebar-border">
                            <div
                                className="relative flex h-10 w-full items-center justify-center px-4 text-sm text-gray-500"
                                style={{
                                    backgroundColor: wire_colors.find((color) => String(color.id) === selectedColorBaseId)?.hex || 'transparent',
                                }}
                            >
                                {!selectedColorBaseId && <span>Цвет провода</span>}
                            </div>
                            {selectedColorAddId && (
                                <div
                                    className="absolute top-1/2 h-1 w-full -translate-y-1/2"
                                    style={{
                                        backgroundColor: wire_colors.find((color) => String(color.id) === selectedColorAddId)?.hex || 'transparent',
                                    }}
                                ></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
