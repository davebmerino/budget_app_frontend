import { cn } from "@/utils/cn";

export function ChartCard({ title, subtitle, action, children, className }) {
  return (
    <section
      className={cn(
        "rounded-3xl border border-border bg-card p-5 shadow-vault-card",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-semibold">{title}</h2>
          {subtitle && (
            <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}
