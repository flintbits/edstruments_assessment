import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { memo, useMemo } from "react";

import type { FieldDefinition } from "../../types/table";

interface DataTableProps<T extends { id: number | string }> {
    fields: FieldDefinition[];
    rows: T[];
}

function getValue<T>(row: T, accessor: string) {
    return accessor
        .split(".")
        .reduce((obj: any, key) => obj?.[key], row);
}

const DataTable = memo(function DataTable<T extends { id: number | string }>({
    fields,
    rows,
}: DataTableProps<T>) {
    const rowsById = useMemo(() => rows.map((row) => ({ row, values: fields.map((field) => getValue(row, field.accessor)) })), [fields, rows]);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {fields.map((field) => (
                            <TableCell key={field.id}>
                                {field.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rowsById.map(({ row, values }) => (
                        <TableRow key={row.id}>
                            {values.map((value, index) => (
                                <TableCell key={fields[index].id}>
                                    {String(value ?? "-")}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
});

export default DataTable;