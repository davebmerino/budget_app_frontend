import { z } from "zod";

import {
  amountSchema,
  dateSchema,
  requiredText,
} from "@/lib/validation/commonSchema";

export const EXPENSE_CATEGORIES = [
  "housing",
  "groceries",
  "foodAndDrinks",
  "shopping",
  "subscription",
  "schoolFees",
  "others",
];

export const expenseSchema = z.object({
  amount: amountSchema,

  title: requiredText("Title", 100),

  category: z.enum(EXPENSE_CATEGORIES, {
    error: "Please select a valid expense category",
  }),

  description: requiredText("Description", 500),

  date: dateSchema,
});
