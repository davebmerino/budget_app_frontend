import { RecentActivityItem } from "./RecentActivityItem";

export function RecentActivityList({ activity, onSeeAll }) {
  return (
    <section className="mt-6 px-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold tracking-tight">Recent Activity</h2>
          <span className="size-1.5 rounded-full bg-primary" />
        </div>
        <button type="button" onClick={onSeeAll} className="text-xs font-medium text-primary hover:underline">
          See All
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {activity.map((item) => (
          <RecentActivityItem key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
}
