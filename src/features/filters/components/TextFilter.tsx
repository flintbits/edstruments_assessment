import { Box, TextField } from "@mui/material"

type Props = {
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    label?: string;
    error?: boolean;
    helperText?: string;
};

export default function TextFilter({
    value = "",
    onChange,
    onBlur,
    label = "Value",
    error,
    helperText,
}: Props) {
    return (
        <Box
            sx={{ minWidth: 320 }}
            component="form"
            noValidate
            autoComplete="off"
        >

            <TextField
                required
                id="outlined-required"
                label={label}
                value={value}
                onChange={(event) => onChange?.(event.target.value)}
                onBlur={onBlur}
                size="small"
                error={error}
                helperText={helperText}
                fullWidth
            />
        </Box>
    )
}