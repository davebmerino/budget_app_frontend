import { cn } from "@/utils/cn";

export function CategoryPills({ categories, value, onChange }) {
  const selected = categories.find((c) => c.id === value);

  return (
    <div>
      <div className="flex items-center justify-between px-1">
        <span className="text-sm font-medium">Category</span>
        {selected && <span className="text-sm font-medium text-primary">{selected.name}</span>}
      </div>

      <div className="mt-2.5 flex gap-2 overflow-x-auto pb-1">
        {categories.map(({ id, name, icon: Icon }) => {
          const isActive = id === value;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              {name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
