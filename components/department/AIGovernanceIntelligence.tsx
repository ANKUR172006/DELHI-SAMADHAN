"use client";

import { useState } from "react";
import {
  Sparkles,
  AlertTriangle,
  TrendingUp,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Insight {
  id: string;
  type: "WARNING" | "RECOMMENDATION" | "POSITIVE" | "INSIGHT";
  title: string;
  description: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  actionLabel?: string;
}

const AIGovernanceIntelligence = () => {
  const [insights] = useState<Insight[]>([
    {
      id: "ins-001",
      type: "WARNING",
      title: "Garbage incidents increased 31% in Ward 18",
      description: "Over the past week, garbage accumulation complaints have risen significantly in Sector 18. This is likely due to reduced collection frequency.",
      priority: "HIGH",
      actionLabel: "Increase collection frequency",
    },
    {
      id: "ins-002",
      type: "RECOMMENDATION",
      title: "Road failures recurring in Sector 17",
      description: "The same stretch of road in Sector 17 has been repaired 3 times in the last 2 months. Recommend infrastructure inspection to identify root cause.",
      priority: "HIGH",
      actionLabel: "Schedule inspection",
    },
    {
      id: "ins-003",
      type: "INSIGHT",
      title: "Water leakage incidents increased 22%",
      description: "City-wide water leakage complaints are up 22% compared to last month. Recommend preventive maintenance drive for older pipelines.",
      priority: "MEDIUM",
      actionLabel: "Plan maintenance drive",
    },
    {
      id: "ins-004",
      type: "POSITIVE",
      title: "Officer performance improving",
      description: "Average SLA compliance across all officers has improved by 5% over the past 2 weeks. Ananya Goel leads with 98% compliance.",
      priority: "LOW",
    },
    {
      id: "ins-005",
      type: "RECOMMENDATION",
      title: "Hotspot emerging in Rohini",
      description: "Pollution and garbage complaints are rising in Rohini. Recommend proactive monitoring and resource allocation before it becomes critical.",
      priority: "MEDIUM",
      actionLabel: "Allocate resources",
    },
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "WARNING":
        return <AlertTriangle className="h-5 w-5 text-amber-600" />;
      case "RECOMMENDATION":
        return <Lightbulb className="h-5 w-5 text-blue-600" />;
      case "POSITIVE":
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case "INSIGHT":
        return <TrendingUp className="h-5 w-5 text-purple-600" />;
      default:
        return <Sparkles className="h-5 w-5 text-slate-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "WARNING":
        return "bg-amber-50 border-amber-200";
      case "RECOMMENDATION":
        return "bg-blue-50 border-blue-200";
      case "POSITIVE":
        return "bg-green-50 border-green-200";
      case "INSIGHT":
        return "bg-purple-50 border-purple-200";
      default:
        return "bg-slate-50 border-slate-200";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-800">High Priority</span>;
      case "MEDIUM":
        return <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">Medium Priority</span>;
      default:
        return <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800">Low Priority</span>;
    }
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-teal-600" />
          <h2 className="text-lg font-bold text-slate-900">
            AI Governance Intelligence
          </h2>
        </div>
        <Button variant="ghost">Generate Report</Button>
      </div>

      <p className="mt-2 text-sm text-slate-500">
        AI-powered insights to help manage department operations effectively
      </p>

      <div className="mt-4 space-y-3">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`flex flex-col gap-3 rounded-lg border p-4 ${getTypeColor(insight.type)}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                {getTypeIcon(insight.type)}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900">{insight.title}</h3>
                    {getPriorityBadge(insight.priority)}
                  </div>
                  <p className="mt-1 text-sm text-slate-700">{insight.description}</p>
                </div>
              </div>
            </div>
            {insight.actionLabel && (
              <div className="flex justify-end">
                <Button size="sm">{insight.actionLabel}</Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIGovernanceIntelligence;
