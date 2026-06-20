const alerts = [
  "Major road damage reported in Rohini",
  "Water supply disruption in Dwarka",
  "Garbage overflow in Shahdara",
  "Streetlight outage in New Delhi",
];

export default function RecentAlerts() {
  return (
    <div className="bg-white rounded-xl border p-5">
      <h3 className="font-semibold mb-4">
        Recent Alerts
      </h3>

      <ul className="space-y-3">
        {alerts.map((alert, index) => (
          <li
            key={index}
            className="border-b pb-2"
          >
            {alert}
          </li>
        ))}
      </ul>
    </div>
  );
}