export default function CommandMap() {
  return (
    <div className="bg-white rounded-xl border p-5">
      <h3 className="font-semibold mb-4">
        Delhi Incident Heatmap
      </h3>

      <div className="h-80 rounded-lg bg-gradient-to-br from-blue-100 to-red-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            Delhi Map
          </h2>

          <p className="text-gray-600">
            Live Incident Heatmap
          </p>
        </div>
      </div>
    </div>
  );
}