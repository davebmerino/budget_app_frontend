import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/utils/cn";
import { formatCompactCurrency, formatCurrency } from "@/utils/formatCurrency";
import {
  AXIS_TICK,
  TOOLTIP_LABEL_STYLE,
  TOOLTIP_STYLE,
} from "../utils/chartTheme";
import { ChartCard } from "./ChartCard";

const SERIES_LABELS = { spent: "Spent", safe: "Safe pace" };

/**
 * The "safe" line starts at fixed obligations (rent etc. land up-front) and
 * ramps evenly to the monthly budget, so a big day-1 bill doesn't read as
 * overspending.
 */
function buildSeries({ budget, reserved, daysInMonth, cumulativeSpend }) {
  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    return {
      day,
      safe: reserved + ((budget - reserved) * day) / daysInMonth,
      spent: cumulativeSpend[index] ?? null,
    };
  });
}

export function SpendingPaceChart({ pace, className }) {
  const { budget, daysInMonth, cumulativeSpend } = pace;
  const data = buildSeries(pace);

  const daysElapsed = cumulativeSpend.length;
  const spentToDate = cumulativeSpend[daysElapsed - 1] ?? 0;
  const safeToDate = data[daysElapsed - 1]?.safe ?? 0;
  const gap = safeToDate - spentToDate;
  const isUnder = gap >= 0;

  return (
    <ChartCard
      title="Spending Pace"
      subtitle={`Day ${daysElapsed} of ${daysInMonth} · ${formatCurrency(spentToDate)} of ${formatCurrency(budget)}`}
      action={
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
            isUnder
              ? "bg-emerald-dim text-emerald-accent"
              : "bg-destructive/15 text-destructive",
          )}
        >
          {isUnder ? "Under" : "Over"} pace by {formatCurrency(Math.abs(gap))}
        </span>
      }
      className={className}
    >
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 8, right: 4, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="pace-fill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.35}
                />
                <stop
                  offset="100%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="var(--border)"
              strokeDasharray="3 3"
            />
            <XAxis
              dataKey="day"
              ticks={[1, 8, 15, 22, daysInMonth]}
              tickLine={false}
              axisLine={false}
              tick={AXIS_TICK}
            />
            <YAxis
              domain={[0, budget]}
              tickLine={false}
              axisLine={false}
              tick={AXIS_TICK}
              tickFormatter={formatCompactCurrency}
              width={48}
            />
            <ReferenceLine
              y={budget}
              stroke="var(--destructive)"
              strokeDasharray="2 4"
              label={{
                value: "Budget",
                position: "insideTopRight",
                fill: "var(--muted-foreground)",
                fontSize: 11,
              }}
            />
            <Tooltip
              contentStyle={TOOLTIP_STYLE}
              labelStyle={TOOLTIP_LABEL_STYLE}
              labelFormatter={(day) => `Day ${day}`}
              formatter={(value, name) => [
                formatCurrency(value),
                SERIES_LABELS[name] ?? name,
              ]}
            />
            <Area
              dataKey="spent"
              type="monotone"
              stroke="var(--chart-1)"
              strokeWidth={2}
              fill="url(#pace-fill)"
              connectNulls={false}
            />
            <Line
              dataKey="safe"
              type="linear"
              stroke="var(--muted-foreground)"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Safe pace starts at your fixed obligations and ramps evenly to the
        monthly budget.
      </p>
    </ChartCard>
  );
}
