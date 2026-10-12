import { cn } from "@/utils/cn";

export function CategoryPills({ categories, value, onChange }) {
  const selected = categories.find((category) => category.id === value);

  return (
    <div className="w-full min-w-0 max-w-full overflow-hidden">
      <div className="flex min-w-0 items-center justify-between gap-3 px-1">
        <span className="shrink-0 text-sm font-medium">Category</span>

        {selected && (
          <span className="min-w-0 truncate text-right text-sm font-medium text-primary">
            {selected.name}
          </span>
        )}
      </div>

      <div className="mt-3 w-full min-w-0 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max min-w-full gap-2">
          {categories.map(({ id, name, icon: Icon }) => {
            const isActive = id === value;

            return (
              <button
                key={id}
                type="button"
                onClick={() => onChange(id)}
                aria-pressed={isActive}
                className={cn(
                  "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-4 shrink-0" />
                {name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
