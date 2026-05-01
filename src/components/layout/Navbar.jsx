import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <header className="border-b border-gray-300 bg-white">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

                <Link to="/" className="text-xl font-semibold text-[#0F4C5C]">
                    Commerce Bank
                </Link>

                <div className="flex items-center gap-3">
                    <Link
                        to="/appointments"
                        className="border border-[#0F4C5C] px-4 py-2 text-sm rounded-none text-[#0F4C5C] hover:bg-[#0F4C5C] hover:text-white transition-colors"
                    >
                        All Appointments
                    </Link>
                    <button className="border border-[#0F4C5C] px-4 py-2 text-sm rounded-none text-[#0F4C5C]">
                        Support
                    </button>
                </div>

            </div>
        </header>
    );
}
