import { useState } from "react";

const SEVERITIES = ["low", "medium", "high", "critical"];
const EMPTY = { title: "", description: "", service: "", severity: "medium" };

export default function IncidentForm({ onIncidentCreated }) {
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    setSubmitting(true);
    setError("");
    try {
      await onIncidentCreated({ ...form, title: form.title.trim() });
      setForm(EMPTY);
    } catch (err) {
      console.error(err);
      setError("Could not create the incident. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label className="field">
        <span>Title</span>
        <input
          value={form.title}
          onChange={update("title")}
          placeholder="e.g. Database connection timeouts"
          required
        />
      </label>

      <label className="field">
        <span>Description</span>
        <textarea
          value={form.description}
          onChange={update("description")}
          placeholder="What happened? What is the impact?"
        />
      </label>

      <label className="field">
        <span>Service</span>
        <input
          value={form.service}
          onChange={update("service")}
          placeholder="e.g. backend, payments, auth"
        />
      </label>

      <div className="field">
        <span>Severity</span>
        <div className="sev-picker">
          {SEVERITIES.map((s) => (
            <button
              type="button"
              key={s}
              className={`sev-option ${s} ${form.severity === s ? "active" : ""}`}
              onClick={() => setForm({ ...form, severity: s })}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {error && <div className="form-error">{error}</div>}

      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? "Creating…" : "🚨 Create Incident"}
      </button>
    </form>
  );
}
