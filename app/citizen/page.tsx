import Link from "next/link";

export default function CitizenPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-10">

      <div className="max-w-6xl mx-auto">

        <div className="mb-8">

          <h1 className="text-4xl font-bold">
            Citizen Dashboard
          </h1>

          <p className="text-gray-500">
            Track and manage your complaints
          </p>

        </div>

        <div className="grid grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-2xl border">

            <h2 className="font-semibold text-lg">
              Total Complaints
            </h2>

            <p className="text-4xl font-bold mt-3">
              8
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl border">

            <h2 className="font-semibold text-lg">
              In Progress
            </h2>

            <p className="text-4xl font-bold mt-3">
              2
            </p>

          </div>

          <div className="bg-white p-6 rounded-2xl border">

            <h2 className="font-semibold text-lg">
              Resolved
            </h2>

            <p className="text-4xl font-bold mt-3">
              6
            </p>

          </div>

        </div>

        <div className="bg-white rounded-2xl border p-6 mt-8">

          <h2 className="text-xl font-semibold mb-4">
            My Complaints
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left p-4">
                  Complaint
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                <th className="text-left p-4">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-b">

                <td className="p-4">
                  Road Damage
                </td>

                <td className="p-4">
                  In Progress
                </td>

                <td className="p-4">

                  <Link
                    href="/tracking"
                    className="text-blue-600"
                  >
                    Track
                  </Link>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}