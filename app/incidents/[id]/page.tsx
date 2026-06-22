'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  MapPin,
  FileText,
  Users,
  Camera,
  AlertTriangle,
  Clock,
  Shield,
  Send,
  CheckCircle2,
  XCircle,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Phone,
  TrendingUp
} from 'lucide-react';
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineSeparator,
} from '@/components/dashboard/IncidentTimeline';

// Mock complaint data
const MOCK_COMPLAINTS = [
  {
    id: 'CMP-2025-001',
    citizenName: 'Rajesh Kumar',
    citizenPhone: '+91 98765 43210',
    description: 'Massive garbage overflow blocking the road completely near Rohini market',
    address: 'Rohini Sector 8, Near Market',
    imageUrl: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=400',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 23),
  },
  {
    id: 'CMP-2025-002',
    citizenName: 'Priya Singh',
    citizenPhone: '+91 98765 43211',
    description: 'Foul smell coming from this area, garbage has been here for 2 days',
    address: 'Rohini Sector 8, Market Road',
    imageUrl: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5857?w=400',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 20),
  },
  {
    id: 'CMP-2025-003',
    citizenName: 'Amit Sharma',
    citizenPhone: '+91 98765 43212',
    description: 'Drainage is blocked due to garbage, risk of water logging in rain',
    address: 'Rohini Sector 8, Block C',
    imageUrl: 'https://images.unsplash.com/photo-1515168915113-41c9706355c7?w=400',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 15),
  },
  {
    id: 'CMP-2025-004',
    citizenName: 'Neha Gupta',
    citizenPhone: '+91 98765 43213',
    description: 'Children can\'t walk to school safely due to overflowing garbage',
    address: 'Rohini Sector 8, Near Primary School',
    imageUrl: 'https://images.unsplash.com/photo-1504198266287-1659872e6590?w=400',
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 10),
  },
];

// Mock timeline data
const MOCK_TIMELINE = [
  {
    id: '1',
    title: 'Incident Created',
    description: 'System detected multiple complaints, auto-created incident',
    time: '20 Jun 2025, 09:15 AM',
    type: 'system',
  },
  {
    id: '2',
    title: 'Assigned to Officer',
    description: 'Incident assigned to Garbage Management Officer - Sva Yadav',
    time: '20 Jun 2025, 09:30 AM',
    type: 'assignment',
  },
  {
    id: '3',
    title: 'Team Assigned',
    description: 'RRT 4 deployed to site',
    time: '20 Jun 2025, 10:15 AM',
    type: 'team',
  },
  {
    id: '4',
    title: 'On Site',
    description: 'Field team reached location, assessment in progress',
    time: '20 Jun 2025, 10:45 AM',
    type: 'status',
  },
  {
    id: '5',
    title: 'Work Started',
    description: 'Cleaning operations initiated',
    time: '21 Jun 2025, 08:00 AM',
    type: 'progress',
  },
];

