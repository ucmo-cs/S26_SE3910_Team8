/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { createAppointment, createUser } from "../api/backend";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const initialBooking = {
        service: null,
        branch: null,
        date: null,
        time: null,
        customer: {
            fullName: "",
            email: "",
            phone: "",
            notes: ""
        }
    };

    const [booking, setBooking] = useState({
        ...initialBooking
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [confirmedBooking, setConfirmedBooking] = useState(null);

    const updateBooking = (key, value) => {
        setBooking(prev => ({ ...prev, [key]: value }));
    };

    const updateCustomer = (field, value) => {
        setBooking(prev => ({
            ...prev,
            customer: { ...prev.customer, [field]: value }
        }));
    };

    const resetBooking = () => {
        setBooking({ ...initialBooking });
        setSubmitError("");
        setConfirmedBooking(null);
    };

    const splitName = (fullName) => {
        const trimmed = fullName.trim();
        if (!trimmed) {
            return { firstName: "", lastName: "" };
        }
        const nameParts = trimmed.split(/\s+/);
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(" ") || "N/A";
        return { firstName, lastName };
    };

    const submitBooking = async () => {
        setIsSubmitting(true);
        setSubmitError("");

        try {
            const { firstName, lastName } = splitName(booking.customer.fullName);
            const userPayload = {
                firstName,
                lastName,
                email: booking.customer.email,
                phoneNumber: booking.customer.phone
            };

            const user = await createUser(userPayload);

            const appointmentPayload = {
                appointmentDateTime: `${booking.date}T${booking.time}:00`,
                serviceName: booking.service?.name || "General Consultation",
                branchId: booking.branch?.id || "unknown-branch",
                notes: booking.customer.notes?.trim() || null,
                status: "SCHEDULED"
            };

            const appointment = await createAppointment(user.id, appointmentPayload);
            setConfirmedBooking({
                user,
                appointment
            });

            return { user, appointment };
        } catch (error) {
            setSubmitError(error.message || "Failed to save booking.");
            throw error;
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <BookingContext.Provider
            value={{
                booking,
                updateBooking,
                updateCustomer,
                resetBooking,
                submitBooking,
                isSubmitting,
                submitError,
                confirmedBooking
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};

export const useBooking = () => useContext(BookingContext);
