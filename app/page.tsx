import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bell,
  CheckCircle2,
  DatabaseZap,
  Fingerprint,
  Landmark,
  MessageCircle,
  PlugZap,
  Search,
  ShieldCheck,
  Smartphone,
  UserCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const roles = [
  { href: "/citizen", label: "Citizen", value: "Report", icon: MessageCircle },
  { href: "/officer", label: "Officer", value: "Resolve", icon: UserCog },
  { href: "/department", label: "Department", value: "Analyze", icon: BarChart3 },
  { href: "/cm", label: "CM Office", value: "Command", icon: Landmark },
];

const challengeCards = [
  { title: "CM-first mobile view", body: "Nearby problems, visit logs, life-threatening alerts, and executive decisions are visible without technical clutter.", icon: Smartphone },
  { title: "No false closures", body: "Geo-proof, citizen verification, anomaly scoring, and audit sampling reduce manipulation and corruption.", icon: Fingerprint },
  { title: "API plus fallback", body: "MCD311 and department APIs can connect later; employee dashboards keep the system running today.", icon: PlugZap },
  { title: "Auto segregation", body: "Complaints are grouped by type, severity, location, department, officer load, and SLA urgency.", icon: DatabaseZap },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-30 border-b border-border bg-card/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-primary text-primary-foreground">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="text-xl font-black">Delhi Samadhan</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-semibold text-muted-foreground md:flex">
            <Link href="/" className="text-foreground">Home</Link>
            <Link href="/department">Statistics</Link>
            <Link href="/tracking">Transparency</Link>
            <Link href="/login">Support</Link>
          </nav>
          <Link href="/login">
            <Button>Profile</Button>
          </Link>
        </div>
      </header>

      <section
        className="relative min-h-screen bg-cover bg-center pt-16"
        style={{ backgroundImage: "url('/images/india-gate1.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/35" />
        <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-4 py-12 sm:px-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-md bg-primary/10 px-3 py-1 text-xs font-black uppercase tracking-wide text-primary">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Official AI Governance Platform
            </div>
            <h1 className="mt-7 text-4xl font-black leading-tight text-foreground sm:text-6xl">
              Transforming Citizen Complaints into <span className="text-primary">Governance Intelligence</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
              Empowering Delhi with AI-driven grievance resolution, real-time routing, department accountability, and clean operational analysis.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/citizen">
                <Button className="h-[52px] gap-3 text-sm font-black shadow-sm">
                  <MessageCircle className="h-5 w-5" />
                  Report via WhatsApp
                </Button>
              </Link>
              <Link href="/tracking">
                <Button variant="outline" className="h-[52px] gap-3 text-sm font-black">
                  <Search className="h-5 w-5" />
                  Track Complaint
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="h-[52px] gap-2 border-dashed border-primary text-sm font-black">
                  Officer Login
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="mt-10 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {roles.map(({ href, label, value, icon: Icon }) => (
                <Link key={href} href={href} className="group rounded-md border border-border bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:bg-accent">
                  <Icon className="h-5 w-5 text-primary" />
                  <p className="mt-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</p>
                  <p className="text-lg font-black text-foreground">{value}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-card/80 px-4 py-4 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 text-sm font-bold text-muted-foreground sm:justify-between">
            <span className="inline-flex items-center gap-2"><Bell className="h-4 w-4 text-primary" /> 98% Resolution Accuracy</span>
            <span className="inline-flex items-center gap-2"><BarChart3 className="h-4 w-4 text-primary" /> Real-time Grievance Monitoring</span>
            <span className="inline-flex items-center gap-2"><Landmark className="h-4 w-4 text-primary" /> Multi-role Governance Views</span>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-wide text-primary">Built for the CM challenge</p>
            <h2 className="mt-2 text-2xl font-black">A simple dashboard for non-technical staff, with powerful safeguards underneath.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {challengeCards.map(({ title, body, icon: Icon }) => (
              <div key={title} className="rounded-md border border-border bg-muted p-5">
                <Icon className="mb-4 h-6 w-6 text-primary" />
                <h3 className="font-black text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
