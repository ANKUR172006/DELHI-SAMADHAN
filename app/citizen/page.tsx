import Link from "next/link";
import {
  Bell,
  CalendarDays,
  CheckCircle2,
  Eye,
  History,
  MapPin,
  MessageCircle,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import ComplaintRegistration from "@/components/citizen/ComplaintRegistration";

const citizenFeatures = [
  {
    icon: MessageCircle,
    title: "WhatsApp first",
    body: "Image, audio, text, and location are understood together.",
  },
  {
    icon: ShieldCheck,
    title: "AI routed",
    body: "Category, department, and severity are assigned automatically.",
  },
  {
    icon: RefreshCw,
    title: "Citizen verified",
    body: "Resolved complaints can be approved, rejected, or reopened.",
  },
];

export default function CitizenPage() {
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="text-2xl font-black">Delhi Samadhan</Link>
          <div className="hidden h-10 w-80 items-center gap-2 rounded-md bg-slate-100 px-3 text-sm text-slate-500 md:flex">
            <MapPin className="h-4 w-4" />
            Search your complaint status...
          </div>
          <Link href="/login" className="rounded-md bg-slate-950 px-4 py-2 text-sm font-bold text-white">
            Officer Login
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6">
        <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-950">Welcome back, Citizen</h1>
            <p className="mt-2 max-w-2xl text-slate-600">
              Your voice is building a better Delhi. Track active resolutions and submit new issues below.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/officer" className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-black text-slate-700">Officer Window</Link>
              <Link href="/department" className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-black text-slate-700">Department Window</Link>
              <Link href="/cm" className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-black text-slate-700">CM Window</Link>
            </div>
          </div>
          <Link
            href="/tracking"
            className="inline-flex h-11 items-center justify-center rounded-md border border-teal-700 px-5 font-bold text-teal-800"
          >
            Track existing complaint
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
          <section className="space-y-5">
            <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-teal-700">Active Complaint</p>
                  <h2 className="mt-1 text-xl font-black">#DS-2024-8842: Pothole at Sector 12</h2>
                </div>
                <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-black text-teal-800">In Progress</span>
              </div>

              <div className="mt-7 grid grid-cols-5 items-center gap-2">
                {["Verification", "AI Grouped", "Assigned", "Resolving", "Verified"].map((step, index) => (
                  <div key={step} className="relative text-center">
                    <div className={`mx-auto h-4 w-4 rounded-full ${index < 3 ? "bg-teal-700" : "bg-slate-300"}`} />
                    {index < 4 && <div className={`absolute left-[calc(50%+12px)] top-2 h-0.5 w-[calc(100%-24px)] ${index < 2 ? "bg-teal-700" : "bg-slate-300"}`} />}
                    <p className="mt-3 text-[11px] font-bold text-slate-600">{step}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7 grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-slate-500">Department</p>
                  <p className="mt-1 font-bold text-slate-950">Public Works Department (PWD)</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wide text-slate-500">Expected Completion</p>
                  <p className="mt-1 flex items-center gap-2 font-bold text-slate-950">
                    <CalendarDays className="h-4 w-4 text-teal-700" />
                    October 24, 2024
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="flex items-center gap-2 text-lg font-black">
                <Eye className="h-5 w-5" />
                Resolution Evidence
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <div className="h-40 rounded-md bg-[url('/images/india-gate1.jpg')] bg-cover bg-center" />
                  <p className="mt-3 text-xs font-semibold text-slate-600">Citizen upload on Oct 12, 10:45 AM</p>
                </div>
                <div>
                  <div className="grid h-40 place-items-center rounded-md bg-slate-900 text-white">
                    <div className="text-center">
                      <CheckCircle2 className="mx-auto h-8 w-8 text-cyan-200" />
                      <p className="mt-2 font-black">Awaiting Final Polish</p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs font-semibold text-slate-600">Field agent update on Oct 20, 04:12 PM</p>
                </div>
              </div>
            </div>

            <ComplaintRegistration />
          </section>

          <aside className="space-y-5">
            <div className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="flex items-center gap-2 font-black"><History className="h-4 w-4" /> History</h2>
                <Link href="/tracking" className="text-xs font-black text-teal-700">View All</Link>
              </div>
              {["Street Light Out", "Garbage Overflow", "Drainage Block"].map((item, index) => (
                <div key={item} className="border-t border-slate-200 py-4 first:border-t-0 first:pt-0">
                  <p className="text-sm font-black">{item}</p>
                  <p className="text-xs text-slate-500">{index === 0 ? "Janakpuri West" : index === 1 ? "Block C, Pocket 2" : "Lajpat Nagar"}</p>
                  <p className="mt-1 text-[11px] font-black uppercase text-teal-700">Resolved</p>
                </div>
              ))}
            </div>

            <div className="rounded-md bg-[#052b4d] p-5 text-white shadow-sm">
              <h2 className="flex items-center gap-2 font-black">
                <Bell className="h-5 w-5 text-cyan-200" />
                Recent Alerts
              </h2>
              <div className="mt-4 space-y-3">
                <div className="rounded-md bg-white/10 p-3">
                  <p className="text-xs font-black">Incident Update</p>
                  <p className="mt-1 text-xs leading-5 text-blue-100">AI grouped your pothole report with 4 others in the same area.</p>
                </div>
                <div className="rounded-md bg-white/10 p-3">
                  <p className="text-xs font-black">New Service Available</p>
                  <p className="mt-1 text-xs leading-5 text-blue-100">You can now report parking issues through Express Samadhan.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {citizenFeatures.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-md border border-slate-200 bg-white p-5">
              <Icon className="mb-4 h-6 w-6 text-teal-700" />
              <h2 className="font-black text-slate-950">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
