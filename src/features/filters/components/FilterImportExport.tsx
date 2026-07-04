import type { Dispatch, SetStateAction } from "react";
import { Button, Stack } from "@mui/material";
import { Download, Upload } from "lucide-react";

interface FilterImportExportProps<T> {
    filters: T;
    setFilters: Dispatch<SetStateAction<T>>;
}

export default function FilterImportExport<T>({
    filters,
    setFilters,
}: FilterImportExportProps<T>) {
    // Export the current filters as a downloadable JSON file so they can be reused later.
    const handleExport = () => {
        const blob = new Blob([JSON.stringify(filters, null, 2)], {
            type: "application/json",
        });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "filters.json";
        a.click();

        URL.revokeObjectURL(url);
    };

    // Read a selected JSON file and restore the imported filters back into component state.
    const handleImport = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target?.result as string);
                setFilters(imported);
            } catch {
                alert("Invalid JSON file.");
            }
        };

        reader.readAsText(file);

        event.target.value = "";
    };

    return (
        <Stack direction="row" spacing={2}>
            <Button
                variant="outlined"
                startIcon={<Download size={18} />}
                onClick={handleExport}
                size="small"
            >
                Export
            </Button>

            <Button
                component="label"
                variant="outlined"
                startIcon={<Upload size={18} />}
                size="small"
            >
                Import
                <input
                    hidden
                    type="file"
                    accept="application/json,.json"
                    onChange={handleImport}
                />
            </Button>
        </Stack>
    );
}