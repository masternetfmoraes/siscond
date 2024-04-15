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
use App\Models\EmployeeContacts;

class EmployeeContactController extends Controller
{
    //
    public function cardShowContact($coduser){
        //$contactUser= EmployeeContacts::all();
    
        $contactUser=EmployeeContacts::where('cod_user','=',$coduser)
        ->get();
        return response()->json($contactUser);
    }
    public function formCadastraContato($usuario){
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
        ->where('condominium_employees.cod_user', '=', $usuario)
        ->where('condominiums.cod_condominium','=',$verifica_logado->cod_condominium)
        ->select('users.*','condominiums.*','condominium_employees.*')
        ->distinct()
        ->first();
        //dd($employees);
        if($employees != null){
            //return Inertia::render('ProfileUser',['employees'=>$employees]);
            return Inertia::render('FormCadastroContatoFuncionario',['employees'=>$employees]);
        }else{
            return Inertia::render('Error/403');
        }
        //return Inertia::render('FormCadastroContatoFuncionario');
    }
    public function cadastraContatoFuncionario(Request $request){
        function generateCode($length) {
            $characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
            $code = '';
            $charactersLength = strlen($characters);
            
            for ($i = 0; $i < $length; $i++) {
                $code .= $characters[rand(0, $charactersLength - 1)];
            }
            
            return $code;
        }
        $GenerateCod = generateCode(18);
        $RecordContact = EmployeeContacts::create([
            'cod_employee_contact'=>$GenerateCod,
            'cod_user' =>$request->cod_user,
            'phone_employee' => $request->phone_employee,
            'email_employee' => $request->email_employee,
        ]);
        return Redirect::route('teste');
    }
    public function formEditaContatoFuncionario($usuario){
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
        ->join('employee_contacts','employee_contacts.cod_user','=','users.cod_user')
        ->where('users.type_user', '=', 'func')
        ->where('employee_contacts.cod_employee_contact', '=', $usuario)
        ->where('condominiums.cod_condominium','=',$verifica_logado->cod_condominium)
        ->select('users.*','condominiums.*','condominium_employees.*','employee_contacts.*')
        //->distinct()
        ->first();
        if($employees != null){
        return Inertia::render('FormEditaContatoFuncionario',['employees'=>$employees]);
        }else{
            return Inertia::render('Error/403');
        }
    }
}
