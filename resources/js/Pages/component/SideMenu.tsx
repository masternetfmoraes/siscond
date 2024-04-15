import { useState } from "react"
import "../component/test.css"
export default function SideMenu({user,tipo}:any){
    const [showElement, setShowElement] = useState(false)
    function showSideBar(){
        setShowElement(!showElement);
    }
    return(
        < >
        <div className={`flex flex-col justify-between border-e bg-white ${showElement ? 'esconde hidden':'mostra block'}`}>
            
            <div className="h-screen w-[250px] px-4 py-6 print:hidden">
                <p className='text-black text-2xl font-bold text-center'>{user}</p>
                <ul className="mt-6 space-y-1">
                    <li>
                        <a
                        href=""
                        className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                        >
                        {tipo === 'condo'? "Condominio":"Menu"}
                        </a>
                    </li>
                    <>
                    {tipo === 'condo'&&(
                    <>
                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                <span className="text-base font-bold"> Estrutura </span>
                                <span className="shrink-0 transition duration-300 group-open:-rotate-180" >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" >
                                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                            </summary>
                            <ul className="mt-2 space-y-1 px-4">
                                <li>
                                    <a href="/dashboardapartamentos" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                        Apartamentos
                                    </a>
                                </li>
                                <li>
                                    <a href="/listarapartamentos" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700" >
                                        Listar Apartamentos
                                    </a>
                                </li>
                                <li>
                                    <a href="" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                        Espaços Comuns
                                    </a>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                <span className="text-base font-bold"> Financeiro </span>
                                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"  viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                            </summary>
                            <ul className="mt-2 space-y-1 px-4">
                                <li>
                                    <a href="tete" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                        Adicionar
                                    </a>
                                </li>
                                <li>
                                    <a href="/profile" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                       Gastos
                                    </a>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                <span className="text-base font-bold"> Funcionários </span>
                                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"  viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                            </summary>
                            <ul className="mt-2 space-y-1 px-4">
                                <li>
                                    <a href="/formcadastrafuncionario" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                       Adicionar
                                    </a>
                                </li>
                                <li>
                                    <a href={`/listarfuncionarios`} className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                        Listar Funcionários
                                    </a>
                                </li>
                                <li>
                                    <a href="" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                        Gerenciar
                                    </a>
                                </li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                            <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                <span className="text-base font-bold"> Moradores </span>
                                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"  viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                            </summary>
                            <ul className="mt-2 space-y-1 px-4">
                                <li>
                                    <a href="" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                        Gerenciar
                                    </a>
                                </li>
                                <li>
                                    <a href="/profile" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                                       Adicionar
                                    </a>
                                </li>
                            </ul>
                        </details>
                    </li>
                    </>
                    )}
                    </>
                    <li>
                        <a
                        href=""
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                        Billing
                        </a>
                    </li>

                    <li>
                        <a
                        href=""
                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                        Invoices
                        </a>
                    </li>

                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary
                            className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        >
                            <span className="text-sm font-medium"> Account </span>

                            <span
                            className="shrink-0 transition duration-300 group-open:-rotate-180"
                            >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                                />
                            </svg>
                            </span>
                        </summary>

                            <ul className="mt-2 space-y-1 px-4">
                                <li>
                                    <a
                                        href=""
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Details
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href=""
                                        className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                    >
                                        Security
                                    </a>
                                </li>

                                <li>
                                    <form action="/logout">
                                        <button
                                        type="submit"
                                        className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                                        >
                                        Logout
                                        </button>
                                    </form>
                                </li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>

            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
                <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
                    <img
                    alt="Man"
                    src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    className="h-10 w-10 rounded-full object-cover"
                    />
                <div>
                    <p className="text-xs">
                    <strong className="block font-medium">{user}</strong>

                    <span> {user.email}</span>
                    </p>
                </div>
                </a>
            </div>
        </div>
        <div className={`w-10 btn-show px-2 ${showElement ? 'relative right-0':'relative right-0'}`}>
            {showElement ? (
            <svg className={`w-6 h-6 mt-2  text-gray-800 dark:text-white cursor-pointer`} aria-hidden="true" 
                onClick={showSideBar} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" 
                    stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>):(
            <svg className="w-6 h-6 mt-2 text-gray-800 dark:text-white cursor-pointer" aria-hidden="true" 
                onClick={showSideBar} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
            </svg>)}
        </div>
        </>
    )
}