import { useState } from "react";
import "./App.css";

const services = [
  "Checking Accounts",
  "Savings Accounts",
  "Loans",
  "Credit Cards",
  "Investments",
  "Customer Support"
];

const branchesByService = {
  "Checking Accounts": ["Downtown", "Northside", "West End"],
  "Savings Accounts": ["Downtown", "East Side"],
  "Loans": ["Northside", "Southside"],
  "Credit Cards": ["Downtown", "Online Only"],
  "Investments": ["West End", "Financial Center"],
  "Customer Support": ["All Branches"]
};

function App() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const branches = selectedService ? branchesByService[selectedService] : [];

  return (
    <>
      {/* Sticky Header */}
      <header className="main-header">
        <h1>Commerce Bank</h1>
        <p>Bank with us!</p>
      </header>

      <main className="container">
        {/* Services */}
        <h2>Select a service</h2>
        <div className="grid">
          {services.map((service) => (
            <div
              key={service}
              className={`box ${selectedService === service ? "selected" : ""}`}
              onClick={() => {
                setSelectedService(service);
                setSelectedBranch(null);
              }}
            >
              {service}
            </div>
          ))}
        </div>

        {/* Branches */}
        <h2>Branches</h2>
        <div className="grid">
          {branches.length === 0 && (
            <p className="placeholder">Select a service first</p>
          )}
          {branches.map((branch) => (
            <div
              key={branch}
              className={`box ${selectedBranch === branch ? "selected" : ""}`}
              onClick={() => setSelectedBranch(branch)}
            >
              {branch}
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          className="next-button"
          disabled={!selectedService || !selectedBranch}
          onClick={() =>
            alert(
              `Selected Service: ${selectedService}\nSelected Branch: ${selectedBranch}`
            )
          }
        >
          Next
        </button>
      </main>
    </>
  );
}

export default App;
