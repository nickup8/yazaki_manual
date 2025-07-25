<?php

use App\Enums\RolesEnum;

it('has labels for all enum cases', function () {
    $labels = RolesEnum::labels();

    foreach (RolesEnum::cases() as $role) {
        expect(array_key_exists($role->value, $labels))->toBeTrue();
        expect($labels[$role->value])->not()->toBeEmpty();
    }
});

it('label method returns the correct label', function () {
    foreach (RolesEnum::cases() as $role) {
        expect($role->label())->toBe(RolesEnum::labels()[$role->value]);
    }
});
