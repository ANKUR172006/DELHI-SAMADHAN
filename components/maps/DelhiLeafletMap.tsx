"use client";

import dynamic from "next/dynamic";

export type MapPoint = {
  label: string;
  detail: string;
  lat: number;
  lng: number;
  severity?: "critical" | "high" | "medium" | "normal";
};

export type DelhiLeafletMapProps = {
  points: MapPoint[];
  center?: [number, number];
  heightClass?: string;
  showRoute?: boolean;
  zoom?: number;
};

const LeafletMapInner = dynamic(() => import("./DelhiLeafletMapInner"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full min-h-56 place-items-center rounded-md border border-slate-200 bg-slate-100 text-sm font-bold text-slate-500">
      Loading open-source map...
    </div>
  ),
});

export default function DelhiLeafletMap(props: DelhiLeafletMapProps) {
  return (
    <LeafletMapInner {...props} />
  );
}
