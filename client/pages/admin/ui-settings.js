import React, { useEffect, useState } from "react";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { SQ_API_URL },
} = getConfig();

export default function UISettingsAdmin() {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load settings from the server
  useEffect(() => {
    fetch(`${SQ_API_URL}/admin/settings`)
      .then((res) => res.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load settings.");
        setLoading(false);
      });
  }, []);

  // Update a setting value in local state
  function handleChange(index, value) {
    const copy = [...settings];
    copy[index].value = value;
    setSettings(copy);
  }

  // Save a setting to the server
  function handleSave(index) {
    const setting = settings[index];
    fetch(`${SQ_API_URL}/admin/settings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: setting.key, value: setting.value }),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
      })
      .catch(() => setError("Could not save setting."));
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <h2>UI Settings</h2>
      {settings.map((setting, i) => (
        <div key={setting._id || setting.key} style={{ marginBottom: 10 }}>
          <strong>{setting.key}:</strong>
          <input
            value={setting.value}
            onChange={(e) => handleChange(i, e.target.value)}
            style={{ margin: "0 8px" }}
          />
          <button onClick={() => handleSave(i)}>Save</button>
        </div>
      ))}
    </div>
  );
}
