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
        Schema::create('leadsets', function (Blueprint $table) {
            $table->id();
            $table->string('leadset')->unique();   // Leadset (например S001123721)
            $table->integer('prod_version');       // ProdVersion
            $table->text('description');           // Description
            $table->string('vendor_code')->nullable(); // VendorCode
            $table->string('cable_class')->nullable(); // CableClass
            $table->integer('batch_size')->nullable(); // BatchSize
            $table->decimal('plan_time_batch', 8, 2)->nullable(); // PlanTimeBatch
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leadsets');
    }
};
