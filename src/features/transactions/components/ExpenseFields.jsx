import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";

const MAX_TITLE = 100;
const MAX_DESCRIPTION = 500;

/**
 * Matches the Expense schema's remaining fields (category is handled by
 * CategoryPills in the parent form): title, date, description.
 */
export function ExpenseFields({ title, onTitleChange, date, onDateChange, description, onDescriptionChange }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-vault-card">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="expense-title" className="text-sm font-medium">
            Title
          </label>
          <Input
            id="expense-title"
            value={title}
            onChange={(event) => onTitleChange(event.target.value.slice(0, MAX_TITLE))}
            placeholder="e.g. Blue Bottle Coffee"
            required
            className="mt-2 bg-vault-surface"
          />
        </div>

        <div>
          <label htmlFor="expense-date" className="text-sm font-medium">
            Date
          </label>
          <div className="relative mt-2">
            <Calendar className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              id="expense-date"
              type="datetime-local"
              value={date}
              onChange={(event) => onDateChange(event.target.value)}
              required
              className="w-full rounded-2xl bg-vault-surface p-3 pl-9 text-sm text-foreground outline-none ring-primary focus:ring-2 [color-scheme:dark]"
            />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <label htmlFor="expense-description" className="text-sm font-medium">
            Description
          </label>
          <span className="text-xs text-muted-foreground">
            {description.length}/{MAX_DESCRIPTION}
          </span>
        </div>
        <textarea
          id="expense-description"
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value.slice(0, MAX_DESCRIPTION))}
          placeholder="What was this for?"
          required
          rows={3}
          className="mt-2 w-full resize-none rounded-2xl bg-vault-surface p-3 text-sm text-foreground outline-none ring-primary placeholder:text-muted-foreground focus:ring-2"
        />
      </div>
    </div>
  );
}
