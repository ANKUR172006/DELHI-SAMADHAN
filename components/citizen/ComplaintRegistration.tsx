"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Camera, FileText, Loader2, MapPin, MessageCircle, Mic } from "lucide-react";
import {
  ComplaintRegistrationResponse,
  registerComplaint,
} from "@/services/api";

const intakeSignals = [
  { icon: Camera, label: "Image" },
  { icon: Mic, label: "Audio" },
  { icon: FileText, label: "Text" },
  { icon: MapPin, label: "Location" },
];

export default function ComplaintRegistration() {
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [voiceUrl, setVoiceUrl] = useState("");
  const [result, setResult] = useState<ComplaintRegistrationResponse | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(null);
    setIsSubmitting(true);

    try {
      const response = await registerComplaint({
        phoneNumber,
        description,
        address,
        imageUrl: imageUrl || undefined,
        voiceUrl: voiceUrl || undefined,
      });
      setResult(response);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Could not register complaint. Please check the backend server."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <form onSubmit={onSubmit} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            WhatsApp-style intake
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">Register a civic complaint</h2>
          <p className="mt-2 text-sm text-slate-600">
            Submit the same signals a citizen sends on WhatsApp. The backend classifies, routes,
            detects severity, checks duplicates, and generates a receipt.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Phone number</span>
            <input
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
              required
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Address or location hint</span>
            <input
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Near Rajiv Chowk Metro Gate 4"
              className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
            />
          </label>
        </div>

        <label className="mt-4 block space-y-2">
          <span className="text-sm font-medium text-slate-700">Complaint text</span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Road has a deep pothole and traffic is slowing down."
            rows={5}
            className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
            required
          />
        </label>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Image URL</span>
            <input
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="https://..."
              className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
            />
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-700">Audio URL</span>
            <input
              value={voiceUrl}
              onChange={(event) => setVoiceUrl(event.target.value)}
              placeholder="https://..."
              className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-blue-600"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-md bg-blue-700 px-5 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageCircle className="h-4 w-4" />}
          Register Complaint
        </button>

        {error && (
          <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}
      </form>

      <aside className="space-y-4">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-950">AI intake signals</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {intakeSignals.map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-md border border-slate-200 p-4">
                <Icon className="mb-3 h-5 w-5 text-blue-700" />
                <p className="font-medium text-slate-800">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {result && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
            Verification in progress
          </p>
          <h3 className="mt-2 text-2xl font-bold text-slate-950">{result.complaintId}</h3>
          <p className="mt-2 text-sm leading-6 text-emerald-900">
            The system is checking evidence, location, duplicate risk, and department routing before final assignment.
          </p>
            <dl className="mt-4 space-y-2 text-sm text-slate-700">
              <div className="flex justify-between gap-4">
                <dt>Status</dt>
                <dd className="font-semibold">{result.status}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Category</dt>
                <dd className="font-semibold">{result.category ?? "Review needed"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Department</dt>
                <dd className="font-semibold">{result.department ?? "Routing pending"}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Severity</dt>
                <dd className="font-semibold">{result.severity ?? "Pending"}</dd>
              </div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`/tracking?complaintId=${encodeURIComponent(result.complaintId)}`}
                className="rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white"
              >
                Track status
              </Link>
              {result.pdfUrl && (
                <a
                  href={result.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-emerald-700 px-4 py-2 text-sm font-semibold text-emerald-800"
                >
                  View receipt
                </a>
              )}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
