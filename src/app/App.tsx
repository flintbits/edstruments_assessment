import { memo, useState } from 'react';
import { Box, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import EmployeesPage from '../pages/employees/EmployeesPage';
import UsersPage from '../pages/users/UsersPage';
import TransactionsPage from '../pages/transactions/TransactionsPage';

type Props = {};

type ViewMode = 'employees' | 'users' | 'transactions';

const App = memo(function App({ }: Props) {
    const [viewMode, setViewMode] = useState<ViewMode>('employees');

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
            <Typography variant="h5">Data Explorer</Typography>

            <RadioGroup row value={viewMode} onChange={(_, value) => setViewMode(value as ViewMode)}>
                <FormControlLabel value="employees" control={<Radio />} label="Employees" />
                <FormControlLabel value="users" control={<Radio />} label="Users" />
                <FormControlLabel value="transactions" control={<Radio />} label="Transactions" />
            </RadioGroup>

            {viewMode === 'users' ? <UsersPage /> : viewMode === 'transactions' ? <TransactionsPage /> : <EmployeesPage />}
        </Box>
    );
});

export default App;