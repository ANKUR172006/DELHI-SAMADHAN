import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Eye,
  Landmark,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const roleOptions = [
  { label: "Citizen", href: "/citizen", icon: UserRound },
  { label: "Officer", href: "/officer", icon: ShieldCheck },
  { label: "Department", href: "/department", icon: Building2 },
  { label: "CM Office", href: "/cm", icon: Landmark },
];

export default function LoginPage() {
  return (
    <main className="grid min-h-screen bg-slate-50 text-slate-950 lg:grid-cols-[1.15fr_0.85fr]">
      <section
        className="relative hidden min-h-screen overflow-hidden bg-cover bg-center text-white lg:block"
        style={{ backgroundImage: "url('/images/india-gate1.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#06283f]/82" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,188,212,0.15)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:42px_42px]" />
        <div className="relative flex min-h-screen flex-col justify-between p-12">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-md bg-white text-slate-950">
              <Landmark className="h-6 w-6" />
            </span>
            <span>
              <span className="block text-3xl font-black leading-none">Delhi Samadhan</span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">Government Intelligence Division</span>
            </span>
          </Link>

          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-md bg-cyan-300/18 px-3 py-1 text-xs font-black uppercase tracking-wide text-cyan-100">
              Secure Mission Access
            </p>
            <h1 className="text-5xl font-black leading-tight">
              Towards a <span className="text-cyan-200">Smart, Responsive</span> Delhi.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100">
              Centralized command and grievance resolution for officials with real-time intelligence, citizen data, and department workflows.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-3 gap-4">
            {["98% accuracy", "Real-time monitoring", "Verified access"].map((item) => (
              <div key={item} className="border-l-2 border-cyan-300 bg-white/10 p-4 backdrop-blur">
                <p className="text-xl font-black">{item.split(" ")[0]}</p>
                <p className="text-xs font-semibold text-blue-100">{item.replace(item.split(" ")[0], "").trim()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Link href="/" className="text-2xl font-black">Delhi Samadhan</Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-black">Officer Authentication</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Access the Mission Control Dashboard with credentials provided by the IT Department.
            </p>
          </div>

          <div className="mb-5 grid grid-cols-2 gap-2">
            {roleOptions.map(({ label, href, icon: Icon }) => (
              <Link key={label} href={href} className="flex h-12 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700 hover:border-teal-500 hover:text-teal-800">
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </div>

          <form className="space-y-4 rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <label className="block">
              <span className="text-xs font-black uppercase tracking-wide text-slate-500">Select Designation</span>
              <select className="mt-2 h-12 w-full rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold outline-none focus:border-teal-600">
                <option>Officer</option>
                <option>Department Admin</option>
                <option>CM Office Analyst</option>
                <option>Citizen Services</option>
              </select>
            </label>

            <label className="block">
              <span className="text-xs font-black uppercase tracking-wide text-slate-500">Officer ID or Email</span>
              <div className="mt-2 flex h-12 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 focus-within:border-teal-600">
                <Mail className="h-4 w-4 text-slate-500" />
                <input type="email" defaultValue="e.g. DL-2024-OFF-01" className="min-w-0 flex-1 text-sm font-semibold outline-none" />
              </div>
            </label>

            <label className="block">
              <span className="flex items-center justify-between text-xs font-black uppercase tracking-wide text-slate-500">
                Security Password
                <Link href="/login" className="text-teal-700">Forgot Password</Link>
              </span>
              <div className="mt-2 flex h-12 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 focus-within:border-teal-600">
                <LockKeyhole className="h-4 w-4 text-slate-500" />
                <input type="password" defaultValue="delhisamadhan" className="min-w-0 flex-1 text-sm font-semibold outline-none" />
                <Eye className="h-4 w-4 text-slate-500" />
              </div>
            </label>

            <label className="flex items-center gap-3 text-sm font-semibold text-slate-600">
              <input type="checkbox" className="h-4 w-4 accent-teal-700" />
              Keep me authenticated for this session
            </label>

            <Link href="/officer" className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-slate-950 text-sm font-black text-white">
              Secure Login
              <ArrowRight className="h-4 w-4" />
            </Link>
          </form>

          <p className="mt-10 text-center text-[11px] font-semibold leading-5 text-slate-500">
            Unauthorized access is strictly prohibited and monitored under the Government of NCT Delhi information security policy.
          </p>
        </div>
      </section>
    </main>
  );
}
