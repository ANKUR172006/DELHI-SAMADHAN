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
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
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
    <aside className="w-64 bg-[#062C6F] text-white min-h-screen flex flex-col">
      <div className="px-6 py-5 border-b border-blue-800">
        <h1 className="text-xl font-bold">
          Delhi Samadhan
        </h1>

        <p className="text-xs text-blue-200">
          Governance Platform
        </p>
      </div>

      <nav className="flex-1 p-4">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition
                ${pathname === item.href
                  ? "bg-blue-600"
                  : "hover:bg-blue-700"
                }`}
            >
              <Icon size={18} />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/login"
        className="flex items-center gap-3 px-6 py-5 border-t border-blue-800 hover:bg-blue-700"
      >
        <LogOut size={18} />
        Logout
      </Link>
    </aside>
  );
}