import PageHeader from "../PageHeader";
import { AnalyticsContent } from "./AnalyticContent";

export function AnalyticOverview() {
  return (
    <div className="flex w-full flex-col gap-4">
      <PageHeader subtitle="Monthly totals and shared split" title="Analytics" />
      <AnalyticsContent />
    </div>
  );
}
