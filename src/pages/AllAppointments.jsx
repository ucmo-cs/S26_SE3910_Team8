import { useEffect, useState } from "react";
import { getAllAppointmentsWithDetails } from "../api/backend";

const BRANCH_LABELS = {
    downtown: "Downtown Branch",
    uptown: "Uptown Branch",
};

const STATUS_STYLES = {
    SCHEDULED: "bg-blue-100 text-blue-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
};

export default function AllAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getAllAppointmentsWithDetails()
            .then(setAppointments)
            .catch((err) => setError(err.message || "Failed to load appointments."))
            .finally(() => setLoading(false));
    }, []);

    const formatDateTime = (raw) => {
        if (!raw) return "-";
        const [date, time] = raw.split("T");
        return `${date} ${time?.slice(0, 5)}`;
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-semibold text-[#0F4C5C]">All Appointments</h1>

            {loading && <p className="text-gray-600">Loading...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {!loading && !error && appointments.length === 0 && (
                <p className="text-gray-600">No appointments found.</p>
            )}

            {!loading && !error && appointments.length > 0 && (
                <div className="overflow-x-auto border border-gray-300">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-[#0F4C5C] text-white">
                            <tr>
                                <th className="px-4 py-3">Date & Time</th>
                                <th className="px-4 py-3">Service</th>
                                <th className="px-4 py-3">Branch</th>
                                <th className="px-4 py-3">Customer</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Phone</th>
                                <th className="px-4 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((a, i) => (
                                <tr
                                    key={a.id}
                                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                                >
                                    <td className="px-4 py-3 whitespace-nowrap">{formatDateTime(a.appointmentDateTime)}</td>
                                    <td className="px-4 py-3">{a.serviceName}</td>
                                    <td className="px-4 py-3">{BRANCH_LABELS[a.branchId] || a.branchId}</td>
                                    <td className="px-4 py-3">{a.firstName} {a.lastName}</td>
                                    <td className="px-4 py-3">{a.email}</td>
                                    <td className="px-4 py-3">{a.phoneNumber || "-"}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 text-xs font-medium ${STATUS_STYLES[a.status] || "bg-gray-100 text-gray-800"}`}>
                                            {a.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
