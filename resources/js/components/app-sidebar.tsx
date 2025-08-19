import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Book, GitMerge, LayoutGrid, RulerDimensionLine } from 'lucide-react';
import { useMemo } from 'react';
import AppLogo from './app-logo';

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Пользователи',
//         href: '',
//         icon: Users,
//     },
// ];

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
                title: 'Список проводов',
                href: '/leadsets',
                icon: GitMerge,
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
                        title: 'Аппликаторы',
                        href: '/applications',
                        isActive: url.startsWith('/applications'),
                    },
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
