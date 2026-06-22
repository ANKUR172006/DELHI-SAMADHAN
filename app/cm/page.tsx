"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DelhiLeafletMap from "@/components/maps/DelhiLeafletMap";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  BellRing,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Compass,
  Download,
  Gauge,
  Info,
  Lightbulb,
  MapPin,
  MessageSquare,
  Minus,
  MoreHorizontal,
  Send,
  ShieldAlert,
  Sparkles,
  Star,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";

const departments = [
  { name: "Municipal Corporation (MCD)", score: 88, citizens: 4.3, sla: 92, backlog: 189, speed: "1.2 days", trend: "up", emergency: 89, highlight: "best" },
  { name: "Public Works Department (PWD)", score: 82, citizens: 4.1, sla: 88, backlog: 245, speed: "1.8 days", trend: "stable", emergency: 94, highlight: "improved" },
  { name: "Delhi Jal Board (DJB)", score: 74, citizens: 3.8, sla: 81, backlog: 312, speed: "2.4 days", trend: "down", emergency: 78, highlight: "needsAttention" },
  { name: "Traffic Police", score: 91, citizens: 4.5, sla: 95, backlog: 121, speed: "0.9 days", trend: "up", emergency: 96, highlight: "none" },
  { name: "Environment Department", score: 79, citizens: 3.9, sla: 85, backlog: 198, speed: "1.5 days", trend: "stable", emergency: 82, highlight: "none" },
  { name: "Horticulture Department", score: 85, citizens: 4.2, sla: 90, backlog: 156, speed: "1.3 days", trend: "up", emergency: 88, highlight: "none" },
];

const districts = [
  { rank: "01", name: "New Delhi", health: 94, citizens: 4.6, incidents: 124, failures: 8, trend: "up", highlight: "best" },
  { rank: "02", name: "South Delhi", health: 91, citizens: 4.4, incidents: 256, failures: 15, trend: "up", highlight: "improved" },
  { rank: "03", name: "West Delhi", health: 86, citizens: 4.1, incidents: 312, failures: 22, trend: "stable", highlight: "none" },
  { rank: "04", name: "East Delhi", health: 82, citizens: 3.9, incidents: 387, failures: 29, trend: "down", highlight: "needsAttention" },
  { rank: "05", name: "North Delhi", health: 80, citizens: 3.8, incidents: 421, failures: 35, trend: "stable", highlight: "risk" },
  { rank: "06", name: "North-East Delhi", health: 77, citizens: 3.7, incidents: 456, failures: 42, trend: "down", highlight: "none" },
  { rank: "07", name: "North-West Delhi", health: 75, citizens: 3.6, incidents: 489, failures: 48, trend: "down", highlight: "none" },
  { rank: "08", name: "Shahdara", health: 73, citizens: 3.5, incidents: 512, failures: 54, trend: "down", highlight: "none" },
  { rank: "09", name: "Central Delhi", health: 88, citizens: 4.3, incidents: 219, failures: 12, trend: "up", highlight: "none" },
  { rank: "10", name: "South-East Delhi", health: 84, citizens: 4.0, incidents: 287, failures: 19, trend: "stable", highlight: "none" },
  { rank: "11", name: "South-West Delhi", health: 87, citizens: 4.2, incidents: 245, failures: 14, trend: "up", highlight: "none" },
];

const officers = [
  { rank: 1, name: "Ananya Goel", dept: "DJB", score: 98, citizens: 4.9, resolved: 287, sla: 99, time: "0.7 days", highlight: "officerOfMonth" },
  { rank: 2, name: "R. K. Sharma", dept: "MCD", score: 96, citizens: 4.8, resolved: 271, sla: 97, time: "0.8 days", highlight: "none" },
  { rank: 3, name: "Vikram Singh", dept: "PWD", score: 94, citizens: 4.7, resolved: 245, sla: 95, time: "1.0 days", highlight: "mostImproved" },
  { rank: 4, name: "Inspector Rajesh", dept: "Traffic Police", score: 92, citizens: 4.6, resolved: 223, sla: 94, time: "0.9 days", highlight: "none" },
  { rank: 5, name: "Sunita Verma", dept: "MCD", score: 91, citizens: 4.5, resolved: 218, sla: 93, time: "1.1 days", highlight: "highestCitizen" },
  { rank: 6, name: "Dr. Arora", dept: "Environment", score: 89, citizens: 4.4, resolved: 201, sla: 91, time: "1.2 days", highlight: "none" },
  { rank: 7, name: "Priya Mehta", dept: "MCD", score: 87, citizens: 4.3, resolved: 189, sla: 89, time: "1.3 days", highlight: "none" },
  { rank: 8, name: "Rahul Sharma", dept: "PWD", score: 85, citizens: 4.2, resolved: 176, sla: 87, time: "1.4 days", highlight: "none" },
  { rank: 9, name: "Suresh Kumar", dept: "DJB", score: 83, citizens: 4.1, resolved: 165, sla: 85, time: "1.5 days", highlight: "none" },
  { rank: 10, name: "Rajesh Kumar", dept: "MCD", score: 81, citizens: 4.0, resolved: 154, sla: 83, time: "1.6 days", highlight: "none" },
];

