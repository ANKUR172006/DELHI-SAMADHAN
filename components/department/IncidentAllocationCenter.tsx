"use client";

import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Clock,
  Filter,
  MapPin,
  MoreHorizontal,
  ShieldAlert,
  User,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Incident {
  id: string;
  category: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  impactScore: number;
  complaintCount: number;
  district: string;
  ward: string;
  assignedOfficer?: string;
  status: string;
  slaRemaining: string;
  recommendedOfficer: string;
  isEscalated?: boolean;
}

interface Department {
  id: string;
  name: string;
  shortName: string;
}

const DEPARTMENT_INCIDENTS: Record<string, Incident[]> = {
  mcd: [
    { id: "INC-MCD-001", category: "Garbage Accumulation", priority: "HIGH", impactScore: 78, complaintCount: 12, district: "South Delhi", ward: "Ward 18", status: "UNASSIGNED", slaRemaining: "8h 32m", recommendedOfficer: "R. K. Sharma" },
    { id: "INC-MCD-002", category: "Drain Blockage", priority: "CRITICAL", impactScore: 90, complaintCount: 8, district: "East Delhi", ward: "Ward 32", assignedOfficer: "Sunita Verma", status: "IN_PROGRESS", slaRemaining: "2h 15m", recommendedOfficer: "Sunita Verma", isEscalated: true },
    { id: "INC-MCD-003", category: "Stray Dog Issue", priority: "MEDIUM", impactScore: 55, complaintCount: 5, district: "North Delhi", ward: "Ward 19", status: "UNASSIGNED", slaRemaining: "1d 12h", recommendedOfficer: "Amit Singh" },
    { id: "INC-MCD-004", category: "Illegal Encroachment", priority: "HIGH", impactScore: 82, complaintCount: 15, district: "New Delhi", ward: "Ward 5", assignedOfficer: "Rajesh Kumar", status: "ASSIGNED", slaRemaining: "18h 40m", recommendedOfficer: "Rajesh Kumar" },
    { id: "INC-MCD-005", category: "Mosquito Breeding", priority: "MEDIUM", impactScore: 60, complaintCount: 7, district: "West Delhi", ward: "Ward 11", status: "UNASSIGNED", slaRemaining: "2d 4h", recommendedOfficer: "Priya Mehta" },
  ],
  pwd: [
    { id: "INC-PWD-001", category: "Road Potholes", priority: "HIGH", impactScore: 85, complaintCount: 18, district: "North Delhi", ward: "Ward 22", assignedOfficer: "Vikram Singh", status: "IN_PROGRESS", slaRemaining: "12h 45m", recommendedOfficer: "Vikram Singh" },
    { id: "INC-PWD-002", category: "Footpath Damage", priority: "MEDIUM", impactScore: 58, complaintCount: 6, district: "South Delhi", ward: "Ward 25", status: "UNASSIGNED", slaRemaining: "1d 8h", recommendedOfficer: "Neha Gupta" },
    { id: "INC-PWD-003", category: "Flyover Crack", priority: "CRITICAL", impactScore: 95, complaintCount: 4, district: "East Delhi", ward: "Ward 41", assignedOfficer: "Rahul Sharma", status: "IN_PROGRESS", slaRemaining: "5h 30m", recommendedOfficer: "Rahul Sharma", isEscalated: true },
  ],
  djb: [
    { id: "INC-DJB-001", category: "Water Leakage", priority: "CRITICAL", impactScore: 92, complaintCount: 9, district: "West Delhi", ward: "Ward 7", assignedOfficer: "Ananya Goel", status: "IN_PROGRESS", slaRemaining: "1h 15m", recommendedOfficer: "Ananya Goel", isEscalated: true },
    { id: "INC-DJB-002", category: "Low Water Pressure", priority: "MEDIUM", impactScore: 52, complaintCount: 12, district: "North Delhi", ward: "Ward 14", status: "UNASSIGNED", slaRemaining: "1d 10h", recommendedOfficer: "Suresh Kumar" },
    { id: "INC-DJB-003", category: "Sewer Blockage", priority: "HIGH", impactScore: 75, complaintCount: 7, district: "South Delhi", ward: "Ward 31", assignedOfficer: "Meera Patel", status: "ASSIGNED", slaRemaining: "16h 20m", recommendedOfficer: "Meera Patel" },
  ],
  traffic: [
    { id: "INC-TRAFFIC-001", category: "Traffic Signal Not Working", priority: "CRITICAL", impactScore: 88, complaintCount: 15, district: "New Delhi", ward: "Ward 8", assignedOfficer: "Inspector Rajesh", status: "IN_PROGRESS", slaRemaining: "3h 45m", recommendedOfficer: "Inspector Rajesh", isEscalated: true },
    { id: "INC-TRAFFIC-002", category: "Illegal Parking", priority: "MEDIUM", impactScore: 48, complaintCount: 10, district: "South Delhi", ward: "Ward 15", status: "UNASSIGNED", slaRemaining: "1d 6h", recommendedOfficer: "Constable Priya" },
    { id: "INC-TRAFFIC-003", category: "Speed Breaker Missing", priority: "HIGH", impactScore: 70, complaintCount: 6, district: "North Delhi", ward: "Ward 28", assignedOfficer: "Inspector Anil", status: "ASSIGNED", slaRemaining: "14h 10m", recommendedOfficer: "Inspector Anil" },
  ],
  environment: [
    { id: "INC-ENV-001", category: "Air Pollution Hotspot", priority: "CRITICAL", impactScore: 94, complaintCount: 22, district: "East Delhi", ward: "Ward 52", assignedOfficer: "Dr. Arora", status: "IN_PROGRESS", slaRemaining: "4h 20m", recommendedOfficer: "Dr. Arora", isEscalated: true },
    { id: "INC-ENV-002", category: "Noise Pollution", priority: "MEDIUM", impactScore: 56, complaintCount: 8, district: "West Delhi", ward: "Ward 18", status: "UNASSIGNED", slaRemaining: "1d 8h", recommendedOfficer: "Mr. Verma" },
    { id: "INC-ENV-003", category: "Water Contamination", priority: "HIGH", impactScore: 80, complaintCount: 5, district: "South Delhi", ward: "Ward 37", assignedOfficer: "Dr. Singh", status: "ASSIGNED", slaRemaining: "15h 5m", recommendedOfficer: "Dr. Singh" },
  ],
  horticulture: [
    { id: "INC-HORT-001", category: "Fallen Tree", priority: "CRITICAL", impactScore: 91, complaintCount: 4, district: "North Delhi", ward: "Ward 16", assignedOfficer: "Arvind Kumar", status: "IN_PROGRESS", slaRemaining: "2h 50m", recommendedOfficer: "Arvind Kumar", isEscalated: true },
    { id: "INC-HORT-002", category: "Overgrown Bushes", priority: "MEDIUM", impactScore: 45, complaintCount: 7, district: "South Delhi", ward: "Ward 21", status: "UNASSIGNED", slaRemaining: "1d 12h", recommendedOfficer: "Sarita Devi" },
    { id: "INC-HORT-003", category: "Dead Tree Removal", priority: "HIGH", impactScore: 72, complaintCount: 3, district: "East Delhi", ward: "Ward 48", assignedOfficer: "Ramesh Yadav", status: "ASSIGNED", slaRemaining: "13h 30m", recommendedOfficer: "Ramesh Yadav" },
  ],
};

