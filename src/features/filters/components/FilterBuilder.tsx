import { Box, Button, FormControl, InputLabel, MenuItem, Select, type SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import type { FilterCondition } from "../../../types/filterbuilder";
import type { FieldDefinition, SelectOption } from "../../../types/table";
import { OPERATOR_MAP } from "../constants/operatorMap";
import TextFilter from "./TextFilter";
import SelectFilter from "./SelectFilter";
import BooleanFilter from "./BooleanFilter";
import DateFilter from "./DateFilter";
import NumberFilter from "./NumberFilter";
import AmountFilter from "./AmountFilter";


interface FilterBuilderProps {
    fields: FieldDefinition[];
    rows: unknown[];
    onApply: (rows: unknown[]) => void;
}

export default function FilterBuilder({ fields, rows, onApply }: FilterBuilderProps) {
    // Stores all filters created by the user.
    const [filters, setFilters] = useState<FilterCondition[]>([]);

    // Tracks whether a filter has been interacted with to control validation messages.
    const [touched, setTouched] = useState<Record<number, boolean>>({});

    // Validates a filter based on its field type and returns an error message if invalid.
    const getValidationError = (filter: FilterCondition): string | undefined => {
        const field = fields.find((field) => field.id === filter.fieldId);
        if (!field) return "Invalid field";

        const value = filter.value;
        switch (field.type) {
            case "text":
                return String(value ?? "").trim() === "" ? "Please enter a value." : undefined;
            case "number":
                return typeof value !== "number" || Number.isNaN(value) ? "Please enter a number." : undefined;
            case "amount": {
                const min = value?.min;
                const max = value?.max;
                const hasMin = typeof min === "number";
                const hasMax = typeof max === "number";
                if (!hasMin && !hasMax) return "Enter min or max.";
                if (hasMin && hasMax && min > max) return "Min cannot be greater than max.";
                return undefined;
            }
            case "date": {
                const start = normalizeDateValue(value?.start);
                const end = normalizeDateValue(value?.end);
                const hasStart = Boolean(start);
                const hasEnd = Boolean(end);
                if (!hasStart && !hasEnd) return "Select a date range.";
                if (hasStart && !start) return "Enter a valid start date.";
                if (hasEnd && !end) return "Enter a valid end date.";
                if (hasStart && hasEnd && start && end && start > end) return "Start date cannot be after end date.";
                return undefined;
            }
            case "select":
            case "multiSelect":
                return String(value ?? "").trim() === "" ? "Please select a value." : undefined;
            case "boolean":
                return typeof value !== "boolean" ? "Please choose true or false." : undefined;
            default:
                return undefined;
        }
    };

    // Returns validation errors only after the filter has been touched.
    const getFilterError = (filter: FilterCondition): string | undefined => {
        return touched[filter.id] ? getValidationError(filter) : undefined;
    };

    // Marks a filter as touched to enable validation feedback.
    const markFilterTouched = (filterId: number) => {
        setTouched((prev) => (prev[filterId] ? prev : { ...prev, [filterId]: true }));
    };

    // Handles changes to the field or operator dropdowns.
    const handleChange = (filterId: number, type: "field" | "operator") => (event: SelectChangeEvent<string>) => {

        const value = event.target.value;

        setFilters((prev) =>
            prev.map((filter) => {
                if (filter.id !== filterId) return filter;

                // Update the selected field and reset operator/value accordingly.
                if (type === "field") {
                    const selectedField = fields.find((field) => field.id === value);
                    if (!selectedField) return filter;

                    return {
                        ...filter,
                        fieldId: value,
                        operator: OPERATOR_MAP[selectedField.type][0],
                        value: selectedField.type === "boolean" ? false : null
                    };
                }

                // Update the selected operator for the current field.
                const field = fields.find((field) => field.id === filter.fieldId);
                if (!field) return filter;

                const selectedOperator = OPERATOR_MAP[field.type].find((operator) => operator.id === value);
                if (!selectedOperator) return filter;

                return {
                    ...filter,
                    operator: selectedOperator,
                };
            })
        );
    };


    // Adds a new filter with default field and operator values.
    const addFilter = () => {
        setFilters((prev) => {
            const newFilter: FilterCondition = {
                id: Date.now(),
                fieldId: fields[0].id,
                operator: OPERATOR_MAP[fields[0].type][0],
                value: ""
            };


            return [...prev, newFilter]
        })
    }

    // Retrieves a nested property value using dot notation.
    const getValue = (row: any, accessor: string) =>
        accessor.split(".").reduce((obj: any, key) => obj?.[key], row);

    const normalizeDateValue = (value: unknown): string | null => {
        if (value === null || value === undefined || value === "") return null;

        if (value instanceof Date) {
            const year = value.getFullYear();
            const month = String(value.getMonth() + 1).padStart(2, "0");
            const day = String(value.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        }

        if (typeof value === "string") {
            const trimmed = value.trim();
            if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;

            const parsed = new Date(trimmed);
            if (!Number.isNaN(parsed.valueOf())) {
                const year = parsed.getFullYear();
                const month = String(parsed.getMonth() + 1).padStart(2, "0");
                const day = String(parsed.getDate()).padStart(2, "0");
                return `${year}-${month}-${day}`;
            }
        }

        return null;
    };

    // Checks whether a row satisfies a single filter condition.
    const matchesFilter = (row: any, filter: FilterCondition) => {
        const field = fields.find((field) => field.id === filter.fieldId);
        if (!field) return true;

        const raw = getValue(row, field.accessor);
        const operator = filter.operator.id;
        const value = filter.value;

        switch (field.type) {
            case "text": {
                const target = String(value ?? "").toLowerCase();
                const actual = String(raw ?? "").toLowerCase();
                switch (operator) {
                    case "equals":
                        return actual === target;
                    case "contains":
                        return actual.includes(target);
                    case "startsWith":
                        return actual.startsWith(target);
                    case "endsWith":
                        return actual.endsWith(target);
                    case "doesNotContain":
                        return !actual.includes(target);
                    default:
                        return false;
                }
            }
            case "number": {
                const actual = Number(raw);
                const target = Number(value);
                if (Number.isNaN(actual) || Number.isNaN(target)) return false;
                switch (operator) {
                    case "equals":
                        return actual === target;
                    case "greaterThan":
                        return actual > target;
                    case "lessThan":
                        return actual < target;
                    case "greaterThanOrEqual":
                        return actual >= target;
                    case "lessThanOrEqual":
                        return actual <= target;
                    default:
                        return false;
                }
            }
            case "amount": {
                const actual = Number(raw);
                if (Number.isNaN(actual)) return false;
                const min = value?.min;
                const max = value?.max;
                if (typeof min === "number" && actual < min) return false;
                if (typeof max === "number" && actual > max) return false;
                return true;
            }
            case "date": {
                const actual = normalizeDateValue(raw);
                if (!actual) return false;

                const start = normalizeDateValue(value?.start);
                const end = normalizeDateValue(value?.end);

                if (start && actual < start) return false;
                if (end && actual > end) return false;
                return true;
            }
            case "select": {
                if (operator === "is") return String(raw) === String(value);
                if (operator === "isNot") return String(raw) !== String(value);
                return false;
            }
            case "multiSelect": {
                const array = Array.isArray(raw) ? raw : [];
                if (operator === "in") return array.includes(value);
                if (operator === "notIn") return !array.includes(value);
                return false;
            }
            case "boolean":
                return raw === value;
            default:
                return true;
        }
    };


    // Applies all filters and returns only rows that satisfy every condition.
    const applyFilters = (filtersToApply: FilterCondition[]) => {
        const filteredRows = filtersToApply.length
            ? rows.filter((row) => filtersToApply.every((filter) => matchesFilter(row, filter)))
            : rows;

        onApply(filteredRows);
    };

    // Determines whether any filter currently contains validation errors.
    const hasValidationErrors = filters.some((filter) => Boolean(getValidationError(filter)));

    // Removes a filter and immediately reapplies the remaining filters.
    const handleDelete = (filterId: number) => {
        setFilters((prev) => {
            const nextFilters = prev.filter((f) => f.id !== filterId);
            applyFilters(nextFilters);
            return nextFilters;
        });
    }

    // Clears all filters and restores the original dataset.
    const clearFilters = () => {
        setFilters([]);
        onApply(rows);
    };

    // Updates the value of a specific filter.
    const setFilterValue = (filterId: number, value: any) => {
        setFilters((prev) =>
            prev.map((filter) =>
                filter.id !== filterId ? filter : { ...filter, value }
            )
        );
    };

    // Handles value selection changes for dropdown-based filters.
    const handleValueChange = (filterId: number) => (event: SelectChangeEvent<string>) => {
        setFilterValue(filterId, event.target.value);
    };

    // Renders the appropriate input component based on the selected field type.
    function getFilterInputs(filter: FilterCondition, fieldType: FieldDefinition['type'], selectOptions?: SelectOption[], errorText?: string): React.ReactNode {
        const hasError = Boolean(errorText);
        switch (fieldType) {
            case "text":
                return (
                    <TextFilter
                        value={String(filter.value ?? "")}
                        onChange={(value: string) => setFilterValue(filter.id, value)}
                        onBlur={() => markFilterTouched(filter.id)}
                        label="Value"
                        error={hasError}
                        helperText={errorText}
                    />
                );
            case "number":
                return (
                    <NumberFilter
                        value={typeof filter.value === "number" ? filter.value : undefined}
                        onChange={(value: number | undefined) => setFilterValue(filter.id, value)}
                        onBlur={() => markFilterTouched(filter.id)}
                        error={hasError}
                        helperText={errorText}
                    />
                );
            case "amount":
                return (
                    <AmountFilter
                        value={
                            typeof filter.value === "object" && filter.value !== null
                                ? filter.value
                                : { min: undefined, max: undefined }
                        }
                        onChange={(value: { min?: number; max?: number }) => setFilterValue(filter.id, value)}
                        onBlur={() => markFilterTouched(filter.id)}
                        error={hasError}
                        helperText={errorText}
                    />
                );
            case "select":
            case "multiSelect":
                return (
                    <SelectFilter
                        options={selectOptions}
                        value={String(filter.value ?? "")}
                        onChange={handleValueChange(filter.id)}
                        onBlur={() => markFilterTouched(filter.id)}
                        label={fieldType === "multiSelect" ? "Values" : "Value"}
                        error={hasError}
                        helperText={errorText}
                    />
                );
            case "boolean":
                return (
                    <BooleanFilter
                        value={typeof filter.value === "boolean" ? filter.value : undefined}
                        onChange={(value: boolean) => setFilterValue(filter.id, value)}
                    />
                );
            case "date":
                return (
                    <DateFilter
                        value={
                            typeof filter.value === "object" && filter.value !== null
                                ? filter.value
                                : { start: "", end: "" }
                        }
                        onChange={(value: { start: string; end: string }) => setFilterValue(filter.id, value)}
                        onBlur={() => markFilterTouched(filter.id)}
                        error={hasError}
                        helperText={errorText}
                    />
                );
            default:
                return null;
        }
    }

    return (
        <div style={{ display: "flex", gap: 12, flexDirection: "column" }}>
            <h2>Filter Builder</h2>
            {/* <pre>
                {JSON.stringify(filters, null, 2)}
            </pre> */}

            <div style={{ display: "flex", alignContent: "center", justifyContent: "space-between", flexDirection: "column", gap: 14 }}>
                {filters.map((filter) => {
                    const field = fields.find((field) => field.id === filter.fieldId);
                    if (!field) return null;
                    const operators = OPERATOR_MAP[field.type];
                    const errorText = getFilterError(filter);
                    return <Box
                        key={filter.id}
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            flexWrap: "wrap",
                            gap: 2,
                            width: "100%",
                        }}
                    >
                        {/* Field Dropdown */}
                        <Box sx={{ minWidth: 220, flex: "0 0 220px" }}>
                            <FormControl fullWidth>
                                <InputLabel id={`field-select-label-${filter.id}`}>
                                    Field
                                </InputLabel>

                                <Select
                                    labelId={`field-select-label-${filter.id}`}
                                    id={`field-select-${filter.id}`}
                                    value={filter.fieldId}
                                    label="Field"
                                    onChange={handleChange(filter.id, "field")}
                                    size="small"
                                >
                                    {fields.map((field) => (
                                        <MenuItem key={field.id} value={field.id}>
                                            {field.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        {/* Operator Dropdown */}
                        <Box sx={{ minWidth: 220, flex: "0 0 220px" }}>
                            <FormControl fullWidth>
                                <InputLabel id={`operator-select-label-${filter.id}`}>
                                    Operator
                                </InputLabel>

                                <Select
                                    labelId={`operator-select-label-${filter.id}`}
                                    id={`operator-select-${filter.id}`}
                                    value={filter.operator.id}
                                    label="Operator"
                                    onChange={handleChange(filter.id, "operator")}
                                    size="small"
                                >

                                    {operators.map((operator) => (
                                        <MenuItem key={operator.id} value={operator.id}>
                                            {operator.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>


                        {/* Value Selector */}
                        <Box sx={{ minWidth: 320, flex: "1 1 320px" }}>
                            {getFilterInputs(filter, field.type, field.options, errorText)}
                        </Box>

                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleDelete(filter.id)}
                            size="small"
                            sx={{ alignSelf: "flex-start", mt: 1 }}
                        >
                            Delete
                        </Button>
                    </Box>
                })}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={addFilter} size="small">Add Filter</Button>
                <div style={{ display: "flex", gap: 8 }}>
                    <Button variant="outlined" onClick={clearFilters} size="small">Clear All</Button>
                    <Button
                        variant="contained"
                        onClick={() => applyFilters(filters)}
                        size="small"
                        disabled={hasValidationErrors}
                    >
                        Apply Filter
                    </Button>
                </div>
            </div>
        </div>
    )
}
