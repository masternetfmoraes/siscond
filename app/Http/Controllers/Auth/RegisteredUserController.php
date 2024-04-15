<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Clients;
use App\Models\Condominiums;
use App\Models\Administrators;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
//
use Illuminate\Database\Eloquent\Model;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'cnpj_condominium'=>'required|max:14|unique:'.Condominiums::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'type_client' => 'required|string|max:255',
        ],[
            'name.required'=>'Favor Adicionar Nome do Condominio',
            'email.required'=>'Email é obrigatório',
            'cnpj_condominium'=>'Já existe cliente cadastrado com esse CNPJ',
            'type_client.required'=>'Campo Necessário',
            'password.required'=>'É necessário digitar uma senha',
            'password.confirmed'=>'Os campos senha e confirmar senha não são iguais',
            'password.min'=>'A senha tem que ter ao menos 8 (oito) caracteres'
        ]);
        //
        if($request->type_client === null OR $request->name === null OR $request->email=== null OR $request->password === null
        OR $request->type_condominium ===null OR $request->type_client=== null OR $request->cnpj_condominium === null){
            return redirect(RouteServiceProvider::VAZIO);
            exit;
        }
        //
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
        $cod_user = generateCode(18);
        $cod_client = generateCode(18);
        $cod_condominium = generateCode(18);
        $cod_administrator = generateCode(18);
        //
        $validaUser = User::where('cod_user', [$cod_user])->first();
        $validaClient = Clients::where('cod_client',[$cod_client])->first();
        //
        if(!$validaUser AND !$validaClient){

            $user = User::create([
                'cod_user' =>$cod_user,
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'type_user'=> $request->type_client,
            ]);
            
            $clients = Clients::create([
                'cod_user' => $cod_user,
                'cod_client' => $cod_client,
                'type_client' => $request->type_client,
                'status_client' => 1
            ]);
            //inserecondominio
            switch ($request->type_client) {
                case "adm":
                  //administradora aqui
                  $adm = Administrators::create([
                    'cod_administrator' => $request->cnpj_condominium,
                    'cod_client' => $cod_client,
                    'cnpj_administrator' => $request->cnpj_condominium,
                    'name_administrator' => $request->name,
                    'state_administrator' => $request->state_condominium,
                    'city_administrator' => $request->city_condominium,
                    'district_administrator' => $request->district_condominium,
                    'zip_administrator' => $request->zip_condominium,
                    'street_administrator' => $request->street_condominium,
                    'number_administrator' => $request->number_condominium,
                    ]);
                  break;
                case "condo":
                  //Condominio Aqui
                  $condo = Condominiums::create([
                    'cod_condominium' => $request->cnpj_condominium,
                    'cod_client' => $cod_client,
                    'cnpj_condominium' => $request->cnpj_condominium,
                    'name_condominium' => $request->name,
                    'type_condominium' => $request->type_condominium,
                    'state_condominium' => $request->state_condominium,
                    'city_condominium' => $request->city_condominium,
                    'district_condominium' => $request->district_condominium,
                    'zip_condominium' => $request->zip_condominium,
                    'street_condominium' => $request->street_condominium,
                    'number_condominium' => $request->number_condominium,
                ]);
                  break;
                default:
                return redirect(RouteServiceProvider::ERRO);
              }
            //
            event(new Registered($user));

            //Auth::login($user);
            return redirect(RouteServiceProvider::HOME);
        }else{
            return redirect(RouteServiceProvider::ERRO);
        }
        
    }
    //
    public function storeUser(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'type_user' => 'required|string|max:255',
        ]);
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
        $cod_user = generateCode(18);
        $cod_client = generateCode(18);
        $validaUser = User::where('cod_user', [$cod_user])->first();
        $validaClient = Clients::where('cod_client',[$cod_client])->first();
        if($request->type_user === null OR $request->name === null OR $request->email=== null OR $request->password === null){
            return redirect(RouteServiceProvider::VAZIO);
            exit;
        }
        if(!$validaUser AND !$validaClient){

            $user = User::create([
                'cod_user' =>$cod_user,
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'type_user' => $request->type_user,
            ]);
            
            //
            event(new Registered($user));

            //Auth::login($user);
            return redirect(RouteServiceProvider::HOME);
        }else{
            return redirect(RouteServiceProvider::ERRO);
        }
    }
}
