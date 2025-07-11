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
        Schema::create('wires', function (Blueprint $table) {
            $table->id();
            $table->string('wire_key')->unique();
            $table->string('description');
            $table->foreignId('wire_type_id')->constrained('wire_types')->onDelete('cascade');
            $table->decimal('cross_section', 4, 2);
            $table->foreignId('wire_color_id_1')->constrained('wire_colors')->onDelete('cascade');
            $table->foreignId('wire_color_id_2')->nullable()->constrained('wire_colors')->onDelete('cascade');
            $table->foreignId('wire_color_id_3')->nullable()->constrained('wire_colors')->onDelete('cascade');
            $table->foreignId('wire_color_id_4')->nullable()->constrained('wire_colors')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wires');
    }
};
