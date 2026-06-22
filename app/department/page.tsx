"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Link from "next/link";
import { AlertTriangle, ChevronDown } from "lucide-react";
import ExecutiveKPIs from "@/components/department/ExecutiveKPIs";
import IncidentAllocationCenter from "@/components/department/IncidentAllocationCenter";
import OfficerManagementCenter from "@/components/department/OfficerManagementCenter";
import ResourceManagementCenter from "@/components/department/ResourceManagementCenter";
import SLAWarRoom from "@/components/department/SLAWarRoom";
import HotspotCommandCenter from "@/components/department/HotspotCommandCenter";
import AIGovernanceIntelligence from "@/components/department/AIGovernanceIntelligence";

const DEPARTMENTS = [
  { id: "mcd", name: "Municipal Corporation of Delhi (MCD)", shortName: "MCD" },
  { id: "pwd", name: "Public Works Department (PWD)", shortName: "PWD" },
  { id: "djb", name: "Delhi Jal Board (DJB)", shortName: "DJB" },
  { id: "traffic", name: "Delhi Traffic Police", shortName: "Traffic Police" },
  { id: "environment", name: "Delhi Pollution Control Committee", shortName: "Environment" },
  { id: "horticulture", name: "Delhi Horticulture Department", shortName: "Horticulture" },
];

export default function DepartmentPage() {
  const [selectedDept, setSelectedDept] = useState(DEPARTMENTS[0]);
  const [showDeptDropdown, setShowDeptDropdown] = useState(false);

  return (
    <DashboardLayout showSidebar={false}>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-700">Department Command Center</p>
            <div className="mt-1 flex items-center gap-3">
              <h1 className="text-3xl font-bold">Delhi Samadhan - Department Management</h1>
              <div className="relative">
                <button
                  onClick={() => setShowDeptDropdown(!showDeptDropdown)}
                  className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-800 hover:bg-slate-50"
                >
                  {selectedDept.shortName}
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                </button>
                {showDeptDropdown && (
                  <div className="absolute top-full left-0 z-50 mt-1 w-80 rounded-lg border border-slate-200 bg-white p-2 shadow-lg">
                    {DEPARTMENTS.map((dept) => (
                      <button
                        key={dept.id}
                        onClick={() => {
                          setSelectedDept(dept);
                          setShowDeptDropdown(false);
                        }}
                        className={`w-full rounded-md px-3 py-2 text-left text-sm hover:bg-slate-100 ${selectedDept.id === dept.id ? "bg-slate-100 font-semibold" : ""}`}
                      >
                        {dept.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Real-time management of officers, incidents, resources, and {selectedDept.shortName} performance.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/officer" className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700">Officer Window</Link>
              <Link href="/citizen" className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700">Citizen Window</Link>
              <Link href="/cm" className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700">CM Window</Link>
            </div>
          </div>
          <div className="rounded-md border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">
            <p className="flex items-center gap-2 font-bold">
              <AlertTriangle className="h-4 w-4" />
              Critical Alert
            </p>
            <p className="mt-1 max-w-md leading-5">2 critical incidents at risk of SLA breach. Immediate attention required.</p>
          </div>
        </div>

        {/* Executive KPIs */}
        <ExecutiveKPIs department={selectedDept} />

        {/* Main Content Grid */}
        <div className="grid gap-5 xl:grid-cols-[2fr_1fr]">
          {/* Left/ Center Column */}
          <div className="space-y-5">
            <IncidentAllocationCenter department={selectedDept} />
            <OfficerManagementCenter department={selectedDept} />
            <SLAWarRoom department={selectedDept} />
            <HotspotCommandCenter department={selectedDept} />
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <AIGovernanceIntelligence department={selectedDept} />
            <ResourceManagementCenter department={selectedDept} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