export default function IncidentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [showComplaints, setShowComplaints] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [progressNote, setProgressNote] = useState('');
  const [status, setStatus] = useState('In Progress');

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()} 
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-slate-400" />
            </button>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold border border-red-500/30">
                  P1 CRITICAL
                </span>
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-bold border border-blue-500/30">
                  GARBAGE OVERFLOW
                </span>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-bold border border-amber-500/30">
                  2h 15m SLA REMAINING
                </span>
              </div>
              <h1 className="text-2xl font-bold">
                {params.id} - Severe Garbage Overflow at Rohini Sector 8 Market
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Top Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Impact Score</p>
            <p className="text-3xl font-bold text-red-400">95/100</p>
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Complaints</p>
            <p className="text-3xl font-bold text-blue-400">47</p>
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Unique Citizens</p>
            <p className="text-3xl font-bold text-green-400">34</p>
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
            <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Depot</p>
            <p className="text-3xl font-bold text-white">Depot 4</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - AI Summary & Evidence */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Executive Summary */}
            <div className="bg-gradient-to-br from-blue-900/30 via-slate-900 to-indigo-900/30 border border-blue-800/40 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center font-black text-lg">
                  AI
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Executive Incident Report</h2>
                  <p className="text-sm text-blue-300">Analyzed 47 complaints, 34 citizens</p>
                </div>
              </div>

              <div className="space-y-4 text-slate-200">
                <p className="text-lg leading-relaxed">
                  <span className="text-blue-400 font-bold">Situation:</span> 47 citizens reported severe garbage overflow in Rohini Sector 8 Market over the last 24 hours.
                </p>

                <div className="grid md:grid-cols-2 gap-4 bg-slate-950/60 rounded-xl p-4 border border-slate-700">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Key Observations</p>
                    <ul className="text-sm space-y-2 text-slate-200">
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                        <span>Market area completely blocked</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                        <span>Drainage blockage risk identified</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                        <span>School children safety at risk</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Recommendations</p>
                    <ul className="text-sm space-y-2 text-slate-200">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Deploy additional sanitation staff</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Coordinate with drainage team</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>Issue public safety advisory</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="text-sm text-slate-400 italic">
                  <span className="text-blue-400 font-bold">Estimated Impact:</span> 500+ citizens affected daily. Immediate action required within 2h to avoid SLA breach.
                </p>
              </div>
            </div>

            {/* Evidence Intelligence Center */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Camera className="h-5 w-5 text-purple-500" />
                  Evidence Intelligence Center
                </h2>
                <span className="text-sm text-slate-400">Top severity images</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {MOCK_COMPLAINTS.map((complaint) => (
                  <div 
                    key={complaint.id}
                    onClick={() => setSelectedImage(complaint.imageUrl)}
                    className="relative cursor-pointer group"
                  >
                    <img 
                      src={complaint.imageUrl} 
                      alt="Evidence" 
                      className="w-full h-40 object-cover rounded-xl border-2 border-slate-700 group-hover:border-purple-500 transition-all"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-xs">
                      {complaint.id}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Complaint Intelligence */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="h-5 w-5 text-emerald-500" />
                <h2 className="text-lg font-bold">Complaint Intelligence</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-700">
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Most Common Keywords</p>
                  <div className="flex flex-wrap gap-2">
                    {['garbage', 'overflow', 'market', 'blocked', 'smell'].map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-700">
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Citizen Sentiment</p>
                  <p className="text-2xl font-bold text-red-400">Very Negative</p>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-700">
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Geographic Spread</p>
                  <p className="text-sm font-bold text-white">Localized - 100m radius</p>
                </div>
              </div>

              {/* Detailed Complaints */}
              <button 
                onClick={() => setShowComplaints(!showComplaints)}
                className="w-full flex items-center justify-between py-3 px-4 bg-slate-950 border border-slate-700 rounded-xl text-sm font-bold hover:border-slate-600 transition-colors"
              >
                <span>View All Complaints ({MOCK_COMPLAINTS.length + 43})</span>
                {showComplaints ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {showComplaints && (
                <div className="mt-4 space-y-3">
                  {MOCK_COMPLAINTS.map((complaint) => (
                    <div key={complaint.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-sm">{complaint.id}</p>
                          <p className="text-xs text-slate-400">{complaint.citizenName}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500">
                            {complaint.submittedAt.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-300 mb-2">{complaint.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500">{complaint.address}</span>
                        <a href={`tel:${complaint.citizenPhone}`} className="text-xs flex items-center gap-1 text-blue-400">
                          <Phone className="h-3 w-3" />
                          Call Citizen
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Timeline, Actions, Teams */}
          <div className="space-y-6">
            {/* Incident Timeline */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                Incident Timeline
              </h2>
              <div className="relative">
                {MOCK_TIMELINE.map((item, index) => (
                  <div key={item.id} className="flex gap-3 mb-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${
                        item.type === 'system' ? 'bg-blue-500' :
                        item.type === 'assignment' ? 'bg-purple-500' :
                        item.type === 'team' ? 'bg-green-500' :
                        'bg-amber-500'
                      }`} />
                      {index < MOCK_TIMELINE.length - 1 && (
                        <div className="w-0.5 h-10 bg-slate-700 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="font-bold text-sm">{item.title}</p>
                      <p className="text-xs text-slate-400">{item.description}</p>
                      <p className="text-xs text-slate-500 mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Field Team Management */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-cyan-500" />
                Field Team Management
              </h2>
              
              <div className="bg-green-900/20 border border-green-700/50 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-sm">RRT 4 (Rapid Response)</span>
                  <span className="text-xs font-bold text-green-400 bg-green-500/20 px-2 py-1 rounded-full">
                    ON SITE
                  </span>
                </div>
                <p className="text-xs text-slate-400">5 members • Equipment: Truck, Compactor</p>
              </div>

              <div className="space-y-2 mb-4">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg text-sm transition-colors">
                  Reassign Team
                </button>
                <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 rounded-lg text-sm transition-colors border border-slate-700">
                  Request Resources
                </button>
                <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 rounded-lg text-sm transition-colors">
                  Escalate
                </button>
              </div>
            </div>

            {/* Progress Update */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Send className="h-5 w-5 text-pink-500" />
                Update Progress
              </h2>
              
              <div className="space-y-3">
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)} 
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm"
                >
                  <option>Assigned</option>
                  <option>Travelling</option>
                  <option>In Progress</option>
                  <option>Work Complete</option>
                  <option>Resolved</option>
                </select>
                
                <textarea 
                  placeholder="Add progress note..."
                  value={progressNote}
                  onChange={(e) => setProgressNote(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm h-24 resize-none"
                />
                
                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg transition-colors">
                  Submit Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
