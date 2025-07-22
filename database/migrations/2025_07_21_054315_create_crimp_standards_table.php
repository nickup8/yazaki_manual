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
        Schema::create('crimp_standards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('terminal_id')->constrained('terminals')->onDelete('cascade');
            $table->foreignId('seal_id')->nullable()->constrained('seals')->onDelete('cascade');
            $table->string('type_code_wire_1');
            $table->string('size_code_wire_1');
            $table->string('type_code_wire_2')->nullable();
            $table->string('size_code_wire_2')->nullable();
            $table->foreignId('wire_type_id_1')->constrained('wire_types')->onDelete('cascade');
            $table->decimal('cross_section_wire_1', 4, 2);
            $table->foreignId('wire_type_id_2')->nullable()->constrained('wire_types')->onDelete('cascade');
            $table->decimal('cross_section_wire_2', 4, 2)->nullable();
            $table->decimal('strip_length', 4, 2);
            $table->decimal('str_tolerance', 4, 2);
            $table->decimal('conductor_crimp_height', 4, 2);
            $table->decimal('conductor_crimp_height_tolerance', 4, 2);
            $table->decimal('isolation_crimp_height', 4, 2);
            $table->decimal('isolation_crimp_height_tolerance', 4, 2);
            $table->decimal('conductor_crimp_width_min', 4, 2);
            $table->decimal('conductor_crimp_width_max', 4, 2);
            $table->decimal('isolation_crimp_width_min', 4, 2);
            $table->decimal('isolation_crimp_width_max', 4, 2);
            $table->integer('separation_force_wire_1');
            $table->integer('separation_force_wire_2')->nullable();
            $table->string('customer_code');
            $table->string('placement')->nullable();
            $table->timestamps();

            $table->unique(['terminal_id', 'seal_id', 'type_code_wire_1', 'size_code_wire_1', 'type_code_wire_2', 'size_code_wire_2', 'wire_type_id_1', 'wire_type_id_2', 'customer_code'], 'unique_crimp_standards');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crimp_standards');
    }
};
