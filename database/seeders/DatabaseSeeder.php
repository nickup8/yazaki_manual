<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\WireColor;
use App\Models\WireType;
use App\Enums\RolesEnum;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Создание ролей
        foreach (RolesEnum::cases() as $role) {
            Role::firstOrCreate(['name' => $role->value]);
        }

        // Отсортированные по алфавиту типы проводов
        $wire_types = [
            'Не определено',
            'PVAM',
            'PVACA',
            'PR3Z',
            'T3',
        ];

        // Сортировка с учётом кириллицы
        // usort($wire_types, fn($a, $b) => mb_strtolower($a) <=> mb_strtolower($b));

        foreach ($wire_types as $wire_type) {
            WireType::firstOrCreate(['name' => $wire_type]);
        }

        // Цвета проводов с HEX
        $wire_colors = [
    ['name' => 'Черный',          'short' => 'BK', 'hex' => '#000000'], // Масса (GND)
    ['name' => 'Красный',         'short' => 'RD', 'hex' => '#FF0000'], // Питание +12V
    ['name' => 'Жёлтый',          'short' => 'YE', 'hex' => '#FFFF00'], // Постоянное питание (память)
    ['name' => 'Оранжевый',       'short' => 'OR', 'hex' => '#FFA500'], // Подсветка/ACC
    ['name' => 'Голубой',         'short' => 'LB', 'hex' => '#ADD8E6'], // Управление аксессуарами
    ['name' => 'Коричневый',      'short' => 'BN', 'hex' => '#A52A2A'], // Альтернативная масса / mute
    ['name' => 'Зелёный',         'short' => 'GN', 'hex' => '#008000'], // Сигнал, аксессуары
    ['name' => 'Белый',           'short' => 'WH', 'hex' => '#FFFFFF'], // Мультимедиа / CAN
    ['name' => 'Фиолетовый',      'short' => 'VT', 'hex' => '#800080'], // CAN, speed, и т.п.
    ['name' => 'Серый',           'short' => 'GY', 'hex' => '#808080'],
    ['name' => 'Розовый',         'short' => 'PK', 'hex' => '#FFC0CB'],
    ['name' => 'Светло зелёный',  'short' => 'LG', 'hex' => '#90EE90'],
    ['name' => 'Бирюзовый',       'short' => 'TQ', 'hex' => '#40E0D0'],
    ['name' => 'Бежевый',         'short' => 'BE', 'hex' => '#F5F5DC'],
    ['name' => 'Лавандовый',      'short' => 'LV', 'hex' => '#E6E6FA'],
    ['name' => 'Небесно-голубой', 'short' => 'SB', 'hex' => '#87CEEB'],
];

        foreach ($wire_colors as $wire_color) {
            WireColor::create([
                'name' => $wire_color['name'],
                'hex' => $wire_color['hex'],
                'short' => $wire_color['short']
            ]);
        }

        User::create([
            'name' => 'Николай Сироткин',
            'email' => 'nickup8@yandex.ru',
            'password' => bcrypt('password'),
            
        ])->assignRole([RolesEnum::ENGINEER->value, RolesEnum::USER_MANAGER->value]);
    }

    
}
