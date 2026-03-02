import { useBooking } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PersonalInformation() {
    const { booking, updateCustomer } = useBooking();
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!booking.customer.fullName.trim())
            newErrors.fullName = "Full name is required.";

        if (!booking.customer.email.match(/^\S+@\S+\.\S+$/))
            newErrors.email = "Valid email required.";

        if (!booking.customer.phone.match(/^\d{10}$/))
            newErrors.phone = "Enter 10-digit phone number.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            navigate("/confirmation");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 space-y-8">
            <h1 className="text-3xl font-semibold text-[#0F4C5C]">
                Personal Information
            </h1>

            <div className="space-y-6">

                {/* Full Name */}
                <div>
                    <label className="block font-medium">Full Name</label>
                    <input
                        type="text"
                        value={booking.customer.fullName}
                        onChange={(e) =>
                            updateCustomer("fullName", e.target.value)
                        }
                        className={`w-full border p-3 rounded-none ${
                            errors.fullName ? "border-red-600" : "border-gray-300"
                        }`}
                    />
                    {errors.fullName && (
                        <p className="text-red-600 text-sm">{errors.fullName}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block font-medium">Email</label>
                    <input
                        type="email"
                        value={booking.customer.email}
                        onChange={(e) =>
                            updateCustomer("email", e.target.value)
                        }
                        className={`w-full border p-3 rounded-none ${
                            errors.email ? "border-red-600" : "border-gray-300"
                        }`}
                    />
                    {errors.email && (
                        <p className="text-red-600 text-sm">{errors.email}</p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label className="block font-medium">Phone Number</label>
                    <input
                        type="tel"
                        value={booking.customer.phone}
                        onChange={(e) =>
                            updateCustomer("phone", e.target.value)
                        }
                        className={`w-full border p-3 rounded-none ${
                            errors.phone ? "border-red-600" : "border-gray-300"
                        }`}
                    />
                    {errors.phone && (
                        <p className="text-red-600 text-sm">{errors.phone}</p>
                    )}
                </div>

                {/* Notes */}
                <div>
                    <label className="block font-medium">Notes (Optional)</label>
                    <textarea
                        value={booking.customer.notes}
                        onChange={(e) =>
                            updateCustomer("notes", e.target.value)
                        }
                        className="w-full border border-gray-300 p-3 rounded-none"
                    />
                </div>

                {/* Privacy Disclaimer */}
                <div className="border border-gray-300 p-4 bg-gray-50 rounded-none text-sm">
                    By confirming this appointment, you consent to our
                    privacy and data handling policies.
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-[#228B22] text-white py-4 text-lg rounded-none"
                >
                    Confirm Appointment
                </button>
            </div>
        </div>
    );
}