const trendingIssues = [
  { name: "Water Leakage", growth: 21, districts: ["Dwarka", "Rohini"], risk: "high", prediction: "Will increase by 15%", trend: "up" },
  { name: "Road Damage", growth: 18, districts: ["North-West", "Shahdara"], risk: "medium", prediction: "Stable for next 2 weeks", trend: "stable" },
  { name: "Garbage Overflow", growth: 15, districts: ["East Delhi", "North-East"], risk: "medium", prediction: "Will improve by 8%", trend: "down" },
  { name: "Air Pollution", growth: 12, districts: ["Central Delhi", "North Delhi"], risk: "high", prediction: "Will increase by 20%", trend: "up" },
  { name: "Street Light Failure", growth: 8, districts: ["South Delhi", "New Delhi"], risk: "low", prediction: "Will improve by 5%", trend: "down" },
];

const cityRisks = [
  { name: "Roads Risk", level: "medium" },
  { name: "Water Risk", level: "high" },
  { name: "Sanitation Risk", level: "medium" },
  { name: "Pollution Risk", level: "high" },
  { name: "Public Safety Risk", level: "low" },
  { name: "Infrastructure Risk", level: "medium" },
];

const excellenceBoard = [
  { category: "Department of the Month", name: "Traffic Police", icon: Zap },
  { category: "Officer of the Month", name: "Ananya Goel", icon: Star },
  { category: "District of the Month", name: "New Delhi", icon: MapPin },
  { category: "Fastest Response Team", name: "MCD South", icon: Clock },
  { category: "Most Improved Department", name: "Horticulture", icon: TrendingUp },
  { category: "Most Improved District", name: "South Delhi", icon: TrendingUp },
];

const criticalIssues = [
  { title: "DJB Performance Collapse", severity: "critical", time: "1hr 15m ago", impact: "Citizen satisfaction dropped to 3.8, SLA to 81%", recommended: "Call emergency DJB review" },
  { title: "Water Pipeline Burst in Dwarka", severity: "emergency", time: "2hrs 30m ago", impact: "50+ households affected, road blocked", recommended: "Dispatch emergency repair team" },
  { title: "Recurring Garbage Backlog Rohini", severity: "high", time: "4hrs 10m ago", impact: "28+ complaints, media attention likely", recommended: "Additional garbage trucks deployed" },
  { title: "Citizen Dissatisfaction Surge East Delhi", severity: "high", time: "6hrs 45m ago", impact: "18% drop in satisfaction, 150+ complaints", recommended: "Area visit with DC East Delhi" },
];

const aiInsights = [
  { title: "Garbage Incidents Increased 21% in Rohini", evidence: "124 new complaints in last week, 3x normal volume", impact: "Citizen satisfaction dropped 0.5, potential health hazard", recommended: "Increase collection frequency by 2x, deploy 2 extra trucks", expected: "40% reduction in complaints in 2 weeks" },
  { title: "Road Failures Concentrated in North-West Delhi", evidence: "68 pothole complaints, 45 road damage cases in last 10 days", impact: "Traffic congestion increased 25%, accident risk high", recommended: "Priority road repair drive, audit construction quality", expected: "70% reduction in road complaints in 3 weeks" },
  { title: "Water Leakage Incidents Increasing in Dwarka", evidence: "52 new water leakage reports, 30% increase", impact: "Water wastage ~15 lakh liters/day, citizen anger rising", recommended: "Emergency pipeline inspection and replacement plan", expected: "50% reduction in leaks in 1 week" },
];

