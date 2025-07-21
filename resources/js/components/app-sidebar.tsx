import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Book, BookOpen, Folder, LayoutGrid, RulerDimensionLine } from 'lucide-react';
import { useMemo } from 'react';
import AppLogo from './app-logo';

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { url } = usePage();
    const mainNavItems: NavItem[] = useMemo(
        () => [
            {
                title: 'Dashboard',
                href: '/dashboard',
                icon: LayoutGrid,
            },
            {
                title: 'Кримп стандарты',
                href: '/crimp_standards',
                icon: RulerDimensionLine,
            },
            {
                title: 'Справочники',
                href: '',
                icon: Book,
                items: [
                    {
                        title: 'Провода',
                        href: '/wires',
                        isActive: url.startsWith('/wires'),
                    },
                    {
                        title: 'Терминалы',
                        href: '/terminals',
                        isActive: url.startsWith('/terminals'),
                    },
                    {
                        title: 'Уплотнители',
                        href: '/seals',
                        isActive: url.startsWith('/seals'),
                    },
                ],
            },
        ],
        [url],
    );
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
