export default function DoubleCrimpCable({ leadset }: { leadset: any }) {
    const contactWidth = 50;
    const contactHeight = 30;

    const centerContactX = 50;
    const centerContactY = 90;

    const rightUpperContactX = 450;
    const rightUpperContactY = 45;
    const rightLowerContactX = 450;
    const rightLowerContactY = 125;

    const textOffset = 30;

    const midX = (x1: number, x2: number) => (x1 + x2) / 2;
    const midY = (y1: number, y2: number) => (y1 + y2) / 2;

    const contactPath = 'M31 7H41L50 0V30L41 23H31V30H4C1.79086 30 0 28.2091 0 26V4C0 1.79086 1.79086 0 4 0H31V7Z';

    const terminalIndex1 = leadset.terminals.findIndex((pos: any) => pos.position === 0);
    const terminalIndex2 = leadset.terminals.findIndex((pos: any) => pos.position === 1);
    const terminalIndex3 = leadset.terminals.findIndex((pos: any) => pos.position === 2);

    return (
        <svg viewBox="0 0 550 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            {/* Провода */}
            <path
                d={`M${centerContactX + contactWidth / 2} ${centerContactY} 
            C 200 ${centerContactY - 40}, ${rightUpperContactX} ${rightUpperContactY + contactHeight / 2}, ${rightUpperContactX} ${rightUpperContactY + contactHeight / 2}`}
                stroke={leadset.wires[0].wire_color_base.hex}
                strokeWidth="12"
                fill="none"
            />
            {leadset.wires[0].wire_color_add && (
                <path
                    d={`M${centerContactX + contactWidth / 2} ${centerContactY} 
            C 200 ${centerContactY - 40}, ${rightUpperContactX} ${rightUpperContactY + contactHeight / 2}, ${rightUpperContactX} ${rightUpperContactY + contactHeight / 2}`}
                    stroke={leadset.wires[0].wire_color_add.hex}
                    strokeWidth="4"
                    fill="none"
                />
            )}
            <path
                d={`M${centerContactX + contactWidth / 2} ${centerContactY} 
            C 200 ${centerContactY + 40}, ${rightLowerContactX} ${rightLowerContactY + contactHeight / 2}, ${rightLowerContactX} ${rightLowerContactY + contactHeight / 2}`}
                stroke={leadset.wires[1].wire_color_base.hex}
                strokeWidth="12"
                fill="none"
            />
            {leadset.wires[2].wire_color_add && (
                <path
                    d={`M${centerContactX + contactWidth / 2} ${centerContactY} 
            C 200 ${centerContactY + 40}, ${rightLowerContactX} ${rightLowerContactY + contactHeight / 2}, ${rightLowerContactX} ${rightLowerContactY + contactHeight / 2}`}
                    stroke={'#2CBCEB'}
                    strokeWidth="4"
                    fill="none"
                />
            )}

            {/* Подписи */}
            <text
                x={midX(centerContactX, rightUpperContactX)}
                y={midY(centerContactY, rightUpperContactY + contactHeight / 2) - textOffset}
                fontSize="12"
                textAnchor="middle"
                fill="black"
            >
                Верхний провод
            </text>
            <text
                x={midX(centerContactX, rightLowerContactX)}
                y={midY(centerContactY, rightLowerContactY + contactHeight / 2) + textOffset}
                fontSize="12"
                textAnchor="middle"
                fill="black"
            >
                Нижний провод
            </text>

            {/* Центральный контакт */}
            {leadset.terminals[terminalIndex2] && (
                <>
                    <path
                        d={contactPath}
                        fill="#AFAFAF"
                        transform={`translate(${centerContactX - contactWidth / 2}, ${centerContactY - contactHeight / 2})`}
                    />
                    <text
                        x={centerContactX - contactWidth / 2 - 5} // сдвиг немного влево
                        y={centerContactY}
                        fontSize="12"
                        textAnchor="end" // выравнивание по правому краю
                        dominantBaseline="middle"
                        fill="black"
                    >
                        {leadset.terminals[terminalIndex2].terminal_key}
                        <tspan
                            x={centerContactX - contactWidth / 2 - 5} // тот же X
                            dy="1.4em" // смещение вниз для второй строки
                            fontSize="10"
                            fill="#afafaf"
                        >
                            {leadset.terminals[terminalIndex2].terminal_spn} | {leadset.terminals[terminalIndex2].terminal_supplier}
                        </tspan>
                    </text>
                </>
            )}

            {/* Свободный контакт верхнего провода справа */}
            {leadset.terminals[terminalIndex1] && (
                <>
                    <path
                        d={contactPath}
                        fill="#AFAFAF"
                        transform={`translate(${rightUpperContactX}, ${rightUpperContactY}) scale(-1,1) translate(${-contactWidth},0)`}
                    />
                    <text
                        x={rightUpperContactX + contactWidth / 2} // центр контакта
                        y={rightUpperContactY + contactHeight / 2}
                        fontSize="12"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="black"
                    >
                        {leadset.terminals[terminalIndex1].terminal_key}
                        <tspan
                            x={rightUpperContactX + contactWidth / 2} // центр по X
                            dy="1.4em"
                            fontSize="10"
                            fill="#afafaf"
                        >
                            {leadset.terminals[terminalIndex1].terminal_spn} | {leadset.terminals[terminalIndex1].terminal_supplier}
                        </tspan>
                    </text>
                </>
            )}

            {/* Свободный контакт нижнего провода справа */}
            {leadset.terminals[terminalIndex3] && (
                <>
                    <path
                        d={contactPath}
                        fill="#AFAFAF"
                        transform={`translate(${rightLowerContactX}, ${rightLowerContactY}) scale(-1,1) translate(${-contactWidth},0)`}
                    />
                    <text
                        x={rightLowerContactX + contactWidth + 5}
                        y={rightLowerContactY + contactHeight / 2}
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
                </>
            )}
        </svg>
    );
}
