<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Http\Controllers\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

//
use App\Models\User;
use App\Models\Clients;
use App\Models\Condominiums;
use App\Models\CondominiumEmployees;
use App\Models\EmployeeContact;


class HoleriteController extends Controller
{
    //
    public function formCadastraHolerite($coduser){
        $userauth = Auth::user();
        //
        $verifica_logado = User::join('clients','clients.cod_user','=','users.cod_user')
        ->join('condominiums','condominiums.cod_client','=','clients.cod_client')
        ->where('users.cod_user','=',Auth::user()->cod_user)
        ->select('users.*','clients.*','condominiums.*')
        ->first();
        //fazer a verificação do db com o logado
        //
        $employees = CondominiumEmployees::join('condominiums', 'condominiums.cod_condominium', '=', 'condominium_employees.cod_condominium')
        ->join('users', 'users.cod_user', '=', 'condominium_employees.cod_user') // Certifique-se de que está relacionando os usuários corretamente
        ->where('users.type_user', '=', 'func')
        ->where('condominium_employees.cod_user', '=', $coduser)
        ->where('condominiums.cod_condominium','=',$verifica_logado->cod_condominium)
        ->select('users.*','condominiums.*','condominium_employees.*')
        ->distinct()
        ->first();
        //dd($employees);
       
        if($employees != null){
        return Inertia::render('FormCadastraHolerite',['employees'=>$employees]);
        }else{
            return Inertia::render('Error/403');
        }
    }
    public function cadastraHolerite(Request $request){
        dd($request);
    }
}
