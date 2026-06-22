"use client";

import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  useMap,
  Polyline
} from "react-leaflet";
import L from "leaflet";
import {
  MapPin,
  Users,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Shield
} from "lucide-react";

// --- Types ---
type Priority = "P1" | "P2" | "P3" | "P4";
type TeamStatus = "Available" | "Travelling" | "OnSite" | "Busy" | "Offline";

interface MapIncident {
  id: string;
  externalId: string;
  title: string;
  category: string;
  priority: Priority;
  impactScore: number;
  status: string;
  complaintCount: number;
  lat: number;
  lng: number;
  address: string;
  ward: string;
  district: string;
  assignedTeamId?: string;
  isEmergency: boolean;
}

interface MapTeam {
  id: string;
  name: string;
  department: string;
  specialization: string;
  status: TeamStatus;
  currentWorkload: number;
  maxWorkload: number;
  members: string[];
  equipment: string[];
  lat: number;
  lng: number;
  assignedIncidentIds: string[];
  lastUpdated: string;
}

interface LeafletMapInnerProps {
  incidents: MapIncident[];
  teams: MapTeam[];
  selectedIncident: MapIncident | null;
  selectedTeam: MapTeam | null;
  onIncidentClick: (incident: MapIncident) => void;
  onTeamClick: (team: MapTeam) => void;
}

// --- Helper Functions ---
const getPriorityColor = (priority: Priority) => {
  switch (priority) {
    case "P1": return "#dc2626";
    case "P2": return "#f59e0b";
    case "P3": return "#eab308";
    case "P4": return "#3b82f6";
    default: return "#6b7280";
  }
};

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

// --- Custom Icons ---
const createIncidentIcon = (color: string, isP1: boolean) => L.divIcon({
  className: "custom-incident-icon",
  html: `<div style="position: relative;width: ${isP1 ? 44 : 36}px;height: ${isP1 ? 44 : 36}px;z-index:1000;"><div style="background-color: ${color};width: 100%;height: 100%;border-radius: 50%;display: flex;align-items: center;justify-content: center;border: 3px solid white;box-shadow: 0 0 10px rgba(0,0,0,0.3);${isP1 ? 'animation: pulse 1.5s infinite;' : ''}"><svg style="width: ${isP1 ? 24 : 20}px;height: ${isP1 ? 24 : 20}px;color: white;" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" /></svg></div></div>
  <style>
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.15); opacity: 0.9; }
    }
  </style>`,
  iconSize: [44, 44],
  iconAnchor: [22, 44],
  popupAnchor: [0, -44],
});

const createTeamIcon = (color: string) => L.divIcon({
  className: "custom-team-icon",
  html: `<div style="background-color: ${color};width: 32px;height: 32px;border-radius: 50%;display: flex;align-items: center;justify-content: center;border: 3px solid white;box-shadow: 0 0 10px rgba(0,0,0,0.3);z-index:500;"><svg style="width: 18px;height: 18px;color: white;" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// --- Map View Component ---
function MapView({ selectedIncident, selectedTeam }: { selectedIncident: MapIncident | null; selectedTeam: MapTeam | null }) {
  const map = useMap();
  
  React.useEffect(() => {
    if (selectedIncident) {
      map.setView([selectedIncident.lat, selectedIncident.lng], 15, { animate: true });
    } else if (selectedTeam) {
      map.setView([selectedTeam.lat, selectedTeam.lng], 15, { animate: true });
    }
  }, [selectedIncident, selectedTeam, map]);

  return null;
}

export default function LeafletMapInner({
  incidents,
  teams,
  selectedIncident,
  selectedTeam,
  onIncidentClick,
  onTeamClick
}: LeafletMapInnerProps) {
  return (
    <MapContainer
      center={[28.70, 77.13]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        maxZoom={19}
      />

      {/* Incident Markers */}
      {incidents.map((incident) => (
        <Marker
          key={incident.id}
          position={[incident.lat, incident.lng]}
          icon={createIncidentIcon(getPriorityColor(incident.priority), incident.priority === "P1")}
          eventHandlers={{ click: () => onIncidentClick(incident) }}
        >
          <Popup>
            <div className="w-72 text-slate-900">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ backgroundColor: `${getPriorityColor(incident.priority)}20`, color: getPriorityColor(incident.priority) }}
                  >
                    {incident.priority}
                  </span>
                  <span className="font-mono text-xs text-slate-500">{incident.externalId}</span>
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">{incident.title}</h3>
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div>
                  <p className="text-slate-500">Category</p>
                  <p className="font-semibold">{incident.category}</p>
                </div>
                <div>
                  <p className="text-slate-500">Complaints</p>
                  <p className="font-semibold">{incident.complaintCount}</p>
                </div>
                <div>
                  <p className="text-slate-500">Impact Score</p>
                  <p className="font-semibold">{incident.impactScore}</p>
                </div>
                <div>
                  <p className="text-slate-500">Status</p>
                  <p className="font-semibold">{incident.status}</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                <MapPin size={12} className="inline mr-1" />
                {incident.address}, {incident.ward}, {incident.district}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Team Markers */}
      {teams.map((team) => (
        <Marker
          key={team.id}
          position={[team.lat, team.lng]}
          icon={createTeamIcon(getTeamStatusColor(team.status))}
          eventHandlers={{ click: () => onTeamClick(team) }}
        >
          <Popup>
            <div className="w-72 text-slate-900">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg">{team.name}</h3>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getTeamStatusColor(team.status) }}
                  />
                  <span className="text-xs font-bold">{team.status}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div>
                  <p className="text-slate-500">Department</p>
                  <p className="font-semibold">{team.department}</p>
                </div>
                <div>
                  <p className="text-slate-500">Specialization</p>
                  <p className="font-semibold">{team.specialization}</p>
                </div>
                <div>
                  <p className="text-slate-500">Workload</p>
                  <p className="font-semibold">{team.currentWorkload}/{team.maxWorkload}</p>
                </div>
                <div>
                  <p className="text-slate-500">Members</p>
                  <p className="font-semibold">{team.members.length}</p>
                </div>
              </div>
              <div className="mb-3">
                <p className="text-xs text-slate-500 mb-1">Equipment:</p>
                <div className="flex flex-wrap gap-1">
                  {team.equipment.map((eq, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-100 text-xs rounded">
                      {eq}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-500">
                Last updated: {new Date(team.lastUpdated).toLocaleString()}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Route Polyline if both selected */}
      {selectedIncident && selectedTeam && (
        <Polyline
          positions={[
            [selectedTeam.lat, selectedTeam.lng],
            [selectedIncident.lat, selectedIncident.lng]
          ]}
          pathOptions={{ color: "#3b82f6", weight: 4, opacity: 0.7, dashArray: "10, 10" }}
        />
      )}

      {/* Selection Circle for selected incident */}
      {selectedIncident && (
        <CircleMarker
          center={[selectedIncident.lat, selectedIncident.lng]}
          radius={20}
          pathOptions={{
            color: getPriorityColor(selectedIncident.priority),
            weight: 2,
            opacity: 0.5,
            fill: true,
            fillOpacity: 0.1
          }}
        />
      )}

      {/* Selection Circle for selected team */}
      {selectedTeam && (
        <CircleMarker
          center={[selectedTeam.lat, selectedTeam.lng]}
          radius={15}
          pathOptions={{
            color: getTeamStatusColor(selectedTeam.status),
            weight: 2,
            opacity: 0.5,
            fill: true,
            fillOpacity: 0.1
          }}
        />
      )}

      <MapView selectedIncident={selectedIncident} selectedTeam={selectedTeam} />
    </MapContainer>
  );
}
