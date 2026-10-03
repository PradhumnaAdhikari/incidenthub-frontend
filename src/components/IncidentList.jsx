function IncidentList({
  incidents,
  onStatusChange,
  onDelete
}) {
  return (
    <div>
      {incidents.map((incident) => (
        <div key={incident.id}>
          <h3>{incident.title}</h3>

          <p>{incident.description}</p>

          <p>
            Severity: <strong>{incident.severity}</strong>
          </p>

          <p>
            Service: <strong>{incident.service}</strong>
          </p>

          <p>
            Status: <strong>{incident.status}</strong>
          </p>

          {incident.status !== "resolved" && (
            <button
              onClick={() =>
                onStatusChange(incident.id, "resolved")
              }
            >
              Resolve
            </button>
          )}

          <button onClick={() => onDelete(incident.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default IncidentList;
