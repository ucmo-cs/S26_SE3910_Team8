import { useEffect, useState } from "react";
import { useBooking } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";
import { getAppointments } from "../api/backend";

export default function SelectDateTime() {
    const { booking, updateBooking } = useBooking();
    const navigate = useNavigate();
    const [bookedTimes, setBookedTimes] = useState(new Set());
    const [loadingBookedTimes, setLoadingBookedTimes] = useState(false);
    const [bookedTimesError, setBookedTimesError] = useState("");

    const parseDurationMinutes = (durationLabel) => {
        const parsed = Number.parseInt(durationLabel, 10);
        return Number.isNaN(parsed) ? 30 : parsed;
    };

    const isWeekday = (dateString) => {
        if (!dateString) return false;
        const day = new Date(`${dateString}T00:00:00`).getDay();
        return day >= 1 && day <= 5;
    };

    const formatTime = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60)
            .toString()
            .padStart(2, "0");
        const minutes = (totalMinutes % 60).toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    };

    const formatDisplayTime = (timeString) => {
    const [hour, minute] = timeString.split(":");
    const date = new Date();
    date.setHours(hour, minute);

    return date.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
};

    const generateAvailableTimes = () => {
    if (!booking.date || !booking.service || !isWeekday(booking.date)) {
        return [];
    }

    const openMinutes = 8 * 60; // 8:00 AM
    const closeMinutes = 17 * 60; // 5:00 PM
    const slotIntervalMinutes = 15;

    const serviceDurationMinutes = parseDurationMinutes(booking.service.duration);
    const latestStart = closeMinutes - serviceDurationMinutes;

    if (latestStart < openMinutes) {
        return [];
    }

    const times = [];

    const now = new Date();
    const todayString = now.toISOString().split("T")[0];
    const isToday = booking.date === todayString;

    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    for (
        let minute = openMinutes;
        minute <= latestStart;
        minute += slotIntervalMinutes
    ) {
        // 🚫 Skip past times if booking is for today
        if (isToday && minute <= currentMinutes) {
            continue;
        }

        times.push(formatTime(minute)); // still returns "HH:mm"
    }

    return times;
};

    const availableTimes = generateAvailableTimes().filter(
        (time) => !bookedTimes.has(time)
    );

    useEffect(() => {
        const fetchBookedTimes = async () => {
            if (!booking.date || !isWeekday(booking.date)) {
                setBookedTimes(new Set());
                setBookedTimesError("");
                return;
            }

            setLoadingBookedTimes(true);
            setBookedTimesError("");

            try {
                const appointments = await getAppointments();
                const dateBookedTimes = appointments
                    .filter((appointment) => {
                        const dateTime = appointment.appointmentDateTime || "";
                        return (
                            dateTime.startsWith(`${booking.date}T`) &&
                            appointment.branchId === booking.branch?.id
                        );
                    })
                    .map((appointment) => {
                        const dateTime = appointment.appointmentDateTime || "";
                        const timePortion = dateTime.split("T")[1] || "";
                        return timePortion.slice(0, 5);
                    })
                    .filter(Boolean);

                setBookedTimes(new Set(dateBookedTimes));
            } catch (error) {
                setBookedTimesError(error.message || "Could not load live availability.");
                setBookedTimes(new Set());
            } finally {
                setLoadingBookedTimes(false);
            }
        };

        fetchBookedTimes();
    }, [booking.date, booking.branch?.id]);

    useEffect(() => {
        if (booking.time && bookedTimes.has(booking.time)) {
            updateBooking("time", null);
        }
    }, [booking.time, bookedTimes, updateBooking]);

    const today = new Date().toISOString().split("T")[0];

    const handleConfirm = () => {
        if (booking.date && booking.time) {
            navigate("/info");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-8 grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
                <h1 className="text-3xl font-semibold text-[#0F4C5C]">
                    Select Date & Time
                </h1>

                <input
                    type="date"
                    min={today}
                    value={booking.date || ""}
                    className="border border-gray-300 p-3 rounded-none"
                    onChange={(e) => {
                        updateBooking("date", e.target.value);
                        updateBooking("time", null);
                    }}
                />

                {!booking.date && (
                    <p className="text-gray-600">
                        Select a date to view available times.
                    </p>
                )}

                {booking.date && !isWeekday(booking.date) && (
                    <p className="text-red-600">
                        Bank hours are Monday through Friday only. Please select a weekday.
                    </p>
                )}

                {booking.date && isWeekday(booking.date) && (
                    <>
                        {loadingBookedTimes && (
                            <p className="text-gray-600">Loading available times...</p>
                        )}
                        {bookedTimesError && (
                            <p className="text-red-600">{bookedTimesError}</p>
                        )}
                        {!loadingBookedTimes && !bookedTimesError && availableTimes.length === 0 && (
                            <p className="text-gray-600">
                                No times are available for this date and service length.
                            </p>
                        )}
                        {!loadingBookedTimes && !bookedTimesError && availableTimes.length > 0 && (
                            <div className="grid grid-cols-3 gap-4">
                                {availableTimes.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => updateBooking("time", time)}
                                        className={`border p-3 rounded-none ${
                                            booking.time === time
                                                ? "bg-[#228B22] text-white"
                                                : "border-gray-300"
                                        }`}
                                    >
                                        {formatDisplayTime(time)}
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}

                <button
                    onClick={handleConfirm}
                    className="bg-[#228B22] text-white px-6 py-3 rounded-none"
                >
                    Continue
                </button>
            </div>

            <div className="border border-gray-300 p-6 shadow-sm rounded-none">
                <h2 className="text-lg font-semibold">Appointment Summary</h2>
                <p>Service: {booking.service?.name}</p>
                <p>Branch: {booking.branch?.name}</p>
            </div>
        </div>
    );
}
