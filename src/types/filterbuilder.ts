export interface FilterCondition {
    id: number,
    fieldId: string,
    operator: {
        id: string;
        label: string;
    },
    value: any
}