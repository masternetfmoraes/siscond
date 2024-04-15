import React, { useState,useEffect, FormEventHandler,SetStateAction  } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,  Link, useForm  } from '@inertiajs/react';
import { PageProps } from '@/types';
import axios from 'axios';
//
import InputMask from 'react-input-mask';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import Select from '@/Components/Select';
interface Address {
    uf: string;
    localidade:string;
    logradouro: string;
    cep: string;
    bairro: string;
    // outras propriedades...
  }
export default function FormCadastrarEnderecoFuncionario({ auth,tipo,cnpj, employees }: PageProps){
    const [loading , setLoading]=useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        postal_code_employee_address: '',
        city_condominium: '',
        district_condominium: '',
        zip_condominium: '',
        state_condominium:'',
        street_condominium:'',
    });
    const [cep, setCep] = useState('');
    const [address, setAddress ] =useState<Address | null>({ uf: '',localidade:'',logradouro:'',cep:'',bairro:'' , });
    const [error, setError] = useState<null | string>(null);
    
    const handleCepChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setCep(event.target.value);
        //setTimeout(handleSearch, 5000);
    };
    
    const handleSearch = async () => {
        setIsLoading(true);

        try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.data.erro) {
            setAddress(null);
            setError('CEP não encontrado. Verifique o CEP e tente novamente.');
        } else {
            setAddress(response.data);
            setError(null);
            
        }
        } catch (error) {
        console.error('Erro ao buscar CEP', error);
        setAddress(null);
        setError('Erro ao buscar CEP. Tente novamente mais tarde.');
        } finally {
        setIsLoading(false);
        }
    };

    
    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false)
        },100)
    })

    const submitHandle=()=>{
        alert('enviado')
    }
    return (
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
                    <a href={`/profileuser/${employees}`} className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                     Detalhes do Funcionário
                    </a>
                </div>
                </li>
                <li aria-current="page">
                <div className="flex items-center">
                    <svg className="w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Adicionar endereço do funcionário</span>
                </div>
                </li>
            </ol>
            </nav>
            </>
            {loading ? (<>
                        <div role="status" className="flex items-center justify-center py-12">
                        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
            </>):(<>
            <form onSubmit={submitHandle}>
            <div className="max-w-7xl mx-auto sm:px-6 mt-5 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <p className="text-2xl font-bold">Cadastrar endereço do funcionário</p>
                    <div className="mt-4">
                        <InputLabel htmlFor="name" value="CEP" />
                        <TextInput 
                            id="postal_code_employee_address"
                            name="postal_code_employee_address"
                            className="mt-1 block w-full"
                            autoComplete="cep"
                            isFocused={true}
                            value={cep}
                            onChange={handleCepChange}
                            maxLength={8}
                            required
                        />
                    </div>
                    <a 
                    className="cursor-pointer mt-3 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2" 
                    onClick={handleSearch}>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        <span className="px-2">Buscar CEP</span>
                    </a>
                    {isLoading && <>
                        <div role="status" className="flex items-center justify-center py-12">
                        <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    </>}
                {error && <p style={{ color: 'red' }}>{error}</p>}     
                         
                {
                address && !error && (<>
                {address.uf &&(<>
                <div className="mt-4">
                    <InputLabel htmlFor="state_condominium" value="Estado" />
                    <Select
                        name="state_condominium"
                        id="state_condominium"
                        options={[{label:address.uf,value:address.uf}]}
                        value={data.state_condominium}
                        onChange={(e: { target: { value: string; }; }) => setData('state_condominium', e.target.value)}
                        className="mt-1 border border-gray-300 block w-full"
                    />
                    {/* Add InputError component if needed */}
                </div>
                <div className="mt-4">
                        <InputLabel htmlFor="neighborhood_employee_address" value="Cidade" />
                        <TextInput 
                            id="neighborhood_employee_address"
                            name="neighborhood_employee_address"
                            className="mt-1 block w-full"
                            autoComplete="neighborhood_employee_address"
                            isFocused={true}
                            value={address.localidade}
                            onChange={handleCepChange}
                            maxLength={8}
                            required
                        />
                </div>
                <div className="mt-4">
                        <InputLabel htmlFor="neighborhood_employee_address" value="Bairro" />
                        <TextInput 
                            id="neighborhood_employee_address"
                            name="neighborhood_employee_address"
                            className="mt-1 block w-full"
                            autoComplete="neighborhood_employee_address"
                            isFocused={true}
                            value={address.bairro}
                            onChange={handleCepChange}
                            maxLength={8}
                            required
                        />
                </div>
                <div className="mt-4">
                        <InputLabel htmlFor="neighborhood_employee_address" value="Rua" />
                        <TextInput 
                            id="neighborhood_employee_address"
                            name="neighborhood_employee_address"
                            className="mt-1 block w-full"
                            autoComplete="neighborhood_employee_address"
                            isFocused={true}
                            value={address.logradouro}
                            onChange={handleCepChange}
                            maxLength={8}
                            required
                        />
                </div>
                <div className="mt-4">
                        <InputLabel htmlFor="neighborhood_employee_address" value="Numero" />
                        <TextInput 
                            id="neighborhood_employee_address"
                            name="neighborhood_employee_address"
                            className="mt-1 block w-full"
                            autoComplete="neighborhood_employee_address"
                            isFocused={true}
                            value="Numero"
                            onChange={handleCepChange}
                            maxLength={8}
                            required
                        />
                </div>
                <PrimaryButton className="ml-4 mt-5">
                    <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z"/>
                    </svg> 
                    <span className="px-3">Cadastrar</span>
                </PrimaryButton>
                </>)}  
                </>
                )}
                </div>
            </div>
            </form>
            </>)}
        </AuthenticatedLayout>
    );
}