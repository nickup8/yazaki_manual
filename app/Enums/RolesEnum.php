<?php

namespace App\Enums;

enum RolesEnum: string
{
    case OPERATOR = 'operator';
    case ENGINEER = 'engineer';
    case USER_MANAGER = 'user manager';

    public static function labels(): array
    {
        return [
            self::OPERATOR->value => 'Оператор',
            self::ENGINEER->value => 'Инженер',
            self::USER_MANAGER->value => 'Менеджер пользователей',
        ];
    }

    public function label(): string
    {
        return match ($this) {
            self::OPERATOR => 'Оператор',
            self::ENGINEER => 'Инженер',
            self::USER_MANAGER => 'Менеджер пользователей',
        };
    }
}
