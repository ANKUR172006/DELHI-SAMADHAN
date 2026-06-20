import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import AIRecommendation from "@/components/dashboard/AIRecommendation";
import HotspotCard from "@/components/dashboard/HotspotCard";
import IncidentTable from "@/components/dashboard/IncidentTable";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-5">
          <StatCard
            title="Critical Incidents"
            value={23}
            subtitle="+5 from yesterday"
          />

          <StatCard
            title="Active Incidents"
            value={128}
            subtitle="+12 from yesterday"
          />

          <StatCard
            title="SLA Breaches"
            value={16}
            subtitle="+2 from yesterday"
          />

          <StatCard
            title="Assignments"
            value={32}
            subtitle="In Progress"
          />
        </div>

        <div className="grid grid-cols-4 gap-5">
          <div className="col-span-1">
            <AIRecommendation />
          </div>

          <div className="col-span-2">
            <IncidentTable />
          </div>

          <div className="col-span-1">
            <HotspotCard />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}