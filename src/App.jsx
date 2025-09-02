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
  const [darkMode, setDarkMode] = useState(true); // Dark mode default

  const [doublers, setDoublers] = useState(0);
  const [triplers, setTriplers] = useState(0);
  const [quadruplers, setQuadruplers] = useState(0);

  const [cards, setCards] = useState([
    { name: CARD_PRESETS[0].name, multiplier: CARD_PRESETS[0].multiplier, quantity: 1 },
  ]);

  const simpleTotal =
    baseTokens * Math.pow(2, doublers) * Math.pow(3, triplers) * Math.pow(4, quadruplers);
  const advancedTotal =
    baseTokens *
    cards.reduce((acc, card) => acc * Math.pow(card.multiplier, card.quantity), 1);

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      } min-h-screen flex items-center justify-center p-6 transition-colors duration-300`}
    >
      <div
        className={`w-full max-w-5xl shadow-xl rounded-2xl p-6 space-y-6 transition-all duration-300
        ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}
      >
        {/* Toggle switches */}
        <div className="flex justify-end gap-4">
          {/* Dark/Light Mode */}
          <div className="flex items-center gap-2">
            <span>Light Mode</span>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                darkMode ? "bg-gray-600" : "bg-yellow-400"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  darkMode ? "" : "translate-x-6"
                }`}
              ></span>
            </button>
          </div>

          {/* Advanced Mode */}
          <div className="flex items-center gap-2">
            <span>Advanced Mode</span>
            <button
              onClick={() => setAdvancedMode(!advancedMode)}
              className={`w-12 h-6 rounded-full relative transition-colors ${
                advancedMode ? "bg-blue-500" : "bg-gray-400"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                  advancedMode ? "translate-x-6" : ""
                }`}
              ></span>
            </button>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-bold">MTG Token Calculator</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Because Yenna makes my brain hurt..😅
          </p>
        </div>

        {/* Base Tokens */}
        <div>
          <label className="block font-medium mb-1">Base Tokens Created</label>
          <input
            type="number"
            min="0"
            value={baseTokens}
            onChange={(e) => setBaseTokens(Number(e.target.value))}
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors
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
                  className={`w-16 p-2 border rounded-lg text-center focus:outline-none focus:ring-2 transition-all duration-200
                    ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-400" 
                               : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"}`}
                />
              </div>
            ))}

            <div className="text-center text-xl font-bold mt-4 p-2 rounded bg-green-100 dark:bg-green-800 transition-colors">
              Total Tokens: <span className="text-green-700 dark:text-green-300">{simpleTotal}</span>
            </div>
          </div>
        )}

        {/* Advanced Mode Table */}
        {advancedMode && (
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300 dark:scrollbar-track-gray-700 dark:scrollbar-thumb-blue-600">
            <table className="w-full min-w-[550px] border-collapse rounded-lg">
              <thead className="hidden md:table-header-group">
                <tr>
                  <th className="px-2 py-1 w-48 text-left">Card Name</th>
                  <th className="px-2 py-1 w-20 text-center">Multiplier</th>
                  <th className="px-2 py-1 w-20 text-center">Quantity</th>
                  <th className="px-2 py-1 w-16 text-center">Remove</th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group">
                {cards.map((card, idx) => (
                  <tr
                    key={idx}
                    className={`block md:table-row gap-2 md:gap-0 items-center transition-colors rounded-lg
                      ${idx % 2 === 0 ? (darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-50 hover:bg-gray-100") 
                                       : (darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-gray-100")}`}
                  >
                    <td className="block md:table-cell px-2 py-1 md:max-w-[200px]">
                      <span className="md:hidden font-semibold">Card Name: </span>
                      <select
                        value={card.name}
                        onChange={(e) => {
                          const selected = CARD_PRESETS.find((c) => c.name === e.target.value);
                          setCards(
                            cards.map((c, i) =>
                              i === idx ? { ...c, name: selected.name, multiplier: selected.multiplier } : c
                            )
                          );
                        }}
                        className={`p-1 border rounded-lg focus:outline-none focus:ring-2 w-full md:w-auto min-w-[140px] max-w-full transition-all duration-200
                          ${darkMode ? "border-gray-600 focus:ring-blue-400 bg-gray-700 text-gray-100" 
                                     : "border-gray-300 focus:ring-blue-400 bg-white text-gray-900"}`}
                      >
                        {CARD_PRESETS.map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="block md:table-cell px-2 py-1 text-center">
                      <span className="md:hidden font-semibold">Multiplier: </span>
                      {card.multiplier}
                    </td>

                    <td className="block md:table-cell px-2 py-1 flex justify-center md:justify-center items-center">
                      <span className="md:hidden font-semibold mr-1">Quantity: </span>
                      <input
                        type="number"
                        min="0"
                        value={card.quantity}
                        onChange={(e) =>
                          setCards(
                            cards.map((c, i) =>
                              i === idx ? { ...c, quantity: Number(e.target.value) } : c
                            )
                          )
                        }
                        className={`w-20 md:w-16 p-1 border rounded-lg text-center focus:outline-none focus:ring-2 transition-all duration-200
                          ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-400 hover:ring-blue-500" 
                                     : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400 hover:ring-blue-500"}`}
                      />
                    </td>

                    <td className="block md:table-cell px-2 py-1 text-center">
                      <button
                        className={`px-2 py-1 border rounded-lg transition-all duration-200
                          ${darkMode ? "bg-red-700 text-white hover:bg-red-600 hover:scale-105" 
                                     : "bg-red-500 text-white hover:bg-red-600 hover:scale-105"}`}
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
              className={`mt-2 px-4 py-2 border rounded-lg transition-all duration-200
                ${darkMode ? "bg-blue-700 text-white hover:bg-blue-600 hover:scale-105" : "bg-blue-500 text-white hover:bg-blue-600 hover:scale-105"}`}
              onClick={() =>
                setCards([
                  ...cards,
                  { name: CARD_PRESETS[0].name, multiplier: CARD_PRESETS[0].multiplier, quantity: 1 },
                ])
              }
            >
              Add Card
            </button>

            <div className="text-center text-xl font-bold mt-4 p-2 rounded bg-green-100 dark:bg-green-800 transition-colors">
              Total Tokens: <span className="text-green-700 dark:text-green-300">{advancedTotal}</span>
            </div>
          </div>
        )}

        {/* Reset Button */}
        <div className="flex justify-between">
          <button
            className={`px-4 py-2 border rounded-lg transition-all duration-200
              ${darkMode ? "bg-gray-700 text-gray-100 hover:bg-gray-600 hover:scale-105" : "bg-gray-300 text-gray-900 hover:bg-gray-400 hover:scale-105"}`}
            onClick={() => {
              setBaseTokens(1);
              setDoublers(0);
              setTriplers(0);
              setQuadruplers(0);
              setCards([{ name: CARD_PRESETS[0].name, multiplier: CARD_PRESETS[0].multiplier, quantity: 1 }]);
            }}
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
}
