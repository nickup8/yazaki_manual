import { SVGAttributes } from 'react';

export default function TripleWireZ(props: SVGAttributes<SVGElement>) {
    const contactWidth = 50;
    const contactHeight = 30;

    const leftCrimpX = 20;
    const leftCrimpY = 90;
    const rightCrimpX = 400;
    const rightCrimpY = 110;

    const contactPath = 'M31 7H41L50 0V30L41 23H31V30H4C1.79086 30 0 28.2091 0 26V4C0 1.79086 1.79086 0 4 0H31V7Z';

    return (
        <svg viewBox="0 0 500 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" {...props}>
            {/* Верхний провод (свободный конец справа) */}
            <path
                d={`
          M0 50 
          C 20 50, ${leftCrimpX} 50, ${leftCrimpX} ${leftCrimpY} 
          C ${leftCrimpX + 50} ${leftCrimpY - 10}, ${rightCrimpX - 10} 40, ${rightCrimpX} 45
        `}
                stroke="red"
                strokeWidth="12"
                fill="none"
            />
            <path
                d={`
          M0 50 
          C 20 50, ${leftCrimpX} 50, ${leftCrimpX} ${leftCrimpY} 
          C ${leftCrimpX + 50} ${leftCrimpY - 10}, ${rightCrimpX - 10} 40, ${rightCrimpX} 45
        `}
                stroke="pink"
                strokeWidth="4"
                fill="none"
            />
            <text x={250} y={35} fontSize="12" textAnchor="middle" fill="black">
                Верхний провод
            </text>

            {/* Средний провод */}
            <path
                d={`
          M0 90 
          C ${leftCrimpX - 10} 90, ${leftCrimpX - 10} ${leftCrimpY}, ${leftCrimpX} ${leftCrimpY} 
          C ${leftCrimpX + 50} ${leftCrimpY + 10}, ${rightCrimpX - 10} ${rightCrimpY}, ${rightCrimpX} ${rightCrimpY}
        `}
                stroke="blue"
                strokeWidth="12"
                fill="none"
            />
            <path
                d={`
          M0 90 
          C ${leftCrimpX - 10} 90, ${leftCrimpX - 10} ${leftCrimpY}, ${leftCrimpX} ${leftCrimpY} 
          C ${leftCrimpX + 50} ${leftCrimpY + 10}, ${rightCrimpX - 10} ${rightCrimpY}, ${rightCrimpX} ${rightCrimpY}
        `}
                stroke="lightblue"
                strokeWidth="4"
                fill="none"
            />
            <text x={250} y={105} fontSize="12" textAnchor="middle" fill="black">
                Средний провод
            </text>

            {/* Нижний провод (свободный конец слева) */}
            <path
                d={`
          M0 130 
          C 20 130, ${rightCrimpX - 10} ${rightCrimpY}, ${rightCrimpX} ${rightCrimpY} 
          C ${rightCrimpX - 50} ${rightCrimpY + 10}, 50 150
        `}
                stroke="green"
                strokeWidth="12"
                fill="none"
            />
            <path
                d={`
          M0 130 
          C 20 130, ${rightCrimpX - 10} ${rightCrimpY}, ${rightCrimpX} ${rightCrimpY} 
          C ${rightCrimpX - 50} ${rightCrimpY + 10}, 50 150
        `}
                stroke="lightgreen"
                strokeWidth="4"
                fill="none"
            />
            <text x={rightCrimpX / 2} y={160} fontSize="12" textAnchor="middle" fill="black">
                Нижний провод
            </text>

            {/* Левый контакт */}
            <path d={contactPath} fill="#AFAFAF" transform={`translate(${leftCrimpX - contactWidth / 2}, ${leftCrimpY - contactHeight / 2})`} />
            <text x={leftCrimpX - contactWidth / 2 - 5} y={leftCrimpY} fontSize="12" textAnchor="end" dominantBaseline="middle" fill="black">
                Контакт
            </text>

            {/* Правый контакт */}
            <path d={contactPath} fill="#AFAFAF" transform={`translate(${rightCrimpX}, ${rightCrimpY}) scale(-1,1) translate(${-contactWidth},0)`} />
            <text
                x={rightCrimpX + contactWidth + 5}
                y={rightCrimpY + contactHeight / 2}
                fontSize="12"
                textAnchor="start"
                dominantBaseline="middle"
                fill="black"
            >
                Контакт
            </text>
        </svg>
    );
}
