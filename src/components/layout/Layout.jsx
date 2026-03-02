import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import StepProgress from "../shared/StepProgress";

export default function Layout({ children }) {
    const location = useLocation();

    // Map route path to step index
    const stepMap = {
        "/": 1,
        "/branch": 2,
        "/datetime": 3,
        "/info": 4,
        "/confirmation": 5,
    };

    const currentStep = stepMap[location.pathname] || 1;

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">

            {/* Top Navigation */}
            <Navbar />

            {/* Progress Indicator (Hidden on Confirmation) */}
            {location.pathname !== "/confirmation" && (
                <div className="border-b border-gray-300">
                    <div className="max-w-6xl mx-auto px-6 py-6">
                        <StepProgress currentStep={currentStep} />
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <main className="flex-1">
                <div className="max-w-6xl mx-auto px-6 py-10">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-300 py-6">
                <div className="max-w-6xl mx-auto px-6 text-sm text-gray-600 flex justify-between">
                    <span>© 2026 Commerce Bank</span>
                    <span>Secure Appointment Booking System</span>
                </div>
            </footer>

        </div>
    );
}
