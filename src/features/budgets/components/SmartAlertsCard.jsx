import { cn } from "@/utils/cn";

/**
 * @param {{ alerts: Array<{ key: string, label: string, value: string, tone: "off"|"caution"|"lockdown" }> }} props
 */
export function SmartAlertsCard({ alerts, activeSummary }) {
  return (
    <section className="mx-5 mt-4 rounded-3xl border border-border bg-card p-5 shadow-vault-card">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Dynamic Smart Alerts</h3>
        <span className="text-xs font-medium text-muted-foreground">{activeSummary}</span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {alerts.map(({ key, label, value, tone }) => (
          <div
            key={key}
            className={cn(
              "rounded-2xl bg-vault-surface p-3 text-center",
              tone === "lockdown" && "bg-destructive/10",
            )}
          >
            <p className="text-xs text-muted-foreground">{label}</p>
            <p
              className={cn(
                "mt-1 text-lg font-bold",
                tone === "caution" && "text-primary",
                tone === "lockdown" && "text-destructive",
                tone === "off" && "text-muted-foreground",
              )}
            >
              {value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
