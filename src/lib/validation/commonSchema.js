import { z } from "zod";

export const amountSchema = z
  .union([z.string(), z.number()])
  .refine(
    (value) => value !== "" && value !== null && Number.isFinite(Number(value)),
    "Amount must be a valid number",
  )
  .transform(Number);

export const dateSchema = z
  .string()
  .min(1, "Date is required")
  .refine((value) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return false;
    }

    const date = new Date(`${value}T00:00:00.000Z`);

    return (
      !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
    );
  }, "Please enter a valid date");

export const requiredText = (field, maxLength) =>
  z
    .string()
    .trim()
    .min(1, `${field} is required`)
    .max(maxLength, `${field} must not exceed ${maxLength} characters`);
