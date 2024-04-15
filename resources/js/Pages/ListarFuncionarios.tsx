import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
//
import CondominiumEmployeeList from './CondominiumEmployeeList';

export default function ListarFuncionarios({ auth,cnpj, mustVerifyEmail, status,coduser }: PageProps){
    return(
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Listar Funcionários</h2>}
        >
            <Head title="Listar funcionários" />
            <div className="max-w-7xl mx-auto sm:px-6 mt-5 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <div className="flex justify-between">
                        <p className="text-2xl font-bold">Listar Funcionários</p>
                        <div className="t">
                            <>
                            <div className="inline-flex rounded-md shadow-sm" role="group">
                            <a href="/formcadastrafuncionario" className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                                Adicionar
                            </a>
                            </div>
                            </>
                        </div>
                    </div>
                  
                  <CondominiumEmployeeList codigo={cnpj as string} id='' name='' cod_user='' job_title_employee='' /> 
                </div>
            </div>
            </AuthenticatedLayout> 
    )
}