export default function LoginPage() {
  return (
    <div className="min-h-screen flex">

      <div className="w-1/2 bg-blue-900 text-white flex flex-col justify-center p-16">
        <h1 className="text-5xl font-bold mb-4">
          Delhi Samadhan
        </h1>

        <p className="text-lg text-blue-100">
          AI Powered Governance & Grievance Platform
        </p>
      </div>

      <div className="w-1/2 flex items-center justify-center bg-slate-50">

        <div className="bg-white p-8 rounded-xl border w-[400px]">

          <h2 className="text-2xl font-bold mb-6">
            Officer Login
          </h2>

          <div className="space-y-4">

            <input
              type="email"
              placeholder="Email"
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-3 rounded-lg"
            />

            <button className="w-full bg-blue-600 text-white p-3 rounded-lg">
              Sign In
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}