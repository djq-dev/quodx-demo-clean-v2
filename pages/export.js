import { useEffect, useState } from "react";

export default function ExportPack() {
  const [ritual, setRitual] = useState(null);
  const [remix, setRemix] = useState(null);
  const [pack, setPack] = useState(null);
  const [showDaw, setShowDaw] = useState(false);

  useEffect(() => {
    const r = typeof window !== "undefined" ? localStorage.getItem("quodx.ritual") : null;
    const m = typeof window !== "undefined" ? localStorage.getItem("quodx.remix") : null;
    const ritualObj = r ? JSON.parse(r) : null;
    const remixObj  = m ? JSON.parse(m) : null;
    setRitual(ritualObj);
    setRemix(remixObj);

    const packObj = {
      pack_id: "pack_" + Math.random().toString(36).slice(2, 10),
      pack_name: "QuodX Spaces — Signature Pack Demo",
      version: "1.0-demo",
      created_at: new Date().toISOString(),
      ritual: ritualObj || {},
      remix: remixObj || {},
      stems: {
        drums: "/assets/drums.wav",
        keys: "/assets/keys.wav"
      },
      licensing: {
        license: "Demo / Non-commercial",
        attribution_embedded: true,
        lineage_id: "demo-lineage-0001"
      }
    };
    setPack(packObj);
  }, []);

  function copy() {
    navigator.clipboard.writeText(JSON.stringify(pack, null, 2));
    alert("Copied JSON");
  }
  function download() {
