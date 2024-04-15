import React, { useState, useEffect } from 'react';

import { Head,useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

type EmployeescontactsTypes={
    codigo: string;
    usuario: string;
    id: string;
    cod_employee_contact: string;
    cod_user: string;
    phone_employee: string;
}
export default function EmployeeCardShowContact({codigo,usuario}:EmployeescontactsTypes){
    const [contact, setContact] = useState<EmployeescontactsTypes[]>([]);
    const [loading, setLoading] = useState(true); // Adicione um estado para rastrear o carregamento
    useEffect(() => {
        fetch(`/cardShowContact/${codigo}`) // Rota da API Laravel
          .then(response => response.json())
          .then(data => {
            setContact(data)
            setLoading(false); // Defina o estado de carregamento como falso após obter os dados
          })
          .catch(error =>{
            console.error('Error fetching employees:', error)
            setLoading(false); // Em caso de erro, defina o estado de carregamento como falso
          });
      }, [codigo]);
      const handlerClick=()=>{
            ''
      }
    return(
        <>
        {loading ? (
        // Exiba um indicador de carregamento enquanto os dados estão sendo buscados
        <div role="status" className="flex items-center justify-center py-12">
        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
    //
    ):(
        <div className="max-w-7xl mx-auto sm:px-6 mt-5 lg:px-8 space-y-6">
            <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <div className="flex justify-between">
                   <p className="text-2xl font-bold">Dados de contato</p>
                   <>
                   <a href={`../../formcadastracontato/${usuario}`} className="inline-flex px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white print:hidden">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <span className="px-3">Adicionar Contato</span>
                    </a>
                    
                   </>
                </div>
            
            <hr className='py-2' />
                {contact.length === 0 ? (
                    <div className="">
                       <div className="flex items-center shadow p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                        <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                            <span className="font-medium">Atenção!</span> Não existe dados de contato registrado para esse usuário.
                        </div>
                        </div>
                    </div>
                ):(
                <>
                {contact.map(contato=>(
                    <div key={contato.id}>
                        
                        <div className="flex justify-between p-2">
                        <p className=''> {contato.phone_employee === null ? (<span className='text-red-800'></span>): (<>{contato.phone_employee.replace(
                            /^(\d{2})(\d{4,5})(\d{4})$/,
                            '($1) $2-$3'
                            )}</>)}
                        </p>
                            <div className="flex">
                                <>
                                <div className="inline-flex rounded-md shadow-sm" role="group">
                                    {contato.phone_employee === null ? (
                                        <></>
                                    ):(<>
                                <a href={`../../formeditacontatofuncionario/${contato.cod_employee_contact}`} className="inline-flex px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white print:hidden">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"/>
                                </svg>
                                    <span className="px-3">Editar</span>
                                </a>

                                <button type="button" className="inline-flex px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-red-300 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white print:hidden">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                                </svg>
                                <span className="px-3">Apagar</span>
                                </button>
                                </>
                                )}
                                </div>
                                </>
                            </div>
                        </div>
                        <hr />
                    </div>
                ))}
                </>)}               
            </div>
        </div>
        )}
        </>
    )
}