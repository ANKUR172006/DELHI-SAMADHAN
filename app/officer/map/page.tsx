"use client";

import React, { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  MapPin,
  Users,
  AlertTriangle,
  Shield,
  Clock,
  CheckCircle2,
  XCircle,
  Car,
  Phone,
  ChevronRight,
  Filter,
  Target,
  TrendingUp,
  Activity,
  Loader2,
  RefreshCw
} from "lucide-react";
import {
  getOperationalIncidents,
  getOperationalTeams,
  assignIncidentTeam,
  updateIncidentProgress,
  API_BASE
} from "@/services/api";
import type { Priority, TeamStatus, MapIncident, MapTeam } from "@/services/api";

// --- Dynamic Map Component ---
const LeafletMapInner = dynamic(() => import("./LeafletMapInner"), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-slate-900 text-slate-400">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-500" />
        <p className="text-lg">Loading Deployment Intelligence Map...</p>
      </div>
    </div>
  ),
});

// --- Helper Functions ---
const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c; // in km
};

export default function TeamDeploymentMap() {
  const [selectedIncident, setSelectedIncident] = useState<MapIncident | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<MapTeam | null>(null);
  const [showIncidents, setShowIncidents] = useState(true);
  const [showTeams, setShowTeams] = useState(true);
  const [showHotspots, setShowHotspots] = useState(true);
  const [isAssigning, setIsAssigning] = useState(false);
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(false);
  const [progressNote, setProgressNote] = useState("");
  const [notification, setNotification] = useState<{type: 'success'|'error'|'info', message: string} | null>(null);
  const [incidents, setIncidents] = useState<MapIncident[]>([]);
  const [teams, setTeams] = useState<MapTeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  // --- Fetch Data Function ---
  const fetchData = async () => {
    try {
      // Fetch real data from API
      const [incidentsRes, teamsRes] = await Promise.all([
        fetch(`${API_BASE}/api/data/incidents`),
        fetch(`${API_BASE}/api/data/teams`)
      ]);

      if (!incidentsRes.ok || !teamsRes.ok) {
        throw new Error('Failed to fetch data from server');
      }

      const [incidentsData, teamsData] = await Promise.all([
        incidentsRes.json(),
        teamsRes.json()
      ]);

      if (incidentsData.success && teamsData.success) {
        setIncidents(incidentsData.data);
        setTeams(teamsData.data);
        setLastUpdated(new Date());
      } else {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      // Fallback to mock data if API fails
      setFallbackData();
      setNotification({ type: 'info', message: 'Using demo data - API unavailable' });
    } finally {
      setLoading(false);
    }
  };

  // --- Fallback Data ---
  const setFallbackData = () => {
    const MOCK_INCIDENTS: MapIncident[] = [
      {
        id: "1",
        externalId: "INC-2026-001",
        title: "Garbage Overflow at Rohini Sector 8",
        category: "Garbage",
        priority: "P1",
        impactScore: 95,
        status: "ASSIGNED",
        complaintCount: 47,
        lat: 28.7326,
        lng: 77.1197,
        address: "Rohini Sector 8, Near Market",
        ward: "Ward 12",
        district: "North Delhi",
        isEmergency: true
      },
      {
        id: "2",
        externalId: "INC-2026-002",
        title: "Illegal Dumping near GT Karnal Road",
        category: "Garbage",
        priority: "P2",
        impactScore: 78,
        status: "IN_PROGRESS",
        complaintCount: 23,
        lat: 28.712,
        lng: 77.154,
        address: "GT Karnal Road, Near Crossing",
        ward: "Ward 15",
        district: "North Delhi",
        isEmergency: false
      },
      {
        id: "3",
        externalId: "INC-2026-003",
        title: "Water Leakage at Shalimar Bagh",
        category: "Water Leakage",
        priority: "P2",
        impactScore: 88,
        status: "ASSIGNED",
        complaintCount: 15,
        lat: 28.71,
        lng: 77.16,
        address: "Shalimar Bagh Block A",
        ward: "Ward 18",
        district: "North Delhi",
        isEmergency: false
      }
    ];
    const MOCK_TEAMS: MapTeam[] = [
      {
        id: "1",
        name: "SWM Rapid Response 1",
        department: "MCD",
        specialization: "Garbage",
        status: "OnSite",
        currentWorkload: 3,
        maxWorkload: 5,
        members: ["Rajesh Kumar", "Suresh Singh", "Mohan Lal"],
        equipment: ["Garbage Truck", "Compactor", "Tools"],
        lat: 28.7320,
        lng: 77.1200,
        assignedIncidentIds: ["1"],
        lastUpdated: new Date(Date.now() - 1000 * 60 * 5).toISOString()
      },
      {
        id: "2",
        name: "Drainage Team 2",
        department: "MCD",
        specialization: "Drainage",
        status: "Available",
        currentWorkload: 1,
        maxWorkload: 4,
        members: ["Ravi Verma", "Anil Mehta"],
        equipment: ["Jetting Machine", "Water Pumps"],
        lat: 28.70,
        lng: 77.12,
        assignedIncidentIds: [],
        lastUpdated: new Date(Date.now() - 1000 * 60 * 10).toISOString()
      }
    ];
    setIncidents(MOCK_INCIDENTS);
    setTeams(MOCK_TEAMS);
  };

  // --- Initial Data Load ---
  useEffect(() => {
    fetchData();
  }, []);

  // --- Auto Refresh Polling ---
  useEffect(() => {
    if (!autoRefresh) return;
    const intervalId = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(intervalId);
  }, [autoRefresh]);

  // --- Team Recommendation Engine ---
  const recommendedTeams = useMemo(() => {
    if (!selectedIncident || teams.length === 0) return [];
    return teams
      .map(team => {
        const distance = getDistance(selectedIncident.lat, selectedIncident.lng, team.lat, team.lng);
        const specializationMatch = team.specialization.includes(selectedIncident.category);
        const workload = team.currentWorkload / team.maxWorkload;

        let score = 0;
        if (specializationMatch) score += 50;
        score += Math.max(0, (1 - workload) * 30);
        score += Math.max(0, (1 - distance) * 20);

        return {
          team,
          distance: distance.toFixed(2),
          eta: Math.round(distance * 10),
          specializationMatch,
          score,
          reason: specializationMatch ? "Specialization Match + Nearest" : distance < 1 ? "Nearest" : "Available"
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [selectedIncident, teams]);

  const nearbyIncidents = useMemo(() => {
    if (!selectedIncident) return [];
    const radius = 0.5; // 500m
    return incidents.filter(incident => {
      if (incident.id === selectedIncident.id) return false;
      const distance = getDistance(selectedIncident.lat, selectedIncident.lng, incident.lat, incident.lng);
      return distance <= radius;
    });
  }, [selectedIncident, incidents]);

  // --- Deployment Analytics ---
  const analytics = useMemo(() => {
    const totalTeams = teams.length;
    const available = teams.filter(t => t.status === "Available").length;
    const busy = teams.filter(t => t.status === "Busy" || t.status === "OnSite" || t.status === "Travelling").length;

    return {
      totalTeams,
      available,
      busy,
      totalActiveIncidents: incidents.filter(i => i.status !== "RESOLVED" && i.status !== "CLOSED").length,
      avgResponseTime: "14 mins",
      teamUtilization: totalTeams > 0 ? `${Math.round((busy / totalTeams) * 100)}%` : "0%",
      fuelSaved: "120 L",
      incidentsGrouped: nearbyIncidents.length + (selectedIncident ? 1 : 0)
    };
  }, [teams, incidents, nearbyIncidents, selectedIncident]);

  // --- Get Colors ---
  const getTeamStatusColor = (status: TeamStatus) => {
    switch (status) {
      case "Available": return "#10b981";
      case "Travelling": return "#f59e0b";
      case "OnSite": return "#3b82f6";
      case "Busy": return "#ef4444";
      case "Offline": return "#6b7280";
      default: return "#6b7280";
    }
  };

  // --- Handlers ---
  const handleAssignTeam = async (teamId: string) => {
    if (!selectedIncident) return;
    setIsAssigning(true);
    try {
      await assignIncidentTeam(selectedIncident.externalId, { teamId });
      setNotification({ type: 'success', message: `Team assigned to ${selectedIncident.externalId} successfully!` });
      
      // Refresh data after assignment
      await fetchData();
    } catch (error) {
      setNotification({ type: 'error', message: `Failed to assign team: ${(error as Error).message}` });
    } finally {
      setIsAssigning(false);
    }
  };

  const handleUpdateProgress = async (status: string) => {
    if (!selectedIncident || !progressNote) return;
    setIsUpdatingProgress(true);
    try {
      await updateIncidentProgress(selectedIncident.externalId, { status, progressNote });
      setNotification({ type: 'success', message: `Incident progress updated successfully!` });
      
      // Refresh data after update
      await fetchData();
      setProgressNote("");
    } catch (error) {
      setNotification({ type: 'error', message: `Failed to update progress: ${(error as Error).message}` });
    } finally {
      setIsUpdatingProgress(false);
    }
  };

  // --- Notification Effect ---
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (loading) {
    return (
      <div className="h-screen w-full bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin mx-auto mb-6 text-blue-500" />
          <h2 className="text-2xl font-bold mb-2">Loading Deployment Intelligence Map</h2>
          <p className="text-slate-400">Connecting to Delhi Samadhan Command Center...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-slate-950 text-white flex flex-col overflow-hidden relative">
      {/* Notification Toast */}
      {notification && (
        <div className={`absolute top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-2xl border ${
          notification.type === 'success' ? 'bg-green-900/90 border-green-600' :
          notification.type === 'error' ? 'bg-red-900/90 border-red-600' :
          'bg-blue-900/90 border-blue-600'
        }`}>
          <div className="flex items-center gap-3">
            {notification.type === 'success' ? <CheckCircle2 className="h-5 w-5 text-green-400" /> :
             notification.type === 'error' ? <XCircle className="h-5 w-5 text-red-400" /> :
             <AlertTriangle className="h-5 w-5 text-blue-400" />}
            <p className="font-medium">{notification.message}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center font-black text-xl">
              DS
            </div>
            <div>
              <h1 className="text-xl font-black">Delhi Samadhan - Team Deployment Intelligence</h1>
              <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider">
                North Delhi Command Center • Last Updated: {lastUpdated.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            LIVE
          </div>
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-bold transition-colors ${
              autoRefresh ? 'bg-green-600/20 border-green-600 text-green-400' : 'bg-slate-800 border-slate-700'
            }`}
          >
            <RefreshCw className={`h-4 w-4 ${autoRefresh ? 'animate-spin' : ''}`} />
            Auto {autoRefresh ? 'On' : 'Off'}
          </button>
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg border border-blue-700 text-sm font-bold transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
          <button
            onClick={() => window.location.href = "/officer"}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 text-sm font-bold transition-colors flex items-center gap-2"
          >
            <XCircle className="h-4 w-4" />
            Back to Dashboard
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <div className="w-80 bg-slate-900 border-r border-slate-800 p-4 flex flex-col gap-4 overflow-y-auto flex-shrink-0">
          <h2 className="text-sm font-bold uppercase text-slate-400 tracking-wider">Deployment Intelligence</h2>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
            <p className="text-xs text-slate-500 font-semibold">Layers</p>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={showIncidents} onChange={() => setShowIncidents(!showIncidents)} className="rounded" />
              Incidents
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={showTeams} onChange={() => setShowTeams(!showTeams)} className="rounded" />
              Field Teams
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={showHotspots} onChange={() => setShowHotspots(!showHotspots)} className="rounded" />
              Hotspots
            </label>
          </div>

          {selectedIncident && (
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2 py-1 rounded-full text-xs font-bold"
                      style={{ backgroundColor: `${selectedIncident.priority === "P1" ? "#dc2626" : selectedIncident.priority === "P2" ? "#f59e0b" : "#22c55e"}20`, color: selectedIncident.priority === "P1" ? "#dc2626" : selectedIncident.priority === "P2" ? "#f59e0b" : "#22c55e" }}
                    >
                      {selectedIncident.priority}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{selectedIncident.externalId}</span>
                  </div>
                  <h3 className="font-bold text-sm mt-2">{selectedIncident.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedIncident(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <XCircle size={16} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-900 p-2 rounded-lg">
                  <p className="text-slate-500">Complaints</p>
                  <p className="font-bold">{selectedIncident.complaintCount}</p>
                </div>
                <div className="bg-slate-900 p-2 rounded-lg">
                  <p className="text-slate-500">Impact</p>
                  <p className="font-bold">{selectedIncident.impactScore}</p>
                </div>
                <div className="bg-slate-900 p-2 rounded-lg">
                  <p className="text-slate-500">Ward</p>
                  <p className="font-bold">{selectedIncident.ward}</p>
                </div>
                <div className="bg-slate-900 p-2 rounded-lg">
                  <p className="text-slate-500">Status</p>
                  <p className="font-bold">{selectedIncident.status}</p>
                </div>
              </div>

              {/* Progress Update */}
              <div className="space-y-2">
                <label className="text-xs text-slate-500 font-semibold">Update Progress</label>
                <textarea
                  value={progressNote}
                  onChange={(e) => setProgressNote(e.target.value)}
                  placeholder="Enter update notes..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-blue-500"
                  rows={3}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdateProgress("IN_PROGRESS")}
                    disabled={!progressNote || isUpdatingProgress}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-xs font-bold py-2 rounded-lg transition-colors"
                  >
                    {isUpdatingProgress ? <Loader2 className="h-3 w-3 animate-spin inline mr-1" /> : null}
                    Mark In Progress
                  </button>
                  <button
                    onClick={() => handleUpdateProgress("RESOLVED")}
                    disabled={!progressNote || isUpdatingProgress}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-xs font-bold py-2 rounded-lg transition-colors"
                  >
                    {isUpdatingProgress ? <Loader2 className="h-3 w-3 animate-spin inline mr-1" /> : null}
                    Mark Resolved
                  </button>
                </div>
              </div>

              {nearbyIncidents.length > 0 && (
                <div className="bg-amber-900/20 border border-amber-800/30 p-3 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="text-amber-500 h-4 w-4" />
                    <p className="font-bold text-xs text-amber-400 uppercase">Nearby Incidents Detected</p>
                  </div>
                  <p className="text-xs text-amber-200 mb-3">
                    {nearbyIncidents.length} incidents within 500m. Assign same team?
                  </p>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-amber-600 hover:bg-amber-700 text-xs font-bold py-1.5 rounded-lg transition-colors">
                      Assign All
                    </button>
                    <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-xs font-bold py-1.5 rounded-lg transition-colors">
                      Assign Individually
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Center Map */}
        <div className="flex-1 relative">
          <LeafletMapInner
            incidents={showIncidents ? incidents : []}
            teams={showTeams ? teams : []}
            selectedIncident={selectedIncident}
            selectedTeam={selectedTeam}
            onIncidentClick={setSelectedIncident}
            onTeamClick={setSelectedTeam}
          />
        </div>

        {/* Right Panel */}
        <div className="w-96 bg-slate-900 border-l border-slate-800 flex flex-col flex-shrink-0">
          <div className="p-4 border-b border-slate-800">
            <h2 className="text-sm font-bold uppercase text-slate-400 tracking-wider mb-4">
              {selectedIncident ? "Recommended Teams" : "Team Status Board"}
            </h2>

            {selectedIncident ? (
              <div className="space-y-3">
                {recommendedTeams.map((rec, index) => (
                  <div
                    key={rec.team.id}
                    className="bg-slate-950 border border-slate-800 p-4 rounded-xl hover:border-slate-600 cursor-pointer transition-colors"
                    onClick={() => setSelectedTeam(rec.team)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getTeamStatusColor(rec.team.status) }}
                        />
                        <span className="font-bold text-sm">{rec.team.name}</span>
                      </div>
                      {index === 0 && (
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full">
                          BEST MATCH
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mb-2">{rec.reason}</p>
                    <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                      <div>
                        <p className="text-slate-500">Distance</p>
                        <p className="font-bold">{rec.distance} km</p>
                      </div>
                      <div>
                        <p className="text-slate-500">ETA</p>
                        <p className="font-bold">{rec.eta} mins</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Workload</p>
                        <p className="font-bold">{rec.team.currentWorkload}/{rec.team.maxWorkload}</p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAssignTeam(rec.team.id);
                      }}
                      disabled={isAssigning}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-2 rounded-lg text-xs transition-colors"
                    >
                      {isAssigning ? <Loader2 className="h-3 w-3 animate-spin inline mr-1" /> : null}
                      Assign Team
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {["Available", "Travelling", "OnSite", "Busy", "Offline"].map(status => {
                  const teamsInStatus = teams.filter(t => t.status === status);
                  return (
                    <div key={status} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: getTeamStatusColor(status as TeamStatus) }}
                        />
                        <span className="text-xs font-bold text-slate-400 uppercase">{status} ({teamsInStatus.length})</span>
                      </div>
                      {teamsInStatus.map(team => (
                        <div
                          key={team.id}
                          className="bg-slate-950 border border-slate-800 p-2 rounded-lg text-xs flex items-center justify-between cursor-pointer hover:border-slate-600"
                          onClick={() => setSelectedTeam(team)}
                        >
                          <span className="font-bold">{team.name}</span>
                          <span className="text-slate-500">{team.currentWorkload}/{team.maxWorkload}</span>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <h2 className="text-sm font-bold uppercase text-slate-400 tracking-wider mb-4">Deployment Analytics</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-500">Avg Response Time</p>
                <p className="text-lg font-bold text-green-400">{analytics.avgResponseTime}</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-500">Team Utilization</p>
                <p className="text-lg font-bold text-blue-400">{analytics.teamUtilization}</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-500">Fuel Saved</p>
                <p className="text-lg font-bold text-emerald-400">{analytics.fuelSaved}</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-500">Incidents Grouped</p>
                <p className="text-lg font-bold text-amber-400">{analytics.incidentsGrouped}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
