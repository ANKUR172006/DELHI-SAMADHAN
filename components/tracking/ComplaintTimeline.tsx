const steps = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "ASSIGNED",
  "IN_PROGRESS",
  "RESOLVED",
];

interface Props {
  currentStatus?: string;
}

export default function ComplaintTimeline({ currentStatus = "SUBMITTED" }: Props) {
  const matchedIndex = steps.findIndex((step) => step === currentStatus);
  const currentIndex = matchedIndex >= 0 ? matchedIndex : 0;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-950">Timeline</h2>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-3">
            <div
              className={`h-4 w-4 rounded-full ${
                index <= currentIndex ? "bg-blue-700" : "bg-slate-300"
              }`}
            />
            <p className="text-sm font-medium text-slate-800">{step.replace("_", " ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

