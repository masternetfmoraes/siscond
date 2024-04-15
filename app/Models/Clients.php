<?php

namespace App\Models;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Clients extends Model
{
    use HasFactory;
    protected $table = 'clients';
    protected $fillable = [
        'cod_user',
        'cod_client',
        'type_client',
        'status_client',
    ];
    //
    public function user(): HasOne
    {
        //return $this->hasMany(User::class, 'cod_user');
        return $this->hasOne(User::class,'cod_user');
    }

    public function condominium()
    {
        return $this->belongsTo(Condominiums::class, 'cod_user');
    }
    //
}
