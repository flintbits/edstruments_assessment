import type { TableConfig } from "../../types/table";

export interface Transaction {
    id: number;
    transactionId: string;
    amount: number;
    paymentMethod: "Card" | "Bank" | "UPI";
    isRefunded: boolean;
}

export const transactions: Transaction[] = [
    { id: 1, transactionId: "TXN-1001", amount: 250, paymentMethod: "Card", isRefunded: false },
    { id: 2, transactionId: "TXN-1002", amount: 1200, paymentMethod: "Bank", isRefunded: true },
    { id: 3, transactionId: "TXN-1003", amount: 780, paymentMethod: "UPI", isRefunded: false },
    { id: 4, transactionId: "TXN-1004", amount: 3200, paymentMethod: "Card", isRefunded: true },
];

export const transactionTableConfig: TableConfig<Transaction> = {
    fields: [
        {
            id: "transactionId",
            label: "Transaction ID",
            accessor: "transactionId",
            type: "text",
            filterable: true,
            sortable: true,
        },
        {
            id: "amount",
            label: "Amount",
            accessor: "amount",
            type: "amount",
            filterable: true,
            sortable: true,
        },
        {
            id: "paymentMethod",
            label: "Payment Method",
            accessor: "paymentMethod",
            type: "select",
            filterable: true,
            sortable: true,
            options: [
                { id: "Card", label: "Card" },
                { id: "Bank", label: "Bank" },
                { id: "UPI", label: "UPI" },
            ],
        },
        {
            id: "isRefunded",
            label: "Refunded",
            accessor: "isRefunded",
            type: "boolean",
            filterable: true,
            sortable: true,
        },
    ],
    rows: transactions,
};
