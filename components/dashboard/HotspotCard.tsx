const hotspots = [
  { area: "Rohini", count: 12 },
  { area: "East Delhi", count: 9 },
  { area: "Dwarka", count: 6 },
  { area: "Shahdara", count: 5 },
];

export default function HotspotCard() {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-5">
      <h3 className="font-semibold mb-4">
        Hotspots
      </h3>

      {hotspots.map((spot) => (
        <div
          key={spot.area}
          className="mb-4"
        >
          <div className="flex justify-between">
            <span>{spot.area}</span>

            <span>{spot.count}</span>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded mt-1">
            <div
              className="bg-red-500 h-2 rounded"
              style={{
                width: `${spot.count * 8}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}