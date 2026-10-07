import { useState } from "react";
import { CheckCircle2, Coffee, ShoppingCart, Bus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TransactionTypeTabs } from "./TransactionTypeTabs";
import { AmountInput } from "./AmountInput";
import { CategoryPills } from "./CategoryPills";
import { TransactionDetailsFields } from "./TransactionDetailsFields";
import { MerchantPreviewCard } from "./MerchantPreviewCard";

// Placeholder category list — swap for features/transactions/hooks/useCategories()
// once the backend exposes categories (see note on the Expense schema).
const CATEGORIES = [
  { id: "dining", name: "Dining & Coffee", icon: Coffee },
  { id: "groceries", name: "Groceries", icon: ShoppingCart },
  { id: "transport", name: "Transport", icon: Bus },
];

const DEFAULT_ACCOUNT = {
  name: "Chase Sapphire Preferred",
  vaultLabel: "Liquid Vault",
  last4: "4821",
};

export function AddTransactionForm({ onSave }) {
  const [type, setType] = useState("Expense");
  const [amount, setAmount] = useState("48.50");
  const [categoryId, setCategoryId] = useState("dining");
  const [merchant, setMerchant] = useState("Blue Bottle Coffee");
  const [recurring, setRecurring] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave?.({
      type,
      amount: parseFloat(amount) || 0,
      categoryId,
      merchant,
      recurring,
      account: DEFAULT_ACCOUNT,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 px-5 pb-8  rounded-3xl bg-card"
    >
      <TransactionTypeTabs value={type} onChange={setType} />
      <AmountInput value={amount} onChange={setAmount} />
      <CategoryPills
        categories={CATEGORIES}
        value={categoryId}
        onChange={setCategoryId}
      />
      <TransactionDetailsFields
        merchant={merchant}
        onMerchantChange={setMerchant}
        tags={["coffee", "work", "lunch", "matcha"]}
        account={DEFAULT_ACCOUNT}
        timestamp="Today, 4:30 PM"
        currency="USD ($)"
        recurring={recurring}
        onRecurringChange={setRecurring}
      />
      <MerchantPreviewCard
        name="Blue Bottle - Mint Plaza"
        address="66 Mint St, San Francisco"
        category="Food & Drink"
        cashbackNote="3.2% Cashback automatically applied"
      />

      <Button
        type="submit"
        size="lg"
        className="w-full gap-2 rounded-2xl bg-primary text-primary-foreground shadow-emerald-glow hover:bg-primary/90"
      >
        <CheckCircle2 className="size-4.5" />
        Save Transaction
      </Button>
    </form>
  );
}
