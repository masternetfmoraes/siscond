<?php

namespace App\Http\Controllers;

//
use App\Models\User;
use App\Models\Clients;
use App\Models\Condominiums;
use App\Models\CondominiumEmployees;
use App\Models\EmployeeContact;
//

use App\Http\Controllers\RedirectResponse;

//
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CondominiumEmployeesController extends Controller
{
    //

    public function formcadastrafuncionario(){
        $userauth = Auth::user();
        $codUser= $userauth->cod_user;
        $typeUser = $userauth->type_user;
        
        
        
        //
        switch($typeUser){
            case "adm":
                //return Inertia::render('Dashboard');
                return Redirect::route('dashboard');
            break;
            case "condo":
                $codClient= Clients::where('cod_user', $codUser)->first();
                //
                $checkUser = User::join('clients','clients.cod_user','=','users.cod_user')
                ->join('condominiums','condominiums.cod_client','clients.cod_client')
                //->join('condominium_employees','condominiums.cod_condominium','condominium_employees.cod_condominium')
                ->where('users.cod_user',$codUser)
                ->get();
                    foreach($checkUser as $tipo){
                        return Inertia::render('FormCadastraFuncionario',['tipo'=>$tipo->type_condominium,'cnpj'=>$tipo->cnpj_condominium]);
                    }
            break;
            case "Mor":
                //return Inertia::render('DashboardResidents');
                return Redirect::route('dashboard');
            break;
            default:
            return "Opção Não aceita";
        }
    }

    public function cadastrafuncionario(Request $request)
    {   
        //return Redirect::route('dashboard');
        
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            //'type_client' => 'required|string|max:255',
            'department_employee'=>'required|string|max:255',
            'job_title_employee'=>'required|string|max:255',
        ],[
            'name.required'=>'Campo nome é obrigatório',
            'email.required'=>'Email é obrigatório',
            'department_employee'=>'Favor preencher o departamento',
            'job_title_employee'=>'É necessário preencher a função',
            'password.required'=>'É necessário digitar uma senha',
            'password.confirmed'=>'Os campos senha e confirmar senha não são iguais',
            'password.min'=>'A senha tem que ter ao menos 8 (oito) caracteres'
        ]);
        
        $user = Auth::user();
        $codUserAuth= $user->cod_user;
         //
         function generateCode($length) {
            $characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
            $code = '';
            $charactersLength = strlen($characters);
            
            for ($i = 0; $i < $length; $i++) {
                $code .= $characters[rand(0, $charactersLength - 1)];
            }
            
            return $code;
        } 
        $GenerateCodUser = generateCode(18);
        $user = User::create([
            'cod_user' =>$GenerateCodUser,
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'type_user'=>'func',
        ]);
        $condominiumemployee= CondominiumEmployees::create([
            'cod_user'=>$GenerateCodUser,
            'cod_condominium'=>$request->cod_condominium,
            'job_title_employee'=>$request->job_title_employee,
            'department_employee'=>$request->department_employee,
            'status_employee'=>'1',
        ]);
        
        return Redirect::route('teste');
    }
    public function employeeList($cnpj){
        //$user = Auth::user();
        //$codUserAuth= $user->cod_user;
        //$employees = CondominiumEmployees::all();
        
        $employees = CondominiumEmployees::join('condominiums', 'condominiums.cod_condominium', '=', 'condominium_employees.cod_condominium')
        ->join('users', 'users.cod_user', '=', 'condominium_employees.cod_user') // Certifique-se de que está relacionando os usuários corretamente
        ->where('users.type_user', '=', 'func')
        ->where('condominium_employees.cod_condominium', '=', $cnpj)
        ->distinct()
        //->limit(2)
        ->get();
       
        if (!$employees) {
            //return response()->json(['message' => 'Condominium not found'], 404);
            $erro = "Condominium not found";
            return response()->json(['error' => $erro], 404);
        }else{
        return response()->json($employees);
        }
    }
    public function profileUser($coduser){
        $userauth = Auth::user();
        //
        $verifica_logado = User::join('clients','clients.cod_user','=','users.cod_user')
        ->join('condominiums','condominiums.cod_client','=','clients.cod_client')
        ->where('users.cod_user','=',Auth::user()->cod_user)
        ->where('clients.status_client','=','1')
        ->select('users.*','clients.*','condominiums.*')
        ->first();
        //fazer a verificação do db com o logado
        //agora verifica se ostatus_client está ativo
        if($verifica_logado === null){
            return "Cliente não Liberado";
            exit;
        }
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
            return Inertia::render('ProfileUser',['employees'=>$employees]);
        }else{
            return Inertia::render('Error/403');
        }
    }
    //
    public function listarFuncionarios(){
        $userauth = Auth::user();
        //
        $verifica_logado = User::join('clients','clients.cod_user','=','users.cod_user')
        ->join('condominiums','condominiums.cod_client','=','clients.cod_client')
        ->where('users.cod_user','=',Auth::user()->cod_user)
        ->where('clients.status_client','=','1')
        ->select('users.*','clients.*','condominiums.*')
        ->first();
        //fazer a verificação do db com o logado
        //agora verifica se ostatus_client está ativo
        if($verifica_logado === null){
            return "Cliente não Liberado";
            exit;
        }
        $employees = CondominiumEmployees::join('condominiums', 'condominiums.cod_condominium', '=', 'condominium_employees.cod_condominium')
        ->join('users', 'users.cod_user', '=', 'condominium_employees.cod_user') // Certifique-se de que está relacionando os usuários corretamente
        ->where('users.type_user', '=', 'func')
        //->where('condominium_employees.cod_user', '=', $coduser)
        ->where('condominiums.cod_condominium','=',$verifica_logado->cod_condominium)
        ->select('users.*','condominiums.*','condominium_employees.*')
        ->distinct()
        ->get();
        return Inertia::render('ListarFuncionarios',['employees'=>$employees,'cnpj'=>$verifica_logado->cod_condominium]);
        //dd($employees);
    }
}
