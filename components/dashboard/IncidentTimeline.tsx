const timeline = [
  "Complaint Received",
  "Incident Created",
  "Assigned to Officer",
  "Work In Progress",
  "Resolved",
];

export default function IncidentTimeline() {
  return (
    <div className="bg-white rounded-xl border p-5">
      <h3 className="font-semibold mb-4">
        Incident Timeline
      </h3>

      <div className="space-y-4">
        {timeline.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3"
          >
            <div className="w-3 h-3 rounded-full bg-blue-600" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}