const impactTracker = [
  { metric: "Citizens Helped", value: "1,24,567", change: "+12.5%", icon: Users },
  { metric: "Incidents Resolved", value: "45,678", change: "+8.2%", icon: Activity },
  { metric: "SLA Improvement", value: "4.2%", change: "From 86% to 90%", icon: Clock },
  { metric: "Recurring Failures Reduced", value: "18.3%", change: "From 54 to 44 cases", icon: TrendingDown },
  { metric: "Cost Saved", value: "₹ 2.4 Cr", change: "Avoided infrastructure damage", icon: Target },
  { metric: "Emergency Responses Completed", value: "1,234", change: "+15%", icon: ShieldAlert },
  { metric: "Citizen Satisfaction", value: "4.4/5", change: "+0.3", icon: Star },
];

const mapLayers = {
  hotspots: [
    { label: "Rohini Garbage Hotspot", detail: "124 complaints, 5 teams deployed", lat: 28.7326, lng: 77.1197, severity: "critical" },
    { label: "Dwarka Water Leakage", detail: "52 leaks reported, DJB responding", lat: 28.5921, lng: 77.046, severity: "high" },
    { label: "Laxmi Nagar Street Lights", detail: "67 street lights out", lat: 28.6374, lng: 77.2683, severity: "medium" },
  ],
  criticalIncidents: [
    { label: "Rohini Sector 18 Road Cave-In", detail: "Emergency team en route", lat: 28.7297, lng: 77.1132, severity: "critical" },
    { label: "Central Delhi Fire Report", detail: "Fire tenders dispatched", lat: 28.6139, lng: 77.209, severity: "high" },
  ],
  pollutionZones: [
    { label: "Okhla Industrial Area", detail: "AQI: 423 (Severe)", lat: 28.5355, lng: 77.262, severity: "critical" },
    { label: "Wazirpur", detail: "AQI: 389 (Very Poor)", lat: 28.6944, lng: 77.1766, severity: "high" },
  ],
  districtHealth: [],
  riskZones: [],
  recurringFailures: [],
  citizenSatisfaction: [],
  emergency: [],
  departmentActivity: [],
  cmVisit: [],
};

