import {
  Hexagon,
  LayoutGrid,
  BarChart3,
  Wallet,
  Settings,
  Plus,
  Bell,
  Import,
} from "lucide-react";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/utils/cn";
import { NavLink } from "react-router-dom";
import { primaryNavItems } from "@/primaryNavItems";
import { paths } from "@/paths";
import { AddTransactionForm } from "@/features/transactions/components/AddTransactionForm";
import { useState } from "react";

function SidebarLink({ to, Icon, label, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
          isActive
            ? "bg-emerald-dim text-primary"
            : "text-muted-foreground hover:bg-vault-surface hover:text-foreground",
        )
      }
    >
      <Icon className="size-4.5" />
      <span>{label}</span>
    </NavLink>
  );
}

/**
 * Desktop-only persistent nav rail. Hidden below the md breakpoint, where
 * MobileBottomNav takes over instead. Mirrors the same active/onNavigate/
 * onAdd contract as MobileBottomNav so pages can drive both from one state.
 */

export function DesktopSidebar({
  onAdd,
  hasUnread = true,
  avatarUrl,
  avatarFallback = "U",
  userName = "Account",
  onBellClick,
  onAvatarClick,
}) {
  const [open, setOpen] = useState(false);
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-card px-4 py-6 md:flex">
      <div className="flex items-center gap-2.5 px-2">
        <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-dim text-primary">
          <Hexagon className="size-5" strokeWidth={2.25} />
        </span>
        <span className="text-lg font-semibold tracking-tight">Vault</span>
      </div>

      {/* Add Transaction Button */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <button
              type="button"
              className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground shadow-emerald-glow transition-transform hover:bg-primary/90 active:scale-[0.98]"
            >
              <Plus className="size-4" strokeWidth={2.5} />
              Add Transaction
            </button>
          }
        ></DialogTrigger>

        <DialogContent>
          <AddTransactionForm />
        </DialogContent>
      </Dialog>

      {/* Navigation */}
      <nav className="mt-6 flex flex-col gap-1">
        {primaryNavItems.map(({ label, path, icon: Icon }) => (
          <SidebarLink
            key={path}
            to={path}
            Icon={Icon}
            label={label}
            end={path === paths.dashboard}
          />
        ))}
      </nav>

      <div className="mt-auto flex items-center justify-between border-t border-border px-1 pt-4">
        <button
          type="button"
          onClick={onAvatarClick}
          className="flex min-w-0 items-center gap-2.5"
          aria-label="Profile"
        >
          <Avatar className="size-8 border border-border">
            {avatarUrl && <AvatarImage src={avatarUrl} alt="" />}
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <span className="truncate text-sm font-medium">{userName}</span>
        </button>
        <button
          type="button"
          onClick={onBellClick}
          className="relative shrink-0 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="size-4.5" />
          {hasUnread && (
            <span className="absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-primary" />
          )}
        </button>
      </div>
    </aside>
  );
}
