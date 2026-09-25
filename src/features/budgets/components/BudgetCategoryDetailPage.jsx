import { useState } from "react";
import {
  SlidersHorizontal,
  Utensils,
  ShoppingCart,
  Store,
  Coffee,
  CheckCircle2,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { BudgetSummaryCard } from "./BudgetSummaryCard";
import { TargetAllocationCard } from "./TargetAllocationCard";
import { SmartAlertsCard } from "./SmartAlertsCard";
import { SubAllocationList } from "./SubAllocationList";
import { CategoryLedgerList } from "./CategoryLedgerList";

// Placeholder data shaped like what features/budgets/hooks/useBudgetCategory(id)
// will eventually return. The Stitch mock's top app-bar read "Add Transaction"
// on this screen (likely copied over from the transaction-form screen) — the
// content here is clearly budget editing, so the title below reflects that
// instead. Flag if the app bar should literally say something else.
const SUB_ALLOCATIONS = [
  {
    id: "groceries",
    icon: ShoppingCart,
    name: "Groceries & Markets",
    spent: 240,
    cap: 450,
  },
  {
    id: "restaurants",
    icon: Store,
    name: "Restaurants & Takeout",
    spent: 135,
    cap: 250,
  },
  { id: "coffee", icon: Coffee, name: "Coffee & Cafes", spent: 35, cap: 100 },
];

const LEDGER_ENTRIES = [
  {
    id: "1",
    icon: Coffee,
    merchant: "Blue Bottle Coffee",
    timeLabel: "Today, 09:24 AM",
    subcategory: "Coffee",
    amount: -48.5,
  },
  {
    id: "2",
    icon: ShoppingCart,
    merchant: "Whole Foods Market",
    timeLabel: "Yesterday",
    subcategory: "Groceries",
    amount: -64.2,
  },
  {
    id: "3",
    icon: Store,
    merchant: "Sweetgreen",
    timeLabel: "3 days ago",
    subcategory: "Restaurants",
    amount: -16.75,
  },
];

const ALERTS = [
  { key: "early", label: "Early Guard", value: "Off", tone: "off" },
  { key: "caution", label: "Caution", value: "At $640.00", tone: "caution" },
  { key: "lockdown", label: "Lockdown", value: "At $760.00", tone: "lockdown" },
];

export function BudgetCategoryDetailPage({
  onBack,
  onSave,
  onNavigate,
  onAddTransaction,
}) {
  const [monthlyLimit, setMonthlyLimit] = useState(800);
  const [surplusRollover, setSurplusRollover] = useState(true);

  const handleSave = () => onSave?.({ monthlyLimit, surplusRollover });

  return (
    <>
      <PageHeader title="Food & Dining" onBack={onBack} />

      <div className="flex items-center justify-between px-5 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-dim px-2.5 py-1 text-xs font-medium text-emerald-accent">
            <span className="size-1.5 rounded-full bg-primary" />
            Active Vault
          </span>
          <span className="text-xs text-muted-foreground">Oct 1 - Oct 31</span>
        </div>
        <button
          type="button"
          aria-label="Filter"
          className="flex size-8 items-center justify-center rounded-full bg-vault-surface text-muted-foreground hover:text-foreground"
        >
          <SlidersHorizontal className="size-4" />
        </button>
      </div>

      {/* One column on mobile. From lg up: allocation controls on the left, sub-allocations + ledger on the right, so the page reads as two working panels instead of one long scroll. */}
      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
        <div>
          <BudgetSummaryCard
            icon={Utensils}
            name="Food & Dining"
            spent={410}
            allocation={monthlyLimit}
            dayOfMonth={16}
            daysRemaining={15}
            burnPerDay={27.33}
            safePerDay={32.5}
            burnNote={`Well within the projected ${"$" + monthlyLimit} cap`}
          />

          <TargetAllocationCard
            monthlyLimit={monthlyLimit}
            onDecrement={() => setMonthlyLimit((v) => Math.max(0, v - 50))}
            onIncrement={() => setMonthlyLimit((v) => v + 50)}
            onQuickAdjust={(delta) =>
              setMonthlyLimit((v) => Math.max(0, v + delta))
            }
            surplusRollover={surplusRollover}
            onSurplusRolloverChange={setSurplusRollover}
          />

          <SmartAlertsCard alerts={ALERTS} activeSummary="Active: 80% & 95%" />
        </div>

        <div>
          <SubAllocationList streams={SUB_ALLOCATIONS} />
          <CategoryLedgerList entries={LEDGER_ENTRIES} />
        </div>
      </div>

      {/* Desktop: inline save button at the end of the content instead of a bar pinned over the sidebar. */}
      <div className="hidden px-5 pt-2 md:block">
        <Button
          className="gap-2 rounded-2xl bg-primary px-8 text-primary-foreground shadow-emerald-glow hover:bg-primary/90"
          size="lg"
          onClick={handleSave}
        >
          <CheckCircle2 className="size-4.5" />
          Save Budget Changes
        </Button>
      </div>

      {/* Mobile: sticky bar so the action stays reachable while scrolling. */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/95 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur md:hidden">
        <div className="mx-auto w-full max-w-md">
          <Button
            className="w-full gap-2 rounded-2xl bg-primary text-primary-foreground shadow-emerald-glow hover:bg-primary/90"
            size="lg"
            onClick={handleSave}
          >
            <CheckCircle2 className="size-4.5" />
            Save Budget Changes
          </Button>
        </div>
      </div>
    </>
  );
}
