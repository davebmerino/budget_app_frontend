import { cn } from "@/utils/cn";
import { paths } from "@/paths";
import {
  Hexagon,
  LayoutGrid,
  BarChart3,
  Wallet,
  Settings,
  Plus,
  Bell,
} from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    path: paths.dashboard,
    icon: LayoutGrid,
  },
  {
    label: "Analytics",
    path: paths.analytics,
    icon: BarChart3,
  },
  {
    label: "Budgets",
    path: paths.budgets,
    icon: Wallet,
  },
  {
    label: "Settings",
    path: paths.settings,
    icon: Settings,
  },
];
/**
 * Fixed bottom navigation with a floating "+" action in the center.
 * `active` is the current tab key; `onAdd` fires from the center button,
 * `onNavigate(key)` fires from the other four.
 */
export function MobileBottomNav({ active = "dashboard", onNavigate, onAdd }) {
  return (
    <nav className="md:hidden fixed inset-x-0 bottom-0 z-20">
      <div className="mx-auto flex w-full  items-center justify-between border-t border-border bg-card/95 px-6 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2.5 backdrop-blur">
        {NAV_ITEMS.map(({ key, label, icon: Icon, isAction }) => {
          if (isAction) {
            return (
              <button
                key={key}
                type="button"
                onClick={onAdd}
                aria-label="Add transaction"
                className="-mt-8 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-emerald-glow transition-transform active:scale-95"
              >
                <Icon className="size-6" strokeWidth={2.5} />
              </button>
            );
          }

          const isActive = active === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onNavigate?.(key)}
              className={cn(
                "flex flex-col items-center gap-1 px-2 py-1 text-[11px] font-medium transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="size-5" />
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
