import { memo, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";
import DataTable from "../../components/Table/DataTable";
import FilterBuilder from "../../features/filters/components/FilterBuilder";
import { userTableConfig, users } from "./userFields";

const UsersPage = memo(function UsersPage() {
    const [userData] = useState(users);
    const [rows, setRows] = useState(userData);
    const tableConfig = useMemo(() => userTableConfig, []);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography variant="h5">Users</Typography>
            <FilterBuilder
                fields={tableConfig.fields}
                rows={userData}
                onApply={(filteredRows) => setRows(filteredRows as typeof users)}
            />
            <DataTable fields={tableConfig.fields} rows={rows} />
        </Box>
    );
});

export default UsersPage;
