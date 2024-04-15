import React, { useState,useEffect, FormEventHandler } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,  Link, useForm  } from '@inertiajs/react';
import { PageProps } from '@/types';
//
import InputMask from 'react-input-mask';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { profile } from 'console';


    interface Employee {
        cod_user: string;
        // Add other properties if needed
    }
    interface Address {
        uf: string;
        localidade:string;
        logradouro: string;
        cep: string;
        bairro: string;
        // outras propriedades...
    }
export default function FormCadastroContatoFuncionario({ auth, tipo, cnpj, employees }: PageProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
      phone_employee: '',
      email_employee: '',
      cod_user: (employees as Employee).cod_user,
    });
    const [error,setError]:any = useState()
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (data.phone_employee.length >= 1) {
            // Verifica se o número de telefone está no formato correto
            const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
            if (!phoneRegex.test(data.phone_employee)) {
                setError("O número de telefone está em um formato inválido");
                return;
            }
        } else {
            setError("Necessita preencher o telefone");
            return;
        }
        
        // Restante do código
        post(route('cadastracontatofuncionario'));
    };
        useState(()=>{
            setError('')
        })
    return(
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{auth.user.name}</h2>}
        >
            <Head title={`Cadastrar contato funcionário`} />
            <>
            <nav className="flex px-5 py-3 mt-5 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                <a href="../dashboard" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                    <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                    </svg>
                    Home
                </a>
                </li>
                <li aria-current="page">
                <div className="flex items-center">
                    <svg className="w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <a href={`../profileuser/${(employees as Employee).cod_user}`} className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                     Detalhes do Funcionário
                    </a>
                </div>
                </li>
                <li aria-current="page">
                <div className="flex items-center">
                    <svg className="w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Adicionar contato do funcionário</span>
                </div>
                </li>
            </ol>
            </nav>
            </>
            <div className="max-w-7xl mx-auto sm:px-6 mt-5 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <p className="text-2xl font-bold">Cadastrar contato do funcionário</p>
                    <hr className='py-2' />
                    <form onSubmit={submit}>
                    <div className="mt-4">
                        <InputLabel htmlFor="telefone" value="Telefone" />
                            <InputMask
                            mask="(99) 99999-9999"
                            id="phone_employee"
                            type="text"
                            name="phone_employee"
                            value={data.phone_employee}
                            onChange={(e) => setData('phone_employee', e.target.value)}
                            className="mt-1 border border-gray-300 block w-full " />
                            <p className="text-center font-bold text-red-800">{error}</p>
                    </div>
                    <div className="flex justify-between">
                    <a href="/dashboard" className="inline-flex items-center px-4 py-2 hover:text-white bg-yellow-300 border border-transparent rounded-md font-semibold text-xs text-gray-800 uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 undefined ml-4 mt-5">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <span className="px-3">Cancelar</span>    
                        </a>
                    <PrimaryButton className="ml-4 mt-5">
                    <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z"/>
                    </svg>  <span className="px-3">Cadastrar</span>
                    </PrimaryButton>
                    </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}