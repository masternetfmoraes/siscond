<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Administrators extends Model
{
    use HasFactory;
    protected $table = 'administrators';
    protected $fillable = [
        'cod_administrator',
        'cod_client',
        'cnpj_administrator',
        'name_administrator',
        'state_administrator',
        'city_administrator',
        'district_administrator',
        'zip_administrator',
        'street_administrator',
        'number_administrator',
    ];
}