export default function CMCommandCenter() {
  const [selectedMapLayer, setSelectedMapLayer] = useState("hotspots");
  const [showMapLayers, setShowMapLayers] = useState(false);
  const [selectedCriticalIssue, setSelectedCriticalIssue] = useState<typeof criticalIssues[0] | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "error" } | null>(null);
  const [chatMessages, setChatMessages] = useState<{ role: "user" | "ai"; text: string }[]>([
    { role: "ai", text: "Hon'ble Chief Minister, I'm your AI Governance Copilot. How can I assist you today?" }
  ]);
  const [chatInput, setChatInput] = useState("");

  const showToast = (message: string, type: "success" | "info" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSendChat = () => {
    if (!chatInput.trim()) return;

    setChatMessages(prev => [...prev, { role: "user", text: chatInput }]);
    const userInput = chatInput;
    setChatInput("");

    setTimeout(() => {
      let response = "I'm analyzing your request. Let's pull up the relevant data for you.";
      if (userInput.toLowerCase().includes("citizen satisfaction")) {
        response = "Citizen Satisfaction is currently at 4.4/5, up 0.3 from last week. The main contributors are improved garbage collection and faster PWD response times.";
      } else if (userInput.toLowerCase().includes("district")) {
        response = "North-West Delhi needs immediate attention due to an 18% rise in water leakage incidents. South Delhi is the top performer this month.";
      } else if (userInput.toLowerCase().includes("department")) {
        response = "MCD is the top performing department with 92% SLA compliance, while DJB needs attention due to rising water leakage reports.";
      }
      setChatMessages(prev => [...prev, { role: "ai", text: response }]);
    }, 1000);
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-emerald-400" />;
    if (trend === "down") return <TrendingDown className="h-4 w-4 text-red-400" />;
    return <Minus className="h-4 w-4 text-yellow-400" />;
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "critical": return "bg-red-900/30 border-red-500 text-red-300";
      case "high": return "bg-orange-900/30 border-orange-500 text-orange-300";
      case "medium": return "bg-yellow-900/30 border-yellow-500 text-yellow-300";
      case "low": return "bg-emerald-900/30 border-emerald-500 text-emerald-300";
      default: return "bg-muted border-border text-muted-foreground";
    }
  };

  const getDepartmentHighlightColor = (highlight: string) => {
    switch (highlight) {
      case "best": return "border-l-4 border-l-emerald-500";
      case "worst": return "border-l-4 border-l-red-500";
      case "improved": return "border-l-4 border-l-blue-500";
      case "needsAttention": return "border-l-4 border-l-orange-500";
      default: return "";
    }
  };

  return (
    <DashboardLayout>
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg transition-all duration-300 bg-card">
          {toast.type === "success" && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
          {toast.type === "error" && <AlertTriangle className="h-5 w-5 text-red-400" />}
          {toast.type === "info" && <Info className="h-5 w-5 text-blue-400" />}
          <div>
            <p className="text-sm font-semibold text-foreground">{toast.message}</p>
          </div>
          <button onClick={() => setToast(null)} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Critical Issue Dialog */}
      <Dialog open={!!selectedCriticalIssue} onOpenChange={(open) => !open && setSelectedCriticalIssue(null)}>
        <DialogContent className="sm:max-w-2xl bg-card border-border text-foreground">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-foreground">
              {selectedCriticalIssue?.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {selectedCriticalIssue?.severity} - {selectedCriticalIssue?.time}
            </DialogDescription>
          </DialogHeader>
          {selectedCriticalIssue && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">{selectedCriticalIssue.impact}</p>
              <div className="rounded-lg border border-border bg-muted p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Recommended Action</p>
                <p className="mt-1 text-sm text-primary">{selectedCriticalIssue.recommended}</p>
              </div>
            </div>
          )}
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setSelectedCriticalIssue(null)}>
              Close
            </Button>
            <Button onClick={() => {
              showToast("Escalated to Chief Secretary successfully!", "success");
              setSelectedCriticalIssue(null);
            }}>
              Escalate to Chief Secretary
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-primary/20 text-primary">
                  <Compass className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                    Delhi Samadhan
                  </p>
                  <h1 className="text-xl font-bold text-foreground">
                    Chief Minister Governance Command Center
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 rounded-lg border border-border bg-muted px-4 py-2">
                <p className="text-sm font-medium text-foreground">
                  Good Morning Hon'ble CM
                </p>
                <div className="h-8 w-8 rounded-full bg-muted" />
              </div>
              <button className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-muted hover:bg-accent">
                <BellRing className="h-5 w-5 text-muted-foreground" />
              </button>
              <button className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-muted hover:bg-accent">
                <Download className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </header>

        <main className="space-y-6 p-6">
          {/* Daily Governance Briefing */}
          <section className="rounded-xl border border-border bg-gradient-to-br from-card via-card to-card p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-primary/20 p-3 text-primary">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                  Daily Governance Briefing
                </p>
                <p className="text-xs text-muted-foreground">
                  Generated at 08:30 AM, Today
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              <p className="text-xl font-semibold text-foreground">
                Good Morning Hon'ble Chief Minister.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border border-emerald-700/30 bg-emerald-900/10 p-4">
                  <p className="text-xs font-semibold text-emerald-300">Positive</p>
                  <p className="mt-1 text-sm font-medium text-emerald-100">
                    Delhi Health Score improved by <span className="font-bold">4%</span>
                  </p>
                </div>
                <div className="rounded-lg border border-emerald-700/30 bg-emerald-900/10 p-4">
                  <p className="text-xs font-semibold text-emerald-300">Positive</p>
                  <p className="mt-1 text-sm font-medium text-emerald-100">
                    Citizen Satisfaction increased from <span className="font-bold">4.2 to 4.4</span>
                  </p>
                </div>
                <div className="rounded-lg border border-orange-700/30 bg-orange-900/10 p-4">
                  <p className="text-xs font-semibold text-orange-300">Warning</p>
                  <p className="mt-1 text-sm font-medium text-orange-100">
                    Water Leakage incidents increased by <span className="font-bold">18%</span>
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="text-amber-300 font-semibold">North-West Delhi</span> requires immediate attention. No major emergencies currently active.
              </p>
              <div className="mt-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Recommended Actions
                </p>
                <div className="mt-2 grid gap-3 md:grid-cols-3">
                  {[
                    "Review Delhi Jal Board performance.",
                    "Increase maintenance in Dwarka.",
                    "Monitor Rohini garbage hotspot."
                  ].map((action, i) => (
                    <div key={i} className="flex items-start gap-2 rounded-lg border border-border bg-muted p-3">
                      <ChevronRight className="mt-0.5 h-4 w-4 text-primary" />
                      <p className="text-sm text-foreground">{action}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Executive KPI Section */}
          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {[
              { label: "Delhi Health Score", value: "88", sub: "Last week: 84", icon: Gauge, color: "teal" },
              { label: "Citizen Satisfaction", value: "4.4/5", sub: "+0.3 this week", icon: Star, color: "green" },
              { label: "Active Incidents", value: "1,456", sub: "32 new today", icon: Activity, color: "blue" },
              { label: "Critical Incidents", value: "24", sub: "4 at emergency", icon: ShieldAlert, color: "red" },
              { label: "Emergency Incidents", value: "8", sub: "None active now", icon: Zap, color: "orange" },
              { label: "Department Efficiency", value: "85.6%", sub: "Target: 90%", icon: Target, color: "purple" },
              { label: "District Efficiency", value: "82.1%", sub: "Target: 88%", icon: MapPin, color: "yellow" },
            ].map((kpi, i) => {
              const Icon = kpi.icon;
              const colorClass = kpi.color === "teal" ? "text-primary bg-primary/20" :
                                kpi.color === "green" ? "text-emerald-400 bg-emerald-900/30" :
                                kpi.color === "blue" ? "text-blue-400 bg-blue-900/30" :
                                kpi.color === "red" ? "text-red-400 bg-red-900/30" :
                                kpi.color === "orange" ? "text-orange-400 bg-orange-900/30" :
                                kpi.color === "purple" ? "text-purple-400 bg-purple-900/30" :
                                "text-yellow-400 bg-yellow-900/30";
              return (
                <div key={i} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {kpi.label}
                    </p>
                    <div className={`rounded-lg p-2 ${colorClass}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="mt-3 text-2xl font-bold text-foreground">
                    {kpi.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{kpi.sub}</p>
                </div>
              );
            })}
          </section>

          {/* Middle Section - Risk Radar + Map + Critical Issues */}
          <div className="grid gap-6 lg:grid-cols-[300px_1fr_350px]">
            {/* City Risk Radar */}
            <section className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground">
                  City Risk Radar
                </h2>
              </div>
              <div className="mt-4 space-y-3">
                {cityRisks.map((risk, i) => (
                  <div key={i} className={`flex items-center justify-between rounded-lg border p-3 ${getRiskColor(risk.level)}`}>
                    <p className="text-sm font-medium">{risk.name}</p>
                    <p className="text-xs font-bold uppercase">{risk.level}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Delhi Intelligence Map */}
            <section className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-foreground">
                    Delhi Intelligence Map
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Interactive City Command Center
                  </p>
                </div>
                <div className="relative">
                  <button 
                    onClick={() => setShowMapLayers(!showMapLayers)}
                    className="flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2 text-sm font-medium hover:bg-accent"
                  >
                    Layers
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {showMapLayers && (
                    <div className="absolute right-0 top-full z-10 mt-2 w-64 rounded-lg border border-border bg-card p-2 shadow-xl">
                      {[
                        { id: "hotspots", label: "Hotspots" },
                        { id: "districtHealth", label: "District Health" },
                        { id: "criticalIncidents", label: "Critical Incidents" },
                        { id: "riskZones", label: "Risk Zones" },
                        { id: "pollutionZones", label: "Pollution Zones" },
                        { id: "recurringFailures", label: "Recurring Failures" },
                        { id: "citizenSatisfaction", label: "Citizen Satisfaction" },
                        { id: "emergency", label: "Emergency Incidents" },
                        { id: "departmentActivity", label: "Department Activity" },
                        { id: "cmVisit", label: "CM Visit Intelligence" }
                      ].map((layer) => (
                        <button 
                          key={layer.id}
                          onClick={() => {
                            setSelectedMapLayer(layer.id);
                            setShowMapLayers(false);
                          }}
                          className={`w-full rounded-md px-3 py-2 text-left text-sm font-medium ${
                            selectedMapLayer === layer.id ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-accent"
                          }`}
                        >
                          {layer.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* Delhi Intelligence Map */}
              <div className="mt-4 rounded-lg border border-border bg-muted">
                <DelhiLeafletMap
                  points={mapLayers[selectedMapLayer as keyof typeof mapLayers]}
                  center={[28.6139, 77.209]}
                  heightClass="h-80"
                  zoom={11}
                />
              </div>
            </section>

            {/* Critical Attention Center */}
            <section className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5 text-red-400" />
                  <h2 className="text-lg font-bold text-foreground">
                    Critical Attention Center
                  </h2>
                </div>
                <p className="text-xs text-muted-foreground">4 issues</p>
              </div>
              <div className="mt-4 space-y-3">
                {criticalIssues.map((issue, i) => (
                  <div key={i} onClick={() => setSelectedCriticalIssue(issue)} className={`cursor-pointer rounded-lg border border-border p-4 hover:bg-accent ${
                    issue.severity === "critical" ? "bg-red-900/10 border-red-700/50" :
                    issue.severity === "emergency" ? "bg-orange-900/10 border-orange-700/50" :
                    "bg-muted/50"
                  }`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-foreground">
                            {issue.title}
                          </p>
                          <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                            issue.severity === "critical" ? "bg-red-500 text-white" :
                            issue.severity === "emergency" ? "bg-orange-500 text-white" :
                            "bg-yellow-600 text-white"
                          }`}>
                            {issue.severity.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{issue.time}</p>
                      </div>
                      <button className="text-muted-foreground hover:text-foreground" onClick={(e) => {
                        e.stopPropagation();
                      }}>
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{issue.impact}</p>
                    <div className="mt-3 rounded-lg bg-card/80 p-3">
                      <p className="text-xs font-semibold uppercase text-muted-foreground">
                        Recommended
                      </p>
                      <p className="text-sm text-primary">{issue.recommended}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Trending Issues, Department Performance, District Performance */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Trending Issues in Delhi */}
            <section className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-lg font-bold text-foreground">
                Trending Issues in Delhi
              </h2>
              <div className="mt-4 space-y-3">
                {trendingIssues.map((issue, i) => (
                  <div key={i} className="rounded-lg border border-border p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-foreground">{issue.name}</p>
                      <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${
                        issue.growth > 0 ? "bg-red-900/30 text-red-300" : "bg-emerald-900/30 text-emerald-300"
                      }`}>
                        {issue.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {Math.abs(issue.growth)}%
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Districts: {issue.districts.join(", ")}
                    </p>
                    <div className="mt-3 grid gap-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Risk Level</span>
                        <span className={`font-bold ${
                          issue.risk === "high" ? "text-orange-400" :
                          issue.risk === "medium" ? "text-yellow-400" :
                          "text-emerald-400"
                        }`}>
                          {issue.risk.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Prediction</span>
                        <span className="text-foreground">{issue.prediction}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Department Performance Command Center */}
            <section className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
              <h2 className="text-lg font-bold text-foreground">
                Department Performance Command Center
              </h2>
              <div className="mt-4 overflow-hidden rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-muted text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 text-left">Department</th>
                      <th className="px-4 py-3 text-center">Health Score</th>
                      <th className="px-4 py-3 text-center">Citizen Sat</th>
                      <th className="px-4 py-3 text-center">SLA</th>
                      <th className="px-4 py-3 text-center">Backlog</th>
                      <th className="px-4 py-3 text-center">Speed</th>
                      <th className="px-4 py-3 text-center">Trend</th>
                      <th className="px-4 py-3 text-center">Emergency</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {departments.map((dept, i) => (
                      <tr key={i} className={`${getDepartmentHighlightColor(dept.highlight)}`}>
                        <td className="px-4 py-3 font-medium">{dept.name}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`font-bold ${dept.score >= 85 ? "text-emerald-400" : dept.score >= 75 ? "text-yellow-400" : "text-red-400"}`}>
                            {dept.score}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center text-muted-foreground">{dept.citizens}/5</td>
                        <td className="px-4 py-3 text-center text-muted-foreground">{dept.sla}%</td>
                        <td className="px-4 py-3 text-center text-muted-foreground">{dept.backlog}</td>
                        <td className="px-4 py-3 text-center text-muted-foreground">{dept.speed}</td>
                        <td className="px-4 py-3 text-center">
                          {dept.trend === "up" ? <TrendingUp className="mx-auto h-4 w-4 text-emerald-400" /> :
                           dept.trend === "down" ? <TrendingDown className="mx-auto h-4 w-4 text-red-400" /> :
                           <Minus className="mx-auto h-4 w-4 text-yellow-400" />}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                            dept.emergency >= 90 ? "bg-emerald-900/30 text-emerald-300" :
                            dept.emergency >= 80 ? "bg-yellow-900/30 text-yellow-300" :
                            "bg-red-900/30 text-red-300"
                          }`}>
                            {dept.emergency}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="flex items-center gap-1 rounded-full border border-emerald-700/50 bg-emerald-900/20 px-3 py-1 text-xs text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> Best Department: MCD
                </span>
                <span className="flex items-center gap-1 rounded-full border border-red-700/50 bg-red-900/20 px-3 py-1 text-xs text-red-300">
                  <span className="h-2 w-2 rounded-full bg-red-500" /> Needs Attention: DJB
                </span>
                <span className="flex items-center gap-1 rounded-full border border-blue-700/50 bg-blue-900/20 px-3 py-1 text-xs text-blue-300">
                  <span className="h-2 w-2 rounded-full bg-blue-500" /> Most Improved: PWD
                </span>
              </div>
            </section>
          </div>

          {/* District Performance Center & Recurring Failure Intelligence */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* District Performance Center */}
            <section className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-lg font-bold text-foreground">
                District Performance Center
              </h2>
              <div className="mt-4 overflow-hidden rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-muted text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 text-center">Rank</th>
                      <th className="px-4 py-3 text-left">District</th>
                      <th className="px-4 py-3 text-center">Health</th>
                      <th className="px-4 py-3 text-center">Citizens</th>
                      <th className="px-4 py-3 text-center">Incidents</th>
                      <th className="px-4 py-3 text-center">Failures</th>
                      <th className="px-4 py-3 text-center">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {districts.map((district, i) => (
                      <tr key={i} className={`${
                        district.highlight === "best" ? "bg-emerald-900/20" :
                        district.highlight === "improved" ? "bg-blue-900/20" :
                        district.highlight === "needsAttention" ? "bg-orange-900/20" :
                        district.highlight === "risk" ? "bg-red-900/20" : ""
                      }`}>
                        <td className="px-4 py-3 text-center">
                          <span className="grid h-8 w-8 place-items-center rounded-full bg-muted font-bold">
                            {district.rank}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-medium text-foreground">
                          {district.name}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`font-bold ${
                            district.health >= 85 ? "text-emerald-400" :
                            district.health >= 75 ? "text-yellow-400" :
                            "text-red-400"
                          }`}>
                            {district.health}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center text-muted-foreground">{district.citizens}/5</td>
                        <td className="px-4 py-3 text-center text-muted-foreground">{district.incidents}</td>
                        <td className="px-4 py-3 text-center text-muted-foreground">{district.failures}</td>
                        <td className="px-4 py-3 text-center">
                          {getTrendIcon(district.trend)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="flex items-center gap-1 rounded-full border border-emerald-700/50 bg-emerald-900/20 px-3 py-1 text-xs text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" /> Best: New Delhi
                </span>
                <span className="flex items-center gap-1 rounded-full border border-orange-700/50 bg-orange-900/20 px-3 py-1 text-xs text-orange-300">
                  <span className="h-2 w-2 rounded-full bg-orange-500" /> Needs Attention: East Delhi
                </span>
                <span className="flex items-center gap-1 rounded-full border border-blue-700/50 bg-blue-900/20 px-3 py-1 text-xs text-blue-300">
                  <span className="h-2 w-2 rounded-full bg-blue-500" /> Most Improved: South Delhi
                </span>
              </div>
            </section>

            {/* Recurring Failure Intelligence */}
            <section className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-400" />
                <h2 className="text-lg font-bold text-foreground">
                  Recurring Failure Intelligence
                </h2>
              </div>
              <div className="mt-4 space-y-4">
                {[
                  { location: "Rohini Sector 18, North-West Delhi", type: "Road Repair", occurrences: 5, cost: "₹4.2 Lacs", rootCause: "Poor quality construction material", solution: "Conduct quality audit, replace entire section", dept: "PWD" },
                  { location: "Dwarka Mor, West Delhi", type: "Water Pipeline Leakage", occurrences: 4, cost: "₹2.8 Lacs", rootCause: "Corroded old pipeline", solution: "Replace 2km pipeline with new PVC pipes", dept: "DJB" },
                  { location: "Laxmi Nagar, East Delhi", type: "Street Light Failure", occurrences: 6, cost: "₹1.5 Lacs", rootCause: "Faulty wiring system", solution: "Rewire entire area and install LED lights", dept: "MCD" }
                ].map((failure, i) => (
                  <div key={i} className="rounded-lg border border-border bg-muted/50 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{failure.location}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <span className="rounded-full bg-orange-900/30 px-2 py-0.5 text-xs font-bold text-orange-300">{failure.type}</span>
                          <span className="text-xs text-muted-foreground">• Department: {failure.dept}</span>
                        </div>
                      </div>
                      <span className="rounded-full bg-red-900/30 px-3 py-1 text-xs font-bold text-red-300">
                        {failure.occurrences}x
                      </span>
                    </div>
                    <div className="mt-3 grid gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-xs font-semibold uppercase">Cost Impact:</span>
                        <span className="text-foreground">{failure.cost}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-muted-foreground text-xs font-semibold uppercase whitespace-nowrap">Root Cause:</span>
                        <span className="text-orange-300">{failure.rootCause}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-muted-foreground text-xs font-semibold uppercase whitespace-nowrap">Recommended Solution:</span>
                        <span className="text-primary">{failure.solution}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Top Performing Officers, Governance Excellence Board, Government Impact Tracker */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Top Performing Officers */}
            <section className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-lg font-bold text-foreground">
                Top Performing Officers
              </h2>
              <div className="mt-4 space-y-3">
                {officers.slice(0, 5).map((officer, i) => (
                  <div key={i} className="rounded-lg border border-border p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="grid h-10 w-10 place-items-center rounded-full bg-muted text-lg font-bold">
                          {officer.rank}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-foreground">{officer.name}</p>
                            {officer.highlight === "officerOfMonth" && (
                              <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-bold text-amber-300">
                                Officer of Month
                              </span>
                            )}
                            {officer.highlight === "mostImproved" && (
                              <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-xs font-bold text-blue-300">
                                Most Improved
                              </span>
                            )}
                            {officer.highlight === "highestCitizen" && (
                              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-300">
                                Highest Citizen
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{officer.dept}</p>
                        </div>
                      </div>
                      <p className="font-bold text-primary">{officer.score}</p>
                    </div>
                    <div className="mt-2 grid grid-cols-4 gap-2 text-xs">
                      <div className="text-center">
                        <p className="text-muted-foreground">Resolved</p>
                        <p className="font-semibold text-foreground">{officer.resolved}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">SLA</p>
                        <p className="font-semibold text-foreground">{officer.sla}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Time</p>
                        <p className="font-semibold text-foreground">{officer.time}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Rating</p>
                        <p className="font-semibold text-yellow-300">{officer.citizens}/5</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Governance Excellence Board */}
            <section className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-lg font-bold text-foreground">
                Governance Excellence Board
              </h2>
              <div className="mt-4 space-y-3">
                {excellenceBoard.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-3">
                      <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/20 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          {item.category}
                        </p>
                        <p className="font-semibold text-foreground">{item.name}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Government Impact Tracker */}
            <section className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-lg font-bold text-foreground">
                Government Impact Tracker
              </h2>
              <div className="mt-4 grid gap-3">
                {impactTracker.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-3">
                      <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/20 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-foreground">{item.metric}</p>
                          <p className="font-bold text-2xl text-foreground">{item.value}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{item.change}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* AI Governance Insights & AI Governance Copilot */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* AI Governance Insights */}
            <section className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-400" />
                <h2 className="text-lg font-bold text-foreground">
                  AI Governance Insights
                </h2>
              </div>
              <div className="mt-4 space-y-4">
                {aiInsights.map((insight, i) => (
                  <div key={i} className="rounded-lg border border-border bg-muted/50 p-4">
                    <p className="font-semibold text-foreground">{insight.title}</p>
                    <div className="mt-2 space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <span className="text-muted-foreground text-xs font-semibold uppercase">Evidence:</span>
                        <span className="text-muted-foreground">{insight.evidence}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-muted-foreground text-xs font-semibold uppercase">Impact:</span>
                        <span className="text-orange-300">{insight.impact}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-muted-foreground text-xs font-semibold uppercase">Recommended:</span>
                        <span className="text-primary">{insight.recommended}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-muted-foreground text-xs font-semibold uppercase">Expected:</span>
                        <span className="text-emerald-300">{insight.expected}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* AI Governance Copilot */}
            <section className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-400" />
                <h2 className="text-lg font-bold text-foreground">
                  AI Governance Copilot
                </h2>
              </div>
              <div className="mt-4 space-y-4">
                {/* Chat Messages */}
                <div className="h-64 overflow-y-auto rounded-lg border border-border bg-muted/50 p-4 space-y-3">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] rounded-lg px-4 py-3 text-sm ${
                        msg.role === "user" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-card border border-border text-foreground"
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Quick Questions */}
                <div className="grid gap-2">
                  {[
                    "Why is citizen satisfaction declining in East Delhi?",
                    "Which district needs immediate intervention?",
                    "Show worst performing departments this month"
                  ].map((q, i) => (
                    <Button 
                      key={i}
                      variant="outline"
                      className="justify-start h-auto py-3"
                      onClick={() => {
                        setChatInput(q);
                        handleSendChat();
                      }}
                    >
                      {q}
                    </Button>
                  ))}
                </div>
                {/* Chat Input */}
                <div className="flex gap-2 rounded-lg border border-border bg-muted/50 p-2">
                  <input 
                    type="text" 
                    placeholder="Ask the AI Governance Copilot..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                    className="flex-1 bg-transparent px-3 py-2 text-sm text-foreground outline-none"
                  />
                  <Button onClick={handleSendChat}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}
