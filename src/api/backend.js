const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

function handleResponseError(response, fallbackMessage) {
    throw new Error(fallbackMessage || `Request failed with status ${response.status}`);
}

export async function createUser(payload) {
    const response = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        let message = "Failed to create user.";
        try {
            const errorBody = await response.json();
            if (errorBody?.error) {
                message = errorBody.error;
            }
        } catch {
            // Keep fallback message.
        }
        handleResponseError(response, message);
    }

    return response.json();
}

export async function createAppointment(userId, payload) {
    const response = await fetch(`${API_BASE_URL}/appointments?userId=${userId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        let message = "Failed to create appointment.";
        try {
            const errorBody = await response.json();
            if (errorBody?.error) {
                message = errorBody.error;
            }
        } catch {
            // Keep fallback message.
        }
        handleResponseError(response, message);
    }

    return response.json();
}

export async function getAppointments() {
    const response = await fetch(`${API_BASE_URL}/appointments`);

    if (!response.ok) {
        let message = "Failed to fetch appointments.";
        try {
            const errorBody = await response.json();
            if (errorBody?.error) {
                message = errorBody.error;
            }
        } catch {
            // Keep fallback message.
        }
        handleResponseError(response, message);
    }

    return response.json();
}
