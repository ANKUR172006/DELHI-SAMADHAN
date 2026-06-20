import Link from "next/link";
import DelhiCarousel from "@/components/home/DelhiCarousel";

export default function Home() {
  return (
    <main>

      <section className="bg-gradient-to-r from-blue-950 to-blue-800 text-white min-h-screen flex items-center">

        <div className="container mx-auto px-10">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div>

              <h1 className="text-6xl font-bold leading-tight">
                Delhi Samadhan
              </h1>
              <p className="mt-2 text-orange-300 font-medium">
                Government of NCT of Delhi
              </p>

              <p className="mt-6 text-xl text-blue-100">
                AI Powered Grievance Management
                Platform for Citizens, Officers
                and Government Departments.
              </p>

              <div className="flex gap-4 mt-8">

                <Link
                  href="/tracking"
                  className="bg-white text-black px-6 py-3 rounded-lg font-medium"
                >
                  Track Complaint
                </Link>

                <Link
                  href="/citizen"
                  className="bg-blue-600 px-6 py-3 rounded-lg"
                >
                  Citizen Portal
                </Link>

                <Link
                  href="/login"
                  className="border border-white px-6 py-3 rounded-lg"
                >
                  Officer Login
                </Link>

              </div>

            </div>

            <DelhiCarousel />

          </div>

        </div>

      </section>

      <section className="py-20 bg-white">

        <div className="container mx-auto px-10">

          <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-slate-50 p-6 rounded-2xl hover:shadow-lg transition duration-300">
              <h3 className="text-4xl font-bold text-blue-700">
                12K+
              </h3>

              <p>Complaints Resolved</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl hover:shadow-lg transition duration-300">
              <h3 className="text-4xl font-bold text-blue-700">
                95%
              </h3>

              <p>SLA Compliance</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl hover:shadow-lg transition duration-300">
              <h3 className="text-4xl font-bold text-blue-700">
                36
              </h3>

              <p>Departments Connected</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl hover:shadow-lg transition duration-300">
              <h3 className="text-4xl font-bold text-blue-700">
                89%
              </h3>

              <p>Citizen Satisfaction</p>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}