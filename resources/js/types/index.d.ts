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
    created_at: string;
    updated_at: string;
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

export interface Seal {
    id: number;
    seal_key: string;
    seal_spn: string;
    seal_color: SealColor;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface SealColor {
    id: number;
    color_name: string;
    color_hex: string;
    color_short: string;
}

export interface Terminal {
    id: number;
    terminal_key: string;
    terminal_spn: string;
    terminal_supplier: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface Seal {
    id: number;
    seal_key: string;
    seal_spn: string;
    seal_color: SealColor;
    seal_supplier: string;
    description: string;
    created_at: string;
    updated_at: string;
}
export interface CrimpStandart {
    id: number;
    terminal: Terminal;
    seal: Seal | null;
    type_code_wire_1: string;
    size_code_wire_1: string;
    type_code_wire_2: string;
    size_code_wire_2: string;
    wire_type_1: WireType;
    cross_section_wire_1: number;
    wire_type_2: WireType | null;
    cross_section_wire_2: number | null;
    strip_length: number;
    str_tolerance: number;
    conductor_crimp_height: number;
    conductor_crimp_height_tolerance: number;
    isolation_crimp_height: number;
    isolation_crimp_height_tolerance: number;
    conductor_crimp_width_min: number;
    conductor_crimp_width_max: number;
    isolation_crimp_width_min: number;
    isolation_crimp_width_max: number;
    separation_force_wire_1: number;
    separation_force_wire_2: number | null;
    customer_code: string;
    placement: string | null;
    created_at: string;
    updated_at: string;
}
