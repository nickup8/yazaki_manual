<?php

namespace App\Enums;

enum RolesEnum: string
{
    case OPERATOR = 'operator';
    case ENGINEER = 'engineer';
    case USER_MANAGER = 'user_manager';

    private const LABELS = [
        'operator' => 'Оператор',
        'engineer' => 'Инженер',
        'user_manager' => 'Менеджер пользователей',
    ];

    public static function labels(): array
    {
        return array_reduce(self::cases(), function ($carry, $role) {
            $carry[$role->value] = self::LABELS[$role->value];

            return $carry;
        }, []);
    }

    public function label(): string
    {
        return self::LABELS[$this->value];
    }
}
