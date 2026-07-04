import { memo, useMemo, useState } from "react";
import { Box } from "@mui/material";
import DataTable from "../../components/Table/DataTable";
import FilterBuilder from "../../features/filters/components/FilterBuilder";
import { employeeTableConfig, employees } from "./employeeFields";

const EmployeesPage = memo(function EmployeesPage() {
    const [employeeData] = useState(employees);
    const [rows, setRows] = useState(employeeData);
    const tableConfig = useMemo(() => employeeTableConfig, []);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FilterBuilder
                fields={tableConfig.fields}
                rows={employeeData}
                onApply={(filteredRows) => setRows(filteredRows as typeof employees)}
            />
            <DataTable fields={tableConfig.fields} rows={rows} />
        </Box>
    );
});

export default EmployeesPage;
