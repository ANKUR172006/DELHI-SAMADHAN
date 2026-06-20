import DashboardLayout from "@/components/layout/DashboardLayout";
import IncidentTimeline from "@/components/dashboard/IncidentTimeline";
import AISummary from "@/components/dashboard/AISummary";
export default function IncidentDetailsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold">
            INC-101 - Road Damage
          </h1>

          <p className="text-gray-500 mt-2">
            Rohini Sector 8 • PWD Department
          </p>
        </div>

        <div className="grid grid-cols-4 gap-5">

          <div className="bg-white rounded-xl border p-5">
            <p className="text-gray-500">
              Severity
            </p>

            <h3 className="text-3xl font-bold text-red-500">
              High
            </h3>
          </div>

          <div className="bg-white rounded-xl border p-5">
            <p className="text-gray-500">
              Impact Score
            </p>

            <h3 className="text-3xl font-bold">
              92/100
            </h3>
          </div>

          <div className="bg-white rounded-xl border p-5">
            <p className="text-gray-500">
              Complaints
            </p>

            <h3 className="text-3xl font-bold">
              100
            </h3>
          </div>

          <div className="bg-white rounded-xl border p-5">
            <p className="text-gray-500">
              SLA Deadline
            </p>

            <h3 className="text-3xl font-bold text-orange-500">
              5h 30m
            </h3>
          </div>

        </div>

        <div className="grid grid-cols-3 gap-5">

          <div className="col-span-2 bg-white rounded-xl border p-5">

            <h3 className="font-semibold mb-4">
              Images & Evidence
            </h3>

            <div className="grid grid-cols-3 gap-3">

              <div className="bg-gray-200 h-32 rounded" />

              <div className="bg-gray-200 h-32 rounded" />

              <div className="bg-gray-200 h-32 rounded" />

            </div>

          </div>

          <AISummary />

        </div>

        <div className="grid grid-cols-3 gap-5">

          <div className="col-span-2 bg-white rounded-xl border p-5">

            <h3 className="font-semibold mb-4">
              Suggested Actions
            </h3>

            <ul className="space-y-2">
              <li>Repair pothole</li>
              <li>Improve drainage</li>
              <li>Schedule inspection</li>
            </ul>

            <button className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg">
              Start Resolution
            </button>

          </div>

          <IncidentTimeline />

        </div>

      </div>
    </DashboardLayout>
  );
}