export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:3000";

export type FeatureStatus = "live" | "partial" | "planned";
export type Priority = "P1" | "P2" | "P3" | "P4";
export type TeamStatus = "Available" | "Travelling" | "OnSite" | "Busy" | "Offline";

export interface MapIncident {
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

export interface MapTeam {
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

export interface ArchitectureFeature {
  name: string;
  summary: string;
  status: FeatureStatus;
}

export interface ArchitectureLayer {
  id: string;
  name: string;
  description: string;
  features: ArchitectureFeature[];
}

export interface WinningFeature {
  name: string;
  demoMessage: string;
}

export interface FeatureArchitectureResponse {
  product: string;
  tagline: string;
  citizenInputs: string[];
  complaintLifecycle: string[];
  categories: string[];
  severityLevels: string[];
  priorityLevels: string[];
  totals: {
    layers: number;
    features: number;
    byStatus: Record<FeatureStatus, number>;
  };
  layers: ArchitectureLayer[];
  winningFeatures: WinningFeature[];
}

export interface ComplaintRegistrationPayload {
  phoneNumber: string;
  description: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  imageUrl?: string;
  voiceUrl?: string;
}

export interface ComplaintRegistrationResponse {
  complaintId: string;
  status: string;
  category?: string;
  severity?: string;
  department?: string;
  departmentCode?: string;
  isDuplicate?: boolean;
  isUnclear?: boolean;
  duplicateComplaintId?: string;
  pdfUrl?: string;
}

export interface ComplaintDetails {
  complaintId: string;
  status: string;
  category?: string;
  severity?: string;
  department?: string;
  departmentCode?: string;
  isUnclear?: boolean;
  lastUpdated?: string;
}

export interface CMFeedResponse {
  success: boolean;
  data?: unknown;
  error?: string;
}

export interface Complaint {
  id: string;
  externalId: string;
  description: string;
  address: string;
  imageUrl?: string;
  submittedAt: string;
  citizenName?: string;
  citizenPhone?: string;
}

export interface OperationalIncident {
  id: string;
  externalId: string;
  incidentType: string;
  status: string;
  severity: string;
  priorityScore: number;
  slaStatus: string;
  department?: string;
  departmentCode?: string;
  address?: string;
  ward?: string;
  zone?: string;
  district?: string;
  depot?: string;
  reportCount?: number;
  imageCount?: number;
  complaints?: Complaint[];
}

export interface OperationalTeam {
  id: string;
  name: string;
  department: string;
  departmentCode: string;
  teamType: string;
  isActive: boolean;
}

export interface OperationalEmployee {
  employeeId: string;
  name: string;
  email: string;
  department: string;
  departmentCode: string;
  role: string;
  activeAssignments: number;
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function getFeatureArchitecture() {
  return requestJson<FeatureArchitectureResponse>("/api/architecture/feature-architecture");
}

export function getWinningFeatures() {
  return requestJson<{ product: string; count: number; features: WinningFeature[] }>(
    "/api/architecture/winning-features"
  );
}

export function registerComplaint(payload: ComplaintRegistrationPayload) {
  return requestJson<ComplaintRegistrationResponse>("/api/v1/complaints", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getComplaint(complaintId: string) {
  return requestJson<ComplaintDetails>(`/api/v1/complaints/${encodeURIComponent(complaintId)}`);
}

export function getCMFeed() {
  return requestJson<CMFeedResponse>("/api/incidents/governance/cm-feed");
}

export function getOperationalIncidents(departmentCode?: string) {
  const query = departmentCode ? `?departmentCode=${encodeURIComponent(departmentCode)}` : "";
  return requestJson<{ success: boolean; data: OperationalIncident[] }>(`/api/data/incidents${query}`);
}

export function getOperationalTeams(departmentCode?: string) {
  const query = departmentCode ? `?departmentCode=${encodeURIComponent(departmentCode)}` : "";
  return requestJson<{ success: boolean; data: OperationalTeam[] }>(`/api/data/teams${query}`);
}

export function getOperationalEmployees(departmentCode?: string) {
  const query = departmentCode ? `?departmentCode=${encodeURIComponent(departmentCode)}` : "";
  return requestJson<{ success: boolean; data: OperationalEmployee[] }>(`/api/data/employees${query}`);
}

export function assignIncidentTeam(incidentId: string, payload: { teamId: string; assignedBy?: string; notes?: string }) {
  return requestJson<{ success: boolean; data: unknown }>(`/api/data/incidents/${encodeURIComponent(incidentId)}/assign-team`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function assignIncidentEmployees(incidentId: string, payload: { officerIds: string[]; assignedBy?: string; notes?: string }) {
  return requestJson<{ success: boolean; data: unknown }>(`/api/data/incidents/${encodeURIComponent(incidentId)}/assign-employees`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateIncidentProgress(
  incidentId: string,
  payload: { status: string; progressNote: string; progressPercent?: number; officerId?: string; notifyCitizen?: boolean }
) {
  return requestJson<{ success: boolean; data: unknown }>(`/api/data/incidents/${encodeURIComponent(incidentId)}/progress`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
