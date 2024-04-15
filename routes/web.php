<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CadastraUsuarioController;
use App\Http\Controllers\CondominiumEmployeesController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmployeeContactController;
use App\Http\Controllers\HoleriteController;
use App\Http\Controllers\EmployeeAddressesController;
//
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard',[DashboardController::class,'Dashboard'])->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/erro',function(){
    return Inertia::render('Erro');
})->name('erro');

Route::get('/vazio',function(){
    return Inertia::render('Vazio');
})->name('vazio');

Route::get('/adm',function(){
    return Inertia::render('Adm');
})->name('adm');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

//
Route::get('/formcadastrafuncionario',[CondominiumEmployeesController::class,'formcadastrafuncionario'])->middleware(['auth', 'verified'])->name('formcadastrafuncionario');
Route::get('/formcadastrauser',[CadastraUsuarioController::class,'formcreateuser'])->middleware(['auth', 'verified'])->name('formcadastrauser');
Route::post('/cadastrafuncionario',[CondominiumEmployeesController::class,'cadastrafuncionario'])->middleware(['auth', 'verified'])->name('cadastrafuncionario');
Route::get('/listarfuncionarios',[CondominiumEmployeesController::class,'listarFuncionarios'])->middleware(['auth', 'verified'])->name('listarfuncionarios');


Route::post('/cadastrauser',[RegisteredUserController::class, 'storeUser'])->middleware(['auth', 'verified'])->name('cadastrauser');
Route::get('/profileuser/{coduser}',[CondominiumEmployeesController::class,'ProfileUser'])->middleware(['auth', 'verified'])->name('profileuser');
//api components
Route::get('/employeeList/{cnpj}',[CondominiumEmployeesController::class,'employeeList'])->middleware(['auth', 'verified'])->name('employeeList');
Route::get('/cardShowContact/{coduser}',[EmployeeContactController::class,'cardShowContact'])->middleware(['auth', 'verified'])->name('cardShowContact');
Route::get('/formcadastracontato/{usuario}',[EmployeeContactController::class,'formCadastraContato'])->middleware(['auth', 'verified'])->name('formcadastracontato');
Route::post('/cadastracontatofuncionario',[EmployeeContactController::class,'cadastraContatoFuncionario'])->middleware(['auth', 'verified'])->name('cadastracontatofuncionario');
Route::get('/formeditacontatofuncionario/{usuario}',[EmployeeContactController::class,'formEditaContatoFuncionario'])->middleware(['auth', 'verified'])->name('formeditacontatofuncionario');
//Endereço
Route::get('/cardshowaddressemployee/{coduser}',[EmployeeAddressesController::class,'cardShowAddresEmployee'])->middleware(['auth', 'verified'])->name('cardshowaddressemployee');
Route::get('/formcadastrarenderecofuncionario/{coduser}',[EmployeeAddressesController::class,'formCadastrarEnderecoFuncionario'])->middleware(['auth', 'verified'])->name('formcadastrarenderecofuncionario');
//holerite
Route::get('/formcadastraholerite/{coduser}',[HoleriteController::class,'formCadastraHolerite'])->middleware(['auth', 'verified'])->name('formcadastraholerite');
Route::post('/cadastraholerite',[HoleriteController::class,'cadastraHolerite'])->middleware(['auth', 'verified'])->name('cadastraholerite');
//Apartamentos
Route::get('/listarapartamentos',function(){
    return Inertia::render('Estrutura/Apartamentos/ListarApartamentos');
})->middleware(['auth', 'verified'])->name('listarapartamentos');
Route::get('/dashboardapartamentos',function(){
    return Inertia::render('Estrutura/Apartamentos/DashboardApartamentos');
})->middleware(['auth', 'verified'])->name('dashboardapartamentos');
require __DIR__.'/auth.php';
