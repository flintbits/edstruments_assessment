export interface User {
    id: number;
    name: string;
    email: string;
    status: "Active" | "Inactive";
    createdAt: string;
}