import { useState } from "react";

const STATUSES = ["open", "investigating", "resolved"];
const FILTERS = ["all", ...STATUSES];

const formatDate = (value) => {
  if (!value) return "";
  const d = new Date(value);
  return isNaN(d) ? "" : d.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
};

export default function IncidentList({ incidents, onStatusChange, onDelete }) {
  const [filter, setFilter] = useState("all");

  const visible =
    filter === "all" ? incidents : incidents.filter((i) => i.status === filter);

  return (
    <>
      <div className="filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`chip ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">✅</div>
          <p>No incidents here. All systems calm.</p>
        </div>
      ) : (
        <div className="incident-grid">
          {[...visible].reverse().map((incident) => {
            const id = incident.id ?? incident._id;
            const date = formatDate(incident.created_at || incident.createdAt);
            return (
              <article key={id} className={`incident sev-${incident.severity}`}>
                <div className="incident-head">
                  <h3>{incident.title}</h3>
                  <span className={`badge sev ${incident.severity}`}>{incident.severity}</span>
                </div>

                <p className="incident-desc">{incident.description || "No description provided."}</p>

                <div className="meta">
                  <span className="service">⚙ {incident.service || "unknown"}</span>
                  <span className={`badge status ${incident.status}`}>{incident.status}</span>
                  {date && <span className="date">{date}</span>}
                </div>

                <div className="incident-actions">
                  <div className="segmented">
                    {STATUSES.map((s) => (
                      <button
                        key={s}
                        className={incident.status === s ? "active" : ""}
                        onClick={() => incident.status !== s && onStatusChange(id, s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <button
                    className="btn-delete"
                    title="Delete incident"
                    onClick={() => window.confirm("Delete this incident?") && onDelete(id)}
                  >
                    🗑
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
