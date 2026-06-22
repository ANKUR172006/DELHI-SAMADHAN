import { Suspense } from "react";
import TrackingClient from "@/components/tracking/TrackingClient";

export default function TrackingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Suspense fallback={<div className="p-10 text-slate-600">Loading tracker...</div>}>
        <TrackingClient />
      </Suspense>
    </div>
  );
}

