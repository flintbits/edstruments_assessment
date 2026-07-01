import { Box, TextField } from "@mui/material";
import type { ChangeEvent } from "react";

type DateRange = {
    start: string;
    end: string;
};

type Props = {
    value?: DateRange;
    onChange?: (value: DateRange) => void;
    onBlur?: () => void;
    error?: boolean;
    helperText?: string;
};

export default function DateFilter({
    value = { start: "", end: "" },
    onChange,
    onBlur,
    error,
    helperText,
}: Props) {
    const handleStartChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.({ ...value, start: event.target.value });
    };

    const handleEndChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.({ ...value, end: event.target.value });
    };

    return (
        <Box sx={{ minWidth: 320, display: "flex", gap: 8, alignItems: "center" }}>
            <TextField
                label="From"
                type="date"
                value={value.start}
                onChange={handleStartChange}
                onBlur={onBlur}
                size="small"
                slotProps={{
                    inputLabel: { shrink: true },
                }}
                error={error}
                helperText={helperText}
                fullWidth
            />
            <TextField
                label="To"
                type="date"
                value={value.end}
                onChange={handleEndChange}
                size="small"
                slotProps={{
                    inputLabel: { shrink: true },
                }}
                error={error}
                fullWidth
            />
        </Box>
    );
}
