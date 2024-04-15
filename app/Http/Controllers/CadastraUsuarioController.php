<?php

namespace App\Http\Controllers;

//
use App\Models\User;
use App\Models\Clients;
use App\Models\Condominiums;
//

use App\Models\CadastraUsuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CadastraUsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        return Inertia::render('Erro');
    }

    /**
     * Display the specified resource.
     */
    public function show(CadastraUsuario $cadastraUsuario)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CadastraUsuario $cadastraUsuario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CadastraUsuario $cadastraUsuario)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CadastraUsuario $cadastraUsuario)
    {
        //
    }
    public function formcreateuser(){
        return Inertia::render('FormCadastraUsuario');
    }
    public function formcadastrafuncionario(){
        $user = Auth::user();
        $codUser= $user->cod_user;
        $typeUser = $user->type_user;
        
        
        
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
                        return Inertia::render('FormCadastraFuncionario',['tipo'=>$tipo->type_condominium,'cnpj'=>$tipo->cnpj_condominium]);
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
