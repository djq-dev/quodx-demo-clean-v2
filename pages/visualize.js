import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

const TRACKS = {
  drums: "/assets/drums.wav",
  keys:  "/assets/keys.wav"
};
const PALETTE = ["vocals","bass","guitar","synth","pads","strings"];

export default function Visualize() {
  const r = useRouter();
  const [ritual, setRitual] = useState(null);
  const [haiku, setHaiku] = useState("…");
  const canvasRef = useRef(null);

  // audio
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const buffersRef = useRef({});
  const sourcesRef = useRef({});
  const gainsRef = useRef({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(100);
  const [semitones, setSemitones] = useState(0);
  const [vol, setVol] = useState({ drums: 0.9, keys: 0.9 });
  const [mute, setMute] = useState({ drums: false, keys: false });

  // drag/drop
  const [rack, setRack] = useState([]);

  const rate = () => (tempo / 100) * Math.pow(2, semitones/12);

  useEffect(() => {
    // load ritual from storage
    const raw = typeof window !== "undefined" ? localStorage.getItem("quodx.ritual") : null;
    if (raw) {
      const obj = JSON.parse(raw);
      setRitual(obj);
      setHaiku(obj.haiku || "…");
    }
    // load remix settings
