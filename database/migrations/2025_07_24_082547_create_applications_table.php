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
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('terminal_id')->constrained('terminals')->onDelete('cascade');
            $table->string('inventory_key_application');
            $table->string('location')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->unique(['terminal_id', 'inventory_key_application']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
