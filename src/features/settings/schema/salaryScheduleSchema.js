import { z } from "zod";
import { amountSchema } from "@/lib/validation/commonSchema";

export const salaryScheduleSchema = z
  .object({
    firstPayDay: amountSchema.pipe(
      z
        .number()
        .int("First payday must be a whole number")
        .min(1, "First payday must be at least 1")
        .max(27, "First payday cannot exceed 27"),
    ),

    secondPayDay: amountSchema.pipe(
      z
        .number()
        .int("Second payday must be a whole number")
        .min(2, "Second payday must be at least 2")
        .max(31, "Second payday cannot exceed 31"),
    ),
  })
  .superRefine((data, ctx) => {
    if (data.secondPayDay <= data.firstPayDay) {
      ctx.addIssue({
        code: "custom",
        path: ["secondPayDay"],
        message: "Second payday must be after the first payday",
      });
    }
  });
