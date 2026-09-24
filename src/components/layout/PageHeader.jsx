import { ArrowLeft, Hexagon } from "lucide-react";

/**
 * Top app-bar for non-home screens: back arrow, small brand mark, a title,
 * and a right slot (defaults to nothing — pass an avatar, a close button,
 * etc). Page-specific content (eyebrow labels, big titles, filter rows)
 * lives in the page itself, directly below this bar.
 */
export function PageHeader({ title, onBack, rightSlot }) {
  return (
    <header className=" flex items-center justify-between px-5 pb-4 pt-6">
      <div className=" flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="flex size-9 items-center justify-center text-foreground transition-colors hover:text-muted-foreground"
        >
          <ArrowLeft className="size-5" />
        </button>
        <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-dim text-primary">
          <Hexagon className="size-4" strokeWidth={2.25} />
        </span>
        <h1 className="text-base font-medium">{title}</h1>
      </div>

      {rightSlot}
    </header>
  );
}
