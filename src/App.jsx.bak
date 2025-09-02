import React, { useState } from "react";

// Preset multiplier cards for Advanced Mode
const CARD_PRESETS = [
  { name: "Doubling Season", multiplier: 2 },
  { name: "Parallel Lives", multiplier: 2 },
  { name: "Anointed Procession", multiplier: 2 },
  { name: "Primal Vigor", multiplier: 2 },
  { name: "Mondrak", multiplier: 2 },
];

export default function App() {
  const [baseTokens, setBaseTokens] = useState(1);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Simple mode multipliers
  const [doublers, setDoublers] = useState(0);
  const [triplers, setTriplers] = useState(0);
  const [quadruplers, setQuadruplers] = useState(0);

  // Advanced mode state
  const [cards, setCards] = useState([
    { name: CARD_PRESETS[0].name, multiplier: CARD_PRESETS[0].multiplier, quantity: 1 },
  ]);

  // Totals
  const simpleTotal =
    baseTokens * Math.pow(2, doublers) * Math.pow(3, triplers) * Math.pow(4, quadruplers);
  const advancedTotal =
    baseTokens *
    cards.reduce((acc, card) => acc * Math.pow(card.multiplier, card.quantity), 1);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"} min-h-screen flex items-center justify-center p-6`}>
      <div className={`w-full max-w-xl shadow-xl rounded-2xl p-6 space-y-6
        ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
        
        {/* Dark Mode Toggle */}
        <div className="flex justify-end">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            Dark Mode
          </label>
        </div>

        <h1 className="text-2xl font-bold text-center">MTG Token Calculator</h1>

        {/* Advanced Mode Toggle */}
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={advancedMode}
              onChange={() => setAdvancedMode(!advancedMode)}
            />
            Advanced Mode
          </label>
        </div>

        {/* Base Tokens */}
        <div>
          <label className="block font-medium mb-1">Base Tokens Created</label>
          <input
            type="number"
            min="0"
            value={baseTokens}
            onChange={(e) => setBaseTokens(Number(e.target.value))}
            className={`w-full p-2 border rounded focus:outline-none focus:ring-2 
              ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-400" 
                         : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"}`}
          />
        </div>

        {/* Simple Mode Inputs */}
        {!advancedMode && (
          <div className="space-y-4">
            {[
              { label: "Doublers (x2)", value: doublers, setValue: setDoublers },
              { label: "Triplers (x3)", value: triplers, setValue: setTriplers },
              { label: "Quadruplers (x4)", value: quadruplers, setValue: setQuadruplers },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <label className="flex-1">{item.label}</label>
                <input
                  type="number"
                  min="0"
                  value={item.value}
                  onChange={(e) => item.setValue(Number(e.target.value))}
                  className={`w-16 p-2 border rounded text-center focus:outline-none focus:ring-2 
                    ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-400" 
                               : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"}`}
                />
              </div>
            ))}

            <div className="text-center text-xl font-bold mt-4 p-2 rounded bg-green-100 dark:bg-green-800">
              Total Tokens: <span className="text-green-700 dark:text-green-300">{simpleTotal}</span>
            </div>
          </div>
        )}

        {/* Advanced Mode Table */}
        {advancedMode && (
          <div className="space-y-4 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300 dark:scrollbar-track-gray-700 dark:scrollbar-thumb-blue-600">
            <table className="w-full min-w-[550px] border-collapse">
              <thead>
                <tr>
                  <th className="border px-2 py-1 w-48">Card Name</th>
                  <th className="border px-2 py-1 w-20">Multiplier</th>
                  <th className="border px-2 py-1 w-20">Quantity</th>
                  <th className="border px-2 py-1 w-16">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cards.map((card, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? (darkMode ? "bg-gray-800" : "bg-gray-50") : (darkMode ? "bg-gray-700" : "bg-white")}>
                    <td className="border px-2 py-1">
                      <select
                        value={card.name}
                        onChange={(e) => {
                          const selected = CARD_PRESETS.find(c => c.name === e.target.value);
                          setCards(cards.map((c, i) =>
                            i === idx ? { ...c, name: selected.name, multiplier: selected.multiplier } : c
                          ));
                        }}
                        className={`w-full p-1 border rounded focus:outline-none focus:ring-2 
                          ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-400" 
                                     : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"}`}
                      >
                        {CARD_PRESETS.map((c) => (
                          <option key={c.name} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </td>
                    <td className="border px-2 py-1 text-center">{card.multiplier}</td>
                    <td className="border px-2 py-1">
                      <input
                        type="number"
                        min="0"
                        value={card.quantity}
                        onChange={(e) =>
                          setCards(cards.map((c, i) =>
                            i === idx ? { ...c, quantity: Number(e.target.value) } : c
                          ))
                        }
                        className={`w-16 p-1 border rounded text-center focus:outline-none focus:ring-2 
                          ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-400" 
                                     : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"}`}
                      />
                    </td>
                    <td className="border px-2 py-1 text-center">
                      <button
                        className={`px-2 py-1 border rounded ${darkMode ? "bg-red-700 text-white hover:bg-red-600" : "bg-red-500 text-white hover:bg-red-600"}`}
                        onClick={() => setCards(cards.filter((_, i) => i !== idx))}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              className={`mt-2 px-4 py-2 border rounded ${darkMode ? "bg-blue-700 text-white hover:bg-blue-600" : "bg-blue-500 text-white hover:bg-blue-600"}`}
              onClick={() => setCards([...cards, { name: CARD_PRESETS[0].name, multiplier: CARD_PRESETS[0].multiplier, quantity: 1 }])}
            >
              Add Card
            </button>

            <div className="text-center text-xl font-bold mt-4 p-2 rounded bg-green-100 dark:bg-green-800">
              Total Tokens: <span className="text-green-700 dark:text-green-300">{advancedTotal}</span>
            </div>
          </div>
        )}

        {/* Reset Button */}
        <div className="flex justify-between">
          <button
            className={`px-4 py-2 border rounded ${darkMode ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
