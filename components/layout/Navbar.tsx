import { Bell, Search, Settings } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/92 px-4 py-3 backdrop-blur sm:px-6">
      <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between gap-4">
        <div className="min-w-[150px]">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Mission Control
          </p>
          <h2 className="text-lg font-black leading-tight text-slate-950">
            Delhi Samadhan
          </h2>
        </div>

        <div className="hidden h-10 flex-1 max-w-xl items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 text-slate-500 md:flex">
          <Search className="h-4 w-4" />
          <span className="text-sm">Search complaints, departments, districts...</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white text-slate-700">
            <Bell className="h-4 w-4" />
          </button>
          <button className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white text-slate-700">
            <Settings className="h-4 w-4" />
          </button>
          <div className="ml-1 hidden border-l border-slate-200 pl-4 text-right sm:block">
            <p className="text-sm font-bold text-slate-950">
              Comm. R. Sharma
            </p>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Administrative Chief
            </p>
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-md bg-slate-950 text-sm font-black text-white">
            DS
          </div>
        </div>
      </div>
    </header>
  );
}
