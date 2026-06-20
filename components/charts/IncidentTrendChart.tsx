"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", incidents: 40 },
  { day: "Tue", incidents: 55 },
  { day: "Wed", incidents: 35 },
  { day: "Thu", incidents: 60 },
  { day: "Fri", incidents: 48 },
  { day: "Sat", incidents: 70 },
];

export default function IncidentTrendChart() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">
        Incident Trend
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="incidents"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}