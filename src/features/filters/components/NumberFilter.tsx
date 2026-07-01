import { Box, TextField } from "@mui/material";

type Props = {
    value?: number;
    onChange?: (value: number | undefined) => void;
    onBlur?: () => void;
    label?: string;
    error?: boolean;
    helperText?: string;
};

export default function NumberFilter({
    value,
    onChange,
    onBlur,
    label = "Value",
    error,
    helperText,
}: Props) {
    return (
        <Box sx={{ minWidth: 320 }}>
            <TextField
                label={label}
                type="number"
                value={value === undefined ? "" : String(value)}
                onChange={(event) => {
                    const nextValue = event.target.value;
                    const parsed = nextValue === "" ? undefined : Number(nextValue);
                    onChange?.(Number.isNaN(parsed) ? undefined : parsed);
                }}
                onBlur={onBlur}
                size="small"
                fullWidth
                error={error}
                helperText={helperText}
                slotProps={{
                    htmlInput: {
                        inputMode: "decimal",
                        pattern: "[0-9]*([.,][0-9]+)?",
                    },
                }}
            />
        </Box>
    );
}
