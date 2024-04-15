import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Profile/Partials/DeleteUserForm';
import UpdatePasswordForm from './Profile/Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Profile/Partials/UpdateProfileInformationForm';
import { Head,useForm, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import EmployeeCardShowContact from './component/EmployeeCardShowContact';
import EmployeeCardShowAddress from './component/EmployeeCardShowAddress';

export default function Edit({ auth }: PageProps<{ mustVerifyEmail: boolean, status?: string }>) {
    const user = usePage<PageProps | any>().props.employees;
    const [loading, setLoading] = useState(true); // Adicione um estado para rastrear o carregamento
    const { data } = useForm({
        cod_user: user.cod_user,
        name: user.name,
        email: user.email,
        job_title_employee: user.job_title_employee,
        department_employee: user.department_employee,
        created_at: user.created_at,
    });
    const [item,setItem] =useState<string | undefined>();
    const timestamp = data.created_at;
    // Extrair o ano, mês e dia do timestamp
    const year = timestamp.substr(0, 4);
    const month = timestamp.substr(5, 2);
    const day = timestamp.substr(8, 2);
    // Formatar a data no formato desejado
    const formattedDate = `${day}/${month}/${year}`;
    
    useEffect(()=>{
        setLoading(false)
        //
        const url = window.location.href;
        const partesDaURL = url.split('/');
        const ultimoItem = partesDaURL[partesDaURL.length - 1];
        setItem(ultimoItem)
        //
    })
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detalhes do funcionário</h2>}
        >
            <Head title="Detalhes do funcionário" />
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
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Detalhes do Funcionário</span>
                </div>
                </li>
            </ol>
            </nav>
            </>
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
        ) : (
            <div className="t">
                <div className="py-3 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <a href={`../../formcadastracontato/${user.cod_user}`} className="inline-flex px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white print:hidden">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <span className="px-3">Adicionar Contato</span>
                    </a>
                    <a href={`../formcadastraholerite/${user.cod_user}`} className="inline-flex px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white print:hidden">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <span className="px-3">Adicionar Holerite</span>
                    </a>
                    </div>
                </div>
            <div className="py-1">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <p className="text-2xl font-bold">Detalhes do Funcionário</p>
                        <hr className='py-2' />
                        <div className="flex justify-between">
                        <p className="text-base">Nome: {data.name}</p>
                        <p className="t">Cadastrado: {formattedDate}</p>
                        </div>
                        
                        <p className="t">Setor: {data.department_employee}</p>
                        <p className="t">Função: {data.job_title_employee}</p>
                        
                    </div>
                </div>
               
                <EmployeeCardShowContact codigo={data.cod_user as string} usuario='' id='' cod_employee_contact='' cod_user='' phone_employee='' />
                <EmployeeCardShowAddress codigo={data.cod_user as string} usuario='' street_employee_address='' number_employee_address='' 
                neighborhood_employee_address='' postal_code_employee_address='' city_employee_address='' state_employee_address='' cod_user='' />
            </div>
            </div>
        )}
            <p>Autenticação</p>
        </AuthenticatedLayout>
    );
}
