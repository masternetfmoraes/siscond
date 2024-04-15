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
        Schema::create('condominiums', function (Blueprint $table) {
            $table->id();
            $table->string('cod_condominium', 255)->unique();
            $table->string('cod_client', 255)->unique();
            $table->string('cnpj_condominium', 255)->unique();
            $table->string('name_condominium', 100);
            $table->string('type_condominium', 100);
            $table->string('state_condominium', 100);
            $table->string('city_condominium', 100);
            $table->string('district_condominium', 100);
            $table->string('zip_condominium', 14);
            $table->string('street_condominium', 100);
            $table->string('number_condominium', 30);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('condominiums');
    }
};
