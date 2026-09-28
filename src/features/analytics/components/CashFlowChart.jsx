import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  formatCompactCurrency,
  formatCurrency,
} from "@/utils/formatCurrency.js";
import {
  AXIS_TICK,
  TOOLTIP_LABEL_STYLE,
  TOOLTIP_STYLE,
} from "../utils/chartTheme";
import { ChartCard } from "./ChartCard";

const SERIES_LABELS = { income: "Income", expenses: "Expenses" };

function Legend() {
  return (
    <div className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
      <span className="flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-primary" />
        Income
      </span>
      <span className="flex items-center gap-1.5">
        <span className="size-2 rounded-full bg-muted-foreground" />
        Expenses
      </span>
    </div>
  );
}

export function CashFlowChart({ rows, className }) {
  const hasPartialMonth = rows.some((row) => row.partial);

  return (
    <ChartCard
      title="Cash Flow"
      subtitle="Income vs. expenses by month"
      action={<Legend />}
      className={className}
    >
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={rows}
            barGap={4}
            margin={{ top: 8, right: 4, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="var(--border)"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={AXIS_TICK}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={AXIS_TICK}
              tickFormatter={formatCompactCurrency}
              width={48}
            />
            <Tooltip
              cursor={{ fill: "var(--muted)", opacity: 0.4 }}
              contentStyle={TOOLTIP_STYLE}
              labelStyle={TOOLTIP_LABEL_STYLE}
              formatter={(value, name) => [
                formatCurrency(value),
                SERIES_LABELS[name] ?? name,
              ]}
            />
            <Bar
              dataKey="income"
              fill="var(--chart-1)"
              radius={[6, 6, 0, 0]}
              maxBarSize={22}
            >
              {rows.map((row) => (
                <Cell key={row.month} fillOpacity={row.partial ? 0.5 : 1} />
              ))}
            </Bar>
            <Bar
              dataKey="expenses"
              fill="var(--muted-foreground)"
              radius={[6, 6, 0, 0]}
              maxBarSize={22}
            >
              {rows.map((row) => (
                <Cell key={row.month} fillOpacity={row.partial ? 0.5 : 1} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      {hasPartialMonth && (
        <p className="mt-2 text-xs text-muted-foreground">
          Faded bars are the current month so far.
        </p>
      )}
    </ChartCard>
  );
}
