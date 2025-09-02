import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import CustomQuantityInput from "./CustomQuantityInput";
import { Analytics } from "@vercel/analytics/react";
import { Volume2, VolumeX } from "lucide-react"; // speaker icons

// Card presets with emoji flair
const CARD_PRESETS = [
  { name: "Doubling Season", multiplier: 2, emoji: "🌱" },
  { name: "Parallel Lives", multiplier: 2, emoji: "✨" },
  { name: "Anointed Procession", multiplier: 2, emoji: "🙏" },
  { name: "Mondrak, Glory Dominus", multiplier: 2, emoji: "🐺" },
  { name: "Primal Vigor", multiplier: 2, emoji: "🌿" },
  { name: "Elspeth, Storm Slayer", multiplier: 2, emoji: "⚔️" },
  { name: "Kaya, Geist Hunter", multiplier: 2, emoji: "👻" },
  { name: "Exalted Sunborn", multiplier: 2, emoji: "🌞" },
  { name: "Ojer Taq, Deepest Foundation", multiplier: 3, emoji: "🐉" },
  { name: "Adrix and Nev, Twincasters", multiplier: 2, emoji: "🧑‍🤝‍🧑" },
];

// Token milestones
const TOKEN_MILESTONES = {
  20: "20 Tokens: Enough to chump block for days 🛡️",
  40: "40 Tokens: That’s a Commander life total in blockers 👑",
  69: "69 Tokens: Nice 😏",
  100: "100 Tokens: Triple digits. Your table hates you 💀",
  420: "420 Tokens: Blaze it 🌿🔥",
  1000: "1,000 Tokens: Spreadsheet territory 📊",
  10000: "10,000 Tokens: Judge! I need dice 🎲",
  100000: "100,000 Tokens: Just tell your friends they’re dead ☠️",
};

// Scute milestones
const SCUTE_MILESTONES = {
  20: "20 Scutes: Enough to blot out the sun 🪲",
  40: "40 Scutes: The colony grows 👑",
  69: "69 Scutes: Nice swarm 😏",
  100: "100 Scutes: Your board is writhing 💀",
  420: "420 Scutes: The infestation blazes 🌿🔥",
  1000: "1,000 Scutes: Hive mind achieved 📊",
  10000: "10,000 Scutes: Bugged out! 🎲",
  100000: "100,000 Scutes: Game over, man. Game over ☠️",
};

