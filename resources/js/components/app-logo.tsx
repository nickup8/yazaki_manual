import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import AppLogoIcon from './app-logo-icon';
import { useSidebar } from './ui/sidebar';

export default function AppLogo() {
    const { name } = usePage<SharedData>().props;
    const { open } = useSidebar();
    return (
        <>
            <div
                className={
                    'flex aspect-square items-center justify-center rounded-md text-sidebar-primary-foreground transition-all ' +
                    (open ? 'size-12' : 'size-8')
                }
            >
                <AppLogoIcon className="size-12 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-lg transition-all">
                <span className="mb-0.5 truncate leading-tight font-bold">Язаки Волга</span>
                <span className="-mt-1 text-xs text-muted-foreground">{name.toLowerCase()} v.0.0.1 </span>
            </div>
        </>
    );
}
