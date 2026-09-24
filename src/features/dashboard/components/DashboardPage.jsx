import { useState } from "react";
import {
  ShieldCheck,
  Building2,
  Utensils,
  Laptop,
  Repeat,
  Monitor,
  ShoppingCart,
  Banknote,
  Clapperboard,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SafeToSpendCard } from "./SafeToSpendCard";
import { PaceOptimizationCard } from "./PaceOptimizationCard";
import { CategoryVaultList } from "./CategoryVaultList";
import { RecentActivityList } from "./RecentActivityList";

// Placeholder data shaped like the API response this page will eventually
// receive from features/dashboard/hooks/useDashboardSummary(). Replace with
// real data once the backend exposes categories + recent activity.
const SAMPLE_CATEGORIES = [
  {
    id: "housing",
    icon: Building2,
    name: "Housing & Utilities",
    subtitle: "$100 left until renewal",
    statusLabel: "93% Near Limit",
    tone: "danger",
    spent: 1400,
    cap: 1500,
  },
  {
    id: "food",
    icon: Utensils,
    name: "Food & Dining",
    subtitle: "Ideal pace: $28/day",
    statusLabel: "51% Optimal",
    tone: "primary",
    spent: 410,
    cap: 800,
  },
  {
    id: "shopping",
    icon: Laptop,
    name: "Shopping & Tech",
    subtitle: "$230 remaining",
    statusLabel: "48% Under",
    tone: "primary",
    spent: 220,
    cap: 450,
  },
  {
    id: "subscriptions",
    icon: Repeat,
    name: "Subscriptions",
    subtitle: "Fixed recurring",
    statusLabel: "70% Stable",
    tone: "primary",
    spent: 85,
    cap: 120,
  },
];

const SAMPLE_ACTIVITY = [
  {
    id: "1",
    icon: Monitor,
    merchant: "Apple Store",
    categoryTag: "Tech",
    timeLabel: "Today, 2:15 PM",
    amount: -129.0,
    accountLabel: "Apple Card",
  },
  {
    id: "2",
    icon: ShoppingCart,
    merchant: "Whole Foods Market",
    categoryTag: "Groceries",
    timeLabel: "Yesterday",
    amount: -64.2,
    accountLabel: "Debit •• 8904",
  },
  {
    id: "3",
    icon: Banknote,
    merchant: "Freelance Client Payout",
    categoryTag: "Income",
    timeLabel: "2 days ago",
    amount: 850.0,
    accountLabel: "Wire Direct",
  },
  {
    id: "4",
    icon: Clapperboard,
    merchant: "Netflix Subscription",
    categoryTag: "Subscriptions",
    timeLabel: "3 days ago",
    amount: -19.99,
    accountLabel: "Auto •• 4410",
  },
];

export function DashboardPage({ onNavigate, onAddTransaction, onCategoryClick }) {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <AppShell>
      <MobileHeader title="Vault" />

      <SafeToSpendCard
        available={3240.5}
        weeklyChangeLabel="+$420.00 wk"
        spent={2180}
        budget={4500}
        daysRemaining={14}
        onTrackToSave={480}
        income={5420}
        incomeChangePercent={12}
        expenses={2180}
        expensesCapPercent={40}
      />

      <PaceOptimizationCard subtitle="Daily safe velocity capped at $78.50" />

      <CategoryVaultList
        categories={SAMPLE_CATEGORIES}
        activeCount={4}
        onCategoryClick={onCategoryClick}
      />

      <RecentActivityList activity={SAMPLE_ACTIVITY} />

      <p className="mt-6 flex items-center justify-center gap-1.5 px-5 text-center text-xs text-muted-foreground">
        <ShieldCheck className="size-3.5 text-primary" />
        Hardware-encrypted ledger · 256-bit biometrics active
      </p>

      <MobileBottomNav
        active={activeTab}
        onNavigate={(key) => {
          setActiveTab(key);
          onNavigate?.(key);
        }}
        onAdd={onAddTransaction}
      />
    </AppShell>
  );
}
