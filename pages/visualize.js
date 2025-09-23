import { useEffect, useState } from "react";

export default function Visualize() {
  const [ritual, setRitual] = useState(null);

  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("quodx.ritual") : null;
    if (raw) {
      const obj = JSON.parse(raw);
      setRitual(obj);
    }
  }, []);

  function goNext() {
    window.location.href = "/export";
  }

  return (
    <div className="container">
      <header>
        <h1>Soundscape Loop</h1>
      </header>

      <section className="panel">
        <p>
          Your words are transforming into a soundscape…  
          <em>{ritual?.feelingToday} {ritual?.scene}</em>
        </p>
        <div
          style={{
            width: "100%",
            height: "200px",
            background: "linear-gradient(135deg, #1e1e2f, #3a3a5a, #5a4b8c)",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontStyle: "italic",
            fontSize: "1.2em",
          }}
        >
          ✨ Abstract Flow Animation ✨
        </div>
      </section>

      <section className="panel row">
        <button onClick={() => (window.location.href = "/")}>⬅️ Back</button>
        <button onClick={goNext}>➡️ Next</button>
      </section>
    </div>
  );
}
