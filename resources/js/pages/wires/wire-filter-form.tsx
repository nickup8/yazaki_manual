import FormField from '@/components/form-field';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
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
        <form className="flex w-full flex-col gap-4 border-b pb-4" onSubmit={handleSubmit}>
            <div className="flex gap-2">
                <FormField id="wire_key" label="Код провода" type="text" value={wireKey} onChange={setWireKey} disabled={isSearching} />
                {/* <Input
                    placeholder="Описание"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isSearching}
                /> */}
                <FormField id="description" label="Описание" type="text" value={description} onChange={setDescription} disabled={isSearching} />
            </div>
            <div className="flex gap-2">
                <div className="w-full">
                    <Label>Тип провода</Label>
                    <Select value={selectedTypeId} onValueChange={setSelectedTypeId} disabled={isSearching}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="" />
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
                <div className="w-full">
                    <Label>Основной цвет</Label>
                    <Select value={selectedColorBaseId} onValueChange={setSelectedColorBaseId} disabled={isSearching}>
                        <SelectTrigger className="w-full">
                            <SelectValue />
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
                <div className="w-full">
                    <Label>Дополнительный цвет</Label>
                    <Select value={selectedColorAddId} onValueChange={setSelectedColorAddId} disabled={isSearching}>
                        <SelectTrigger className="w-full">
                            <SelectValue />
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
                <Button type="submit" disabled={isSearching}>
                    {isSearching && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Найти
                </Button>

                <Button type="button" variant="outline" onClick={handleReset} disabled={isSearching}>
                    Сбросить
                </Button>
            </div>
        </form>
    );
}
