import { Routes, Route, Navigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";

import Layout from "../components/layout/Layout";

import SelectService from "../pages/SelectService";
import SelectBranch from "../pages/SelectBranch";
import SelectDateTime from "../pages/SelectDateTime";
import PersonalInformation from "../pages/PersonalInformation";
import Confirmation from "../pages/Confirmation";
import AllAppointments from "../pages/AllAppointments";

/**
 * Step Guard Component
 * Prevents users from skipping steps in the booking flow.
 */
function StepGuard({ children, required }) {
    const { booking } = useBooking();

    const conditions = {
        service: !!booking.service,
        branch: !!booking.branch,
        datetime: !!booking.date && !!booking.time,
        info:
            !!booking.customer.fullName &&
            !!booking.customer.email &&
            !!booking.customer.phone,
    };

    if (!conditions[required]) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default function AppRoutes() {
    return (
        <Layout>
            <Routes>

                {/* STEP 1 — Service Selection */}
                <Route path="/" element={<SelectService />} />

                {/* STEP 2 — Branch Selection */}
                <Route
                    path="/branch"
                    element={
                        <StepGuard required="service">
                            <SelectBranch />
                        </StepGuard>
                    }
                />

                {/* STEP 3 — Date & Time */}
                <Route
                    path="/datetime"
                    element={
                        <StepGuard required="branch">
                            <SelectDateTime />
                        </StepGuard>
                    }
                />

                {/* STEP 4 — Personal Information */}
                <Route
                    path="/info"
                    element={
                        <StepGuard required="datetime">
                            <PersonalInformation />
                        </StepGuard>
                    }
                />

                {/* STEP 5 — Confirmation */}
                <Route
                    path="/confirmation"
                    element={
                        <StepGuard required="info">
                            <Confirmation />
                        </StepGuard>
                    }
                />

                {/* All Appointments */}
                <Route path="/appointments" element={<AllAppointments />} />

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
        </Layout>
    );
}
