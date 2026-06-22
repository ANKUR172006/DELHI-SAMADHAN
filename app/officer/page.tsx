'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  Bell,
  Calendar,
  Clock,
  MapPin,
  Users,
  Activity,
  CheckCircle2,
  TrendingUp,
  Search,
  Filter,
  MoreVertical,
  ChevronRight,
  Camera,
  FileText,
  Phone,
  MessageSquare,
  Shield,
  Timer,
  ArrowUpRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

// Mock Officer Information
const OFFICER_INFO = {
  id: 'OFC-001',
  name: 'Sva Yadav',
  role: 'Garbage Management Officer',
  department: 'MCD',
  zone: 'North Delhi',
  ward: 'Ward 12',
  depot: 'Depot 4',
  avatar: 'SY'
};

// Mock KPIs
const KPI_DATA = [
  { title: 'Active Incidents', value: 24, change: '+4', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { title: 'Critical Incidents', value: 3, change: '-1', color: 'text-red-500', bg: 'bg-red-500/10' },
  { title: 'SLA Risk', value: 7, change: 'High', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { title: 'Resolved (Month)', value: 47, change: '+12%', color: 'text-green-500', bg: 'bg-green-500/10' },
  { title: 'Citizen Satisfaction', value: '92%', change: '+2.5', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { title: 'Avg Resolution', value: '18h', change: '-2h', color: 'text-cyan-500', bg: 'bg-cyan-500/10' }
];

// Mock Incident Data
const MOCK_INCIDENTS = [
  {
    id: 'INC-2025-001',
    title: 'Severe Garbage Overflow at Rohini Sector 8 Market',
    category: 'Garbage Overflow',
    priority: 'P1',
    impactScore: 95,
    status: 'In Progress',
    complaintCount: 47,
    location: 'Rohini Sector 8, Near Market',
    ward: 'Ward 12',
    district: 'North Delhi',
    assignedTeam: 'MCD Rapid Response Team 4',
    sla: '2h 15m',
    slaRisk: 'red',
    lat: 28.7326,
    lng: 77.1197,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24)
  },
  {
    id: 'INC-2025-002',
    title: 'Illegal Dumping near GT Karnal Road',
    category: 'Illegal Dumping',
    priority: 'P2',
    impactScore: 78,
    status: 'Assigned',
    complaintCount: 23,
    location: 'GT Karnal Road, Near Railway Crossing',
    ward: 'Ward 15',
    district: 'North Delhi',
    assignedTeam: 'MCD Sanitation Team 7',
    sla: '10h 30m',
    slaRisk: 'yellow',
    lat: 28.712,
    lng: 77.154,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12)
  },
  {
    id: 'INC-2025-003',
    title: 'Drainage Blockage in Shakurpur',
    category: 'Drainage Blockage',
    priority: 'P2',
    impactScore: 82,
    status: 'Resolved',
    complaintCount: 31,
    location: 'Shakurpur, Block C',
    ward: 'Ward 8',
    district: 'North Delhi',
    assignedTeam: 'MCD Drainage Team 2',
    sla: 'Completed',
    slaRisk: 'green',
    lat: 28.705,
    lng: 77.13,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48)
  },
  {
    id: 'INC-2025-004',
    title: 'Public Toilet Maintenance Issue',
    category: 'Public Toilet',
    priority: 'P3',
    impactScore: 55,
    status: 'Assigned',
    complaintCount: 8,
    location: 'Pitampura, Near Metro Station',
    ward: 'Ward 22',
    district: 'North Delhi',
    assignedTeam: 'MCD Maintenance Team 11',
    sla: '1d 8h',
    slaRisk: 'green',
    lat: 28.698,
    lng: 77.114,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6)
  }
];

// Mock Trend Data for Charts
const TREND_DATA = [
  { date: '15 Jun', active: 22, resolved: 8 },
  { date: '16 Jun', active: 26, resolved: 12 },
  { date: '17 Jun', active: 21, resolved: 10 },
  { date: '18 Jun', active: 24, resolved: 9 },
  { date: '19 Jun', active: 20, resolved: 14 },
  { date: '20 Jun', active: 24, resolved: 11 },
  { date: '21 Jun', active: 24, resolved: 0 }
];

