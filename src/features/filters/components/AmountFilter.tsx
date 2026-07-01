import { Box, TextField } from "@mui/material";

type AmountRange = {
    min?: number;
    max?: number;
};

type Props = {
    value?: AmountRange;
    onChange?: (value: AmountRange) => void;
    onBlur?: () => void;
    error?: boolean;
    helperText?: string;
};

export default function AmountFilter({
    value = { min: undefined, max: undefined },
    onChange,
    onBlur,
    error,
    helperText,
}: Props) {
    const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextValue = event.target.value;
        const parsed = nextValue === "" ? undefined : Number(nextValue);
        onChange?.({
            ...value,
            min: Number.isNaN(parsed) ? undefined : parsed,
        });
    };

    const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextValue = event.target.value;
        const parsed = nextValue === "" ? undefined : Number(nextValue);
        onChange?.({
            ...value,
            max: Number.isNaN(parsed) ? undefined : parsed,
        });
    };

    return (
        <Box sx={{ minWidth: 320, display: "flex", gap: 2, alignItems: "flex-start", flexWrap: "wrap" }}>
            <TextField
                label="Min"
                type="number"
                value={value.min ?? ""}
                onChange={handleMinChange}
                onBlur={onBlur}
                size="small"
                fullWidth
                error={error}
                helperText={helperText}
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    },
                    htmlInput: {
                        inputMode: "decimal",
                        pattern: "[0-9]*([.,][0-9]+)?",
                    },
                }}
                sx={{ flex: "1 1 140px" }}
            />
            <TextField
                label="Max"
                type="number"
                value={value.max === undefined ? "" : String(value.max)}
                onChange={handleMaxChange}
                size="small"
                fullWidth
                error={error}
                slotProps={{
                    inputLabel: {
                        shrink: true,
                    },
                    htmlInput: {
                        inputMode: "decimal",
                        pattern: "[0-9]*([.,][0-9]+)?",
                    },
                }}
                sx={{ flex: "1 1 140px" }}
            />
        </Box>
    );
}
