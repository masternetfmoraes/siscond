<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeAddresses extends Model
{
    use HasFactory;
    protected $table = 'employee_addresses';
    protected $fillable = [
        'cod_employee_address',
        'cod_employee_address',
        'cod_user',
        'state_employee_address',
        'city_employee_address',
        'neighborhood_employee_address',
        'street_employee_address',
        'postal_code_employee_address',
        'number_employee_address',
        'ibge',
        'gia',
        'area_code_employee_address',
        'siafi',
    ];
}
