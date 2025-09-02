import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import CustomQuantityInput from "./CustomQuantityInput";
import { Analytics } from "@vercel/analytics/react";

const CARD_PRESETS = [
  { name: "Doubling Season", multiplier: 2 },
  { name: "Parallel Lives", multiplier: 2 },
  { name: "Anointed Procession", multiplier: 2 },
  { name: "Mondrak, Glory Dominus", multiplier: 2 },
  { name: "Primal Vigor", multiplier: 2 },
  { name: "Elspeth, Storm Slayer", multiplier: 2 },
  { name: "Kaya, Geist Hunter", multiplier: 2 },
  { name: "Exalted Sunborn", multiplier: 2 },
  { name: "Ojer Taq, Deepest Foundation", multiplier: 3 },
];

export default function App() {
  const [baseTokens, setBaseTokens] = useState(1);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const [doublers, setDoublers] = useState(0);
  const [triplers, setTriplers] = useState(0);
  const [quadruplers, setQuadruplers] = useState(0);

  const [cards, setCards] = useState([]);
  const [selectedPreset, setSelectedPreset] = useState(CARD_PRESETS[0].name);

  const [animatedTotal, setAnimatedTotal] = useState(baseTokens);

  const simpleTotal =
    baseTokens * Math.pow(2, doublers) * Math.pow(3, triplers) * Math.pow(4, quadruplers);

  const advancedTotal =
    baseTokens *
    cards.reduce((acc, card) => acc * Math.pow(card.multiplier, card.quantity), 1);

  const total = advancedMode ? advancedTotal : simpleTotal;

  // Animate token counter
  useEffect(() => {
    const controls = animate(animatedTotal, total, {
      duration: 0.6,
      onUpdate: (v) => setAnimatedTotal(Math.round(v)),
    });
    return () => controls.stop();
  }, [total]);

  const handleReset = () => {
    setBaseTokens(1);
    setDoublers(0);
    setTriplers(0);
    setQuadruplers(0);
    setCards([]);
    setSelectedPreset(CARD_PRESETS[0].name);
  };

  return (
    <div
      className={`${
        darkMode ? "bg-gradient-to-br from-gray-900 to-black text-gray-100" : "bg-gray-100 text-gray-900"
      } min-h-screen flex items-center justify-center p-6 transition-colors duration-500`}
    >
      <div
        className={`w-full max-w-5xl rounded-3xl p-8 space-y-8 transition-all duration-500
        backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl`}
      >
        {/* Toggles */}
        <div className="flex justify-end gap-6">
          {/* Dark/Light Mode */}
          <div className="flex items-center gap-2">
            <span className="text-sm">Light Mode</span>
            <button
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
          </div>

          {/* Advanced Mode */}
          <div className="flex items-center gap-2">
            <span className="text-sm">Advanced Mode</span>
            <button
              onClick={() => setAdvancedMode(!advancedMode)}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                advancedMode ? "bg-blue-500" : "bg-gray-400"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transform transition-transform ${
                  advancedMode ? "translate-x-6" : ""
                }`}
              ></span>
            </button>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">MTG Token Calculator</h1>
          <p className="text-sm text-gray-400 mt-1">Because Yenna makes my brain hurt..😅</p>
        </div>

        {/* Simple Mode */}
        {!advancedMode && (
          <div className="space-y-4">
            {/* Base Tokens */}
            <div className="flex gap-2 items-center flex-wrap">
              <label className="flex-1 min-w-[120px] font-semibold">Base Tokens Created</label>
              <CustomQuantityInput
                value={baseTokens}
                onChange={setBaseTokens}
                darkMode={darkMode}
                rowIndex={0}
              />
            </div>

            {/* Doublers, Triplers, Quadruplers */}
            {[
              { label: "Doublers (x2)", value: doublers, setValue: setDoublers },
              { label: "Triplers (x3)", value: triplers, setValue: setTriplers },
              { label: "Quadruplers (x4)", value: quadruplers, setValue: setQuadruplers },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-2 items-center flex-wrap">
                <label className="flex-1 min-w-[120px]">{item.label}</label>
                <CustomQuantityInput
                  value={item.value}
                  onChange={item.setValue}
                  darkMode={darkMode}
                  rowIndex={idx + 1}
                />
              </div>
            ))}
          </div>
        )}

        {/* Advanced Mode */}
        {advancedMode && (
          <div className="space-y-4">
            {/* Base Tokens */}
            <div className="flex gap-2 items-center flex-wrap">
              <label className="flex-1 min-w-[120px] font-semibold">Base Tokens Created</label>
              <CustomQuantityInput
                value={baseTokens}
                onChange={setBaseTokens}
                darkMode={darkMode}
                rowIndex={0}
              />
            </div>

            {/* Add Card Controls */}
            <div className="flex gap-2 flex-wrap items-center">
              <select
                value={selectedPreset}
                onChange={(e) => setSelectedPreset(e.target.value)}
                className="p-2 rounded-lg border border-gray-600 bg-gray-800 text-gray-100"
              >
                {CARD_PRESETS.map((c, i) => (
                  <option key={i} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  const preset = CARD_PRESETS.find((c) => c.name === selectedPreset);
                  setCards([...cards, { ...preset, quantity: 1 }]);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:scale-105 hover:bg-blue-600 transition"
              >
                Add Card
              </button>
            </div>

            {/* Cards List */}
            <AnimatePresence>
              {cards.map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`p-4 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg ${
                    darkMode ? "bg-gray-700/60" : "bg-gray-200/60"
                  }`}
                >
                  <div className="flex-1">
                    <p className="font-semibold">{card.name}</p>
                    <p className="text-sm opacity-75">x{card.multiplier}</p>
                  </div>
                  <CustomQuantityInput
                    value={card.quantity}
                    onChange={(val) =>
                      setCards(cards.map((c, i) => (i === idx ? { ...c, quantity: val } : c)))
                    }
                    darkMode={darkMode}
                    rowIndex={idx}
                  />
                  <button
                    onClick={() => setCards(cards.filter((_, i) => i !== idx))}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:scale-105 transition"
                  >
                    Remove
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Total + Reset */}
        <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
          <motion.div
            key={animatedTotal}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-extrabold text-green-400"
          >
            Total Tokens: {animatedTotal}
          </motion.div>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 hover:scale-105 transition"
          >
            Reset
          </button>
        </div>

        <Analytics />
      </div>
    </div>
  );
}
