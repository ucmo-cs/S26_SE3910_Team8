import { branches } from "../data/branches";
import { useBooking } from "../context/BookingContext";
import { useNavigate } from "react-router-dom";

export default function SelectBranch() {
    const { booking, updateBooking } = useBooking();
    const navigate = useNavigate();

    const filteredBranches = branches.filter(branch =>
        branch.services.includes(booking.service?.id)
    );

    const handleSelect = (branch) => {
        updateBooking("branch", branch);
        navigate("/datetime");
    };

    return (
        <div className="max-w-6xl mx-auto p-8 space-y-8">
            <h1 className="text-3xl font-semibold text-[#0F4C5C]">
                Select a Branch
            </h1>

            <div className="grid md:grid-cols-2 gap-6">
                {filteredBranches.map(branch => (
                    <div
                        key={branch.id}
                        className="border border-gray-300 p-6 shadow-sm rounded-none"
                    >
                        <h2 className="text-xl font-medium">{branch.name}</h2>
                        <p>{branch.address}</p>
                        <p className="text-sm text-gray-500">{branch.distance}</p>

                        <button
                            onClick={() => handleSelect(branch)}
                            className="mt-4 bg-[#228B22] text-white px-4 py-2 rounded-none"
                        >
                            Select Branch
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
