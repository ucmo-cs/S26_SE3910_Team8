export default function Navbar() {
    return (
        <header className="border-b border-gray-300 bg-white">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

                <div className="text-xl font-semibold text-[#0F4C5C]">
                    Enterprise Bank
                </div>

                <div>
                    <button className="border border-[#0F4C5C] px-4 py-2 text-sm rounded-none text-[#0F4C5C]">
                        Support
                    </button>
                </div>

            </div>
        </header>
    );
}
