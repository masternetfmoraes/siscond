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
        Schema::create('condominium_employees', function (Blueprint $table) {
            $table->id();
            $table->string('cod_user', 255)->unique();
            $table->string('cod_condominium', 255);
            //$table->foreign('cod_condominium',255)->references('cod_condominium')->on('condominiums');
            $table->string('job_title_employee', 60);
            $table->string('department_employee', 60);
            $table->string('status_employee', 60);
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('condominium_employees');
    }
};
