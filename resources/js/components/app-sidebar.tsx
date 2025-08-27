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
                isActive: url.includes('/dashboard'),
            },
            {
                title: 'Список проводов',
                href: '/leadsets',
                icon: GitMerge,
                isActive: url.includes('/leadsets'),
            },
            {
                title: 'Кримп стандарты',
                href: '/crimp_standards',
                icon: RulerDimensionLine,
                isActive: url.includes('/crimp_standards'),
            },
            {
                title: 'Справочники',
                href: '',
                icon: Book,
                items: [
                    {
                        title: 'Аппликаторы',
                        href: '/applications',
                        isActive: url.includes('/applications'),
                    },
                    {
                        title: 'Провода',
                        href: '/wires',
                        isActive: url.includes('/wires'),
                    },
                    {
                        title: 'Терминалы',
                        href: '/terminals',
                        isActive: url.includes('/terminals'),
                    },
                    {
                        title: 'Уплотнители',
                        href: '/seals',
                        isActive: url.includes('/seals'),
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
