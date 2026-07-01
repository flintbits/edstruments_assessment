import type { FieldType } from "../../../types/table";

export type OperatorDefinition = {
  id: string;
  label: string;
};

export const OPERATOR_MAP: Record<FieldType, OperatorDefinition[]> = {
  text: [
    { id: "equals", label: "Equals" },
    { id: "contains", label: "Contains" },
    { id: "startsWith", label: "Starts With" },
    { id: "endsWith", label: "Ends With" },
    { id: "doesNotContain", label: "Does Not Contain" },
  ],

  number: [
    { id: "equals", label: "Equals" },
    { id: "greaterThan", label: "Greater Than" },
    { id: "lessThan", label: "Less Than" },
    { id: "greaterThanOrEqual", label: "Greater Than or Equal" },
    { id: "lessThanOrEqual", label: "Less Than or Equal" },
  ],

  amount: [
    { id: "between", label: "Between" },
  ],

  date: [
    { id: "between", label: "Between" },
  ],

  select: [
    { id: "is", label: "Is" },
    { id: "isNot", label: "Is Not" },
  ],

  multiSelect: [
    { id: "in", label: "In" },
    { id: "notIn", label: "Not In" },
  ],

  boolean: [
    { id: "is", label: "Is" },
  ],
} as const;