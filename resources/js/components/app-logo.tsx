import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    const { name } = usePage<SharedData>().props;
    return (
        <>
            <div className="flex aspect-square size-12 items-center justify-center rounded-md text-sidebar-primary-foreground">
                <AppLogoIcon className="size-12 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-lg">
                <span className="mb-0.5 truncate leading-tight font-bold">Язаки Волга</span>
                <span className="-mt-2 text-[12px] text-muted-foreground">{name.toLowerCase()} v.0.0.1 </span>
            </div>
        </>
    );
}