export default function App() {
  const [tab, setTab] = useState("simple");
  const [darkMode, setDarkMode] = useState(true);
  const [soundOn, setSoundOn] = useState(true);

  // Simple mode
  const [baseTokens, setBaseTokens] = useState(1);
  const [doublers, setDoublers] = useState(0);
  const [triplers, setTriplers] = useState(0);
  const [quadruplers, setQuadruplers] = useState(0);

  // Advanced mode
  const [cards, setCards] = useState([]);
  const [selectedPreset, setSelectedPreset] = useState(CARD_PRESETS[0].name);

  // Scute mode
  const [scutes, setScutes] = useState(1);
  const [startingScutes, setStartingScutes] = useState(1);
  const [includeScutes, setIncludeScutes] = useState(false);
  const [pulse, setPulse] = useState(false);

  // Totals + animation
  const [animatedTotal, setAnimatedTotal] = useState(1);
  const [toasts, setToasts] = useState([]);

  const simpleTotal =
    baseTokens * Math.pow(2, doublers) * Math.pow(3, triplers) * Math.pow(4, quadruplers);

  const advancedTotal =
    baseTokens *
    cards.reduce((acc, card) => acc * Math.pow(card.multiplier, card.quantity), 1);

  const scuteTotal = scutes;
  const total =
    tab === "simple"
      ? simpleTotal + (includeScutes ? scuteTotal : 0)
      : tab === "advanced"
      ? advancedTotal + (includeScutes ? scuteTotal : 0)
      : scuteTotal;

  // Helper to play sounds
  const playSound = (file) => {
    if (soundOn) {
      const audio = new Audio(`/sounds/${file}`);
      audio.volume = 0.5;
      audio.play();
    }
  };

  // Animate token counter
  useEffect(() => {
    const controls = animate(animatedTotal, total, {
      duration: 0.6,
      onUpdate: (v) => setAnimatedTotal(Math.round(v)),
    });
    return () => controls.stop();
  }, [total]);

  // Milestone toasts
  useEffect(() => {
    const milestones = tab === "scute" ? SCUTE_MILESTONES : TOKEN_MILESTONES;
    Object.keys(milestones).forEach((m) => {
      const milestone = parseInt(m);
      if (animatedTotal === milestone) {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { id, text: milestones[milestone], mode: tab }]);
        playSound("confirmation.wav");
        // Auto-dismiss after 4s
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
      }
    });
  }, [animatedTotal, tab]);

  // Reset all
  const handleReset = () => {
    setBaseTokens(1);
    setDoublers(0);
    setTriplers(0);
    setQuadruplers(0);
    setCards([]);
    setSelectedPreset(CARD_PRESETS[0].name);
    setScutes(startingScutes);
    playSound("whoosh.wav");
  };

  // Scute land drop
  const handleLandDrop = () => {
    setScutes(scutes * 2);
    setPulse(true);
    setTimeout(() => setPulse(false), 600);
    playSound("bubble-pop.wav");
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gradient-to-br from-gray-900 to-black text-gray-100" : "bg-gray-100 text-gray-900"
      } min-h-screen flex flex-col items-center p-6 transition-colors duration-500`}
    >
      <div
        className={`w-full max-w-5xl rounded-3xl p-8 space-y-8 transition-all duration-500
        backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl`}
      >
        {/* Nav Tabs */}
        <div className="flex overflow-x-auto justify-center gap-6 border-b border-gray-600 pb-2 items-center">
          {["simple", "advanced", "scute"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative px-4 py-2 font-semibold transition shrink-0 ${
                tab === t ? "text-blue-400" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {t === "simple" && "Simple"}
              {t === "advanced" && "Advanced"}
              {t === "scute" && "Scute Swarm"}
              {tab === t && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 right-0 -bottom-1 h-0.5 bg-blue-400 rounded"
                />
              )}
            </button>
          ))}
          {/* Toggles */}
          <div className="flex items-center gap-4 ml-auto shrink-0">
            {/* Dark/Light */}
            <button
              aria-label="Toggle theme"
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                darkMode ? "bg-gray-600" : "bg-yellow-400"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transform transition-transform ${
                  darkMode ? "" : "translate-x-6"
                }`}
              ></span>
            </button>
            {/* Sound FX */}
            <motion.button
              whileTap={{ scale: 0.8 }}
              onClick={() => setSoundOn(!soundOn)}
              className="p-2 rounded-lg hover:bg-gray-700 transition"
            >
              {soundOn ? (
                <Volume2 className="w-6 h-6 text-blue-400" />
              ) : (
                <VolumeX className="w-6 h-6 text-gray-400" />
              )}
            </motion.button>
          </div>
        </div>

        {/* --- Modes omitted for brevity (unchanged logic) --- */}
        {/* Keep Simple, Advanced, Scute, Totals, Toasts, Analytics same as your original */}

        {/* Toasts */}
        <div className="fixed top-20 right-6 space-y-2 z-50">
          <AnimatePresence>
            {toasts.map((toast) => (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.4 }}
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                className={`px-4 py-2 rounded-lg shadow-lg cursor-pointer backdrop-blur-md ${
                  toast.mode === "scute"
                    ? "bg-green-700/70 text-green-100 border border-green-400/50"
                    : "bg-blue-700/70 text-blue-100 border border-blue-400/50"
                }`}
              >
                {toast.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Analytics />
      </div>
    </div>
  );
}
