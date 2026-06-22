"use client";

import { useState } from "react";
import {
  User,
  Briefcase,
  Star,
  TrendingUp,
  TrendingDown,
  Zap,
  Users,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Officer {
  id: string;
  name: string;
  specialization: string;
  assignedIncidents: number;
  resolvedIncidents: number;
  avgResolutionTime: string;
  citizenSatisfaction: number;
  currentWorkload: "LOW" | "MEDIUM" | "HIGH" | "OVERLOAD";
  availability: "AVAILABLE" | "BUSY" | "ON_LEAVE";
  teamCount: number;
  slaCompliance: number;
}

interface WorkloadRecommendation {
  fromOfficer: string;
  toOfficer: string;
  transferCount: number;
  expectedSLAImprovement: number;
}

interface Department {
  id: string;
  name: string;
  shortName: string;
}

const DEPARTMENT_OFFICERS: Record<string, Officer[]> = {
  mcd: [
    { id: "off-mcd-1", name: "R. K. Sharma", specialization: "Garbage Management", assignedIncidents: 23, resolvedIncidents: 156, avgResolutionTime: "1.2 days", citizenSatisfaction: 4.8, currentWorkload: "OVERLOAD", availability: "BUSY", teamCount: 3, slaCompliance: 96 },
    { id: "off-mcd-2", name: "Sunita Verma", specialization: "Drain & Sanitation", assignedIncidents: 12, resolvedIncidents: 134, avgResolutionTime: "0.9 days", citizenSatisfaction: 4.7, currentWorkload: "MEDIUM", availability: "AVAILABLE", teamCount: 2, slaCompliance: 95 },
    { id: "off-mcd-3", name: "Amit Singh", specialization: "Stray Animals & Enforcement", assignedIncidents: 8, resolvedIncidents: 98, avgResolutionTime: "1.5 days", citizenSatisfaction: 4.6, currentWorkload: "LOW", availability: "AVAILABLE", teamCount: 1, slaCompliance: 92 },
    { id: "off-mcd-4", name: "Rajesh Kumar", specialization: "Encroachment Removal", assignedIncidents: 18, resolvedIncidents: 189, avgResolutionTime: "2.1 days", citizenSatisfaction: 4.3, currentWorkload: "HIGH", availability: "BUSY", teamCount: 3, slaCompliance: 88 },
  ],
  pwd: [
    { id: "off-pwd-1", name: "Vikram Singh", specialization: "Road Maintenance", assignedIncidents: 15, resolvedIncidents: 201, avgResolutionTime: "1.4 days", citizenSatisfaction: 4.5, currentWorkload: "MEDIUM", availability: "BUSY", teamCount: 4, slaCompliance: 92 },
    { id: "off-pwd-2", name: "Neha Gupta", specialization: "Footpath & Pedestrian Infrastructure", assignedIncidents: 9, resolvedIncidents: 112, avgResolutionTime: "0.8 days", citizenSatisfaction: 4.8, currentWorkload: "LOW", availability: "AVAILABLE", teamCount: 2, slaCompliance: 97 },
    { id: "off-pwd-3", name: "Rahul Sharma", specialization: "Bridge & Flyover Safety", assignedIncidents: 12, resolvedIncidents: 87, avgResolutionTime: "1.8 days", citizenSatisfaction: 4.4, currentWorkload: "HIGH", availability: "BUSY", teamCount: 3, slaCompliance: 89 },
  ],
  djb: [
    { id: "off-djb-1", name: "Ananya Goel", specialization: "Water Distribution", assignedIncidents: 18, resolvedIncidents: 176, avgResolutionTime: "0.9 days", citizenSatisfaction: 4.9, currentWorkload: "HIGH", availability: "BUSY", teamCount: 2, slaCompliance: 98 },
    { id: "off-djb-2", name: "Suresh Kumar", specialization: "Water Pressure & Supply", assignedIncidents: 7, resolvedIncidents: 91, avgResolutionTime: "0.7 days", citizenSatisfaction: 4.7, currentWorkload: "LOW", availability: "AVAILABLE", teamCount: 1, slaCompliance: 96 },
    { id: "off-djb-3", name: "Meera Patel", specialization: "Sewer & Drainage", assignedIncidents: 14, resolvedIncidents: 123, avgResolutionTime: "1.3 days", citizenSatisfaction: 4.6, currentWorkload: "MEDIUM", availability: "BUSY", teamCount: 3, slaCompliance: 93 },
  ],
  traffic: [
    { id: "off-traffic-1", name: "Inspector Rajesh", specialization: "Traffic Signal Management", assignedIncidents: 13, resolvedIncidents: 156, avgResolutionTime: "0.6 days", citizenSatisfaction: 4.8, currentWorkload: "MEDIUM", availability: "BUSY", teamCount: 4, slaCompliance: 97 },
    { id: "off-traffic-2", name: "Constable Priya", specialization: "Parking & Lane Discipline", assignedIncidents: 11, resolvedIncidents: 134, avgResolutionTime: "0.8 days", citizenSatisfaction: 4.6, currentWorkload: "LOW", availability: "AVAILABLE", teamCount: 2, slaCompliance: 94 },
    { id: "off-traffic-3", name: "Inspector Anil", specialization: "Speed & Safety Enforcement", assignedIncidents: 9, resolvedIncidents: 102, avgResolutionTime: "1.1 days", citizenSatisfaction: 4.5, currentWorkload: "MEDIUM", availability: "BUSY", teamCount: 2, slaCompliance: 92 },
  ],
  environment: [
    { id: "off-env-1", name: "Dr. Arora", specialization: "Air Quality & Pollution", assignedIncidents: 10, resolvedIncidents: 89, avgResolutionTime: "1.6 days", citizenSatisfaction: 4.7, currentWorkload: "MEDIUM", availability: "BUSY", teamCount: 2, slaCompliance: 91 },
    { id: "off-env-2", name: "Mr. Verma", specialization: "Noise & Waste Audits", assignedIncidents: 6, resolvedIncidents: 67, avgResolutionTime: "0.9 days", citizenSatisfaction: 4.4, currentWorkload: "LOW", availability: "AVAILABLE", teamCount: 1, slaCompliance: 95 },
    { id: "off-env-3", name: "Dr. Singh", specialization: "Water Quality Testing", assignedIncidents: 8, resolvedIncidents: 78, avgResolutionTime: "1.4 days", citizenSatisfaction: 4.6, currentWorkload: "MEDIUM", availability: "BUSY", teamCount: 2, slaCompliance: 90 },
  ],
  horticulture: [
    { id: "off-hort-1", name: "Arvind Kumar", specialization: "Tree Maintenance & Removal", assignedIncidents: 12, resolvedIncidents: 111, avgResolutionTime: "1.3 days", citizenSatisfaction: 4.6, currentWorkload: "HIGH", availability: "BUSY", teamCount: 3, slaCompliance: 89 },
    { id: "off-hort-2", name: "Sarita Devi", specialization: "Parks & Landscaping", assignedIncidents: 7, resolvedIncidents: 87, avgResolutionTime: "1.0 days", citizenSatisfaction: 4.8, currentWorkload: "LOW", availability: "AVAILABLE", teamCount: 2, slaCompliance: 96 },
    { id: "off-hort-3", name: "Ramesh Yadav", specialization: "Green Belt & Afforestation", assignedIncidents: 5, resolvedIncidents: 63, avgResolutionTime: "1.7 days", citizenSatisfaction: 4.5, currentWorkload: "LOW", availability: "AVAILABLE", teamCount: 1, slaCompliance: 93 },
  ],
};

const OfficerManagementCenter = ({ department }: { department: Department }) => {
  const selectedOfficers = DEPARTMENT_OFFICERS[department.id] || DEPARTMENT_OFFICERS.mcd;

  const [recommendations] = useState<WorkloadRecommendation[]>(
    selectedOfficers.length > 1
      ? [
          {
            fromOfficer: selectedOfficers[0].name,
            toOfficer: selectedOfficers[1].name,
            transferCount: 3,
            expectedSLAImprovement: 8,
          },
        ]
      : []
  );

  const getWorkloadColor = (workload: string) => {
    switch (workload) {
      case "OVERLOAD":
        return "bg-red-100 text-red-800";
      case "HIGH":
        return "bg-orange-100 text-orange-800";
      case "MEDIUM":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "AVAILABLE":
        return "bg-green-500";
      case "BUSY":
        return "bg-amber-500";
      case "ON_LEAVE":
        return "bg-slate-400";
      default:
        return "bg-slate-500";
    }
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Officer Management Center
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage officer workload, performance, and assignments
          </p>
        </div>
        <Button>View All Officers</Button>
      </div>

      {recommendations.length > 0 && (
        <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-amber-100 p-2">
              <Zap className="h-5 w-5 text-amber-700" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-amber-900">
                AI Workload Balancer
              </h3>
              <div className="mt-2 space-y-2">
                {recommendations.map((rec, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-4"
                  >
                    <p className="text-amber-800">
                      Transfer <span className="font-bold">{rec.transferCount}</span> incidents from{" "}
                      <span className="font-bold">{rec.fromOfficer}</span> to{" "}
                      <span className="font-bold">{rec.toOfficer}</span>
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">
                        +{rec.expectedSLAImprovement}% SLA improvement
                      </Badge>
                      <Button size="sm" variant="default">
                        Apply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 space-y-3">
        {selectedOfficers.map((officer) => (
          <div
            key={officer.id}
            className="flex flex-col gap-3 rounded-lg border border-slate-200 p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-slate-100 text-slate-800 font-bold">
                  {officer.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{officer.name}</h3>
                  <p className="text-sm text-slate-500">{officer.specialization}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={getWorkloadColor(officer.currentWorkload)}>
                  {officer.currentWorkload}
                </Badge>
                <div
                  className={`h-3 w-3 rounded-full ${getAvailabilityColor(
                    officer.availability
                  )}`}
                />
              </div>
            </div>

            <div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Assigned Incidents
                </p>
                <p className="font-bold text-slate-800">{officer.assignedIncidents}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  SLA Compliance
                </p>
                <p className="font-bold text-slate-800">{officer.slaCompliance}%</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Citizen Satisfaction
                </p>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <p className="font-bold text-slate-800">{officer.citizenSatisfaction}/5</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  Teams
                </p>
                <p className="font-bold text-slate-800">{officer.teamCount}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-200 pt-3">
              <Button variant="ghost" size="sm">View Details</Button>
              <Button size="sm">Reassign Incidents</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfficerManagementCenter;
