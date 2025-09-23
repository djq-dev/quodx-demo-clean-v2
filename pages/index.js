import { useState } from "react";

export default function Home() {
  const [feelingToday, setFeelingToday] = useState("");
  const [scene, setScene] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const ritual = {
      feelingToday,
      scene,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem("quodx.ritual", JSON.stringify(ritual));
    window.location.href = "/visualize";
  }

  return (
    <div className="container">
      <header>
        <h1>Quodx Spaces</h1>
        <h2>Human Loop</h2>
      </header>

      <section className="panel">
        <form onSubmit={handleSubmit}>
          <div className="grid-2">
            <label>
              How are you feeling today?
              <input
                value={feelingToday}
                onChange={(e) => setFeelingToday(e.target.value)}
                required
              />
            </label>
            <label>
              Imagine a scene:
              <input
                value={scene}
                onChange={(e) => setScene(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="row" style={{ marginTop: 20 }}>
            <button type="submit">➡️ Continue</button>
          </div>
        </form>
      </section>
    </div>
  );
}
