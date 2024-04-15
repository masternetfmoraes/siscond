<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmployeeContacts extends Model
{
    use HasFactory;
    protected $table = 'employee_contacts';
    protected $fillable = [
        'cod_employee_contact',
        'cod_user',
        'phone_employee',
    ];
}
