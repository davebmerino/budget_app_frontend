import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TransactionTypeTabs } from "./TransactionTypeTabs";
import { AmountInput } from "./AmountInput";
import { CategoryPills } from "./CategoryPills";
import { ExpenseFields } from "@/features/expense/form/ExpenseFields";
import { IncomeFields } from "@/features/salary/form/IncomeFields";

import { EXPENSE_CATEGORIES } from "../utils/expenseCategories";
import { getDefaultPeriodRange } from "../utils/payPeriod";

import { expenseSchema } from "@/features/expense/schema/expenseSchema";
import { salarySchema } from "@/features/salary/schemas/salarySchema";

const toDatetimeLocalValue = (date) => {
  const pad = (n) => String(n).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const toDateValue = (date) => {
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const DEFAULT_PAY_PERIOD = "first-half";

export function AddTransactionForm({ onSaveExpense, onSaveIncome }) {
  const [type, setType] = useState("Expense");

  const expenseForm = useForm({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      amount: "",
      title: "",
      category: "foodAndDrinks",
      description: "",
      date: toDatetimeLocalValue(new Date()),
    },
  });

  const salaryForm = useForm({
    resolver: zodResolver(salarySchema),
    defaultValues: {
      amount: "",
      payDate: toDateValue(new Date()),
      payPeriod: DEFAULT_PAY_PERIOD,
      ...getDefaultPeriodRange(DEFAULT_PAY_PERIOD),
      notes: "",
    },
  });

  const isExpense = type === "Expense";

  const form = isExpense ? expenseForm : salaryForm;

  const {
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  const values = watch();

  const updateField = (field, value) => {
    setValue(field, value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handlePayPeriodChange = (nextPeriod) => {
    const range = getDefaultPeriodRange(nextPeriod);

    salaryForm.setValue("payPeriod", nextPeriod);
    salaryForm.setValue("periodStart", range.periodStart);
    salaryForm.setValue("periodEnd", range.periodEnd);
  };

  const handleExpenseSubmit = async (data) => {
    const payload = {
      ...data,
      amount: Number(data.amount),
      date: new Date(data.date).toISOString(),
    };

    await onSaveExpense?.(payload);
  };

  const handleSalarySubmit = async (data) => {
    const payload = {
      ...data,
      amount: Number(data.amount),
      payDate: `${data.payDate}T00:00:00.000Z`,
      periodStart: `${data.periodStart}T00:00:00.000Z`,
      periodEnd: `${data.periodEnd}T00:00:00.000Z`,
    };

    await onSaveIncome?.(payload);
  };

  const handleSubmit = isExpense
    ? expenseForm.handleSubmit(handleExpenseSubmit)
    : salaryForm.handleSubmit(handleSalarySubmit);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full min-w-0 flex-col gap-4 pb-6"
    >
      <TransactionTypeTabs value={type} onChange={setType} />

      <AmountInput
        value={String(values.amount ?? "")}
        onChange={(nextValue) =>
          updateField(
            "amount",
            typeof nextValue === "function"
              ? nextValue(String(values.amount ?? ""))
              : nextValue,
          )
        }
      />

      {errors.amount && (
        <p className="text-sm text-destructive">{errors.amount.message}</p>
      )}

      {isExpense ? (
        <>
          <CategoryPills
            categories={EXPENSE_CATEGORIES}
            value={values.category}
            onChange={(value) => updateField("category", value)}
          />

          {errors.category && (
            <p className="text-sm text-destructive">
              {errors.category.message}
            </p>
          )}

          <ExpenseFields
            title={values.title}
            onTitleChange={(value) => updateField("title", value)}
            date={values.date}
            onDateChange={(value) => updateField("date", value)}
            description={values.description}
            onDescriptionChange={(value) => updateField("description", value)}
            errors={errors}
          />

          {["title", "date", "description"].map(
            (field) =>
              errors[field] && (
                <p key={field} className="text-sm text-destructive">
                  {errors[field].message}
                </p>
              ),
          )}
        </>
      ) : (
        <>
          <IncomeFields
            payDate={values.payDate}
            onPayDateChange={(value) => updateField("payDate", value)}
            payPeriod={values.payPeriod}
            onPayPeriodChange={handlePayPeriodChange}
            notes={values.notes}
            onNotesChange={(value) => updateField("notes", value)}
            errors={errors}
          />

          {["payDate", "payPeriod", "periodStart", "periodEnd", "notes"].map(
            (field) =>
              errors[field] && (
                <p key={field} className="text-sm text-destructive">
                  {errors[field].message}
                </p>
              ),
          )}
        </>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full gap-2 rounded-2xl bg-primary text-primary-foreground shadow-emerald-glow hover:bg-primary/90"
      >
        <CheckCircle2 className="size-4.5" />
        {isSubmitting ? "Saving..." : `Save ${type}`}
      </Button>
    </form>
  );
}
