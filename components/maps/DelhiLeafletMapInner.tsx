"use client";

import {
  CircleMarker,
  MapContainer,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import type { DelhiLeafletMapProps } from "./DelhiLeafletMap";

const severityStyle = {
  critical: { color: "#dc2626", fillColor: "#fecaca", radius: 13 },
  high: { color: "#e11d48", fillColor: "#ffe4e6", radius: 11 },
  medium: { color: "#d97706", fillColor: "#fef3c7", radius: 10 },
  normal: { color: "#0f766e", fillColor: "#ccfbf1", radius: 9 },
};

export default function DelhiLeafletMapInner({
  points,
  center = [28.6139, 77.209],
  heightClass = "h-72",
  showRoute = false,
  zoom = 11,
}: DelhiLeafletMapProps) {
  const route = points.map((point) => [point.lat, point.lng] as [number, number]);

  return (
    <div className={`${heightClass} overflow-hidden rounded-md border border-slate-700`}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {showRoute && route.length > 1 && (
          <Polyline
            pathOptions={{ color: "#0f766e", weight: 4, opacity: 0.72 }}
            positions={route}
          />
        )}

        {points.map((point) => {
          const style = severityStyle[point.severity ?? "normal"];

          return (
            <CircleMarker
              key={`${point.label}-${point.lat}-${point.lng}`}
              center={[point.lat, point.lng]}
              pathOptions={{
                color: style.color,
                fillColor: style.fillColor,
                fillOpacity: 0.85,
                weight: 3,
              }}
              radius={style.radius}
            >
              <Popup>
                <div className="min-w-40 bg-slate-900 p-3 rounded">
                  <p className="font-bold text-slate-100">{point.label}</p>
                  <p className="mt-1 text-sm text-slate-400">{point.detail}</p>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
