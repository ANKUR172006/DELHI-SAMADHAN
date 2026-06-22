"use client";

import { useState } from "react";
import {
  Truck,
  Droplets,
  Wrench,
  Car,
  Zap,
  TreePine,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Resource {
  id: string;
  name: string;
  type: "GARBAGE_TRUCK" | "WATER_TANKER" | "ROAD_EQUIPMENT" | "EMERGENCY_VEHICLE" | "ELECTRICAL_EQUIPMENT" | "TREE_EQUIPMENT";
  status: "AVAILABLE" | "BUSY" | "MAINTENANCE" | "EMERGENCY_RESERVE";
  assignedTo?: string;
  location: string;
  lastService: string;
}

const ResourceManagementCenter = () => {
  const [resources] = useState<Resource[]>([
    {
      id: "res-1",
      name: "Garbage Truck GT-001",
      type: "GARBAGE_TRUCK",
      status: "BUSY",
      assignedTo: "R. K. Sharma",
      location: "South Delhi, Ward 18",
      lastService: "2 days ago",
    },
    {
      id: "res-2",
      name: "Water Tanker WT-005",
      type: "WATER_TANKER",
      status: "AVAILABLE",
      location: "West Delhi Depot",
      lastService: "1 week ago",
    },
    {
      id: "res-3",
      name: "Road Repair Unit RR-002",
      type: "ROAD_EQUIPMENT",
      status: "MAINTENANCE",
      location: "Central Workshop",
      lastService: "3 days ago",
    },
    {
      id: "res-4",
      name: "Emergency Van EV-001",
      type: "EMERGENCY_VEHICLE",
      status: "EMERGENCY_RESERVE",
      location: "HQ Reserve",
      lastService: "1 day ago",
    },
    {
      id: "res-5",
      name: "Street Light Repair Kit SL-003",
      type: "ELECTRICAL_EQUIPMENT",
      status: "AVAILABLE",
      location: "East Delhi Depot",
      lastService: "5 days ago",
    },
    {
      id: "res-6",
      name: "Tree Cutter TC-002",
      type: "TREE_EQUIPMENT",
      status: "BUSY",
      assignedTo: "Vikram Singh",
      location: "North Delhi, Ward 22",
      lastService: "1 week ago",
    },
  ]);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "GARBAGE_TRUCK":
        return <Truck className="h-5 w-5" />;
      case "WATER_TANKER":
        return <Droplets className="h-5 w-5" />;
      case "ROAD_EQUIPMENT":
        return <Wrench className="h-5 w-5" />;
      case "EMERGENCY_VEHICLE":
        return <Car className="h-5 w-5" />;
      case "ELECTRICAL_EQUIPMENT":
        return <Zap className="h-5 w-5" />;
      case "TREE_EQUIPMENT":
        return <TreePine className="h-5 w-5" />;
      default:
        return <Wrench className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-100 text-green-800";
      case "BUSY":
        return "bg-blue-100 text-blue-800";
      case "MAINTENANCE":
        return "bg-amber-100 text-amber-800";
      case "EMERGENCY_RESERVE":
        return "bg-rose-100 text-rose-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return <CheckCircle2 className="h-4 w-4" />;
      case "BUSY":
        return <Clock className="h-4 w-4" />;
      case "MAINTENANCE":
        return <Wrench className="h-4 w-4" />;
      case "EMERGENCY_RESERVE":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <CheckCircle2 className="h-4 w-4" />;
    }
  };

  const stats = [
    { label: "Available", value: "12", color: "text-green-600" },
    { label: "Busy", value: "18", color: "text-blue-600" },
    { label: "Maintenance", value: "3", color: "text-amber-600" },
    { label: "Emergency Reserve", value: "4", color: "text-rose-600" },
  ];

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Resource Management Center
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage and allocate department resources
          </p>
        </div>
        <Button>Allocate Resource</Button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-slate-200 p-3"
          >
            <p className="text-xs font-semibold uppercase text-slate-500">
              {stat.label}
            </p>
            <p className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-slate-100 p-2 text-slate-700">
                {getResourceIcon(resource.type)}
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{resource.name}</h3>
                <p className="text-sm text-slate-500">
                  Location: {resource.location}
                </p>
                {resource.assignedTo && (
                  <p className="text-sm text-slate-500">
                    Assigned to: {resource.assignedTo}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={getStatusColor(resource.status)}>
                <span className="flex items-center gap-1">
                  {getStatusIcon(resource.status)}
                  {resource.status}
                </span>
              </Badge>
              <p className="text-xs text-slate-400">
                Last service: {resource.lastService}
              </p>
              <Button variant="ghost" size="sm">
                Manage
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceManagementCenter;
