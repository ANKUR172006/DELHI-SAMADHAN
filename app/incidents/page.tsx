import DashboardLayout from "@/components/layout/DashboardLayout";
import IncidentTable from "@/components/dashboard/IncidentTable";

export default function IncidentsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          All Incidents
        </h1>

        <IncidentTable />
      </div>
    </DashboardLayout>
  );
}