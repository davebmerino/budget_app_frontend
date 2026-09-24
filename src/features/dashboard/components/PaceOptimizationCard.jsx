import { Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function PaceOptimizationCard({ subtitle, onTweak }) {
  return (
    <section className="mx-5 mt-4 flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-vault-card">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-dim text-primary">
        <Zap className="size-5" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-semibold">Pace Optimization</h3>
          <Badge className="bg-emerald-dim text-emerald-accent hover:bg-emerald-dim">Active</Badge>
        </div>
        <p className="truncate text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <Button size="sm" variant="secondary" className="shrink-0" onClick={onTweak}>
        Tweak
      </Button>
    </section>
  );
}
