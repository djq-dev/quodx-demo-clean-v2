 import { useEffect, useState } from "react";

export default function ExportPack() {
  const [pack, setPack] = useState(null);
  const [showDaw, setShowDaw] = useState(false);

  useEffect(() => {
    const r = typeof window !== "undefined" ? localStorage.getItem("quodx.ritual") : null;
    const ritualObj = r ? JSON.parse(r) : {};

    const packObj = {
      pack_id: "pack_" + Math.random().toString(36).slice(2, 10),
      pack_name: "QuodX Spaces — Signature Pack Demo",
      version: "1.0-demo",
      created_at: new Date().toISOString(),
      ritual: ritualObj,
      stems: {
        drums: "/assets/drums.wav",
        keys: "/assets/keys.wav",
      },
      licensing: {
        license: "Demo / Non-commercial",
      },
    };
    setPack(packObj);
  }, []);

  function copy() {
    navigator.clipboard.writeText(JSON.stringify(pack, null, 2));
    alert("Copied JSON");
  }

  function download() {
    const blob = new Blob([JSON.stringify(pack, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "signature-pack.json";
    a.click();
  }

  if (!pack) {
    return (
      <div className="container">
        <p>Loading pack...</p>
      </div>
    );
  }

  return (
    <div className="container export-page">
      <header>
        <h1>Signature Pack</h1>
        <p>A personalized bundle from your input.</p>
      </header>

      <section className="panel">
        <h2>📦 What’s Inside</h2>
        <ul>
          <li><strong>Prompts:</strong> {pack.ritual.feelingToday}, {pack.ritual.scene}</li>
          <li><strong>Stems:</strong> Drums + Keys</li>
          <li><strong>License:</strong> {pack.licensing.license}</li>
        </ul>

        <div className="row" style={{ marginTop: 20, gap: 12 }}>
          <button onClick={copy}>📋 Copy JSON</button>
          <button onClick={download}>⬇️ Download JSON</button>
          <button onClick={() => setShowDaw(true)}>🎚️ Export to DAW (mock)</button>
        </div>
      </section>

      {showDaw && (
        <div className="modal">
          <div className="modal-content">
            <h2>DAW Plugin (Mock)</h2>
            <img src="/assets/daw-mock.png" alt="daw mock" style={{ width: "100%", borderRadius: 8 }} />
            <div className="row" style={{ marginTop: 12 }}>
              <a className="button" href="/assets/quodx-demo.vst3" download>
                Download Plugin (mock)
              </a>
              <button className="secondary" onClick={() => setShowDaw(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="panel row" style={{ marginTop: 20 }}>
        <button onClick={() => (window.location.href = "/visualize")}>⬅️ Back</button>
      </section>
    </div>
  );
}
