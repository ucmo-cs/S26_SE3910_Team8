import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const submitAppointment = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8080/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, date, time })
    });

    alert("Appointment scheduled!");
  };

  return (
    <div>
      <h1>Schedule Appointment</h1>

      <form onSubmit={submitAppointment}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          placeholder="Time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <button type="submit">Schedule</button>
      </form>
    </div>
  );
}

export default App;
