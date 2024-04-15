<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('users')->insert([
            'cod_user' => 'user123',
            'name' => 'Condominio Esperanca',
            'email' => 'usuario@example.com',
            'password' => Hash::make('senha123'),
            'type_user'=>'master',
            'email_verified_at' => now(),
            'status_user' => 1,
            'remember_token' => Str::random(10),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        DB::table('users')->insert([
            'cod_user' => 'user124',
            'name' => 'Imobiliara Fortuna',
            'email' => 'usuario2@example.com',
            'password' => Hash::make('senha321'),
            'type_user'=>'master',
            'email_verified_at' => now(),
            'status_user' => 1,
            'remember_token' => Str::random(10),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
