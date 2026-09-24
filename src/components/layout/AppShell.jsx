import { cn } from "@/utils/cn";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileBottomNav } from "./MobileBottomNav";

/**
 * Wraps every primary (non-modal) screen. Below md: a single column capped
 * at mobile width, with bottom padding reserved for MobileBottomNav. At md+:
 * a persistent DesktopSidebar takes over navigation and the content column
 * widens instead of staying phone-width.
 *
 * `nav` = { active, onNavigate, onAdd } is shared by both MobileBottomNav
 * and DesktopSidebar so a page only has to manage one piece of state.
 * Pass showBottomNav={false} / showSidebar={false} for sub-pages that don't
 * belong on the main tab bar (e.g. a detail screen reached by drilling in).
 */
export function AppShell({
  children,
  showBottomNav = true,
  showSidebar = true,
  nav = {},
  className,
  contentClassName,
}) {
  return (
    <div className="min-h-screen bg-background text-foreground md:flex">
      {showSidebar && <DesktopSidebar {...nav} />}

      <div
        className={cn("flex min-h-screen w-full flex-col md:flex-1", className)}
      >
        <div
          className={cn(
            "mx-auto flex w-full  flex-1 flex-col",
            showBottomNav && "pb-24 md:pb-0",
            "md:max-w-4xl md:px-8 md:pt-8 lg:max-w-6xl",
            contentClassName,
          )}
        >
          {children}
        </div>
      </div>

      {showBottomNav && <MobileBottomNav {...nav} />}
    </div>
  );
}
