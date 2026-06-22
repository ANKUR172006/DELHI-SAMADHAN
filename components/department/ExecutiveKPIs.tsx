"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Users,
  Target,
  Star,
  Activity,
  TrendingUp,
  ShieldAlert,
} from "lucide-react";

interface KPI {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  color?: "blue" | "green" | "amber" | "red" | "purple";
}

interface Department {
  id: string;
  name: string;
  shortName: string;
}

const DEPARTMENT_KPIS: Record<string, KPI[]> = {
  mcd: [
    { label: "Total Active Incidents", value: "214", sub: "45 added today", icon: Activity, color: "blue" },
    { label: "Critical Incidents", value: "22", sub: "5 at emergency level", icon: ShieldAlert, color: "red" },
    { label: "Unassigned Incidents", value: "31", sub: "18 awaiting >4hrs", icon: AlertTriangle, color: "amber" },
    { label: "Active Officers", value: "54", sub: "7 on leave", icon: Users, color: "green" },
    { label: "Available Teams", value: "19", sub: "28 total teams", icon: Target, color: "purple" },
    { label: "SLA Compliance %", value: "83.5%", sub: "Target: 95%", icon: Clock, color: "amber" },
    { label: "Citizen Satisfaction", value: "4.4/5", sub: "12,450 reviews", icon: Star, color: "green" },
    { label: "Department Health Score", value: "79", sub: "Last month: 76", icon: CheckCircle2, color: "green" },
    { label: "Resolved This Month", value: "1,532", sub: "+9.1% vs last month", icon: TrendingUp, color: "green" },
    { label: "Escalated Incidents", value: "12", sub: "Requires urgent action", icon: AlertTriangle, color: "red" },
  ],
  pwd: [
    { label: "Total Active Incidents", value: "98", sub: "22 added today", icon: Activity, color: "blue" },
    { label: "Critical Incidents", value: "11", sub: "2 at emergency level", icon: ShieldAlert, color: "red" },
    { label: "Unassigned Incidents", value: "15", sub: "6 awaiting >4hrs", icon: AlertTriangle, color: "amber" },
    { label: "Active Officers", value: "28", sub: "3 on leave", icon: Users, color: "green" },
    { label: "Available Teams", value: "12", sub: "18 total teams", icon: Target, color: "purple" },
    { label: "SLA Compliance %", value: "89.2%", sub: "Target: 95%", icon: Clock, color: "amber" },
    { label: "Citizen Satisfaction", value: "4.6/5", sub: "5,890 reviews", icon: Star, color: "green" },
    { label: "Department Health Score", value: "86", sub: "Last month: 83", icon: CheckCircle2, color: "green" },
    { label: "Resolved This Month", value: "756", sub: "+15.2% vs last month", icon: TrendingUp, color: "green" },
    { label: "Escalated Incidents", value: "5", sub: "Requires urgent action", icon: AlertTriangle, color: "red" },
  ],
  djb: [
    { label: "Total Active Incidents", value: "87", sub: "19 added today", icon: Activity, color: "blue" },
    { label: "Critical Incidents", value: "14", sub: "4 at emergency level", icon: ShieldAlert, color: "red" },
    { label: "Unassigned Incidents", value: "12", sub: "5 awaiting >4hrs", icon: AlertTriangle, color: "amber" },
    { label: "Active Officers", value: "24", sub: "2 on leave", icon: Users, color: "green" },
    { label: "Available Teams", value: "10", sub: "16 total teams", icon: Target, color: "purple" },
    { label: "SLA Compliance %", value: "91.5%", sub: "Target: 95%", icon: Clock, color: "green" },
    { label: "Citizen Satisfaction", value: "4.7/5", sub: "4,320 reviews", icon: Star, color: "green" },
    { label: "Department Health Score", value: "89", sub: "Last month: 85", icon: CheckCircle2, color: "green" },
    { label: "Resolved This Month", value: "689", sub: "+11.5% vs last month", icon: TrendingUp, color: "green" },
    { label: "Escalated Incidents", value: "7", sub: "Requires urgent action", icon: AlertTriangle, color: "red" },
  ],
  traffic: [
    { label: "Total Active Incidents", value: "76", sub: "18 added today", icon: Activity, color: "blue" },
    { label: "Critical Incidents", value: "9", sub: "2 at emergency level", icon: ShieldAlert, color: "red" },
    { label: "Unassigned Incidents", value: "11", sub: "4 awaiting >4hrs", icon: AlertTriangle, color: "amber" },
    { label: "Active Officers", value: "32", sub: "4 on leave", icon: Users, color: "green" },
    { label: "Available Teams", value: "14", sub: "20 total teams", icon: Target, color: "purple" },
    { label: "SLA Compliance %", value: "94.1%", sub: "Target: 95%", icon: Clock, color: "green" },
    { label: "Citizen Satisfaction", value: "4.5/5", sub: "3,780 reviews", icon: Star, color: "green" },
    { label: "Department Health Score", value: "92", sub: "Last month: 90", icon: CheckCircle2, color: "green" },
    { label: "Resolved This Month", value: "987", sub: "+8.3% vs last month", icon: TrendingUp, color: "green" },
    { label: "Escalated Incidents", value: "3", sub: "Requires urgent action", icon: AlertTriangle, color: "red" },
  ],
  environment: [
    { label: "Total Active Incidents", value: "54", sub: "12 added today", icon: Activity, color: "blue" },
    { label: "Critical Incidents", value: "8", sub: "2 at emergency level", icon: ShieldAlert, color: "red" },
    { label: "Unassigned Incidents", value: "9", sub: "3 awaiting >4hrs", icon: AlertTriangle, color: "amber" },
    { label: "Active Officers", value: "18", sub: "2 on leave", icon: Users, color: "green" },
    { label: "Available Teams", value: "8", sub: "12 total teams", icon: Target, color: "purple" },
    { label: "SLA Compliance %", value: "87.3%", sub: "Target: 95%", icon: Clock, color: "amber" },
    { label: "Citizen Satisfaction", value: "4.3/5", sub: "2,890 reviews", icon: Star, color: "green" },
    { label: "Department Health Score", value: "81", sub: "Last month: 78", icon: CheckCircle2, color: "green" },
    { label: "Resolved This Month", value: "456", sub: "+7.9% vs last month", icon: TrendingUp, color: "green" },
    { label: "Escalated Incidents", value: "4", sub: "Requires urgent action", icon: AlertTriangle, color: "red" },
  ],
  horticulture: [
    { label: "Total Active Incidents", value: "43", sub: "9 added today", icon: Activity, color: "blue" },
    { label: "Critical Incidents", value: "5", sub: "1 at emergency level", icon: ShieldAlert, color: "red" },
    { label: "Unassigned Incidents", value: "7", sub: "2 awaiting >4hrs", icon: AlertTriangle, color: "amber" },
    { label: "Active Officers", value: "16", sub: "1 on leave", icon: Users, color: "green" },
    { label: "Available Teams", value: "7", sub: "11 total teams", icon: Target, color: "purple" },
    { label: "SLA Compliance %", value: "90.4%", sub: "Target: 95%", icon: Clock, color: "green" },
    { label: "Citizen Satisfaction", value: "4.6/5", sub: "2,340 reviews", icon: Star, color: "green" },
    { label: "Department Health Score", value: "88", sub: "Last month: 84", icon: CheckCircle2, color: "green" },
    { label: "Resolved This Month", value: "398", sub: "+13.2% vs last month", icon: TrendingUp, color: "green" },
    { label: "Escalated Incidents", value: "2", sub: "Requires urgent action", icon: AlertTriangle, color: "red" },
  ],
};

const ExecutiveKPIs = ({ department }: { department: Department }) => {
  const kpis = DEPARTMENT_KPIS[department.id] || DEPARTMENT_KPIS.mcd;

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-50 text-blue-700";
      case "green":
        return "bg-green-50 text-green-700";
      case "amber":
        return "bg-amber-50 text-amber-700";
      case "red":
        return "bg-red-50 text-red-700";
      case "purple":
        return "bg-purple-50 text-purple-700";
      default:
        return "bg-slate-50 text-slate-700";
    }
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div
            key={idx}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {kpi.label}
              </p>
              <div className={`rounded-md p-2 ${getColorClasses(kpi.color || "blue")}`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900">{kpi.value}</p>
            {kpi.sub && (
              <p className="mt-1 text-xs text-slate-500">{kpi.sub}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ExecutiveKPIs;
