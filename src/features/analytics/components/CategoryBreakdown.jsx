import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { formatCurrency, formatPercent } from "@/utils/formatCurrency";
import { TOOLTIP_STYLE } from "../utils/chartTheme";
import { ChartCard } from "./ChartCard";

/**
 * @param {{ categories: Array<{ id: string, name: string, share: number, amount: number, color: string }>, total: number }} props
 */
export function CategoryBreakdown({ categories, total, className }) {
  return (
    <ChartCard
      title="Where It Goes"
      subtitle="Share of spending by category"
      className={className}
    >
      <div className="relative h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categories}
              dataKey="amount"
              nameKey="name"
              innerRadius="62%"
              outerRadius="92%"
              paddingAngle={2}
              stroke="none"
            >
              {categories.map((category) => (
                <Cell key={category.id} fill={category.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={TOOLTIP_STYLE}
              itemStyle={{ color: "var(--popover-foreground)" }}
              formatter={(value, name) => [formatCurrency(value), name]}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-muted-foreground">Total spent</span>
          <span className="text-xl font-bold tracking-tight">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      <ul className="mt-4 flex flex-col gap-2.5">
        {categories.map((category) => (
          <li
            key={category.id}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="truncate">{category.name}</span>
            </span>
            <span className="shrink-0 text-right">
              <span className="font-medium">
                {formatCurrency(category.amount)}
              </span>
              <span className="ml-2 text-xs text-muted-foreground">
                {formatPercent(category.share * 100)}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </ChartCard>
  );
}
