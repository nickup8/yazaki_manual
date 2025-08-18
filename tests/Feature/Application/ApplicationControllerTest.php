<?php

use App\Models\User;

beforeEach(function () {
    $this->serviceMock = $this->mock(\App\Services\Application\ApplicationService::class);
});

afterEach(function () {
    \Mockery::close();
});

it('возвращает страницу Inertia с приложениями на index', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $applications = collect();

    $this->serviceMock
        ->shouldReceive('getFiltered')
        ->once()
        ->andReturn($applications);

    $response = $this->get(route('applications.index'));

    $response->assertStatus(200);

    $response->assertInertia(fn ($page) => $page->component('applications/application-index')
        ->has('applications')
    );
});

it('возвращает страницу Inertia с сообщением успеха на create', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    Session::start();
    Session::flash('success', 'Тестовое сообщение об успехе');

    $response = $this->get(route('applications.create'));

    $response->assertStatus(200);

    $response->assertInertia(fn ($page) => $page->component('applications/application-create')
        ->where('success', 'Тестовое сообщение об успехе')
    );
});

it('перенаправляет назад с сообщением статуса и текста на store', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $result = [
        'status' => 'success',
        'message' => 'Заявка успешно создана',
    ];

    $this->serviceMock
        ->shouldReceive('createFromRequest')
        ->once()
        ->andReturn($result);

    $response = $this->post(route('applications.store'), [
        'terminal' => 'Test Terminal',
        'inventory_key' => 'INV-123456',
        // Добавь остальные обязательные поля из ApplicationStoreRequest
    ]);

    $response->assertRedirect();

    $response->assertSessionHas($result['status'], $result['message']);
});