const CATEGORY_DATA = [
  { name: 'Garbage', value: 12, color: '#3B82F6' },
  { name: 'Drainage', value: 6, color: '#10B981' },
  { name: 'Encroachment', value: 3, color: '#F59E0B' },
  { name: 'Public Toilet', value: 2, color: '#8B5CF6' },
  { name: 'Stray', value: 1, color: '#EC4899' }
];

const KpiCard = ({ title, value, change, color, bg }: { title: string, value: string | number, change: string, color: string, bg: string }) => (
  <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-all duration-300 hover:shadow-lg">
    <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">{title}</p>
    <div className="mt-3 flex items-baseline justify-between">
      <h3 className="text-3xl font-bold text-white">{value}</h3>
      <div className={`${bg} px-2 py-1 rounded-md text-xs font-bold ${color}`}>
        {change}
      </div>
    </div>
  </div>
);

const IncidentCard = ({ incident, onClick }: { incident: typeof MOCK_INCIDENTS[0], onClick: () => void }) => {
  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'P1': return 'text-red-500 bg-red-500/10 border-red-500/30';
      case 'P2': return 'text-amber-500 bg-amber-500/10 border-amber-500/30';
      case 'P3': return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/30';
    }
  };

  const getStatusColor = (s: string) => {
    switch (s.toLowerCase()) {
      case 'resolved': return 'text-green-500';
      case 'in progress': return 'text-cyan-500';
      case 'assigned': return 'text-amber-500';
      default: return 'text-slate-400';
    }
  };

  const getSlaColor = (r: string) => {
    switch (r) {
      case 'red': return 'bg-red-500/20 text-red-400 border border-red-500/30';
      case 'yellow': return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
      case 'green': return 'bg-green-500/20 text-green-400 border border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border border-slate-500/30';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-slate-900 border border-slate-700 rounded-xl p-5 cursor-pointer hover:border-slate-500 transition-all hover:shadow-xl"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 rounded-md text-xs font-bold border ${getPriorityColor(incident.priority)}`}>
              {incident.priority}
            </span>
            <span className="text-slate-400 text-xs font-mono">{incident.id}</span>
          </div>
          <h3 className="text-white font-bold text-lg">{incident.title}</h3>
        </div>
        <span className={`${getSlaColor(incident.slaRisk)} px-3 py-1 rounded-full text-xs font-bold`}>
          {incident.sla}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
        <div className="flex items-center gap-2 text-slate-400">
          <MapPin className="h-4 w-4" />
          <span>{incident.ward}, {incident.district}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <FileText className="h-4 w-4" />
          <span>{incident.complaintCount} Complaints</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <Users className="h-4 w-4" />
          <span className="truncate">{incident.assignedTeam}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <Activity className="h-4 w-4" />
          <span className={getStatusColor(incident.status)}>{incident.status}</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-slate-500 text-xs">Impact Score</span>
        </div>
        <span className="text-white font-bold">{incident.impactScore}</span>
      </div>
    </div>
  );
};

