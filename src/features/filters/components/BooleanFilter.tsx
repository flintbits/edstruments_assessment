import { Box, Checkbox, FormControlLabel } from "@mui/material";

type Props = {
    value?: boolean;
    onChange?: (value: boolean) => void;
};

export default function BooleanFilter({
    value = false,
    onChange,
}: Props) {
    return (
        <Box sx={{ minWidth: 320 }}>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={value}
                        onChange={(event) => onChange?.(event.target.checked)}
                        size="small"
                    />
                }
                label="True / False"
            />
        </Box>
    );
}
