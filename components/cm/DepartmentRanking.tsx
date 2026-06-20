const departments = [
  { name: "PWD", score: 92 },
  { name: "MCD", score: 88 },
  { name: "DJB", score: 84 },
  { name: "Delhi Police", score: 80 },
];

export default function DepartmentRanking() {
  return (
    <div className="bg-white rounded-xl border p-5">
      <h3 className="font-semibold mb-4">
        Department Ranking
      </h3>

      {departments.map((dept) => (
        <div
          key={dept.name}
          className="mb-4"
        >
          <div className="flex justify-between">
            <span>{dept.name}</span>
            <span>{dept.score}%</span>
          </div>

          <div className="h-2 bg-gray-200 rounded mt-1">
            <div
              className="h-2 bg-blue-600 rounded"
              style={{
                width: `${dept.score}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}