import { Hexagon, Bell } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

/**
 * Top bar for primary/home screens: brand mark + wordmark on the left,
 * a notification bell and the user's avatar on the right.
 */
export function MobileHeader({
  title = "Vault",
  hasUnread = true,
  avatarUrl,
  avatarFallback = "U",
  onBellClick,
  onAvatarClick,
}) {
  return (
    <header className="md:hidden flex items-center justify-between px-5 pb-4 pt-6">
      <div className="flex items-center gap-2.5">
        <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-dim text-primary">
          <Hexagon className="size-5" strokeWidth={2.25} />
        </span>
        <span className="text-lg font-semibold tracking-tight">{title}</span>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onBellClick}
          className="relative text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
          {hasUnread && (
            <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-primary" />
          )}
        </button>
        <button type="button" onClick={onAvatarClick} aria-label="Profile">
          <Avatar className="size-9 border border-border">
            {avatarUrl && <AvatarImage src={avatarUrl} alt="" />}
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
        </button>
      </div>
    </header>
  );
}
