# Dynamic Filter Builder

## Overview

This project implements a reusable and extensible **Dynamic Filter Builder** built with **React**, **TypeScript**, and **Material UI**. The component allows users to create multiple filters dynamically based on predefined field configurations and apply them to a dataset.

The implementation is designed to be modular, making it easy to add new field types, operators, or integrate with server-side filtering in the future.

---

## Features

- Dynamic field selection
- Dynamic operator selection based on field type
- Type-specific input components
- Multiple filters with **AND** logic
- Support for nested object properties
- Reusable and extensible architecture
- Client-side filtering

---

## Supported Filter Types

| Field Type | Input Component | Supported Operators |
|------------|----------------|---------------------|
| Text | Text Input | Equals, Contains, Starts With, Ends With, Does Not Contain |
| Number | Number Input | Equals, Greater Than, Less Than, Greater Than or Equal, Less Than or Equal |
| Amount | Min/Max Input | Range |
| Date | Date Range Picker | Between Dates |
| Select | Dropdown | Is, Is Not |
| Multi Select | Dropdown | In, Not In |
| Boolean | True / False Dropdown | Equals |

---

## Project Structure

```
FilterBuilder
│
├── TextFilter
├── NumberFilter
├── AmountFilter
├── DateFilter
├── SelectFilter
└── BooleanFilter
```

Each filter component is responsible only for rendering and updating its own value, while the main `FilterBuilder` manages filter state and filtering logic.

---

## Filter Flow

### 1. Add Filter

Clicking **Add Filter** creates a new filter using the first available field.

Each filter contains:

```ts
{
    id,
    fieldId,
    operator,
    value
}
```

---

### 2. Select a Field

When the selected field changes:

- The field is updated.
- The available operators are refreshed based on the field type.
- The operator is reset to the default operator.
- The filter value is reset.

This ensures that every filter remains valid for the selected field.

---

### 3. Select an Operator

Operators are loaded dynamically from `OPERATOR_MAP` depending on the selected field type.

Examples:

- Text → Contains, Equals, Starts With
- Number → Greater Than, Less Than
- Boolean → Equals

---

### 4. Enter Filter Value

The value input is rendered dynamically according to the selected field type.

For example:

| Field Type | Rendered Component |
|------------|-------------------|
| Text | Text Input |
| Number | Number Input |
| Date | Date Range |
| Boolean | Boolean Dropdown |
| Amount | Min / Max Inputs |

This approach keeps the component reusable without hardcoding UI for every field.

---

### 5. Apply Filters

When **Apply Filter** is clicked:

1. Every row is evaluated.
2. Each filter is checked against the row.
3. Only rows satisfying **all filters** are returned.

Current implementation uses:

```
Filter 1
AND
Filter 2
AND
Filter 3
```

Equivalent to:

```
Status = Active
AND
Age > 25
AND
Country = India
```

---

## Filtering Logic

Filtering is performed inside a dedicated `matchesFilter()` function.

Supported comparisons include:

### Text

- Equals
- Contains
- Starts With
- Ends With
- Does Not Contain

All text comparisons are case-insensitive.

### Number

Supports:

- Equals
- Greater Than
- Less Than
- Greater Than or Equal
- Less Than or Equal

### Amount

Checks whether the value falls within a minimum and maximum range.

### Date

Compares dates using a start and end date.

### Select

Supports:

- Is
- Is Not

### Multi Select

Supports:

- In
- Not In

### Boolean

Performs a simple equality comparison.

---

## Nested Object Support

The filter builder supports nested object properties using dot notation.

Example:

```
user.profile.email
```

The value is resolved dynamically before comparison, allowing deeply nested data to be filtered without additional configuration.

---

## Design Decisions

The implementation follows a modular design to improve maintainability and scalability.

- Separate components for each input type
- Centralized operator configuration
- Generic filtering logic
- Reusable field definitions
- Easy to extend without modifying existing functionality

---

## Future Improvements

Some enhancements that can be added include:

- OR logic between filters
- Filter grouping (AND/OR combinations)
- Server-side filtering
- Saved filter presets
- Relative date filters
- Multi-value selection improvements
- Custom operator registration
- Filter validation
- Drag-and-drop filter ordering

---

## Technologies Used

- React
- TypeScript
- Material UI
- React Hooks

---

## Conclusion

This implementation demonstrates a scalable approach for building dynamic filtering functionality. By separating field definitions, operators, input components, and filtering logic, the solution remains flexible and easy to maintain while supporting multiple data types and filtering scenarios.