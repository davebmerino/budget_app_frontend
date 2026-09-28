import { BadgeCheck, MapPin } from "lucide-react";

export function MerchantPreviewCard({ name, address, category, cashbackNote, thumbnailUrl }) {
  return (
    <div className="flex items-center gap-3 rounded-3xl border border-border bg-card p-4 shadow-vault-card">
      <div className="size-14 shrink-0 overflow-hidden rounded-2xl bg-vault-surface">
        {thumbnailUrl ? (
          <img src={thumbnailUrl} alt="" className="size-full object-cover" />
        ) : (
          <div className="flex size-full items-center justify-center text-muted-foreground">
            <MapPin className="size-5" />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5 truncate font-medium">
          {name}
          <BadgeCheck className="size-4 shrink-0 text-primary" />
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {address} · {category}
        </p>
        <p className="mt-0.5 text-xs font-medium text-primary">{cashbackNote}</p>
      </div>
    </div>
  );
}
