import { NavLink } from "react-router-dom";
import { Plus } from "lucide-react";

import { cn } from "@/utils/cn";
import { primaryNavItems } from "@/primaryNavItems";
import { paths } from "@/paths";

function NavItem({ path, label, icon: Icon }) {
  return (
    <NavLink
      to={path}
      end={path === paths.dashboard}
      className={({ isActive }) =>
        cn(
          "flex h-12 min-w-16 flex-col items-center justify-center gap-0.5 rounded-2xl px-3 text-[11px] font-medium transition-colors",
          isActive
            ? "bg-emerald-dim text-primary"
            : "text-muted-foreground hover:bg-vault-surface hover:text-foreground",
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            className="size-5"
            strokeWidth={isActive ? 2.5 : 2}
            aria-hidden="true"
          />

          <span>{label}</span>
        </>
      )}
    </NavLink>
  );
}

export function MobileBottomNav({ onAdd }) {
  const leftItems = primaryNavItems.slice(0, 2);
  const rightItems = primaryNavItems.slice(2);

  return (
    <nav
      aria-label="Primary navigation"
      className="fixed inset-x-0 bottom-0 z-30 md:hidden"
    >
      <div className="mx-2 mb-2 flex h-16 items-center justify-around rounded-2xl border border-border bg-card/95 px-2 pb-[env(safe-area-inset-bottom)] shadow-lg backdrop-blur">
        {/* Left navigation */}
        {leftItems.map((item) => (
          <NavItem key={item.path} {...item} />
        ))}

        {/* Center Add Transaction button */}
        <button
          type="button"
          onClick={onAdd}
          aria-label="Add transaction"
          className="-translate-y-6 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-emerald-glow transition-transform hover:bg-primary/90 active:scale-95"
        >
          <Plus className="size-7" strokeWidth={2.5} aria-hidden="true" />
        </button>

        {/* Right navigation */}
        {rightItems.map((item) => (
          <NavItem key={item.path} {...item} />
        ))}
      </div>
    </nav>
  );
}
