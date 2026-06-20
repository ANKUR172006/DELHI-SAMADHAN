"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Road Damage", value: 35 },
  { name: "Water Leakage", value: 25 },
  { name: "Garbage", value: 20 },
  { name: "Street Light", value: 20 },
];

const COLORS = [
  "#2563eb",
  "#0ea5e9",
  "#14b8a6",
  "#f59e0b",
];

export default function IncidentCategoryChart() {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">
        Incident Categories
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}