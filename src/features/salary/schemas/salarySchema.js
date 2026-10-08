import { z } from "zod";
import { amountSchema, dateSchema } from "@/lib/validation/commonSchema";

export const salarySchema = z.object({
  amount: amountSchema.pipe(
    z.number().min(0.01, "Salary amount must be greater than 0"),
  ),

  payDate: dateSchema,

  payPeriod: z.enum(["first-half", "second-half"], {
    error: "Please select a valid pay period",
  }),

  notes: z
    .string()
    .trim()
    .max(500, "Notes must not exceed 500 characters")
    .default(""),
});

// Salary validation based on user's configured schedule
export const createSalarySchema = (schedule) =>
  salarySchema.superRefine((data, ctx) => {
    if (!schedule) {
      ctx.addIssue({
        code: "custom",
        path: ["payDate"],
        message: "Please configure your salary schedule first",
      });
      return;
    }

    // Basic date validation must pass first
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.payDate)) {
      return;
    }

    const selectedDay = Number(data.payDate.split("-")[2]);

    const expectedDay =
      data.payPeriod === "first-half"
        ? schedule.firstPayDay
        : schedule.secondPayDay;

    if (selectedDay !== expectedDay) {
      ctx.addIssue({
        code: "custom",
        path: ["payDate"],
        message: `Pay date must be on day ${expectedDay} for the selected pay period`,
      });
    }
  });
