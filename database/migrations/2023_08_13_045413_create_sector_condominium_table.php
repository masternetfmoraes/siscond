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
        Schema::create('sector_condominium', function (Blueprint $table) {
            $table->id();
            $table->string('cod_condominium');
            $table->string('cod_sector_condominium');
            $table->string('name_sector_condominium');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sector_condominium');
    }
};
