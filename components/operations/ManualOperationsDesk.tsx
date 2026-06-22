"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { CheckCircle2, Loader2, Send, UsersRound } from "lucide-react";
import {
  OperationalEmployee,
  OperationalIncident,
  OperationalTeam,
  assignIncidentEmployees,
  assignIncidentTeam,
  getOperationalEmployees,
  getOperationalIncidents,
  getOperationalTeams,
  updateIncidentProgress,
} from "@/services/api";

type Props = {
  departmentCode?: string;
  mode?: "officer" | "department";
  defaultIncidentId?: string;
  incidents?: OperationalIncident[];
};

const statusOptions = ["ASSIGNED", "IN_PROGRESS", "RESOLVED", "REOPENED"];

export default function ManualOperationsDesk({ departmentCode, mode = "officer", defaultIncidentId, incidents: passedIncidents }: Props) {
  const [incidents, setIncidents] = useState<OperationalIncident[]>([]);
  const [teams, setTeams] = useState<OperationalTeam[]>([]);
  const [employees, setEmployees] = useState<OperationalEmployee[]>([]);
  const [incidentId, setIncidentId] = useState("");
  const [teamId, setTeamId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [status, setStatus] = useState("IN_PROGRESS");
  const [progressPercent, setProgressPercent] = useState(35);
  const [progressNote, setProgressNote] = useState("Field team dispatched and verification evidence is being collected.");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [aiSummary, setAiSummary] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      setIsLoading(true);
      setMessage("");
      try {
        const [teamResponse, employeeResponse] = await Promise.all([
          getOperationalTeams(departmentCode),
          getOperationalEmployees(departmentCode),
        ]);

        if (!mounted) return;
        
        // Use passed incidents if provided, otherwise fetch
        const nextIncidents = passedIncidents || [];
        if (!passedIncidents) {
          const incidentResponse = await getOperationalIncidents(departmentCode);
          nextIncidents.push(...(incidentResponse.data.slice(0, 12)));
        }
        
        setIncidents(nextIncidents);
        setTeams(teamResponse.data.slice(0, 20));
        setEmployees(employeeResponse.data.slice(0, 30));
        
        // Use defaultIncidentId if provided, otherwise first incident
        const initialIncidentId = defaultIncidentId || nextIncidents[0]?.externalId || nextIncidents[0]?.id || "";
        setIncidentId(initialIncidentId);
        setTeamId(teamResponse.data[0]?.id || "");
        setEmployeeId(employeeResponse.data[0]?.employeeId || "");
      } catch (error) {
        if (mounted) {
          setMessage(error instanceof Error ? error.message : "Could not load operational data.");
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [departmentCode, passedIncidents]);

  // Update incidentId when defaultIncidentId changes
  useEffect(() => {
    if (defaultIncidentId) {
      setIncidentId(defaultIncidentId);
    }
  }, [defaultIncidentId]);

  const selectedIncident = useMemo(
    () => incidents.find((incident) => incident.externalId === incidentId || incident.id === incidentId),
    [incidentId, incidents]
  );

  // Filter teams and employees by selected incident's department code
  const filteredTeams = useMemo(() => {
    if (!selectedIncident?.departmentCode) return teams;
    return teams.filter(team => team.departmentCode === selectedIncident.departmentCode);
  }, [teams, selectedIncident]);

  const filteredEmployees = useMemo(() => {
    if (!selectedIncident?.departmentCode) return employees;
    return employees.filter(emp => emp.departmentCode === selectedIncident.departmentCode);
  }, [employees, selectedIncident]);

  // Generate AI summary when selectedIncident changes
  useEffect(() => {
    if (!selectedIncident?.complaints || selectedIncident.complaints.length === 0) {
      setAiSummary("");
      return;
    }
    // Simulate AI-generated summary
    const summary = `AI Summary: ${selectedIncident.complaints.length} citizens reported ${selectedIncident.incidentType} at ${selectedIncident.ward}, ${selectedIncident.zone}. Common issues: ${Array.from(new Set(selectedIncident.complaints.map(c => c.description.split(' - ')[0]))).join(', ')}. Location: ${selectedIncident.address}. Priority: ${selectedIncident.severity}. Recommend immediate action to avoid SLA breach.`;
    setAiSummary(summary);
  }, [selectedIncident]);

  async function onAssignTeam(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!incidentId || !teamId) return;
    setIsSubmitting(true);
    setMessage("");
    try {
      await assignIncidentTeam(incidentId, {
        teamId,
        assignedBy: mode === "department" ? "department-control" : "officer-desk",
        notes: "Manual assignment from operations panel.",
      });
      setMessage("Team assigned successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not assign team.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function onAssignEmployee(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!incidentId || !employeeId) return;
    setIsSubmitting(true);
    setMessage("");
    try {
      await assignIncidentEmployees(incidentId, {
        officerIds: [employeeId],
        assignedBy: mode === "department" ? "department-control" : "officer-desk",
        notes: "Manual employee assignment from operations panel.",
      });
      setMessage("Employee assigned successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not assign employee.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function onUpdateProgress(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!incidentId || !progressNote.trim()) return;
    setIsSubmitting(true);
    setMessage("");
    try {
      await updateIncidentProgress(incidentId, {
        status,
        progressNote,
        progressPercent,
        officerId: employeeId || undefined,
        notifyCitizen: status === "RESOLVED",
      });
      setMessage("Progress updated successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not update progress.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="rounded-md border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-black">
              <UsersRound className="h-5 w-5 text-teal-700" />
              Manual Operations Desk
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Assign teams, assign employees, and update progress when integrated department APIs need human control.
            </p>
          </div>
          {selectedIncident && (
            <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-700">
              {selectedIncident.severity} / {selectedIncident.slaStatus} SLA / Priority {selectedIncident.priorityScore}
            </div>
          )}
        </div>
      </div>

      {/* Detailed Incident Information */}
      {selectedIncident && (
        <div className="border-b border-slate-200 p-5 bg-slate-50">
          <h3 className="text-sm font-black uppercase tracking-wide text-slate-500 mb-3">Incident Details</h3>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <p className="text-xs font-bold text-slate-400">ID</p>
              <p className="text-sm font-black">{selectedIncident.externalId}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400">Depot</p>
              <p className="text-sm font-black">{selectedIncident.depot || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400">Zone</p>
              <p className="text-sm font-black">{selectedIncident.zone || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400">Ward</p>
              <p className="text-sm font-black">{selectedIncident.ward || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400">Reports</p>
              <p className="text-sm font-black">{selectedIncident.reportCount || 0}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400">Images</p>
              <p className="text-sm font-black">{selectedIncident.imageCount || 0}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400">Department</p>
              <p className="text-sm font-black">{selectedIncident.department}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400">Status</p>
              <p className="text-sm font-black">{selectedIncident.status}</p>
            </div>
          </div>

          {/* AI Summary */}
          {aiSummary && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-md p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="grid h-6 w-6 place-items-center rounded-full bg-amber-500 text-white text-xs font-black">AI</div>
                <h4 className="text-xs font-black uppercase tracking-wide text-amber-800">AI Summary</h4>
              </div>
              <p className="text-sm text-amber-900">{aiSummary}</p>
            </div>
          )}

          {/* Complaints List */}
          {selectedIncident.complaints && selectedIncident.complaints.length > 0 && (
            <div className="mt-4">
              <h4 className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">Associated Complaints</h4>
              <div className="space-y-3">
                {selectedIncident.complaints.map((complaint) => (
                  <div key={complaint.id} className="bg-white rounded-md border border-slate-200 p-4">
                    <div className="grid gap-4 md:grid-cols-[1fr_200px]">
                      <div>
                        <p className="text-xs font-black text-slate-700">{complaint.externalId}</p>
                        <p className="text-sm font-semibold text-slate-900 mt-1">{complaint.description}</p>
                        <p className="text-xs text-slate-500 mt-1">{complaint.address}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-200 grid place-items-center text-xs font-bold text-slate-600">
                            {complaint.citizenName?.charAt(0).toUpperCase() || "C"}
                          </div>
                          <p className="text-xs text-slate-600">
                            {complaint.citizenName} • {new Date(complaint.submittedAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      {complaint.imageUrl && (
                        <img 
                          src={complaint.imageUrl} 
                          alt="Complaint evidence"
                          className="w-full h-40 object-cover rounded-md"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="grid gap-5 p-5 xl:grid-cols-[1fr_1fr_1.1fr]">
        <label className="space-y-2 xl:col-span-3">
          <span className="text-xs font-black uppercase tracking-wide text-slate-500">Incident</span>
          <select
            value={incidentId}
            onChange={(event) => setIncidentId(event.target.value)}
            className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm font-bold outline-none focus:border-teal-700"
          >
            {incidents.map((incident) => (
              <option key={incident.id} value={incident.externalId || incident.id}>
                {incident.externalId} - {incident.incidentType} - {incident.status} ({incident.depot || "N/A"})
              </option>
            ))}
          </select>
        </label>

        <form onSubmit={onAssignTeam} className="space-y-3 rounded-md border border-slate-200 bg-slate-50 p-4">
          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wide text-slate-500">Team ({filteredTeams.length} available)</span>
            <select
              value={teamId}
              onChange={(event) => setTeamId(event.target.value)}
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm font-bold"
            >
              {filteredTeams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </label>
          <button disabled={isLoading || isSubmitting || !teamId} className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-slate-950 text-sm font-black text-white disabled:bg-slate-300">
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Assign Team
          </button>
        </form>

        <form onSubmit={onAssignEmployee} className="space-y-3 rounded-md border border-slate-200 bg-slate-50 p-4">
          <label className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wide text-slate-500">Employee ({filteredEmployees.length} available)</span>
            <select
              value={employeeId}
              onChange={(event) => setEmployeeId(event.target.value)}
              className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm font-bold"
            >
              {filteredEmployees.map((employee) => (
                <option key={employee.employeeId} value={employee.employeeId}>
                  {employee.name} - {employee.role} ({employee.activeAssignments} active)
                </option>
              ))}
            </select>
          </label>
          <button disabled={isLoading || isSubmitting || !employeeId} className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-slate-950 bg-white text-sm font-black text-slate-950 disabled:border-slate-300 disabled:text-slate-400">
            <UsersRound className="h-4 w-4" />
            Assign Employee
          </button>
        </form>

        <form onSubmit={onUpdateProgress} className="space-y-3 rounded-md border border-teal-200 bg-teal-50 p-4">
          <div className="grid gap-3 sm:grid-cols-[1fr_120px]">
            <label className="space-y-2">
              <span className="text-xs font-black uppercase tracking-wide text-teal-800">Status</span>
              <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-10 w-full rounded-md border border-teal-200 bg-white px-3 text-sm font-bold">
                {statusOptions.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-xs font-black uppercase tracking-wide text-teal-800">Progress</span>
              <input
                type="number"
                min={0}
                max={100}
                value={progressPercent}
                onChange={(event) => setProgressPercent(Number(event.target.value))}
                className="h-10 w-full rounded-md border border-teal-200 bg-white px-3 text-sm font-bold"
              />
            </label>
          </div>
          <textarea
            value={progressNote}
            onChange={(event) => setProgressNote(event.target.value)}
            rows={3}
            className="w-full rounded-md border border-teal-200 bg-white px-3 py-2 text-sm font-bold outline-none"
          />
          <button disabled={isLoading || isSubmitting || !progressNote.trim()} className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-teal-700 text-sm font-black text-white disabled:bg-teal-200">
            <CheckCircle2 className="h-4 w-4" />
            Update Progress
          </button>
        </form>
      </div>

      {message && <p className="border-t border-slate-200 px-5 py-3 text-sm font-bold text-slate-700">{message}</p>}
    </section>
  );
}
