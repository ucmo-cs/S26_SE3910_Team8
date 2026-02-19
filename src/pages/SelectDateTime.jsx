import { availability } from "../data/availability";
import { useBooking } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";

export default function SelectDateTime() {
    const { booking, updateBooking } = useBooking();
    const navigate = useNavigate();

    const availableTimes =
        availability[booking.branch?.id]?.[booking.date] || [];

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
                    className="border border-gray-300 p-3 rounded-none"
                    onChange={(e) => updateBooking("date", e.target.value)}
                />

                <div className="grid grid-cols-3 gap-4">
                    {availableTimes.map(time => (
                        <button
                            key={time}
                            onClick={() => updateBooking("time", time)}
                            className={`border p-3 rounded-none ${
                                booking.time === time
                                    ? "bg-[#228B22] text-white"
                                    : "border-gray-300"
                            }`}
                        >
                            {time}
                        </button>
                    ))}
                </div>

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
