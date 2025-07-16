import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { WireColor, WireType } from '@/types';
import { Loader2 } from 'lucide-react';

interface Props {
    wire_types: WireType[];
    wire_colors: WireColor[];
    wireKey: string;
    description: string;
    selectedTypeId: string;
    selectedColorBaseId: string;
    selectedColorAddId: string;
    setWireKey: (v: string) => void;
    setDescription: (v: string) => void;
    setSelectedTypeId: (v: string) => void;
    setSelectedColorBaseId: (v: string) => void;
    setSelectedColorAddId: (v: string) => void;
    isSearching: boolean;
    isResetting: boolean;
    hasAnyFilter: boolean;
    handleSubmit: (e: React.FormEvent) => void;
    handleReset: () => void;
}

export default function WireFilterForm({
    wire_types,
    wire_colors,
    wireKey,
    description,
    selectedTypeId,
    selectedColorBaseId,
    selectedColorAddId,
    setWireKey,
    setDescription,
    setSelectedTypeId,
    setSelectedColorBaseId,
    setSelectedColorAddId,
    isSearching,
    isResetting,
    hasAnyFilter,
    handleSubmit,
    handleReset,
}: Props) {
    return (
        <form className="flex w-full flex-wrap gap-2 border-t border-b py-2" onSubmit={handleSubmit}>
            <Input
                placeholder="Код провода"
                name="wire_key"
                value={wireKey}
                onChange={(e) => setWireKey(e.target.value)}
                disabled={isSearching || isResetting}
            />
            <Input
                placeholder="Описание"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isSearching || isResetting}
            />
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
                    {isSearching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Поиск
                </Button>
                {hasAnyFilter && (
                    <Button type="button" variant="outline" onClick={handleReset} disabled={isSearching || isResetting}>
                        {isResetting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Сбросить
                    </Button>
                )}
            </div>
        </form>
    );
}
