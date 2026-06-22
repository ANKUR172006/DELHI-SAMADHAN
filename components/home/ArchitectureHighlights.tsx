"use client";

import { useEffect, useState } from "react";
import { BrainCircuit, CheckCircle2, Layers3, Sparkles } from "lucide-react";
import {
  FeatureArchitectureResponse,
  getFeatureArchitecture,
} from "@/services/api";

const fallback = {
  totals: {
    layers: 8,
    features: 68,
    byStatus: {
      live: 18,
      partial: 14,
      planned: 36,
    },
  },
  winningFeatures: [
    {
      name: "WhatsApp First Complaint Registration",
      demoMessage: "Citizens report civic issues through image, audio, text, and location.",
    },
    {
      name: "Incident Clustering",
      demoMessage: "Many complaints become one coordinated civic incident.",
    },
    {
      name: "CM Command Center",
      demoMessage: "Leadership sees live incidents, risk zones, and governance intelligence.",
    },
  ],
};

export default function ArchitectureHighlights() {
  const [architecture, setArchitecture] = useState<FeatureArchitectureResponse | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    getFeatureArchitecture()
      .then((data) => {
        setArchitecture(data);
        setIsConnected(true);
      })
      .catch(() => {
        setArchitecture(null);
        setIsConnected(false);
      });
  }, []);

  const data = architecture ?? fallback;
  const highlights = data.winningFeatures.slice(0, 3);

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Live platform architecture
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">
              Citizen reports to governance intelligence
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                isConnected ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
            {isConnected ? "Connected to backend" : "Demo data shown until backend starts"}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <Layers3 className="mb-4 h-6 w-6 text-blue-700" />
            <p className="text-sm text-slate-500">Architecture layers</p>
            <p className="mt-2 text-4xl font-bold text-slate-950">{data.totals.layers}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <BrainCircuit className="mb-4 h-6 w-6 text-emerald-700" />
            <p className="text-sm text-slate-500">Mapped capabilities</p>
            <p className="mt-2 text-4xl font-bold text-slate-950">{data.totals.features}</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <CheckCircle2 className="mb-4 h-6 w-6 text-orange-600" />
            <p className="text-sm text-slate-500">Live or in progress</p>
            <p className="mt-2 text-4xl font-bold text-slate-950">
              {data.totals.byStatus.live + data.totals.byStatus.partial}
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {highlights.map((feature) => (
            <div key={feature.name} className="rounded-lg border border-slate-200 p-5">
              <Sparkles className="mb-3 h-5 w-5 text-blue-700" />
              <h3 className="font-semibold text-slate-950">{feature.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{feature.demoMessage}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

