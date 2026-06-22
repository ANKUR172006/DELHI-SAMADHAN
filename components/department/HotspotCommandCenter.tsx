"use client";

import { useState } from "react";
import {
  MapPin,
  TrendingUp,
  AlertTriangle,
  Users,
  Zap,
  TrendingDown,
  Trash,
  Wrench,
  Droplets,
  Wind,
  Shield,
  Minus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Hotspot {
  id: string;
  type: "GARBAGE" | "ROAD_DAMAGE" | "WATER_LEAKAGE" | "POLLUTION" | "PUBLIC_SAFETY";
  location: string;
  district: string;
  ward: string;
  incidentCount: number;
  trend: "INCREASING" | "DECREASING" | "STABLE";
  affectedCitizens: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  priority: number;
  lat: number;
  lng: number;
}

const HotspotCommandCenter = () => {
  const [activeType, setActiveType] = useState<string>("all");

  const hotspots: Hotspot[] = [
    {
      id: "hs-001",
      type: "GARBAGE",
      location: "Sector 18, South Delhi",
      district: "South Delhi",
      ward: "Ward 18",
      incidentCount: 24,
      trend: "INCREASING",
      affectedCitizens: 1200,
      riskLevel: "HIGH",
      priority: 85,
      lat: 28.5621,
      lng: 77.2432,
    },
    {
      id: "hs-002",
      type: "ROAD_DAMAGE",
      location: "Sector 17, North Delhi",
      district: "North Delhi",
      ward: "Ward 22",
      incidentCount: 18,
      trend: "INCREASING",
      affectedCitizens: 850,
      riskLevel: "CRITICAL",
      priority: 95,
      lat: 28.6734,
      lng: 77.2011,
    },
    {
      id: "hs-003",
      type: "WATER_LEAKAGE",
      location: "Dwarka, West Delhi",
      district: "West Delhi",
      ward: "Ward 7",
      incidentCount: 15,
      trend: "STABLE",
      affectedCitizens: 600,
      riskLevel: "MEDIUM",
      priority: 68,
      lat: 28.5921,
      lng: 77.046,
    },
    {
      id: "hs-004",
      type: "POLLUTION",
      location: "Rohini, North West Delhi",
      district: "North West Delhi",
      ward: "Ward 12",
      incidentCount: 12,
      trend: "DECREASING",
      affectedCitizens: 450,
      riskLevel: "MEDIUM",
      priority: 55,
      lat: 28.7326,
      lng: 77.1197,
    },
    {
      id: "hs-005",
      type: "PUBLIC_SAFETY",
      location: "Shahdara, East Delhi",
      district: "East Delhi",
      ward: "Ward 14",
      incidentCount: 8,
      trend: "STABLE",
      affectedCitizens: 300,
      riskLevel: "LOW",
      priority: 40,
      lat: 28.6734,
      lng: 77.289,
    },
  ];

  const filteredHotspots = (() => {
    if (activeType === "all") return hotspots;
    return hotspots.filter((h) => h.type === activeType);
  })();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "GARBAGE":
        return <Trash className="h-5 w-5" />;
      case "ROAD_DAMAGE":
        return <Wrench className="h-5 w-5" />;
      case "WATER_LEAKAGE":
        return <Droplets className="h-5 w-5" />;
      case "POLLUTION":
        return <Wind className="h-5 w-5" />;
      case "PUBLIC_SAFETY":
        return <Shield className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "INCREASING":
        return <TrendingUp className="h-4 w-4 text-red-600" />;
      case "DECREASING":
        return <TrendingDown className="h-4 w-4 text-green-600" />;
      default:
        return <Minus className="h-4 w-4 text-slate-500" />;
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "CRITICAL":
        return "bg-red-100 text-red-800";
      case "HIGH":
        return "bg-orange-100 text-orange-800";
      case "MEDIUM":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  const tabs = [
    { key: "all", label: "All Hotspots" },
    { key: "GARBAGE", label: "Garbage" },
    { key: "ROAD_DAMAGE", label: "Road Damage" },
    { key: "WATER_LEAKAGE", label: "Water Leakage" },
    { key: "POLLUTION", label: "Pollution" },
    { key: "PUBLIC_SAFETY", label: "Public Safety" },
  ];

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Hotspot Command Center
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Monitor recurring issues and high-impact locations
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveType(tab.key)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              activeType === tab.key
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {filteredHotspots.map((hotspot) => (
          <div
            key={hotspot.id}
            className="flex flex-col gap-3 rounded-lg border border-slate-200 p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-slate-100 p-2 text-slate-700">
                  {getTypeIcon(hotspot.type)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{hotspot.location}</h3>
                  <p className="text-sm text-slate-500">
                    {hotspot.district}, {hotspot.ward}
                  </p>
                </div>
              </div>
              <Badge className={getRiskColor(hotspot.riskLevel)}>
                {hotspot.riskLevel}
              </Badge>
            </div>

            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">
                  Incidents: <span className="font-semibold">{hotspot.incidentCount}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">
                  Affected: <span className="font-semibold">{hotspot.affectedCitizens}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                {getTrendIcon(hotspot.trend)}
                <span className="text-slate-600">
                  Trend: <span className="font-semibold">{hotspot.trend}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-slate-400" />
                <span className="text-slate-600">
                  Priority: <span className="font-semibold">{hotspot.priority}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotspotCommandCenter;
