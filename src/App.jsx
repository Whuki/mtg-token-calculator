import React, { useState } from "react";
import CustomQuantityInput from "./CustomQuantityInput";
import { Analytics } from "@vercel/analytics/react";

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
  const [darkMode, setDarkMode] = useState(true);

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
        {/* Toggles */}
        <div className="flex justify-end gap-4 flex-wrap">
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

        {/* Simple Mode */}
        {!advancedMode && (
          <div className="space-y-4">
            {/* Base Tokens */}
            <div className="flex gap-2 items-center flex-wrap">
              <label className="flex-1 min-w-[120px]">Base Tokens Created</label>
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
              <div key={idx + 1} className="flex gap-2 items-center flex-wrap">
                <label className="flex-1 min-w-[120px]">{item.label}</label>
                <CustomQuantityInput
                  value={item.value}
                  onChange={item.setValue}
                  darkMode={darkMode}
                  rowIndex={idx + 1}
                />
              </div>
            ))}

            <div className="text-center text-xl font-bold mt-4 p-2 rounded bg-green-100 dark:bg-green-800 transition-colors">
              Total Tokens:{" "}
              <span className="text-green-700 dark:text-green-300">{simpleTotal}</span>
            </div>
          </div>
        )}

        {/* Advanced Mode */}
        {advancedMode && (
          <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700 pr-4">
            {/* Base Tokens */}
            <div className="flex gap-2 items-center flex-wrap mb-2">
              <label className="flex-1 min-w-[120px]">Base Tokens Created</label>
              <CustomQuantityInput
                value={baseTokens}
                onChange={setBaseTokens}
                darkMode={darkMode}
                rowIndex={0}
              />
            </div>

            <table className="w-full min-w-[550px] border-collapse rounded-lg">
              <thead className="hidden md:table-header-group">
                <tr>
                  <th className="px-2 py-1 w-48 text-left">Card Name</th>
                  <th className="px-2 py-1 w-20 text-center">Multiplier</th>
                  <th className="px-2 py-1 w-24 text-center">Quantity</th>
                  <th className="px-2 py-1 w-16 text-center">Remove</th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group">
                {cards.map((card, idx) => {
                  const rowBg =
                    idx % 2 === 0
                      ? darkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "bg-gray-50 hover:bg-gray-100"
                      : darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-white hover:bg-gray-100";

                  return (
                    <tr
                      key={idx}
                      className={`block md:table-row gap-2 md:gap-0 items-center transition-colors rounded-lg ${rowBg}`}
                    >
                      <td className="block md:table-cell px-2 py-1 md:max-w-[200px]">
                        <span className="md:hidden font-semibold">Card Name: </span>
                        <select
                          value={card.name}
                          onChange={(e) => {
                            const selected = CARD_PRESETS.find(
                              (c) => c.name === e.target.value
                            );
                            setCards(
                              cards.map((c, i) =>
                                i === idx
                                  ? { ...c, name: selected.name, multiplier: selected.multiplier }
                                  : c
                              )
                            );
                          }}
                          className={`p-1 rounded-lg focus:outline-none focus:ring-2 w-full md:w-auto min-w-[120px] ${
                            idx % 2 === 0
                              ? darkMode
                                ? "bg-gray-800 text-gray-100 border-gray-600 focus:ring-blue-400"
                                : "bg-gray-50 text-gray-900 border-gray-300 focus:ring-blue-400"
                              : darkMode
                              ? "bg-gray-700 text-gray-100 border-gray-600 focus:ring-blue-400"
                              : "bg-white text-gray-900 border-gray-300 focus:ring-blue-400"
                          }`}
                        >
                          {CARD_PRESETS.map((c, i) => (
                            <option key={i} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="block md:table-cell px-2 py-1 text-center md:text-center flex md:block justify-between md:justify-center gap-2">
                        <span className="md:hidden font-semibold">Multiplier: </span>
                        {card.multiplier}x
                      </td>
                      <td className="block md:table-cell px-2 py-1 text-center md:text-center flex md:block justify-between md:justify-center gap-2">
                        <span className="md:hidden font-semibold">Quantity: </span>
                        <CustomQuantityInput
                          value={card.quantity}
                          onChange={(val) =>
                            setCards(
                              cards.map((c, i) =>
                                i === idx ? { ...c, quantity: val } : c
                              )
                            )
                          }
                          rowIndex={idx}
                          darkMode={darkMode}
                        />
                      </td>
                      <td className="block md:table-cell px-2 py-1 text-center">
                        <button
                          onClick={() => setCards(cards.filter((_, i) => i !== idx))}
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
              <button
                onClick={() =>
                  setCards([
                    ...cards,
                    { name: CARD_PRESETS[0].name, multiplier: CARD_PRESETS[0].multiplier, quantity: 1 },
                  ])
                }
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Add Card
              </button>
              <div className="text-xl font-bold mt-2 md:mt-0">
                Total Tokens: {advancedTotal}
              </div>
            </div>
          </div>
        )}

        <Analytics />
      </div>
    </div>
  );
}
