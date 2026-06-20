import DashboardLayout from "@/components/layout/DashboardLayout";

export default function HotspotsPage() {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        Hotspot Analysis
      </h1>

      <div className="bg-white p-6 rounded-xl border">
        <p>Delhi hotspot heatmap and area rankings.</p>
      </div>
    </DashboardLayout>
  );
}