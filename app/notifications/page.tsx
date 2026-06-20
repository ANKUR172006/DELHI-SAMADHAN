import DashboardLayout from "@/components/layout/DashboardLayout";

export default function NotificationsPage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Notifications
      </h1>

      <div className="bg-white p-6 rounded-xl border">
        <ul className="space-y-4">
          <li>🚨 Road Damage reported in Rohini</li>
          <li>⚠ SLA breach warning for PWD</li>
          <li>✅ 15 complaints resolved today</li>
        </ul>
      </div>
    </DashboardLayout>
  );
}