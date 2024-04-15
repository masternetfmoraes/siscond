import React, { useState,useEffect, FormEventHandler } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,  Link, useForm  } from '@inertiajs/react';
import { PageProps } from '@/types';
import SideMenu from './component/SideMenu';
import "./component/test.css"
import Main from './component/Main';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import Select from '@/Components/Select';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
export default function Dashboard({ auth,tipo,cnpj }: PageProps) {
    //
    const options = [
        { label: '-----------------',value:'' },
        { label: 'Contador', value: 'contador' },
        { label: 'Faxineiro', value: 'faxineiro' },
        { label: 'Porteiro', value: 'porteiro' },
        { label: 'Segurança', value: 'seguranca' },
      ];
    
      //const [selectedOption, setSelectedOption] = useState(options[0].value);
      const { data, setData, post, processing, errors, reset} = useForm({
        name: '',
        email: '',
        password: '',
        type_client:'',
        type_user:'',
        job_title_employee: '',
        department_employee: '',
        cod_condominium:cnpj,
        password_confirmation: '',
        });
        useEffect(() => {
            return () => {
                reset('password', 'password_confirmation');
            };
        }, []);

    
      const handleSelectChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedOption(event.target.value);
      };  
      
      const submit: FormEventHandler = (e) => {
        e.preventDefault();
        
        post(route('cadastrafuncionario'));
    };
    //onChange={handleSelectChange}
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{auth.user.name}</h2>}
        >
            <Head title={`Cadastrar Funcionário`} />
            <>
            <nav className="flex px-5 py-3 mt-5 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                <a href="dashboard" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
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
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Cadastrar Funcionário</span>
                </div>
                </li>
            </ol>
            </nav>
            </>
                <form onSubmit={submit} className='flex w-full'>
                    <div className="w-full p-12 m-5 bg-white shadow rounded">
                    <p className="text-2xl ">Cadastrar Funcionário </p>
                        <div className="mt-4">
                            <TextInput 
                            id="cod_condominium"
                            type="hidden"
                            name="cod_condominium"
                            value={data.cod_condominium as string}
                            onChange={(e) => setData('cod_condominium', e.target.value)}
                            className="mt-1 border border-gray-300 block w-full" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="name" value="Nome" />
                            <TextInput 
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 border border-gray-300 block w-full" />
                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput 
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="mt-1 border border-gray-300 block w-full"
                             />
                             <InputError message={errors.email} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="type_user" value="Tipo de Usuario" />
                            <Select name="type_user" id="type_user"
                            options={options}
                            value={data.type_user}
                            onChange={(e: { target: { value: string; }; }) => setData('type_user', e.target.value)}
                            className="mt-1 border border-gray-300 block w-full"
                             />
                             <InputError message={errors.type_user} className="mt-2" />
                            <p>Opção selecionada: {data.type_user}</p>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="job_title_employee" value="Função" />
                            <TextInput 
                            id="job_title_employee"
                            type="text"
                            name="job_title_employee"
                            value={data.job_title_employee}
                            onChange={(e) => setData('job_title_employee', e.target.value)}
                            className="mt-1 border border-gray-300 block w-full"
                             />
                             <InputError message={errors.job_title_employee} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="department_employee" value="Departamento" />
                            <TextInput 
                            id="department_employee"
                            type="text"
                            name="department_employee"
                            value={data.department_employee}
                            onChange={(e) => setData('department_employee', e.target.value)}
                            className="mt-1 border border-gray-300 block w-full"
                             />
                             <InputError message={errors.department_employee} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Senha" />
                            <TextInput 
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 border border-gray-300 block w-full"
                             />
                             <InputError message={errors.password} className="mt-2" />
                        </div>
                        <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                       
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>
                        <PrimaryButton className="ml-4 mt-5">
                            Cadastrar
                        </PrimaryButton>
                    </div>
                </form>
        </AuthenticatedLayout>
    );
}
function setSelectedOption(value: React.SetStateAction<string>) {
    throw new Error('Function not implemented.');
}

