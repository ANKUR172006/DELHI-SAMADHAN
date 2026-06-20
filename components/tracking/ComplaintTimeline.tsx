const timeline = [
  {
    status: "Complaint Submitted",
    date: "19 Jun 2026",
  },
  {
    status: "Assigned to Department",
    date: "20 Jun 2026",
  },
  {
    status: "Work Started",
    date: "21 Jun 2026",
  },
  {
    status: "Pending Verification",
    date: "22 Jun 2026",
  },
];

export default function ComplaintTimeline() {
  return (
    <div className="bg-white rounded-xl border p-5">
      <h3 className="font-semibold mb-4">
        Complaint Timeline
      </h3>

      <div className="space-y-4">
        {timeline.map((item, index) => (
          <div
            key={index}
            className="flex gap-3"
          >
            <div className="w-3 h-3 rounded-full bg-blue-600 mt-1" />

            <div>
              <p className="font-medium">
                {item.status}
              </p>

              <p className="text-sm text-gray-500">
                {item.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}