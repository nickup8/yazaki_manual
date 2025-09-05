import { Terminal, Wire } from '@/types';

export default function DoubleCrimpCable({
    leadset,
    selectedTerminal,
    selectedPosition,
    selectedSeal,
    selectedSealPosition,
    selectedWired,
    selectedWirePosition,
    onSelectTerminal,
}: {
    leadset: any;
    selectedTerminal: number | null;
    selectedPosition: number | null;
    selectedSeal: number | null;
    selectedSealPosition: number | null;
    selectedWired: number[] | null;
    selectedWirePosition: number | null;
    onSelectTerminal: (
        terminalId: number | null,
        position: number | null,
        sealId: number | null,
        sealPosition: number | null,
        wired: number[] | null,
        wirePosition: number | null,
    ) => void;
}) {
    const contactWidth = 50;
    const contactHeight = 30;

    const centerContactX = 50;
    const centerContactY = 90;

    const rightUpperContactX = 450;
    const rightUpperContactY = 45;
    const rightLowerContactX = 450;
    const rightLowerContactY = 125;

    let textOffsetUpper = 25;
    const textOffsetLower = 25;
    const textOffsetThird = 50;

    const midX = (x1: number, x2: number) => (x1 + x2) / 2;
    const midY = (y1: number, y2: number) => (y1 + y2) / 2;

    const contactPath = 'M31 7H41L50 0V30L41 23H31V30H4C1.79086 30 0 28.2091 0 26V4C0 1.79086 1.79086 0 4 0H31V7Z';

    const terminalIndex1 = leadset.terminals.findIndex((pos: Terminal) => pos.position === 0);
    const terminalIndex2 = leadset.terminals.findIndex((pos: Terminal) => pos.position === 1);
    const terminalIndex3 = leadset.terminals.findIndex((pos: Terminal) => pos.position === 2);
    const terminalIndex4 = leadset.terminals.findIndex((pos: Terminal) => pos.position === 3); // новый для третьего провода слева

    const wireIndex1 = leadset.wires.findIndex((pos: Wire) => pos.position === 0);
    const wireIndex2 = leadset.wires.findIndex((pos: Wire) => pos.position === 1);
    const wireIndex3 = leadset.wires.findIndex((pos: Wire) => pos.position === 2);

    const wire1: Wire = leadset.wires[wireIndex1];
    const wire2: Wire = leadset.wires[wireIndex2];
    const wire3: Wire = leadset.wires[wireIndex3];

    if (wire1 && !wire2) {
        textOffsetUpper = 0;
    }

    // Третий провод с увеличенным «воздухом» между вторым и третьим
    const thirdWireY = centerContactY + 90;

    const handleClick = (terminalId: number, pos: number, wired: number[]) => {
        if (selectedTerminal === terminalId && selectedPosition === pos) {
            onSelectTerminal(null, null, null, null, null, null); // снять выделение
        } else {
            onSelectTerminal(terminalId, pos, null, null, wired, null);
        }
    };

    return (
        <svg viewBox="0 0 550 250" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            {/* Верхний провод */}
            {wire1 && wire2 && (
                <>
                    <path
                        d={`M${centerContactX + contactWidth / 2} ${centerContactY}
                   C 200 ${centerContactY - 40}, ${rightUpperContactX} ${
                       rightUpperContactY + contactHeight / 2
                   }, ${rightUpperContactX} ${rightUpperContactY + contactHeight / 2}`}
                        stroke={leadset.wires[0].wire_color_base.hex}
                        strokeWidth="12"
                        fill="none"
                    />
                    {leadset.wires[0].wire_color_add && (
                        <path
                            d={`M${centerContactX + contactWidth / 2} ${centerContactY}
                       C 200 ${centerContactY - 40}, ${rightUpperContactX} ${
                           rightUpperContactY + contactHeight / 2
                       }, ${rightUpperContactX} ${rightUpperContactY + contactHeight / 2}`}
                            stroke={leadset.wires[0].wire_color_add.hex}
                            strokeWidth="4"
                            fill="none"
                        />
                    )}
                </>
            )}

            {wire1 && !wire2 && (
                <>
                    <path
                        d={`M${centerContactX + contactWidth / 2} ${centerContactY} L${rightUpperContactX} ${centerContactY}`}
                        stroke={leadset.wires[0].wire_color_base.hex}
                        strokeWidth="12"
                        fill="none"
                    />

                    {leadset.wires[0].wire_color_add && (
                        <path
                            d={`M${centerContactX + contactWidth / 2} ${centerContactY} L${rightUpperContactX} ${centerContactY}`}
                            stroke={leadset.wires[0].wire_color_add.hex}
                            strokeWidth="4"
                            fill="none"
                        />
                    )}
                </>
            )}

            {/* Нижний провод */}
            {wire2 && (
                <>
                    <path
                        d={`M${centerContactX + contactWidth / 2} ${centerContactY}
                   C 200 ${centerContactY + 20}, ${rightLowerContactX} ${
                       rightLowerContactY + contactHeight / 2
                   }, ${rightLowerContactX} ${rightLowerContactY + contactHeight / 2}`}
                        stroke={leadset.wires[1].wire_color_base.hex}
                        strokeWidth="12"
                        fill="none"
                    />
                    {leadset.wires[1].wire_color_add && (
                        <path
                            d={`M${centerContactX + contactWidth / 2} ${centerContactY}
                       C 200 ${centerContactY + 20}, ${rightLowerContactX} ${
                           rightLowerContactY + contactHeight / 2
                       }, ${rightLowerContactX} ${rightLowerContactY + contactHeight / 2}`}
                            stroke={leadset.wires[1].wire_color_add.hex}
                            strokeWidth="4"
                            fill="none"
                        />
                    )}
                </>
            )}

            {/* Третий провод */}
            {wire3 && (
                <>
                    <path
                        d={`M${centerContactX} ${thirdWireY}
       C 200 ${thirdWireY + 20}, ${rightLowerContactX} ${rightLowerContactY + contactHeight / 2},
         ${rightLowerContactX} ${rightLowerContactY + contactHeight / 2}`}
                        stroke={leadset.wires[2].wire_color_base.hex}
                        strokeWidth="12"
                        fill="none"
                    />
                    {leadset.wires[2].wire_color_add && (
                        <path
                            d={`M${centerContactX} ${thirdWireY}
           C 200 ${thirdWireY + 20}, ${rightLowerContactX} ${rightLowerContactY + contactHeight / 2},
             ${rightLowerContactX} ${rightLowerContactY + contactHeight / 2}`}
                            stroke={leadset.wires[2].wire_color_add.hex}
                            strokeWidth="4"
                            fill="none"
                        />
                    )}
                </>
            )}

            {/* Подписи */}
            {wire1 && (
                <text
                    x={midX(centerContactX, rightUpperContactX)}
                    y={midY(centerContactX, rightUpperContactY + contactHeight / 2) - textOffsetUpper}
                    fontSize="12"
                    textAnchor="middle"
                    fill="black"
                    dominantBaseline="middle"
                >
                    <tspan fontSize={'14'} fontWeight={'bold'}>
                        {wire1.wire_name} | {wire1.cross_section}
                    </tspan>
                    <tspan
                        x={midX(centerContactX, rightUpperContactX)}
                        y={midY(centerContactX, rightUpperContactY + contactHeight / 2) - textOffsetUpper}
                        dy="1.4em"
                        fontSize={'10'}
                    >
                        {wire1.wire_key} {wire1.description}
                    </tspan>
                </text>
            )}

            {wire2 && (
                <text
                    x={midX(centerContactX, rightLowerContactX)}
                    y={midY(centerContactY, rightLowerContactY + contactHeight / 2) + textOffsetLower}
                    fontSize="12"
                    textAnchor="middle"
                    fill="black"
                >
                    <tspan fontSize={'14'} fontWeight={'bold'}>
                        {wire2.wire_name} | {wire2.cross_section}
                    </tspan>
                    <tspan
                        x={midX(centerContactX, rightLowerContactX)}
                        y={midY(centerContactY, rightLowerContactY + contactHeight / 2) + textOffsetLower}
                        dy="1.4em"
                        fontSize={'10'}
                    >
                        {leadset.wires[1].wire_key}
                    </tspan>
                </text>
            )}

            {wire3 && (
                <text
                    x={midX(centerContactX, rightLowerContactX)}
                    y={midY(thirdWireY, rightLowerContactY + contactHeight / 2) + textOffsetThird}
                    fontSize="12"
                    textAnchor="middle"
                    fill="black"
                >
                    <tspan fontSize={'14'} fontWeight={'bold'}>
                        {wire3.wire_name} | {wire3.cross_section}
                    </tspan>
                    <tspan
                        x={midX(centerContactX, rightLowerContactX)}
                        y={midY(thirdWireY, rightLowerContactY + contactHeight / 2) + textOffsetThird}
                        dy="1.4em"
                        fontSize={'10'}
                    >
                        {leadset.wires[2].wire_key} {leadset.wires[2].description}
                    </tspan>
                </text>
            )}

            {/* Центральный контакт */}
            {leadset.terminals[terminalIndex2] && (
                <g
                    className="cursor-pointer"
                    onClick={() =>
                        handleClick(leadset.terminals[terminalIndex2].id, leadset.terminals[terminalIndex2].position, [wire1.id, wire2?.id])
                    }
                >
                    <path
                        d={contactPath}
                        fill="#AFAFAF"
                        stroke={
                            selectedTerminal === leadset.terminals[terminalIndex2].id &&
                            selectedPosition === leadset.terminals[terminalIndex2].position
                                ? '#000'
                                : '#AFAFAF'
                        }
                        transform={`translate(${centerContactX - contactWidth / 2}, ${centerContactY - contactHeight / 2})`}
                    />
                    <text
                        x={centerContactX - contactWidth / 2 - 5}
                        y={centerContactY}
                        fontSize="12"
                        textAnchor="end"
                        dominantBaseline="middle"
                        fill="black"
                    >
                        {leadset.terminals[terminalIndex2].terminal_key}
                        <tspan x={centerContactX - contactWidth / 2 - 5} dy="1.4em" fontSize="10" fill="#afafaf">
                            {leadset.terminals[terminalIndex2].terminal_spn} | {leadset.terminals[terminalIndex2].terminal_supplier}
                        </tspan>
                    </text>
                </g>
            )}

            {/* Свободный контакт верхнего провода справа */}
            {leadset.terminals[terminalIndex1] && (
                <g
                    className="cursor-pointer"
                    onClick={() => handleClick(leadset.terminals[terminalIndex1].id, leadset.terminals[terminalIndex1].position, [wire1.id])}
                >
                    <path
                        d={contactPath}
                        fill="#AFAFAF"
                        stroke={
                            selectedTerminal === leadset.terminals[terminalIndex1].id &&
                            selectedPosition === leadset.terminals[terminalIndex1].position
                                ? '#000'
                                : '#AFAFAF'
                        }
                        transform={`translate(${rightUpperContactX}, ${rightUpperContactY}) scale(-1,1) translate(${-contactWidth},0)`}
                    />
                    <text
                        x={rightUpperContactX + contactWidth / 2}
                        y={rightUpperContactY + contactHeight / 2}
                        fontSize="12"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="black"
                    >
                        {leadset.terminals[terminalIndex1].terminal_key}
                        <tspan x={rightUpperContactX + contactWidth / 2} dy="1.4em" fontSize="10" fill="#afafaf">
                            {leadset.terminals[terminalIndex1].terminal_spn} | {leadset.terminals[terminalIndex1].terminal_supplier}
                        </tspan>
                    </text>
                </g>
            )}

            {/* Свободный контакт нижнего провода справа */}
            {leadset.terminals[terminalIndex3] && (
                <g
                    className="cursor-pointer"
                    onClick={() =>
                        handleClick(leadset.terminals[terminalIndex3].id, leadset.terminals[terminalIndex3].position, [wire2.id, wire3?.id])
                    }
                >
                    <path
                        d={contactPath}
                        fill="#AFAFAF"
                        stroke={
                            selectedTerminal === leadset.terminals[terminalIndex3].id &&
                            selectedPosition === leadset.terminals[terminalIndex3].position
                                ? '#000'
                                : '#AFAFAF'
                        }
                        transform={`translate(${rightLowerContactX}, ${rightLowerContactY}) scale(-1,1) translate(${-contactWidth},0)`}
                    />
                    <text
                        x={rightLowerContactX + contactWidth + 5}
                        y={rightLowerContactY + contactHeight / 2 + 10}
                        fontSize="12"
                        textAnchor="start"
                        dominantBaseline="middle"
                        fill="black"
                    >
                        {leadset.terminals[terminalIndex3].terminal_key}
                        <tspan x={rightLowerContactX + contactWidth + 5} dy="1.4em" fontSize={'10'} fill="#afafaf">
                            {leadset.terminals[terminalIndex3].terminal_spn} | {leadset.terminals[terminalIndex3].terminal_supplier}
                        </tspan>
                    </text>
                </g>
            )}

            {/* Новый контакт слева для третьего провода */}
            {leadset.terminals[terminalIndex4] && (
                <g
                    className="cursor-pointer"
                    onClick={() => handleClick(leadset.terminals[terminalIndex1].id, leadset.terminals[terminalIndex1].position, [wire3.id])}
                >
                    <path
                        d={contactPath}
                        fill="#AFAFAF"
                        stroke={
                            selectedTerminal === leadset.terminals[terminalIndex4].id &&
                            selectedPosition === leadset.terminals[terminalIndex4].position
                                ? '#000'
                                : '#AFAFAF'
                        }
                        transform={`translate(${centerContactX - contactWidth / 2}, ${thirdWireY - contactHeight / 2})`}
                    />
                    <text
                        x={centerContactX - contactWidth / 2 - 5}
                        y={thirdWireY}
                        fontSize="12"
                        textAnchor="end"
                        dominantBaseline="middle"
                        fill="black"
                    >
                        {leadset.terminals[terminalIndex4].terminal_key}
                        <tspan x={centerContactX - contactWidth / 2 - 5} dy="1.4em" fontSize="10" fill="#afafaf">
                            {leadset.terminals[terminalIndex4].terminal_spn} | {leadset.terminals[terminalIndex4].terminal_supplier}
                        </tspan>
                    </text>
                </g>
            )}
        </svg>
    );
}