export default function OfficerDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('ALL');

  const filteredIncidents = useMemo(() => {
    return MOCK_INCIDENTS.filter(incident => {
      const matchesSearch = !searchQuery || 
        incident.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        incident.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        incident.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = selectedPriority === 'ALL' || incident.priority === selectedPriority;
      return matchesSearch && matchesPriority;
    });
  }, [searchQuery, selectedPriority]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Top Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center font-black text-xl">
                  DS
                </div>
                <div>
                  <h1 className="text-xl font-black tracking-tight">Delhi Samadhan</h1>
                  <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider">Officer Command Center</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <span className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                  <Calendar className="h-3 w-3" />
                  {new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}
                </span>
                <span className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                  <Clock className="h-3 w-3" />
                  {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span className="flex items-center gap-1 bg-green-900/30 text-green-400 px-3 py-1 rounded-full border border-green-800">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  SYSTEM ONLINE
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-slate-800 rounded-lg transition-colors">
                <Bell className="h-6 w-6 text-slate-300" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full text-xs font-bold flex items-center justify-center">5</span>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-slate-800">
                <div className="text-right">
                  <p className="text-sm font-bold text-white">{OFFICER_INFO.name}</p>
                  <p className="text-xs text-slate-400">{OFFICER_INFO.role}</p>
                </div>
                <div className="h-11 w-11 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full flex items-center justify-center font-bold text-lg border-2 border-slate-700">
                  {OFFICER_INFO.avatar}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Officer Info Bar */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Department</p>
                <p className="text-xl font-bold text-blue-400">{OFFICER_INFO.department}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Zone</p>
                <p className="text-xl font-bold text-white">{OFFICER_INFO.zone}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Ward</p>
                <p className="text-xl font-bold text-white">{OFFICER_INFO.ward}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Depot</p>
                <p className="text-xl font-bold text-white">{OFFICER_INFO.depot}</p>
              </div>
            </div>
            <button
              onClick={() => window.location.href = "/officer/map"}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-3 px-6 rounded-xl transition-all flex items-center gap-2 shadow-lg"
            >
              <MapPin className="h-5 w-5" />
              Open Deployment Map
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          {KPI_DATA.map((kpi, i) => (
            <KpiCard key={i} {...kpi} />
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Incident List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-yellow-500" />
                  Active Incidents
                </h2>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-initial">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search incidents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full sm:w-72 pl-10 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="ALL">All Priorities</option>
                    <option value="P1">P1 Critical</option>
                    <option value="P2">P2 High</option>
                    <option value="P3">P3 Medium</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredIncidents.map((incident) => (
                  <IncidentCard
                    key={incident.id}
                    incident={incident}
                    onClick={() => window.location.href = `/incidents/${incident.id}`}
                  />
                ))}
              </div>
            </div>

            {/* Trend Chart */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">7-Day Incident Trend</h2>
                <span className="text-xs text-slate-400">Updated just now</span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={TREND_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                      labelStyle={{ color: '#f1f5f9' }}
                    />
                    <Line type="monotone" dataKey="active" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6' }} name="Active" />
                    <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981' }} name="Resolved" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Column - Analytics & Summary */}
          <div className="space-y-6">
            {/* Priority Distribution */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-500" />
                Priority Distribution
              </h2>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={CATEGORY_DATA}>
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {CATEGORY_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 space-y-3">
                {CATEGORY_DATA.map((cat, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-sm text-slate-300">{cat.name}</span>
                    </div>
                    <span className="font-bold text-white">{cat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Copilot */}
            <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-800/40 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center font-black text-xs">AI</div>
                <h2 className="text-lg font-bold text-blue-300">AI Operations Copilot</h2>
              </div>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                <span className="text-blue-400 font-bold">Priority Alert:</span> 47 citizens reported severe garbage overflow in Rohini Sector 8. Immediate deployment recommended to avoid SLA breach.
              </p>
              <button 
                onClick={() => {
                  // Select INC-2025-001 and go to map
                  window.location.href = "/officer/map";
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2">
                <ArrowUpRight className="h-4 w-4" />
                View Recommended Action
              </button>
            </div>

            {/* Field Teams */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-cyan-500" />
                Active Field Teams
              </h2>
              <div className="space-y-3">
                {[
                  { name: 'RRT 4', status: 'On Site', current: 'Incident 001', members: 5 },
                  { name: 'Sanitation 7', status: 'Travelling', current: 'Incident 002', members: 3 },
                  { name: 'Drainage 2', status: 'Available', current: 'Standby', members: 4 },
                ].map((team, i) => (
                  <div key={i} className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-sm">{team.name}</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        team.status === 'On Site' ? 'bg-green-900/30 text-green-400' :
                        team.status === 'Travelling' ? 'bg-blue-900/30 text-blue-400' :
                        'bg-slate-800 text-slate-400'
                      }`}>{team.status}</span>
                    </div>
                    <p className="text-xs text-slate-500">{team.current}</p>
                    <div className="mt-2 text-xs text-slate-400">{team.members} members on duty</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
