import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    items?: NavItem[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface WireColor {
    id: number;
    name: string;
    hex: string;
    short: string;
}

export interface WireType {
    id: number;
    name: string;
}

export interface Wire {
    id: number;
    wire_key: string;
    description: string;
    wire_type: WireType;
    wire_color_base: WireColor;
    wire_color_add: WireColor | null;
    cross_section: number;
    created_at: string;
    updated_at: string;
}