const IncidentAllocationCenter = ({ department }: { department: Department }) => {
  const [activeTab, setActiveTab] = useState<
    "unassigned" | "assigned" | "escalated" | "highRisk" | "critical"
  >("unassigned");

  const incidents = DEPARTMENT_INCIDENTS[department.id] || DEPARTMENT_INCIDENTS.mcd;

  const filteredIncidents = (() => {
    switch (activeTab) {
      case "unassigned":
        return incidents.filter((i) => !i.assignedOfficer);
      case "assigned":
        return incidents.filter((i) => i.assignedOfficer);
      case "escalated":
        return incidents.filter((i) => i.isEscalated);
      case "highRisk":
        return incidents.filter(
          (i) => i.priority === "HIGH" || i.priority === "CRITICAL"
        );
      case "critical":
        return incidents.filter((i) => i.priority === "CRITICAL");
      default:
        return incidents;
    }
  })();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "CRITICAL":
        return "bg-red-100 text-red-800";
      case "HIGH":
        return "bg-orange-100 text-orange-800";
      case "MEDIUM":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const tabs = [
    { key: "unassigned", label: "Unassigned", icon: AlertTriangle },
    { key: "assigned", label: "Officer Assigned", icon: User },
    { key: "escalated", label: "Escalated", icon: ShieldAlert },
    { key: "highRisk", label: "High Risk", icon: Zap },
    { key: "critical", label: "Critical", icon: ShieldAlert },
  ];

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Incident Allocation Center
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage and assign incidents to officers
          </p>
        </div>
        <Button variant="ghost" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() =>
                setActiveTab(
                  tab.key as any
                )
              }
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                activeTab === tab.key
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Icon className="h-4 w-4" />
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
                  <Badge className={getPriorityColor(incident.priority)}>
                    {incident.priority}
                  </Badge>
                  {incident.isEscalated && (
                    <Badge className="bg-rose-100 text-rose-800">Escalated</Badge>
                  )}
                </div>
                <p className="text-sm text-slate-600">{incident.category}</p>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">
                  {incident.district}, {incident.ward}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">
                  {incident.complaintCount} complaints
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">
                  Impact: {incident.impactScore}/100
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">
                  SLA: {incident.slaRemaining}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-3">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Assigned Officer
                </p>
                <p className="text-sm font-medium text-slate-800">
                  {incident.assignedOfficer || "—"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Recommended Officer
                </p>
                <p className="text-sm font-medium text-teal-700">
                  {incident.recommendedOfficer}
                </p>
              </div>
              <div className="flex gap-2">
                {!incident.assignedOfficer && (
                  <Button size="sm">Assign Officer</Button>
                )}
                <Button variant="ghost" size="sm">
                  View Summary
                </Button>
                <Button variant="ghost" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IncidentAllocationCenter;
