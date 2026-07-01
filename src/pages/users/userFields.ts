import type { User } from "../../types/user";
import type { TableConfig } from "../../types/table";

export const users: User[] = [
    { id: 1, name: "Ava Patel", email: "ava@example.com", status: "Active", createdAt: "2024-01-12" },
    { id: 2, name: "Liam Chen", email: "liam@example.com", status: "Inactive", createdAt: "2023-08-21" },
    { id: 3, name: "Noah Kim", email: "noah@example.com", status: "Active", createdAt: "2022-11-03" },
    { id: 4, name: "Mia Rodriguez", email: "mia@example.com", status: "Inactive", createdAt: "2021-07-19" },
];

export const userTableConfig: TableConfig<User> = {
    fields: [
        {
            id: "name",
            label: "Name",
            accessor: "name",
            type: "text",
            filterable: true,
            sortable: true,
        },
        {
            id: "email",
            label: "Email",
            accessor: "email",
            type: "text",
            filterable: true,
            sortable: true,
        },
        {
            id: "status",
            label: "Status",
            accessor: "status",
            type: "select",
            filterable: true,
            sortable: true,
            options: [
                { id: "Active", label: "Active" },
                { id: "Inactive", label: "Inactive" },
            ],
        },
        {
            id: "createdAt",
            label: "Created At",
            accessor: "createdAt",
            type: "date",
            filterable: true,
            sortable: true,
        },
    ],
    rows: users,
};
