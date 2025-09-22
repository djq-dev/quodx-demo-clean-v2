import { useState } from "react";
import { useRouter } from "next/router";

export default function HumanLoop() {
  const r = useRouter();
  const [feelingToday, setFeelingToday] = useState("");
  const [scene, setScene] = useState("");
  const [seeing, setSeeing] = useState("");
  const [hearing, setHearing] = useState("");
  const [smelling, setSmelling] = useState("");
  const [tasting, setTasting] = useState("");
  const [touching, setTouching] = useState("");
  const [prompt, setPrompt] = useState("");

  function saveAndNext() {
    const haiku = [
      feelingToday || "Quiet resolve",
      seeing || "City lights breathing slowly",
      prompt || "What would you say now?"
    ].join("\n");

    const ritual = {
      feelingToday, scene,
      senses: { seeing, hearing, smelling, tasting, touching },
      prompt,
      haiku,
      createdAt: new Date().toISOString()
    };
    if (typeof window !== "undefined") {
      localStorage.setItem("quodx.ritual", JSON.stringify(ritual));
    }
    r.push("/visualize");
  }

  return (
    <div className="container">
      <header><h1>QuodX Spaces – Remix Kit Demo</h1></header>

      <section className="panel">
        <h2>Human Loop</h2>
        <div className="grid-2">
