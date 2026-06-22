"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  FileText,
  MapPinned,
  BarChart3,
  Bell,
  User,
  LogOut,
  BrainCircuit,
  LifeBuoy,
  ShieldCheck,
} from "lucide-react";

const menu = [
  {
    title: "Command Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Incidents",
    href: "/incidents",
    icon: FileText,
  },
  {
    title: "Department",
    href: "/department",
    icon: BarChart3,
  },
  {
    title: "CM Command",
    href: "/cm",
    icon: MapPinned,
  },
  {
    title: "Officer",
    href: "/officer",
    icon: User,
  },
  {
    title: "Citizen",
    href: "/citizen",
    icon: User,
  },
  {
    title: "Tracking",
    href: "/tracking",
    icon: Bell,
  },
  {
    title: "Admin",
    href: "/admin",
    icon: User,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-[17rem] shrink-0 flex-col border-r border-slate-200 bg-[#eef4ff] text-slate-950 lg:flex">
      <div className="border-b border-slate-200 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-slate-950 text-white">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-black leading-tight">
              Delhi Samadhan
            </h1>
            <p className="text-xs font-medium text-slate-500">
              Governance Intelligence
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex h-11 items-center gap-3 rounded-md px-3 text-sm font-semibold transition ${
                active
                  ? "border border-dashed border-sky-400 bg-white text-slate-950 shadow-sm"
                  : "text-slate-600 hover:bg-white hover:text-slate-950"
              }`}
            >
              <Icon size={17} />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="m-3 rounded-md bg-[#052b4d] p-4 text-white">
        <div className="mb-3 flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-cyan-200" />
          <p className="text-sm font-black">AI Copilot</p>
        </div>
        <p className="text-xs leading-5 text-blue-100">
          System identified 3 bottlenecks in waste management and road repair.
        </p>
        <button className="mt-4 h-9 w-full rounded-md bg-white text-xs font-black text-slate-950">
          Review Strategy
        </button>
      </div>

      <div className="border-t border-slate-200 p-3">
        <Link
          href="/notifications"
          className="flex h-10 items-center gap-3 rounded-md px-3 text-sm font-semibold text-slate-600 hover:bg-white"
        >
          <LifeBuoy size={17} />
          Support
        </Link>
        <Link
          href="/login"
          className="flex h-10 items-center gap-3 rounded-md px-3 text-sm font-semibold text-slate-600 hover:bg-white"
        >
          <LogOut size={17} />
          Logout
        </Link>
      </div>
    </aside>
  );
}
