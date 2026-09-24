import { SlidersHorizontal } from "lucide-react";
import { CategoryVaultItem } from "./CategoryVaultItem";

/**
 * @param {{ categories: Array<Parameters<typeof CategoryVaultItem>[0]>, activeCount: number, onDetailedView?: () => void, onCategoryClick?: (id: string) => void }} props
 */
export function CategoryVaultList({ categories, activeCount, onDetailedView, onCategoryClick }) {
  return (
    <section className="mt-6 px-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">Category Vaults</h2>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-vault-surface px-2.5 py-1 text-xs font-medium text-muted-foreground">
            {activeCount} Active
          </span>
          <button
            type="button"
            onClick={onDetailedView}
            className="text-xs font-medium text-primary hover:underline"
          >
            Detailed View
          </button>
          <button
            type="button"
            aria-label="Filter categories"
            className="flex size-7 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
          >
            <SlidersHorizontal className="size-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {categories.map((category) => (
          <CategoryVaultItem
            key={category.id}
            {...category}
            onClick={() => onCategoryClick?.(category.id)}
          />
        ))}
      </div>
    </section>
  );
}
