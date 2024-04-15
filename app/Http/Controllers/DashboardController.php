<?php

namespace App\Http\Controllers;

//
use App\Models\User;
use App\Models\Clients;
use App\Models\Condominiums;
use App\Models\CondominiumEmployees;
//

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function Dashboard(Request $request){
        /*
        $user = Auth::user();
        $codUser= $user->cod_user;
        $typeUser = $user->type_user;
        */
        $userauth = Auth::user();
        $codUser= $userauth->cod_user;
        //return Inertia::render('DashboardResidents');
        //
        //$client = Clients::find(1);
        //$client = Clients::where('cod_user','imev310cqs1gic5cdk')->first();
        //$user = User::find(1);
        /*
        $user = User::where('cod_user',$codUser)
        ->first();
        $client = $user->client;
        */
        /*
        $client = User::join('clients','clients.cod_user','=','users.cod_user')
        ->join('condominiums','condominiums.cod_client','clients.cod_client')
        //->join('condominium_employees','condominiums.cod_condominium','condominium_employees.cod_condominium')
        ->where('users.cod_user',$codUser)
        ->get();
        */
        //dd($client);

        //return Inertia::render('DashboardCondominium');
    
        switch($userauth->type_user){
            case "adm":
                return Inertia::render('Dashboard');
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
                        
                        return Inertia::render('DashboardCondominium',[
                            'tipo'=>$tipo->type_condominium,
                            'cnpj'=>$tipo->cnpj_condominium,
                            'funcionario'=>$tipo->cod_condominium
                        ]);
                        
                    }
            break;
            case "Mor":
                return Inertia::render('DashboardResidents');
            break;
            case "func":
                return Inertia::render('DashboardResidents');
            break;
            default:
            return "Opção Não aceita !!";
        }
    }
}
