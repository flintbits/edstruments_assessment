export type FieldType =
    | "text"
    | "number"
    | "date"
    | "select"
    | "multiSelect"
    | "boolean"
    | "amount";

export interface SelectOption {
    id: string;
    label: string;
}

export interface FieldDefinition {
    id: string;
    label: string;
    accessor: string;
    type: FieldType;
    filterable?: boolean;
    sortable?: boolean;
    options?: SelectOption[];
}

//leveraging generics
export interface TableConfig<T> {
    fields: FieldDefinition[];
    rows: T[];
}