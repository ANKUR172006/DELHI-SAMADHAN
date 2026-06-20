import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import CommandMap from "@/components/cm/CommandMap";
import DepartmentRanking from "@/components/cm/DepartmentRanking";
import AIGovernanceCopilot from "@/components/cm/AIGovernanceCopilot";
import RecentAlerts from "@/components/cm/RecentAlerts";
import IncidentTrendChart from "@/components/charts/IncidentTrendChart";
import IncidentCategoryChart from "@/components/charts/IncidentCategoryChart";

export default function CMPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">

                <div>
                    <h1 className="text-3xl font-bold">
                        CM Command Center
                    </h1>

                    <p className="text-gray-500">
                        Statewide Governance Intelligence
                    </p>
                </div>

                <div className="grid grid-cols-4 gap-5">

                    <StatCard
                        title="Total Incidents"
                        value="4,512"
                    />

                    <StatCard
                        title="Critical Cases"
                        value="148"
                    />

                    <StatCard
                        title="Resolved Today"
                        value="923"
                    />

                    <StatCard
                        title="Citizen Satisfaction"
                        value="89%"
                    />

                </div>

                <div className="grid grid-cols-3 gap-5">

                    <div className="col-span-2">
                        <IncidentTrendChart />
                    </div>

                    <AIGovernanceCopilot />

                </div>

                <div className="grid grid-cols-3 gap-5">

                    <div className="col-span-2">
                        <IncidentCategoryChart />
                    </div>

                    <RecentAlerts />

                </div>

                <DepartmentRanking />

            </div>
        </DashboardLayout>
    );
}