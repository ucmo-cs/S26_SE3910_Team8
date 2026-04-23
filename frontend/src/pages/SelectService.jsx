import { services } from "../data/services";
import { useBooking } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";

export default function SelectService() {
    const { booking, updateBooking } = useBooking();
    const navigate = useNavigate();

    const handleSelect = (service) => {
        updateBooking("service", service);
        navigate("/branch");
    };

    return (
        <div className="max-w-6xl mx-auto p-8 space-y-8">
            <h1 className="text-3xl font-semibold text-[#0F4C5C]">
                Select a Banking Service
            </h1>

            <div className="grid md:grid-cols-2 gap-6">
                {services.map((service) => (
                    <div
                        key={service.id}
                        onClick={() => handleSelect(service)}
                        className={`border p-6 shadow-sm cursor-pointer rounded-none
              ${
                            booking.service?.id === service.id
                                ? "border-[#228B22] border-2"
                                : "border-gray-300"
                        }`}
                    >
                        <div className="text-2xl mb-4">{service.icon}</div>
                        <h2 className="text-xl font-medium">{service.name}</h2>
                        <p className="text-gray-600">{service.description}</p>
                        <p className="text-sm mt-2 text-[#0F4C5C]">
                            Duration: {service.duration}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
