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
        Schema::create('administrators', function (Blueprint $table) {
            $table->id();
            $table->string('cod_administrator', 255)->unique();
            $table->string('cod_client', 255)->unique();
            $table->string('cnpj_administrator', 255)->unique();
            $table->string('name_administrator', 100);
            $table->string('state_administrator', 100);
            $table->string('city_administrator', 100);
            $table->string('district_administrator', 100);
            $table->string('zip_administrator', 14);
            $table->string('street_administrator', 100);
            $table->string('number_administrator', 30);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('administrators');
    }
};
