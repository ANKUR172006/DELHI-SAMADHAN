import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import IncidentTable from "@/components/dashboard/IncidentTable";

export default function OfficerPage() {
  return (
    <DashboardLayout>

      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold">
            Officer Dashboard
          </h1>

          <p className="text-gray-500">
            Manage assigned incidents and resolutions
          </p>
        </div>

        <div className="grid grid-cols-4 gap-5">

          <StatCard
            title="Assigned Cases"
            value="52"
          />

          <StatCard
            title="In Progress"
            value="18"
          />

          <StatCard
            title="Resolved"
            value="34"
          />

          <StatCard
            title="SLA Compliance"
            value="91%"
          />

        </div>

        <IncidentTable />

      </div>

    </DashboardLayout>
  );
}