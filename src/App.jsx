import { useEffect, useState } from "react";

import IncidentForm from "./components/IncidentForm";
import IncidentList from "./components/IncidentList";

import {
  getIncidents,
  createIncident,
  updateIncident,
  deleteIncident
} from "./api";

function App() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadIncidents = async () => {
    try {
      const data = await getIncidents();
      setIncidents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  const handleIncidentCreated = async (incident) => {
    await createIncident(incident);
    await loadIncidents();
  };

  const handleStatusChange = async (id, status) => {
    await updateIncident(id, { status });
    await loadIncidents();
  };

  const handleDelete = async (id) => {
    await deleteIncident(id);
    await loadIncidents();
  };

  return (
    <div>
      <h1>IncidentHub</h1>

      <p>
        Cloud Incident Management Dashboard
      </p>

      <hr />

      <h2>Create Incident</h2>

      <IncidentForm
        onIncidentCreated={handleIncidentCreated}
      />

      <hr />

      <h2>Incidents</h2>

      {loading ? (
        <p>Loading incidents...</p>
      ) : (
        <IncidentList
          incidents={incidents}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
