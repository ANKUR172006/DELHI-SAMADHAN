import Link from "next/link";

const incidents = [
    {
        id: "INC-101",
        title: "Road Damage",
        severity: "High",
        impact: 92,
        complaints: 100,
        status: "In Progress",
    },

    {
        id: "INC-102",
        title: "Water Leakage",
        severity: "High",
        impact: 85,
        complaints: 56,
        status: "In Progress",
    },

    {
        id: "INC-103",
        title: "Garbage Dump",
        severity: "Medium",
        impact: 68,
        complaints: 42,
        status: "Assigned",
    },
];

export default function IncidentTable() {
    return (
        <div className="bg-white rounded-xl border shadow-sm p-5">
            <h3 className="font-semibold mb-4">
                Incidents Overview
            </h3>

            <table className="w-full">

                <thead className="bg-slate-50">

                    <tr className="border-b">

                        <th className="text-left p-4">
                            Incident
                        </th>

                        <th className="text-left p-4">
                            Severity
                        </th>

                        <th className="text-left p-4">
                            Impact
                        </th>

                        <th className="text-left p-4">
                            Complaints
                        </th>

                        <th className="text-left p-4">
                            Status
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {incidents.map((incident) => (

                        <tr
                            key={incident.id}
                            className="border-b hover:bg-slate-50 transition"
                        >

                            <td className="p-4">

                                <Link
                                    href={`/incidents/${incident.id.replace("INC-", "")}`}
                                    className="text-blue-600 hover:underline font-medium"
                                >
                                    {incident.title}
                                </Link>

                            </td>

                            <td className="p-4">

                                <span
                                    className={`px-3 py-1 rounded-full text-sm ${incident.severity === "High"
                                            ? "bg-red-100 text-red-700"
                                            : incident.severity === "Medium"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-green-100 text-green-700"
                                        }`}
                                >
                                    {incident.severity}
                                </span>

                            </td>

                            <td className="p-4">
                                {incident.impact}
                            </td>

                            <td className="p-4">
                                {incident.complaints}
                            </td>

                            <td className="p-4">

                                <span className="
             bg-blue-100
            text-blue-700
            px-3
            py-1
            rounded-full
            text-sm
          ">
                                    {incident.status}
                                </span>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>
        </div>
    );
}