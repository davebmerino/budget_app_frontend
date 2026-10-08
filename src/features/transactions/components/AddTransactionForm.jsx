import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TransactionTypeTabs } from "./TransactionTypeTabs";
import { AmountInput } from "./AmountInput";
import { CategoryPills } from "./CategoryPills";
import { ExpenseFields } from "./ExpenseFields";
import { IncomeFields } from "./IncomeFields";
import { EXPENSE_CATEGORIES } from "../utils/expenseCategories";
import { getDefaultPeriodRange } from "../utils/payPeriod";

const toDatetimeLocalValue = (date) => {
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};
const toDateValue = (date) => date.toISOString().slice(0, 10);

const DEFAULT_PAY_PERIOD = "first-half";

/**
 * `onSaveExpense` and `onSaveIncome` each receive a payload shaped exactly
 * like their respective Mongoose schema (minus userId, which the API should
 * attach): Expense gets { amount, title, category, description, date },
 * Income (Salary) gets { amount, payDate, periodStart, periodEnd, payPeriod, notes }.
 */
export function AddTransactionForm({ onSaveExpense, onSaveIncome }) {
  const [type, setType] = useState("Expense");
  const [amount, setAmount] = useState("48.50");

  // Expense fields
  const [title, setTitle] = useState("Blue Bottle Coffee");
  const [category, setCategory] = useState("foodAndDrinks");
  const [description, setDescription] = useState(
    "Oat milk latte before a client meeting",
  );
  const [date, setDate] = useState(() => toDatetimeLocalValue(new Date()));

  // Income (Salary) fields
  const [payDate, setPayDate] = useState(() => toDateValue(new Date()));
  const [payPeriod, setPayPeriod] = useState(DEFAULT_PAY_PERIOD);
  const [periodRange, setPeriodRange] = useState(() =>
    getDefaultPeriodRange(DEFAULT_PAY_PERIOD),
  );
  const [notes, setNotes] = useState("");

  const handlePayPeriodChange = (nextPeriod) => {
    setPayPeriod(nextPeriod);
    setPeriodRange(getDefaultPeriodRange(nextPeriod));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const numericAmount = parseFloat(amount) || 0;

    if (type === "Expense") {
      onSaveExpense?.({
        amount: numericAmount,
        title,
        category,
        description,
        date: new Date(date).toISOString(),
      });
    } else {
      onSaveIncome?.({
        amount: numericAmount,
        payDate: new Date(payDate).toISOString(),
        periodStart: new Date(periodRange.periodStart).toISOString(),
        periodEnd: new Date(periodRange.periodEnd).toISOString(),
        payPeriod,
        notes,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-5 pb-8">
      <TransactionTypeTabs value={type} onChange={setType} />
      <AmountInput value={amount} onChange={setAmount} />

      {type === "Expense" ? (
        <>
          <CategoryPills
            categories={EXPENSE_CATEGORIES}
            value={category}
            onChange={setCategory}
          />
          <ExpenseFields
            title={title}
            onTitleChange={setTitle}
            date={date}
            onDateChange={setDate}
            description={description}
            onDescriptionChange={setDescription}
          />
        </>
      ) : (
        <IncomeFields
          payDate={payDate}
          onPayDateChange={setPayDate}
          payPeriod={payPeriod}
          onPayPeriodChange={handlePayPeriodChange}
          periodStart={periodRange.periodStart}
          onPeriodStartChange={(value) =>
            setPeriodRange((prev) => ({ ...prev, periodStart: value }))
          }
          periodEnd={periodRange.periodEnd}
          onPeriodEndChange={(value) =>
            setPeriodRange((prev) => ({ ...prev, periodEnd: value }))
          }
          notes={notes}
          onNotesChange={setNotes}
        />
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full gap-2 rounded-2xl bg-primary text-primary-foreground shadow-emerald-glow hover:bg-primary/90"
      >
        <CheckCircle2 className="size-4.5" />
        Save {type}
      </Button>
    </form>
  );
}
