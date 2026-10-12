import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";

const MAX_TITLE = 100;
const MAX_DESCRIPTION = 500;

export function ExpenseFields({
  title,
  onTitleChange,
  date,
  onDateChange,
  description,
  onDescriptionChange,
  errors = {},
}) {
  return (
    <div className="w-full min-w-0 max-w-full rounded-3xl border border-border bg-card p-4 shadow-vault-card sm:p-5">
      <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
        <div className="min-w-0">
          <label htmlFor="expense-title" className="text-sm font-medium">
            Title
          </label>

          <Input
            id="expense-title"
            value={title ?? ""}
            onChange={(e) => onTitleChange(e.target.value.slice(0, MAX_TITLE))}
            placeholder="e.g. Grocery shopping"
            maxLength={MAX_TITLE}
            aria-invalid={!!errors.title}
            className="mt-2 bg-vault-surface"
          />

          {errors.title && (
            <p className="mt-1 text-xs text-destructive">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="min-w-0">
          <label htmlFor="expense-date" className="text-sm font-medium">
            Date
          </label>

          <div className="relative mt-2">
            <Calendar className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
              id="expense-date"
              type="datetime-local"
              value={date ?? ""}
              onChange={(e) => onDateChange(e.target.value)}
              aria-invalid={!!errors.date}
              className="block w-full min-w-0 max-w-full rounded-2xl bg-vault-surface p-3 pl-9 text-sm text-foreground outline-none ring-primary focus:ring-2 dark:[color-scheme:dark]"
            />
          </div>

          {errors.date && (
            <p className="mt-1 text-xs text-destructive">
              {errors.date.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between gap-2">
          <label htmlFor="expense-description" className="text-sm font-medium">
            Description
          </label>

          <span className="text-xs text-muted-foreground">
            {(description ?? "").length}/{MAX_DESCRIPTION}
          </span>
        </div>

        <textarea
          id="expense-description"
          value={description ?? ""}
          onChange={(e) =>
            onDescriptionChange(e.target.value.slice(0, MAX_DESCRIPTION))
          }
          placeholder="What was this expense for?"
          maxLength={MAX_DESCRIPTION}
          rows={3}
          aria-invalid={!!errors.description}
          className="mt-2 w-full resize-none rounded-2xl bg-vault-surface p-3 text-sm text-foreground outline-none ring-primary placeholder:text-muted-foreground focus:ring-2"
        />

        {errors.description && (
          <p className="mt-1 text-xs text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>
    </div>
  );
}
