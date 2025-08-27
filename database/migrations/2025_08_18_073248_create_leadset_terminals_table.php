<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('leadset_terminals', function (Blueprint $table) {
    $table->id();
    $table->foreignId('leadset_id')->constrained()->cascadeOnDelete();
    $table->foreignId('terminal_id')->nullable()->constrained()->nullOnDelete(); // <- nullable для null
    $table->decimal('part_strip_length', 8, 2)->nullable();
    $table->text('note')->nullable();
    $table->integer('position')->nullable();
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leadset_terminals');
    }
};
