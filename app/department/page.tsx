import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import DepartmentChart from "@/components/charts/DepartmentChart";
import DepartmentRanking from "@/components/cm/DepartmentRanking";
import IncidentTrendChart from "@/components/charts/IncidentTrendChart";
import IncidentCategoryChart from "@/components/charts/IncidentCategoryChart";

export default function DepartmentPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">

        <div className="grid grid-cols-4 gap-5">
          <StatCard title="Total Incidents" value="245" />
          <StatCard title="Resolved" value="198" />
          <StatCard title="Resolution Rate" value="80.8%" />
          <StatCard title="SLA Compliance" value="91.2%" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <IncidentTrendChart />
          <IncidentCategoryChart />
        </div>

        <div>
          <DepartmentRanking />
        </div>

      </div>
    </DashboardLayout>
  );
}