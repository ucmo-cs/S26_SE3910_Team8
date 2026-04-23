import { useBooking } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Confirmation() {
    const { booking, resetBooking, confirmedBooking } = useBooking();
    const navigate = useNavigate();

    // Safety redirect if user somehow lands here without full booking
    useEffect(() => {
        if (
            !booking.service ||
            !booking.branch ||
            !booking.date ||
            !booking.time ||
            !booking.customer.fullName ||
            !confirmedBooking
        ) {
            navigate("/", { replace: true });
        }
    }, [booking, confirmedBooking, navigate]);

    const handleBookAnother = () => {
        resetBooking();
        navigate("/");
    };

    const handleAddToCalendar = () => {
        alert("Calendar integration is not implemented in this prototype.");
    };

    return (
        <div className="max-w-5xl mx-auto p-8 space-y-10">

            {/* Success Header */}
            <div className="border border-[#228B22] p-8 shadow-sm bg-white rounded-none">
                <h1 className="text-3xl font-semibold text-[#228B22]">
                    Appointment Confirmed
                </h1>
                <p className="mt-2 text-gray-700">
                    Your appointment has been successfully scheduled.
                </p>
            </div>

            {/* Structured Summary */}
            <div className="border border-gray-300 p-8 shadow-sm rounded-none bg-white">
                <h2 className="text-2xl font-semibold text-[#0F4C5C] mb-6">
                    Appointment Details
                </h2>

                <div className="grid md:grid-cols-2 gap-6 text-gray-800">

                    <div>
                        <p className="text-sm text-gray-500">Service</p>
                        <p className="font-medium">
                            {booking.service?.name}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-medium">
                            {booking.service?.duration}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Branch</p>
                        <p className="font-medium">
                            {booking.branch?.name}
                        </p>
                        <p className="text-sm text-gray-600">
                            {booking.branch?.address}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">
                            {booking.date}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="font-medium">
                            {booking.time}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Customer Name</p>
                        <p className="font-medium">
                            {booking.customer?.fullName}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">
                            {booking.customer?.email}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">
                            {booking.customer?.phone}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Appointment ID</p>
                        <p className="font-medium">
                            {confirmedBooking?.appointment?.id}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <p className="font-medium">
                            {confirmedBooking?.appointment?.status}
                        </p>
                    </div>

                    <div className="md:col-span-2">
                        <p className="text-sm text-gray-500">Notes</p>
                        <p className="font-medium">
                            {confirmedBooking?.appointment?.notes || "None"}
                        </p>
                    </div>

                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-6">

                <button
                    onClick={handleAddToCalendar}
                    className="flex-1 border border-[#0F4C5C] text-[#0F4C5C] py-4 text-lg font-medium rounded-none hover:bg-gray-50 transition"
                >
                    Add to Calendar
                </button>

                <button
                    onClick={handleBookAnother}
                    className="flex-1 bg-[#228B22] text-white py-4 text-lg font-medium rounded-none hover:opacity-90 transition"
                >
                    Book Another Appointment
                </button>

            </div>

        </div>
    );
}
