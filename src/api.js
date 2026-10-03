const API_URL = "/api";

export const getIncidents = async () => {
  const response = await fetch(`${API_URL}/incidents`);

  if (!response.ok) {
    throw new Error("Failed to fetch incidents");
  }

  return response.json();
};

export const createIncident = async (incident) => {
  const response = await fetch(`${API_URL}/incidents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(incident)
  });

  if (!response.ok) {
    throw new Error("Failed to create incident");
  }

  return response.json();
};

export const updateIncident = async (id, data) => {
  const response = await fetch(`${API_URL}/incidents/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Failed to update incident");
  }

  return response.json();
};

export const deleteIncident = async (id) => {
  const response = await fetch(`${API_URL}/incidents/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Failed to delete incident");
  }

  return response.json();
};
