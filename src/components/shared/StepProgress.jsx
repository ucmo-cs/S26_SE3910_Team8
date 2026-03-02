const steps = [
    { id: 1, label: "Service" },
    { id: 2, label: "Branch" },
    { id: 3, label: "Date & Time" },
    { id: 4, label: "Personal Info" },
    { id: 5, label: "Confirmation" },
];

export default function StepProgress({ currentStep }) {
    return (
        <div className="flex items-center justify-between">

            {steps.map((step, idx) => {
                const isCompleted = step.id < currentStep;
                const isCurrent = step.id === currentStep;

                return (
                    <div key={step.id} className="flex-1 flex items-center">

                        {/* Step Indicator */}
                        <div
                            className={`w-10 h-10 flex items-center justify-center border-2 
                ${isCompleted ? "bg-[#228B22] border-[#228B22] text-white" : ""}
                ${isCurrent ? "border-[#228B22] text-[#228B22]" : "border-gray-300 text-gray-500"}
                font-medium text-lg rounded-none`}
                        >
                            {step.id}
                        </div>

                        {/* Step Label */}
                        <div className="ml-2 text-sm font-medium text-gray-700">
                            {step.label}
                        </div>

                        {/* Connector */}
                        {idx !== steps.length - 1 && (
                            <div className={`flex-1 h-1 ${isCompleted ? "bg-[#228B22]" : "bg-gray-300"} mx-2`}></div>
                        )}
                    </div>
                );
            })}

        </div>
    );
}
