import { useState } from "react";

function IncidentForm({ onIncidentCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    severity: "medium",
    service: ""
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onIncidentCreated(form);

    setForm({
      title: "",
      description: "",
      severity: "medium",
      service: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Incident title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
      />

      <input
        name="service"
        placeholder="Service"
        value={form.service}
        onChange={handleChange}
        required
      />

      <select
        name="severity"
        value={form.severity}
        onChange={handleChange}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>

      <button type="submit">
        Create Incident
      </button>
    </form>
  );
}

export default IncidentForm;
