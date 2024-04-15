import { ReactNode } from "react";

export interface User {
    type_user: ReactNode;
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    tipo: ReactNode;
    cod_user: string;
    employees: string;
    job_title_employee: string;
    department_employee:string;
    user: any;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
