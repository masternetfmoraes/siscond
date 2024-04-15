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
        Schema::create('employee_addresses', function (Blueprint $table) {
            $table->id();

            // Identificador único do endereço do funcionário
            $table->string('cod_employee_address');

            // Chave estrangeira relacionada ao usuário com nome personalizado
            //$table->foreignId('cod_user')->constrained('users', 'cod_user');
            $table->string('cod_user');
            // Informações sobre o endereço
            $table->string('state_employee_address', 100);
            $table->string('city_employee_address', 100);
            $table->string('neighborhood_employee_address', 100);
            $table->string('street_employee_address', 100);
            $table->string('postal_code_employee_address', 10);
            $table->string('number_employee_address')->nullable();

            // Informações adicionais sobre o endereço
            $table->string('ibge')->nullable();  // Código IBGE
            $table->string('gia')->nullable();   // Código GIA
            $table->string('area_code_employee_address')->nullable();
            $table->string('siafi')->nullable();  // Código SIAFI

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_address');
    }
};
