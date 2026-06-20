import DashboardLayout from "@/components/layout/DashboardLayout";

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="bg-white p-8 rounded-xl border max-w-2xl">

        <h1 className="text-3xl font-bold mb-6">
          Profile
        </h1>

        <div className="space-y-4">

          <p>
            <strong>Name:</strong> Inspector Raj
          </p>

          <p>
            <strong>Department:</strong> PWD
          </p>

          <p>
            <strong>Email:</strong> raj@delhi.gov.in
          </p>

          <p>
            <strong>Role:</strong> Officer
          </p>

        </div>

      </div>
    </DashboardLayout>
  );
}