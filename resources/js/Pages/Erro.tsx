import { Head } from '@inertiajs/react';
export default function Erro(){
    return(
        <>
        <Head title="Erro - Registro Duplicado" />
        <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
            <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                <div className="relative">
                    <div className="absolute">
                        <div className="">
                            <h1 className="my-2 text-gray-800 font-bold text-2xl">
                                    Houve um erro de registro duplicado
                            </h1>
                            <p className="my-2 text-gray-800">Sentimos muito pelo ocorrido , tente se cadastrar novamente.</p>
                            <button className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50">Clique aqui para se Cadastrar !</button>
                        </div>
                    </div>
                    <div>
                        <img className="opacity-20" 
                        src="https://zapobjects.com/wp-content/uploads/2018/08/CopyIcon-New.png" />
                    </div>
                </div>
            </div>
            <div>
                <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
            </div>
        </div>
    </>
    )
}