import { WireColor, WireType } from '@/types';
import { useEffect, useState } from 'react';

export function useWireFilters(wire_types: WireType[], wire_colors: WireColor[]) {
    const [wireKey, setWireKey] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTypeId, setSelectedTypeId] = useState('');
    const [selectedColorBaseId, setSelectedColorBaseId] = useState('');
    const [selectedColorAddId, setSelectedColorAddId] = useState('');

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

    const resetFilters = () => {
        setWireKey('');
        setDescription('');
        setSelectedTypeId('');
        setSelectedColorBaseId('');
        setSelectedColorAddId('');
    };

    return {
        wireKey,
        setWireKey,
        description,
        setDescription,
        selectedTypeId,
        setSelectedTypeId,
        selectedColorBaseId,
        setSelectedColorBaseId,
        selectedColorAddId,
        setSelectedColorAddId,
        resetFilters,
        hasAnyFilter: !!wireKey.trim() || !!description.trim() || !!selectedTypeId || !!selectedColorBaseId || !!selectedColorAddId,
    };
}
