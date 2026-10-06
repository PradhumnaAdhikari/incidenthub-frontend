import { useEffect, useState } from "react";

import IncidentForm from "./components/IncidentForm";
import IncidentList from "./components/IncidentList";

import {
  getIncidents,
  createIncident,
  updateIncident,
  deleteIncident,
} from "./api";

function App() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadIncidents = async () => {
    try {
      const data = await getIncidents();
      setIncidents(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Could not reach the backend. Check that the API is running.");
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

  const count = (fn) => incidents.filter(fn).length;
  const stats = [
    { label: "Total", value: incidents.length, tone: "neutral" },
    { label: "Open", value: count((i) => i.status === "open"), tone: "blue" },
    {
      label: "Critical",
      value: count((i) => i.severity === "critical" && i.status !== "resolved"),
      tone: "red",
    },
    { label: "Resolved", value: count((i) => i.status === "resolved"), tone: "green" },
  ];

  return (
    <div className="shell">
      <header className="hero">
        <div className="brand">
          <span className="logo">
            <span className="pulse" />
          </span>
          <div>
            <p className="eyebrow">Cloud Operations</p>
            <h1>
              Incident<span>Hub</span>
            </h1>
          </div>
        </div>
        <p className="tagline">
          Detect. Triage. Resolve. One dashboard for every incident across your cloud services.
        </p>
      </header>

      <section className="stats">
        {stats.map((s) => (
          <div key={s.label} className={`stat ${s.tone}`}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {error && <div className="banner">{error}</div>}

      <main className="layout">
        <aside className="panel form-panel">
          <h2>Report an incident</h2>
          <p className="muted">Describe what's broken and how bad it is.</p>
          <IncidentForm onIncidentCreated={handleIncidentCreated} />
        </aside>

        <section className="panel list-panel">
          <h2>Live incidents</h2>
          {loading ? (
            <div className="skeletons">
              <div className="skeleton" />
              <div className="skeleton" />
            </div>
          ) : (
            <IncidentList
              incidents={incidents}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>

      <footer className="footer">Built with React · Deployed on the cloud ☁️</footer>
    </div>
  );
}

export default App;
