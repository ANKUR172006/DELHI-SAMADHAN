import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({
  children,
  showSidebar = true,
}: {
  children: React.ReactNode;
  showSidebar?: boolean;
}) {
  return (
    <div className="flex min-h-screen bg-[#f4f7fb] text-slate-950">
      {showSidebar && <Sidebar />}

      <div className="min-w-0 flex-1">
        <Navbar />

        <main className="mx-auto w-full max-w-[1500px] p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
