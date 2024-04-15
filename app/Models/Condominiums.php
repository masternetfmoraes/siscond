<?php

namespace App\Models;

use App\Models\User;
use App\Models\Clients;
use App\Models\CondominiumEmployees;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class Condominiums extends Model
{
    use HasFactory;
    protected $table = 'condominiums';
    protected $fillable = [
        'cod_condominium',
        'cod_client',
        'cnpj_condominium', 
        'name_condominium',
        'type_condominium',
        'state_condominium',
        'city_condominium',
        'district_condominium',
        'zip_condominium',
        'street_condominium',
        'number_condominium',
    ];
    //
   
    //
}
