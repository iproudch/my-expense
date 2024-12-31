import Header from "../Header";
import { AnalyticsContent } from "./AnalyticContent";

export function AnalyticOverview() {
  return (
    <div className=" flex flex-col w-96 gap-4">
      <Header title="Analytics" />
      <AnalyticsContent />
    </div>
  );
}
