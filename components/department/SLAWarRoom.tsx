"use client";

import { useState } from "react";
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  User,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SLAIncident {
  id: string;
  category: string;
  status: "SAFE" | "AT_RISK" | "BREACHED" | "CRITICAL";
  remainingHours: string;
  riskScore: number;
  assignedOfficer: string;
  predictedBreach: number;
  recommendedAction: string;
}

const SLAWarRoom = () => {
  const [activeStatus, setActiveStatus] = useState<"all" | "safe" | "atRisk" | "breached" | "critical">("all");

  const incidents: SLAIncident[] = [
    {
      id: "INC-2026-1045",
      category: "Garbage Accumulation",
      status: "AT_RISK",
      remainingHours: "8h 32m",
      riskScore: 68,
      assignedOfficer: "R. K. Sharma",
      predictedBreach: 45,
      recommendedAction: "Reallocate 1 team to assist",
    },
    {
      id: "INC-2026-0892",
      category: "Water Leakage",
      status: "CRITICAL",
      remainingHours: "1h 15m",
      riskScore: 95,
      assignedOfficer: "Ananya Goel",
      predictedBreach: 90,
      recommendedAction: "Escalate to emergency team",
    },
    {
      id: "INC-2026-1123",
      category: "Road Potholes",
      status: "SAFE",
      remainingHours: "2d 12h",
      riskScore: 22,
      assignedOfficer: "Vikram Singh",
      predictedBreach: 10,
      recommendedAction: "Monitor progress",
    },
    {
      id: "INC-2026-0918",
      category: "Sewer Blockage",
      status: "BREACHED",
      remainingHours: "-2h 15m",
      riskScore: 88,
      assignedOfficer: "Priya Mehta",
      predictedBreach: 100,
      recommendedAction: "Assign additional resources immediately",
    },
    {
      id: "INC-2026-1201",
      category: "Encroachment",
      status: "AT_RISK",
      remainingHours: "4h 30m",
      riskScore: 72,
      assignedOfficer: "Rajesh Kumar",
      predictedBreach: 55,
      recommendedAction: "Prioritize over low-severity tasks",
    },
  ];

  const filteredIncidents = (() => {
    if (activeStatus === "all") return incidents;
    const statusMap = {
      safe: "SAFE",
      atRisk: "AT_RISK",
      breached: "BREACHED",
      critical: "CRITICAL",
    };
    return incidents.filter((i) => i.status === statusMap[activeStatus as keyof typeof statusMap]);
  })();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SAFE":
        return "bg-green-100 text-green-800";
      case "AT_RISK":
        return "bg-amber-100 text-amber-800";
      case "BREACHED":
        return "bg-red-100 text-red-800";
      case "CRITICAL":
        return "bg-rose-100 text-rose-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "SAFE":
        return <CheckCircle2 className="h-4 w-4" />;
      case "AT_RISK":
        return <AlertTriangle className="h-4 w-4" />;
      case "BREACHED":
        return <ShieldAlert className="h-4 w-4" />;
      case "CRITICAL":
        return <ShieldAlert className="h-4 w-4" />;
      default:
        return <CheckCircle2 className="h-4 w-4" />;
    }
  };

  const tabs = [
    { key: "all", label: "All" },
    { key: "safe", label: "Safe", icon: CheckCircle2 },
    { key: "atRisk", label: "At Risk", icon: AlertTriangle },
    { key: "breached", label: "Breached", icon: ShieldAlert },
    { key: "critical", label: "Critical", icon: ShieldAlert },
  ];

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            SLA War Room
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Monitor and manage SLA compliance for all incidents
          </p>
        </div>
        <Button>Generate Report</Button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveStatus(tab.key as any)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                activeStatus === tab.key
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {Icon && <Icon className="h-4 w-4" />}
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 space-y-3">
        {filteredIncidents.map((incident) => (
          <div
            key={incident.id}
            className="flex flex-col gap-3 rounded-lg border border-slate-200 p-4"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-slate-900">{incident.id}</p>
                  <Badge className={getStatusColor(incident.status)}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(incident.status)}
                      {incident.status}
                    </span>
                  </Badge>
                </div>
                <p className="text-sm text-slate-600">{incident.category}</p>
              </div>
              <Button variant="ghost" size="sm">
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">
                  Remaining: <span className="font-semibold">{incident.remainingHours}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">
                  Risk Score: <span className="font-semibold">{incident.riskScore}/100</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">
                  Officer: <span className="font-semibold">{incident.assignedOfficer}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">
                  Breach Probability: <span className="font-semibold">{incident.predictedBreach}%</span>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-3">
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Recommended Action
                </p>
                <p className="text-sm text-slate-800">{incident.recommendedAction}</p>
              </div>
              <Button size="sm">Take Action</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SLAWarRoom;
