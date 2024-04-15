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

use App\Models\EmployeeAddresses;
use App\Models\User;
use App\Models\Clients;
use App\Models\Condominiums;
use App\Models\CondominiumEmployees;
use App\Models\EmployeeContacts;


class EmployeeAddressesController extends Controller
{
    //
    public function cardShowAddresEmployee($coduser){
        $userauth = Auth::user();
        //$AddressEmployee = EmployeeAddresses::all();
        $AddressEmployee = EmployeeAddresses::where('cod_user','=',$coduser)
        ->get();
        return response()->json($AddressEmployee);
    }
    public function formCadastrarEnderecoFuncionario($coduser){
        $user = Auth::user();
        $codUser= $user->cod_user;
        $typeUser = $user->type_user;
        $userauth = Auth::user();
        //
        switch($typeUser){
            case "adm":
                return Inertia::render('Dashboard');
            break;
            case "condo":
                $codClient= Clients::where('cod_user', $codUser)->first();
                //
                $checkUser = User::join('clients', 'users.cod_user', '=', 'clients.cod_user')
                ->join('condominiums', 'clients.cod_client', '=', 'condominiums.cod_client')
                ->select('users.*', 'clients.*', 'condominiums.*')
                ->whereColumn('clients.cod_client', 'condominiums.cod_client')
                ->where('clients.cod_client', $codClient->cod_client)
                ->get();
                    foreach($checkUser as $tipo){
                        return Inertia::render('FormCadastrarEnderecoFuncionario',['employees'=>$coduser]);
                    }
                    break;
            case "Mor":
                return Inertia::render('DashboardResidents');
            break;
            default:
            return "Opção Não aceita";
        }
    }
}
