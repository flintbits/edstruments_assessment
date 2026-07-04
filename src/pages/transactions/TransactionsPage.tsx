import { memo, useMemo, useState } from "react";
import { Box } from "@mui/material";
import DataTable from "../../components/Table/DataTable";
import FilterBuilder from "../../features/filters/components/FilterBuilder";
import { transactionTableConfig, transactions } from "./transactionFields";

const TransactionsPage = memo(function TransactionsPage() {
    const [transactionData] = useState(transactions);
    const [rows, setRows] = useState(transactionData);
    const tableConfig = useMemo(() => transactionTableConfig, []);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FilterBuilder
                fields={tableConfig.fields}
                rows={transactionData}
                onApply={(filteredRows) => setRows(filteredRows as typeof transactions)}
            />
            <DataTable fields={tableConfig.fields} rows={rows} />
        </Box>
    );
});

export default TransactionsPage;
