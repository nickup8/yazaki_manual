import { router } from '@inertiajs/react';
import React from 'react';

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

interface PaginationProps {
    links: PaginationLink[];
}

const Pagination: React.FC<PaginationProps> = ({ links }) => {
    if (!links || links.length <= 1) return null;

    const handleClick = (url: string | null) => {
        if (!url) return;
        router.get(
            url,
            {},
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    return (
        <nav className="mt-4 flex flex-wrap gap-2">
            {links.map((link, index) => (
                <button
                    key={index}
                    className={`rounded-md border px-3 py-1 text-sm transition ${link.active ? 'bg-blue-600 text-white' : ''} ${!link.url ? 'cursor-not-allowed text-gray-400' : 'hover:bg-blue-100'} `}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    disabled={!link.url}
                    onClick={() => handleClick(link.url)}
                />
            ))}
        </nav>
    );
};

export default Pagination;
