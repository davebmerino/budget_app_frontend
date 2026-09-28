import { ChevronsUpDown, Calendar, Lock, CreditCard, Repeat } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export function TransactionDetailsFields({
  merchant,
  onMerchantChange,
  tags,
  account,
  onAccountClick,
  timestamp,
  currency,
  recurring,
  onRecurringChange,
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-vault-card">
      <label className="block text-sm font-medium">Merchant / Payee</label>
      <Input
        value={merchant}
        onChange={(event) => onMerchantChange(event.target.value)}
        placeholder="Where was this spent?"
        className="mt-2 bg-vault-surface"
      />

      {tags?.length > 0 && (
        <>
          <p className="mt-4 text-sm font-medium">Tags:</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-secondary font-normal text-muted-foreground">
                #{tag}
              </Badge>
            ))}
          </div>
        </>
      )}

      <p className="mt-4 text-sm font-medium">Vault Account</p>
      <button
        type="button"
        onClick={onAccountClick}
        className="mt-2 flex w-full items-center gap-3 rounded-2xl bg-vault-surface p-3"
      >
        <span className="flex size-9 items-center justify-center rounded-xl bg-secondary text-primary">
          <CreditCard className="size-4.5" />
        </span>
        <span className="flex-1 text-left">
          <p className="text-sm font-medium">{account.name}</p>
          <p className="text-xs text-muted-foreground">
            {account.vaultLabel} · •••• {account.last4}
          </p>
        </span>
        <ChevronsUpDown className="size-4 text-muted-foreground" />
      </button>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <p className="text-sm font-medium">Timestamp</p>
          <div className="mt-2 flex items-center gap-2 rounded-2xl bg-vault-surface p-3 text-sm">
            <Calendar className="size-4 text-muted-foreground" />
            {timestamp}
          </div>
        </div>
        <div>
          <p className="text-sm font-medium">Currency</p>
          <div className="mt-2 flex items-center justify-between gap-2 rounded-2xl bg-vault-surface p-3 text-sm">
            {currency}
            <Lock className="size-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-4">
        <div className="flex items-center gap-2.5">
          <Repeat className="size-4 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Recurring Expense</p>
            <p className="text-xs text-muted-foreground">Repeat monthly automatically</p>
          </div>
        </div>
        <Switch checked={recurring} onCheckedChange={onRecurringChange} />
      </div>
    </div>
  );
}
