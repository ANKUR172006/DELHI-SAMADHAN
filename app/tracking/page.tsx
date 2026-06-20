import ComplaintTimeline from "@/components/tracking/ComplaintTimeline";

export default function TrackingPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Track Your Complaint
        </h1>

        <p className="text-gray-500 mb-8">
          Enter Complaint ID to view status
        </p>

        <div className="bg-white rounded-xl border p-6 mb-6">

          <div className="grid grid-cols-2 gap-4">

            <input
              placeholder="Complaint ID"
              className="border rounded-lg p-3"
            />

            <button className="bg-blue-600 text-white rounded-lg">
              Track
            </button>

          </div>

        </div>

        <div className="grid grid-cols-3 gap-6">

          <div className="col-span-2 bg-white rounded-xl border p-6">

            <h2 className="text-2xl font-semibold mb-4">
              Complaint Details
            </h2>

            <div className="space-y-2">

              <p>
                <strong>ID:</strong> INC-101
              </p>

              <p>
                <strong>Issue:</strong> Road Damage
              </p>

              <p>
                <strong>Department:</strong> PWD
              </p>

              <p>
                <strong>Status:</strong> In Progress
              </p>

            </div>

          </div>

          <ComplaintTimeline />

        </div>

      </div>

    </div>
  );
}