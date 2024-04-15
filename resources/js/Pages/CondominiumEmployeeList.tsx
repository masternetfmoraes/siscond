import React, { useState, useEffect } from 'react';


type CondominiumEmployeeListProps={
    codigo: string;
    id: string;
    cod_user: string;
    name: string;
    job_title_employee:   string;
}
function CondominiumEmployeeList({codigo}:CondominiumEmployeeListProps) {
  const [employees, setEmployees] = useState<CondominiumEmployeeListProps[]>([]);
  const [loading, setLoading] = useState(true); // Adicione um estado para rastrear o carregamento

  useEffect(() => {
    fetch(`/employeeList/${codigo}`) // Rota da API Laravel
      .then(response => response.json())
      .then(data => {
        setEmployees(data)
        setLoading(false); // Defina o estado de carregamento como falso após obter os dados
      })
      .catch(error =>{
        console.error('Error fetching employees:', error)
        setLoading(false); // Em caso de erro, defina o estado de carregamento como falso
      });
  }, [codigo]);
  const stringDeDados = JSON.stringify(employees, null, 2);

  const uniqueEmployees = Array.from(new Set(employees.map(employee => employee.cod_user))).map(cod_user => {
    return employees.find(employee => employee.cod_user === cod_user);
  });
 

  return (
    <>
    <hr />
    <p className="whitespace-pre-wrap">
        {
        //stringDeDados
        //codigo
        }
    </p>
    {loading ? (
          // Exiba um indicador de carregamento enquanto os dados estão sendo buscados
          <div role="status" className="flex items-center justify-center">
              <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
          </div>
          //
        ) : (
    <div>
      <div className="bg-white p-6 relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between">
        <p className="text-2xl">Funcionários</p>
        
        <p className="text-sm"> {employees.length}</p>
        </div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3 ">
                          <div className="flex items-center">
                              Nome
                              <a href="#">
                                <svg className="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                </svg>
                              </a>
                          </div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                          <div className="flex items-center">
                              Função
                              <a href="#">
                                <svg className="w-3 h-3 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
                                </svg>
                              </a>
                          </div> 
                      </th>
                      <th scope="col" className="px-6 py-3">
                          <span className="sr-only">Edit</span>
                      </th>
                  </tr>
              </thead>
              <tbody>
                {employees.length === 0 ?(  <tr>
                                            <th scope="row" className="px-6 py-4 font-medium text-red-800 text-xl text-gray-900 whitespace-nowrap dark:text-white">Não existe Funcionário</th>
                                            <th>
                                            <a href={`/formcadastrafuncionario`} className="inline-flex px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white print:hidden">
                                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                                </svg>
                                                <span className="px-3">Adicionar Funcionário</span>
                                            </a>
                                            </th>
                                            </tr>
                                          ):( <></>)}
              {employees.map(employee => (
                  <tr key={employee.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 cursor-pointer">
                      <th scope="row"   className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <a href={`/profileuser/${employee.cod_user}`}>
                        {employee.name}
                      </a>
                      </th>
                     
                      <td className="px-6 py-4">
                          {employee.job_title_employee}
                      </td>
                      <td className="px-6 py-4 text-right">
                          <a href={`/profileuser/${employee.cod_user}`} className="text-center inline-flex items-center  font-medium text-blue-600 dark:text-blue-500 hover:underline">
                          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                            <g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                              <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                              <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
                            </g>
                          </svg>
                            <span className="px-2">Visualizar</span>
                            </a>
                      </td>
                  </tr>
                  ))}
              </tbody>
          </table>
          <p className="">Gerenciar</p>
      </div>
    </div>
        )}
    </>
    
  );
}

export default CondominiumEmployeeList;
