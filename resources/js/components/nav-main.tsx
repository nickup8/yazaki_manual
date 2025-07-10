import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

const STORAGE_KEY = 'nav-open-items';

function loadOpenItems(): Record<string, boolean> {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

function saveOpenItems(openItems: Record<string, boolean>) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(openItems));
    } catch {
        // Ignore errors
    }
}

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const stored = loadOpenItems();
        // Автоматически открыть активные разделы при первом монтировании
        const merged = Object.fromEntries(items.map((item) => [item.title, item.isActive || stored[item.title] || false]));
        setOpenItems(merged);
    }, [items]);

    const toggleItem = (title: string) => {
        setOpenItems((prev) => {
            const updated = { ...prev, [title]: !prev[title] };
            saveOpenItems(updated);
            return updated;
        });
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel></SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const isOpen = openItems[item.title] ?? false;
                    return (
                        <React.Fragment key={item.title}>
                            {item.items && item.items.length > 0 ? (
                                <Collapsible open={isOpen} onOpenChange={() => toggleItem(item.title)} asChild className="group/collapsible">
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton tooltip={item.title}>
                                                {item.icon && <item.icon />}
                                                <span>{item.title}</span>
                                                {openItems[item.title] ? (
                                                    <ChevronDown className="ml-auto h-4 w-4" />
                                                ) : (
                                                    <ChevronRight className="ml-auto h-4 w-4" />
                                                )}
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items.map((subItem) => (
                                                    <SidebarMenuSubItem key={subItem.title}>
                                                        <SidebarMenuSubButton asChild>
                                                            <Link href={subItem.href} prefetch>
                                                                <span>{subItem.title}</span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ) : (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={item.href === page.url} tooltip={{ children: item.title }}>
                                        <Link href={item.href} prefetch>
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )}
                        </React.Fragment>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
