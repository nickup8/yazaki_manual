import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import FormField from '@/components/form-field';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    login: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        login: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Войдите в свой аккаунт" description="Введите ваш логин и пароль">
            <Head title="Вход" />

            <form className="flex flex-col gap-4" onSubmit={submit}>
                <div className="grid gap-4">
                    <FormField
                        id="login"
                        label="Логин (Таб. номер)"
                        type="text"
                        required
                        value={data.login}
                        onChange={(e) => setData('login', e)}
                        error={errors.login}
                    />

                    <FormField
                        id="password"
                        label="Пароль"
                        type="password"
                        required
                        value={data.password}
                        onChange={(e) => setData('password', e)}
                        error={errors.password}
                    />

                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Войти
                    </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">Забыли пароль или нет аккаунта? Сообщите руководителю</div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
