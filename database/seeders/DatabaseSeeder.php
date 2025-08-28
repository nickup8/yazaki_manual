<?php

namespace Database\Seeders;

use App\Enums\RolesEnum;
use App\Models\SealColor;
use App\Models\User;
use App\Models\WireColor;
use App\Models\WireType;
use Illuminate\Database\Seeder;
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
            'PVAM',
            'PVACA',
            'PRFLRYB',
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
            ['name' => 'Черный',          'short' => 'BK', 'hex' => '#000000'],
            ['name' => 'Красный',         'short' => 'RD', 'hex' => '#FF0000'],
            ['name' => 'Жёлтый',          'short' => 'YE', 'hex' => '#FFFF00'],
            ['name' => 'Оранжевый',       'short' => 'OG', 'hex' => '#FFA500'],
            ['name' => 'Голубой',         'short' => 'BU', 'hex' => '#2CBCEB'],
            ['name' => 'Коричневый',      'short' => 'BN', 'hex' => '#A52A2A'],
            ['name' => 'Зелёный',         'short' => 'GN', 'hex' => '#008000'],
            ['name' => 'Белый',           'short' => 'WH', 'hex' => '#FFFFFF'],
            ['name' => 'Фиолетовый',      'short' => 'VT', 'hex' => '#800080'],
            ['name' => 'Серый',           'short' => 'GY', 'hex' => '#808080'],
            ['name' => 'Розовый',         'short' => 'PK', 'hex' => '#FFC0CB'],
            ['name' => 'Светло зелёный',  'short' => 'LG', 'hex' => '#90EE90'],
            ['name' => 'Бирюзовый',       'short' => 'TQ', 'hex' => '#40E0D0'],
            ['name' => 'Бежевый',         'short' => 'BG', 'hex' => '#F5F5DC'],
            ['name' => 'Лавандовый',      'short' => 'LV', 'hex' => '#E6E6FA'],
            ['name' => 'Небесно-голубой', 'short' => 'SB', 'hex' => '#87CEEB'],
        ];

        foreach ($wire_colors as $wire_color) {
            WireColor::create([
                'name' => $wire_color['name'],
                'hex' => $wire_color['hex'],
                'short' => $wire_color['short'],
            ]);
        }

        User::create([
            'name' => 'Николай',
            'last_name' => 'Сироткин',
            'login' => '4500',
            'password' => bcrypt('password'),

        ])->assignRole([RolesEnum::ENGINEER->value, RolesEnum::USER_MANAGER->value]);

        $seal_colors = [
            ['name' => 'Зеленый',     'short' => 'GN', 'hex' => '#006400'],
            ['name' => 'Синий',       'short' => 'BU', 'hex' => '#0000CD'],
            ['name' => 'Белый',       'short' => 'WH', 'hex' => '#F8F8FF'],
            ['name' => 'Жёлтый',      'short' => 'YE', 'hex' => '#FFD700'],
            ['name' => 'Серый',       'short' => 'GY', 'hex' => '#A9A9A9'],
            ['name' => 'Коричневый',  'short' => 'BN', 'hex' => '#8B4513'],
            ['name' => 'Чёрный',      'short' => 'BK', 'hex' => '#1C1C1C'],
            ['name' => 'Красный',     'short' => 'RD', 'hex' => '#B22222'],
            ['name' => 'Оранжевый',   'short' => 'OG', 'hex' => '#FF8C00'],
            ['name' => 'Фиолетовый',  'short' => 'VT', 'hex' => '#9370DB'],
        ];

        foreach ($seal_colors as $seal_color) {
            SealColor::create([
                'color_name' => $seal_color['name'],
                'color_hex' => $seal_color['hex'],
                'color_short' => $seal_color['short'],
            ]);
        }
    }
}
