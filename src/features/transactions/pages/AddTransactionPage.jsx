import { X } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AddTransactionForm } from "@/features/transactions/components/AddTransactionForm";
import { MobileHeader } from "@/components/layout/MobileHeader";

export function AddTransactionPage({
  onBack,
  onClose,
  onSave,
  avatarUrl,
  avatarFallback = "U",
}) {
  return (
    // Mobile: plain full-screen page. md+: the same content becomes a
    // centered modal dialog over a dimmed backdrop, since a form this size
    // shouldn't stretch edge-to-edge on a wide screen.
    <div className="min-h-screen bg-background text-foreground md:flex md:min-h-screen md:items-center md:justify-center md:bg-black/60 md:p-6 md:backdrop-blur-sm">
      <div className="mx-auto w-full max-w-md md:max-h-[calc(100vh-3rem)] md:max-w-lg md:overflow-y-auto md:rounded-3xl md:border md:border-border md:bg-background md:shadow-vault-card">
        <PageHeader
          title="Add Transaction"
          onBack={onBack}
          rightSlot={
            <Avatar className="size-9 border border-border">
              {avatarUrl && <AvatarImage src={avatarUrl} alt="" />}
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
          }
        />
        <MobileHeader />

        <div className="flex items-center justify-between px-5 pb-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-primary">
              Vault Protocol 01
            </p>
            <h2 className="text-2xl font-bold tracking-tight">
              New Transaction
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-9 items-center justify-center rounded-full bg-secondary text-foreground hover:bg-secondary/80"
          >
            <X className="size-4.5" />
          </button>
        </div>

        <AddTransactionForm onSave={onSave} />
      </div>
    </div>
  );
}
