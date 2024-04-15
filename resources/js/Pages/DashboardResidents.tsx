import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import SideMenu from './component/SideMenu';
import "./component/test.css"
import Main from './component/Main';
export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{auth.user.name}</h2>}
        >
            <Head title={`Siscond - ${auth.user.name}`} />
             <p className="text-red-800 font-bold text-2xl">Area dos moradores</p>
        </AuthenticatedLayout>
    );
}
