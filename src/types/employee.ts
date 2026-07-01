import type { FieldType } from "./table";

type Address = {
    city: string,
    state: string,
    country: string,
}

export interface Employee {
    id: number,
    name: string,
    email: string,
    department: string,
    role: string,
    salary: number,
    projects: number,
    joinDate: string,
    skills: string[],
    address: Address,
    performanceRating: number,
    isActive: boolean,
}

export interface EmployeeField {
    id: string,
    label: string,
    accessor: string,
    type: FieldType,
    filterable: boolean,
    sortable: boolean,
}