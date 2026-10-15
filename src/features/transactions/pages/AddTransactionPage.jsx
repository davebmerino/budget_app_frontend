import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddTransactionForm } from "@/features/transactions/components/AddTransactionForm";

export function AddTransactionPage({ onBack, onClose }) {
  // Use onClose if available, otherwise use onBack
  const handleClose = onClose ?? onBack;

  return (
    <div className="min-h-dvh w-full min-w-0 overflow-x-hidden bg-background text-foreground md:flex md:items-center md:justify-center md:bg-black/60 md:p-6 md:backdrop-blur-sm">
      <div
        className="
          mx-auto flex min-h-dvh w-full min-w-0 flex-col
          bg-background
          md:min-h-0 md:max-h-[calc(100dvh-3rem)]
          md:max-w-2xl md:overflow-hidden
          md:rounded-3xl md:border md:border-border
          md:shadow-2xl
        "
      >
        {/* Header */}
        <header className="sticky top-0 z-20 flex shrink-0 items-center justify-between gap-4 border-b border-border bg-background px-4 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
              Vault Protocol 01
            </p>

            <h1 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
              New Transaction
            </h1>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClose}
            disabled={!handleClose}
            aria-label="Close transaction"
            className="size-10 shrink-0 rounded-full border border-border bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <X className="size-5" />
          </Button>
        </header>

        {/* Transaction Form */}
        <main className="min-h-0 w-full min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-4 py-5 sm:px-6 md:py-6">
          <AddTransactionForm onSuccess={handleClose} />
        </main>
      </div>
    </div>
  );
}
