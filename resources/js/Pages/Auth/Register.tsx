import { useEffect,useState, FormEventHandler, SetStateAction } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Select from '@/Components/Select';
import { Head, Link, useForm } from '@inertiajs/react';
import axios from 'axios';

export default function Register() {
    interface Address {
        uf: string;
        localidade:string;
        logradouro: string;
        cep: string;
        bairro: string;
        // outras propriedades...
      }
      
    const options = [
        { label: '-----------------',value:'' },
        { label: 'Condominio', value: 'condo' },
      ];
      const condoOptions = [
        { label: '-----------------',value:'' },
        { label: 'Residencial', value: 'res' },
        { label: 'Comercial', value: 'com' },
        // Add more options as needed
      ];
      const states = [
        { label: 'São Paulo', value: 'sp' },
        { label: 'Acre', value: 'ac' },
        { label: 'Alagoas', value: 'al' },
        { label: 'Amapá', value: 'ap' },
        { label: 'Amazonas', value: 'am' },
        { label: 'Bahia', value: 'ba' },
        { label: 'Ceará', value: 'ce' },
        { label: 'Distrito Federal', value: 'df' },
        { label: 'Espírito Santo', value: 'es' },
        { label: 'Goiás', value: 'go' },
        { label: 'Maranhão', value: 'ma' },
        { label: 'Mato Grosso', value: 'mt' },
        { label: 'Mato Grosso do Sul', value: 'ms' },
        { label: 'Minas Gerais', value: 'mg' },
        { label: 'Pará', value: 'pa' },
        { label: 'Paraíba', value: 'pb' },
        { label: 'Paraná', value: 'pr' },
        { label: 'Pernambuco', value: 'pe' },
        { label: 'Piauí', value: 'pi' },
        { label: 'Rio de Janeiro', value: 'rj' },
        { label: 'Rio Grande do Norte', value: 'rn' },
        { label: 'Rio Grande do Sul', value: 'rs' },
        { label: 'Rondônia', value: 'ro' },
        { label: 'Roraima', value: 'rr' },
        { label: 'Santa Catarina', value: 'sc' },
        { label: 'São Paulo', value: 'sp' },
        { label: 'Sergipe', value: 'se' },
        { label: 'Tocantins', value: 'to' }
    ];
    const [selectedType, setSelectedType] = useState('');
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        type_client:'',
        type_condominium:'',
        cnpj_condominium: '',
        state_condominium:'',
        city_condominium: '',
        district_condominium: '',
        zip_condominium: '',
        street_condominium: '',
        number_condominium: '',
        password_confirmation: '',
    });

    
    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const handleTypeChange = (e: { target: { value: any; }; }) => {
        setSelectedType(e.target.value);
        setData((prevState) => ({
        ...prevState,
        type_client: e.target.value,
        state_condominium: e.target.value,
        }));
    };
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'));
    };
    //
    const [cep, setCep] = useState('');
    //const [address, setAddress] = useState(null);
    const [address, setAddress ] =useState<Address | null>({ uf: '',localidade:'',logradouro:'',cep:'',bairro:'' , });
    
   const [error, setError] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleCepChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setCep(event.target.value);
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
            data.city_condominium = response.data.localidade
            data.district_condominium = response.data.bairro
            data.zip_condominium = response.data.cep
            data.street_condominium = response.data.logradouro
            /*
            <p>CEP: {address.cep}</p>
            <p>Logradouro: {address.logradouro}</p>
            <p>Bairro: {address.bairro}</p>
            <p>Cidade: {address.localidade}</p>
            <p>Estado: {address.uf}</p>
            */
        }
        } catch (error) {
        console.error('Erro ao buscar CEP', error);
        setAddress(null);
        setError('Erro ao buscar CEP. Tente novamente mais tarde.');
        } finally {
        setIsLoading(false);
        }
    };
    //
    return (
        <GuestLayout>
            <Head title="Register" />
            <form onSubmit={submit}>
                <div className='mt-4'>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className='mt-4'>
                    <InputLabel htmlFor="cnpj_condominium" value="CNPJ" />

                    <TextInput
                        id="cnpj_condominium"
                        name="cnpj_condominium"
                        value={data.cnpj_condominium}
                        className="mt-1 block w-full"
                        autoComplete="cnpj_condominium"
                        isFocused={true}
                        onChange={(e) => setData('cnpj_condominium', e.target.value)}
                        maxLength={14}
                        required
                    />

                    <InputError message={errors.cnpj_condominium} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="type_client" value="Tipo de Usuario" />
                    <Select name="type_client" id="type_client"
                        options={options}
                        value={data.type_client}
                        //onChange={(e: { target: { value: string; }; }) => setData('type_client', e.target.value)}
                        onChange={handleTypeChange}
                        className="mt-1 border border-gray-300 block w-full"
                    />
                    <InputError message={errors.type_client} className="mt-2" />
                            
                </div>
                <>
                {selectedType === 'condo' && (
                    <div className="mt-4">
                    <InputLabel htmlFor="type_condominium" value="Tipo de Condominio" />
                    <Select
                        name="type_condominium"
                        id="type_condominium"
                        options={condoOptions}
                        //value={selectedType}
                        //onChange={handleTypeChange}
                        value={data.type_condominium}
                        onChange={(e: { target: { value: string; }; }) => setData('type_condominium', e.target.value)}
                        className="mt-1 border border-gray-300 block w-full"
                    />
                    {/* Add InputError component if needed */}
                    </div>
                )}
                </>
                <div className='mt-4'>
                    <InputLabel htmlFor="zip_condominium" value="CEP" />

                    <TextInput
                        id="zip_condominium"
                        name="zip_condominium"
                        value={cep}
                        onChange={handleCepChange} maxLength={8}
                        className="mt-1 block w-full"
                        autoComplete="zip_condominium"
                        isFocused={true}
                        //onChange={(e) => setData('zip_condominium', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>
                <>
                <a className="cursor-pointer mt-3 text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2" onClick={handleSearch}>Buscar CEP</a>

                {isLoading && <p>Carregando...</p>}

                {error && <p style={{ color: 'red' }}>{error}</p>}
                {
                address && !error && (
                    <>
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
                <div className='mt-4'>
                    <InputLabel htmlFor="city_condominium" value="Cidade" />

                    <TextInput
                        id="city_condominium"
                        name="city_condominium"
                        value={address.localidade}
                        className="mt-1 block w-full"
                        autoComplete="city_condominium"
                        isFocused={true}
                        //onChange={(e) => setData('city_condominium', e.target.value)}
                        onChange={handleCepChange}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className='mt-4'>
                    <InputLabel htmlFor="district_condominium" value="Bairro" />

                    <TextInput
                        id="district_condominium"
                        name="district_condominium"
                        value={address.bairro}
                        className="mt-1 block w-full"
                        autoComplete="district_condominium"
                        isFocused={true}
                        onChange={(e) => setData('district_condominium', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className='mt-4'>
                    <InputLabel htmlFor="street_condominium" value="Rua" />

                    <TextInput
                        id="street_condominium"
                        name="street_condominium"
                        value={address.logradouro}
                        className="mt-1 block w-full"
                        autoComplete="street_condominium"
                        isFocused={true}
                        onChange={(e) => setData('street_condominium', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className='mt-4'>
                    <InputLabel htmlFor="number_condominium" value="Número" />

                    <TextInput
                        id="number_condominium"
                        name="number_condominium"
                        value={data.number_condominium}
                        className="mt-1 block w-full"
                        autoComplete="number_condominium"
                        isFocused={true}
                        onChange={(e) => setData('number_condominium', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
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
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ml-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
                </>
                )
                }
                </>
                
                
                
            </form>
        </GuestLayout>
    );
}
function setSelectedOption(value: SetStateAction<string>) {
    throw new Error('Function not implemented.');
}

