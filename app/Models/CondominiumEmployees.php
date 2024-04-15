<?php

namespace App\Models;

use App\Models\Condominiums;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CondominiumEmployees extends Model
{
    use HasFactory;
    protected $table = 'condominium_employees';
    protected $fillable = [
        'cod_user',
        'cod_condominium',
        'job_title_employee',
        'department_employee',
        'status_employee',
    ];
    //
    //
}
