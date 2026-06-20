export default function Navbar() {
  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <div>
        <h2 className="font-bold text-xl">
          Officer Dashboard
        </h2>

        <p className="text-gray-500 text-sm">
          Real-time governance operations
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="font-medium">
            Inspector Raj
          </p>

          <p className="text-sm text-gray-500">
            PWD Department
          </p>
        </div>

        <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
          R
        </div>
      </div>
    </header>
  );
}