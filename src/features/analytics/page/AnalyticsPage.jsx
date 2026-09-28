import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { MobileHeader } from "@/components/layout/MobileHeader";
import {
  CATEGORY_SHARES,
  MONTHLY_CASH_FLOW,
  PACE_SAMPLE,
} from "../utils/sampleData";
import { RANGES, summarizeRange } from "../utils/summarizeRange";
import { PeriodSelector } from "@/features/analytics/components/PeriodSelector";
import { InsightStatGrid } from "@/features/analytics/components/InsightStatGrid";
import { CashFlowChart } from "@/features/analytics/components/CashFlowChart";
import { SpendingPaceChart } from "@/features/analytics/components/SpendingPaceChart";
import { CategoryBreakdown } from "@/features/analytics/components/CategoryBreakdown";

// Props default to the sample data so the page renders on its own. Swap them
// for the result of a features/analytics/hooks/useAnalytics() call once the
// backend can aggregate expenses by month and category.
export function AnalyticsPage({
  onNavigate,
  onAddTransaction,
  cashFlow = MONTHLY_CASH_FLOW,
  categoryShares = CATEGORY_SHARES,
  pace = PACE_SAMPLE,
}) {
  const [rangeKey, setRangeKey] = useState("6M");
  const range = RANGES.find((r) => r.key === rangeKey) ?? RANGES[1];

  const summary = useMemo(
    () => summarizeRange(cashFlow, range.months),
    [cashFlow, range.months],
  );
  const categories = useMemo(
    () =>
      categoryShares.map((category) => ({
        ...category,
        amount: category.share * summary.expenses,
      })),
    [categoryShares, summary.expenses],
  );

  return (
    <>
      <MobileHeader title="Vault" />

      <div className="px-5 pb-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
            <p className="text-sm text-muted-foreground">
              Cash flow, spending pace and where it goes
            </p>
          </div>
          <PeriodSelector
            ranges={RANGES}
            value={rangeKey}
            onChange={setRangeKey}
          />
        </div>

        <InsightStatGrid
          summary={summary}
          rangeLabel={range.label}
          className="mt-5"
        />

        {/* Mobile: one column (cash flow, pace, categories). lg+: cash flow and pace stack on the left, the category breakdown runs tall down the right. */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <CashFlowChart rows={summary.rows} className="lg:col-span-2" />
          <CategoryBreakdown
            categories={categories}
            total={summary.expenses}
            className="order-last lg:order-none lg:col-span-1 lg:row-span-2"
          />
          <SpendingPaceChart pace={pace} className="lg:col-span-2" />
        </div>
      </div>
    </>
  );
}
