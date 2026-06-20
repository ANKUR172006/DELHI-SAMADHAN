import DashboardLayout from "@/components/layout/DashboardLayout";

export default function AdminPage() {
    return (
        <DashboardLayout>

            <h1 className="text-3xl font-bold mb-6">
                Admin Panel
            </h1>

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Add User
            </button>

            <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>
                            <th className="text-left p-4">User</th>
                            <th className="text-left p-4">Role</th>
                            <th className="text-left p-4">Status</th>
                        </tr>

                    </thead>

                    <tbody>

                        <tr className="border-t">
                            <td className="p-4">Raj Kumar</td>
                            <td className="p-4">Officer</td>
                            <td className="p-4">
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                    Active
                                </span>
                            </td>
                        </tr>

                        <tr className="border-t">
                            <td className="p-4">Priya Sharma</td>
                            <td className="p-4">Department Head</td>
                            <td className="p-4">
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                    Active
                                </span>
                            </td>
                        </tr>

                    </tbody>

                </table>

            </div>

        </DashboardLayout>
    );
}