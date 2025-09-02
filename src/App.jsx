import React, { useState } from "react";
import CustomQuantityInput from "./CustomQuantityInput";
import { Analytics } from "@vercel/analytics/react";

const CARD_PRESETS = [
  { name: "Parallel Lives", multiplier: 2 },
  { name: "Doubling Season", multiplier: 2 },
  { name: "Anointed Procession", multiplier: 2 },
  { name: "Mondrak, Fury of Akoum", multiplier: 3 },
];

export default function App() {
  const [advancedMode, setAdvancedMode] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [baseTokens, setBaseTokens] = useState(1);
  const [doublers, setDoublers] = useState(0);
  const [triplers, setTriplers] = useState(0);
  const [quadruplers, setQuadruplers] = useState(0);
  const [cards, setCards] = useState([
    { name: CARD_PRESETS[0].name, multiplier: CARD_PRESETS[0].multiplier, quantity: 1 },
  ]);

  const simpleTotal = baseTokens * Math.pow(2, doublers) * Math.pow(3, triplers) * Math.pow(4, quadruplers);
  const advancedTotal = cards.reduce((total, card) => total + card.quantity * card.multiplier, 0);

  return (
    <div className={darkMode ? "bg-gray-900 text-gray-100 min-h-screen p-4" : "bg-gray-100 text-gray-900 min-h-screen p-4"}>
      <div className="max-w-3xl mx-auto p-4 bg-white dark:bg-gray-800 rounded shadow transition-colors">
        <h1 className="text-2xl font-bold text-center mb-2">MTG Token Calculator</h1>
        <p className="text-center text-sm mb-4">Because Yenna makes my brain hurt..😅</p>

        {/* Mode Toggle */}
        <div className="flex justify-center items-center gap-4 mb-4">
          <label className="flex items-center gap-2">
            <span>Advanced Mode</span>
            <input
              type="checkbox"
              checked={advancedMode}
              onChange={() => setAdvancedMode(!advancedMode)}
              className="toggle toggle-accent"
            />
          </label>
          <label className="flex items-center gap-2">
            <span>Light Mode</span>
            <input
              type="checkbox"
              checked={!darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="toggle toggle-accent"
            />
          </label>
        </div>

        {/* Simple Mode */}
        {!advancedMode && (
          <div className="space-y-4">
            {/* Base Tokens */}
            <div className="flex gap-2 items-center justify-center">
              <label className="text-lg font-bold flex-1 text-center">Base Tokens Created</label>
              <CustomQuantityInput
                value={baseTokens}
                onChange={setBaseTokens}
                darkMode={darkMode}
                rowIndex={-1}
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
                  rowIndex={idx}
                />
              </div>
            ))}
          </div>
        )}

        {/* Advanced Mode */}
        {advancedMode && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  {["Card Name", "Multiplier", "Quantity"].map((heading) => (
                    <th key={heading} className="text-left px-2 py-1">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cards.map((card, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-gray-100 dark:bg-gray-700" : "bg-gray-200 dark:bg-gray-800"}>
                    <td className="px-2 py-1">{card.name}</td>
                    <td className="px-2 py-1">{card.multiplier}</td>
                    <td className="px-2 py-1">
                      <CustomQuantityInput value={card.quantity} onChange={(val) => {
                        const newCards = [...cards];
                        newCards[idx].quantity = val;
                        setCards(newCards);
                      }} darkMode={darkMode} rowIndex={idx} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
              <button
                onClick={() =>
                  setCards([...cards, { name: CARD_PRESETS[0].name, multiplier: CARD_PRESETS[0].multiplier, quantity: 1 }])
                }
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Add Card
              </button>
            </div>
          </div>
        )}

        {/* Unified Total Tokens */}
        <div className="text-center text-xl font-bold mt-6 p-3 rounded bg-green-100 dark:bg-green-800 transition-colors">
          Total Tokens:{" "}
          <span className="text-green-700 dark:text-green-300">
            {advancedMode ? advancedTotal : simpleTotal}
          </span>
        </div>

        <Analytics />
      </div>
    </div>
  );
}
