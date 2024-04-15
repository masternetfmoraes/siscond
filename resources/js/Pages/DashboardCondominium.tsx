import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import SideMenu from './component/SideMenu';
import Main from './component/Main';
import CondominiumEmployeeList from './CondominiumEmployeeList';
import DisplayCalendar from './component/DisplayCalendar';
export default function Dashboard({ auth,codClient,tipo,cnpj,funcionario}: PageProps) {
    //<SideMenu user={auth.user.name} tipo={auth.user.type_user} />
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{auth.user.name}</h2>}
        >
            <Head title={`Siscond - ${auth.user.name}`} />
            <div className="md:flex gap-5 py-5">
                <div className="md:w-1/2">
                    <CondominiumEmployeeList codigo={cnpj as string} id='' cod_user='' name='' job_title_employee='' /> 
                </div>
                <div className="md:w-1/2">
                    <DisplayCalendar />
                </div>
            </div>
                
                
        </AuthenticatedLayout>
    );
}
