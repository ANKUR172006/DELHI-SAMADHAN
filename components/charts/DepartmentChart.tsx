"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", incidents: 40 },
  { day: "Tue", incidents: 55 },
  { day: "Wed", incidents: 35 },
  { day: "Thu", incidents: 60 },
  { day: "Fri", incidents: 48 },
  { day: "Sat", incidents: 70 },
];

export default function DepartmentChart() {
  return (
    <div className="bg-white rounded-xl border p-5">
      <h3 className="font-semibold mb-4">
        Incident Trend
      </h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="incidents"
              stroke="#2563eb"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}