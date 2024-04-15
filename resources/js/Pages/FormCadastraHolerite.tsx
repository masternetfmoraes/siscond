import React, { useState,useEffect, FormEventHandler, ReactNode } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head,  Link, useForm  } from '@inertiajs/react';
import { PageProps } from '@/types';

//
import Select from '@/Components/Select';
interface Employee {
  state_condominium: ReactNode;
  city_condominium: ReactNode;
  number_condominium: ReactNode;
  name_condominium: ReactNode;
  street_condominium: ReactNode;
  district_condominium: ReactNode;
  name: string;
  cod_condominium: string;
  cod_user: string;
  job_title_employee: string;
}
interface MyComponentProps {
  auth: any; // Substitua 'any' pelo tipo correto, se possível
  tipo: any; // Substitua 'any' pelo tipo correto, se possível
  cnpj: any; // Substitua 'any' pelo tipo correto, se possível
  employees: Employee;
}
const MyComponent = ({ auth,tipo,cnpj, employees }:  MyComponentProps) => {
  
  const {
    data,
    setData,
    post,
    processing,
    errors,
    reset,
  }: any = useForm({
    nome: employees.name,
    cod_condominium:employees.cod_condominium,
    cod_user: employees.cod_user,
    job_title_employee:employees.job_title_employee,
    dynamicFields: [],
    totalvencimentos: '',
    totaldescontos: '',
    salarioliquido: ''
  });
  const updatedDynamicFields: { valor: string; tipo: string; }[] = [];
  const [error,setError]:any = useState([])
  //options
  const options = [
    { label: '-----------------',value:'' },
    { label: 'Vencimentos', value: 'vencimentos' },
    { label: 'Descontos', value: 'descontos' },
  ];
  //
  const [somaVencimentos, setSomaVencimentos] = useState(0);
  const [somaDescontos, setSomaDescontos] = useState(0);

  // 

  const handleDynamicFieldChange = (index: number, fieldName: any, value: any) => {
    const updatedDynamicFields = [...data.dynamicFields];
    updatedDynamicFields[index][fieldName] = value;

    let novaSomaVencimentos = 0;
    let novaSomaDescontos = 0;

    updatedDynamicFields.forEach((field) => {
      const valor = parseFloat(field.valor.replace(",", "."))

      if (field.tipo === 'vencimentos') {
        novaSomaVencimentos += valor;
      } else if (field.tipo === 'descontos') {
        novaSomaDescontos += valor;
      }
    });

    setSomaVencimentos(novaSomaVencimentos);
    setSomaDescontos(novaSomaDescontos);

    setData('dynamicFields', updatedDynamicFields);
  };
  const addDynamicField = () => {
    setData('dynamicFields', [...data.dynamicFields, { codigo: '',descricao:'', tipo: '', valor: '' }]);
     //
    //
    let novaSomaVencimentos = 0;
    let novaSomaDescontos = 0;

    updatedDynamicFields.forEach((field: { valor: string; tipo: string; }) => {
      //const valor = parseFloat(field.valor) || 0;
      const valor = parseFloat(field.valor.replace(",", "."))

      if (field.tipo === 'vencimentos') {
        novaSomaVencimentos += valor;
      } else if (field.tipo === 'descontos') {
        novaSomaDescontos += valor;
      }
    });

    setSomaVencimentos(novaSomaVencimentos);
    setSomaDescontos(novaSomaDescontos);
      //
      //
    
  };

  const removeDynamicField = (index: number) => {
    /*
    if(data.dynamicFields.length  === 1){
      alert('já tem um item')
      return
    }
    */
    const updatedDynamicFields = [...data.dynamicFields];
    updatedDynamicFields.splice(index, 1);
    //
    //
    let novaSomaVencimentos = 0;
    let novaSomaDescontos = 0;

    updatedDynamicFields.forEach((field) => {
      const valor = parseFloat(field.valor.replace(",", "."))

      if (field.tipo === 'vencimentos') {
        novaSomaVencimentos += valor;
      } else if (field.tipo === 'descontos') {
        novaSomaDescontos += valor;
      }
    });

    setSomaVencimentos(novaSomaVencimentos);
    setSomaDescontos(novaSomaDescontos);
      //
      //
    setData('dynamicFields', updatedDynamicFields);
  };
 
  const submitForm: FormEventHandler = (e) => {
    e.preventDefault();
    if (data.dynamicFields.length === 0) {
      setError('Adicione pelo menos um campo dinâmico antes de enviar o formulário');
      return;
    }
    /*
    const formattedData = {
      
    totalvencimentos: somaVencimentos,
    totaldescontos: somaDescontos,
    salarioliquido: somaVencimentos - somaDescontos,
    dynamicFields: data.dynamicFields.map((field: any) => ({
    codigo: field.codigo,
    descricao: field.descricao,
    tipo: field.tipo, // Adicione o campo 'tipo' se necessário
    valor: field.valor,
      })),
    };
    **/
   //faza verificação de camoos vazios
    const hasEmptyField = data.dynamicFields.some((field: any)   => (
      !field.codigo || // Adicione verificação para cada campo
      !field.descricao ||
      !field.tipo ||
      !field.valor
    ));
    
    if(hasEmptyField){
      setError('Não São aceitos Campos Vazios')

      return
    }
// Adicione os campos ocultos ao objeto de dados
data.salarioliquido =  somaVencimentos -somaDescontos;
data.totaldescontos = somaDescontos;
data.totalvencimentos = somaVencimentos;
  setError('')
    post(route('cadastraholerite'));
   
    setData({
      dynamicFields: [
          // Preencha com a estrutura padrão ou valores iniciais, conforme necessário
          { codigo: '', descricao: '', tipo: '', valor: '' },
      ],
      salarioliquido:''
      // Mantenha os campos estáticos ou outras propriedades do estado, se houver
      
  });
 
  };
  
  return (
  <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{auth.user.name}</h2>}
        >
            <Head title={`Cadastrar contato funcionário`} />
            <>
            <div className="max-w-7xl mx-auto sm:px-6 mt-5 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                  <p className="text-2xl font-bold">Cadastrar Holerite</p>
                </div>
                <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                <a onClick={addDynamicField} className='flex gap-2 float-right py-2 cursor-pointer'>
                  <svg className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                  </svg>
                  Adicionar Vencimentos/Despesas
                </a>
                <table className="w-full text-sm border border-gray-500 text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        <div className="flex justify-between">
                          <div className="">
                            <p className="text-base">{employees.name_condominium}</p>
                            <p className="text-sm">{employees.street_condominium}, {employees.number_condominium}</p>
                            <p className="text-sm">{employees.district_condominium} - {employees.city_condominium} / {employees.state_condominium}</p>
                          </div>
                          <div className="">
                            <p className="text-sm">{auth.user.email}</p>
                          </div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white border border-gray-500 dark:border-gray-700">
                      <td className="px-6 py-4">
                        <>
                        <form onSubmit={submitForm}>
                          <div className="flex justify-between pb-5">
                            { /*Cabeçãlho funcionario */}
                            
                            <div className="">
                              <p className="text-base">{employees.name}</p>
                              {}
                                <p className="text-base">Função: {employees.job_title_employee}</p>
                              </div>
                              <div className="">
                                <p className="text-base">Data de pagamento</p>
                                <input id="data" type='date' placeholder='Data de pagamento'
                                value={data.date} 
                                onChange={(e)=>setData('date',e.target.value)}
                                required></input>
                              </div>
                            </div>
                            
                              
              {data.dynamicFields.map((field:any, index:number) => (
                <div key={index} className='flex justify-between py-3'>
                    <hr className='py-2' />
                  <input
                    type="text"
                    value={field.codigo}
                    onChange={(e) => handleDynamicFieldChange(index, 'codigo', e.target.value)}
                    placeholder='Codigo'
                    size={3}
                    className='border border-gray-500 rounded'
                    required
                  />
                  <input
                    type="text"
                    value={field.descricao}
                    onChange={(e) => handleDynamicFieldChange(index, 'descricao', e.target.value)}
                    placeholder='Descrição'
                    className='border border-gray-500 rounded'
                    size={50}
                    required
                  />
                  <Select
                        name="vencimentos"
                        id="vencimentos"
                        options={options}
                        value={field.tipo}
                        onChange={(e: { target: { value: string; }; }) => handleDynamicFieldChange(index,'tipo', e.target.value)}
                        className='border border-gray-500 rounded'
                    />
                  <input
                    type="number"
                    value={field.valor}
                    onChange={(e) => handleDynamicFieldChange(index, 'valor', e.target.value)}
                    className='border border-gray-500 rounded'
                    size={15}
                    required  
                  />
                  <a onClick={() => removeDynamicField(index)}>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"/>
                    </svg>
                  </a>
                
                </div>
                
              ))}
              <p className="text-center font-bold text-red-800">{error}</p>
              <div className="flex justify-between ">
              <p>Total dos Vencimentos: {somaVencimentos}</p>
              <p>Total dos Descontos: {somaDescontos}</p>
              <p>Salário Líquido: {somaVencimentos - somaDescontos}</p>
              </div>
              {/* ... Restante do Formulário */}
             
              <br />
              <PrimaryButton className="ml-4 mt-5">
                    <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z"/>
                    </svg>  <span className="px-3">Cadastrar</span>
                </PrimaryButton>
              </form>
                        </>
                      </td>
                    </tr>
                  </tbody>
                </table>
                </div>
            </div>
            <div>
              
              {/* Campos Estáticos */}
              {/* ... */}
            
              {/* Campos Dinâmicos */}
              
            </div>
            </>
  </AuthenticatedLayout>
  );
};

export default MyComponent;
