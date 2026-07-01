import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import type { SelectOption } from "../../../types/table";

type Props = {
    options?: SelectOption[];
    value?: string;
    onChange?: (event: SelectChangeEvent<string>) => void;
    onBlur?: () => void;
    label?: string;
    error?: boolean;
    helperText?: string;
};

export default function SelectFilter({
    options = [],
    value = "",
    onChange,
    onBlur,
    label = "Value",
    error,
    helperText,
}: Props) {
    return (
        <Box sx={{ minWidth: 320 }}>
            <FormControl fullWidth error={error}>
                <InputLabel id="select-filter-label">{label}</InputLabel>

                <Select
                    labelId="select-filter-label"
                    id="select-filter"
                    value={value}
                    label={label}
                    onChange={onChange}
                    onBlur={onBlur}
                    size="small"
                >
                    {options.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
                {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
            </FormControl>
        </Box>
    )
}