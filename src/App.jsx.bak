import React, { useState } from "react";

// Preset multiplier cards
const CARD_PRESETS = [
  { name: "Doubling Season", multiplier: 2 },
  { name: "Parallel Lives", multiplier: 2 },
  { name: "Anointed Procession", multiplier: 2 },
  { name: "Primal Vigor", multiplier: 2 },
  { name: "Mondrak", multiplier: 2 },
  // Add more cards here if needed
];

export default function App() {
  const [baseTokens, setBaseTokens] = useState(1);
  const [advancedMode, setAdvancedMode] = useState(false);

  // Advanced mode state
  const [cards, setCards] = useState([{ name: CARD_PRESETS[0].name, multiplier: CARD_PRESETS[0].multiplier, quantity: 1 }]);

  // Calculate total tokens
  const totalTokens =
    baseTokens *
    cards.reduce((acc, card) => acc * Math.pow(card.multiplier, card.quantity), 1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">MTG Token Calculator</h1>

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

        <div>
          <label className="block font-medium mb-1">Base Tokens Created</label>
          <input
            type="number"
            min="0"
            value={baseTokens}
            onChange={(e) => setBaseTokens(Number(e.target.value))}
            className="w-full p-2 border rounded"
          />
        </div>

        {advancedMode && (
          <div className="space-y-4">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border px-2 py-1">Card Name</th>
                  <th className="border px-2 py-1">Multiplier</th>
                  <th className="border px-2 py-1">Quantity</th>
                  <th className="border px-2 py-1">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cards.map((card, idx) => (
                  <tr key={idx}>
                    <td className="border px-2 py-1">
                      <select
                        value={card.name}
                        onChange={(e) => {
                          const selected = CARD_PRESETS.find(c => c.name === e.target.value);
                          setCards(cards.map((c, i) =>
                            i === idx ? { ...c, name: selected.name, multiplier: selected.multiplier } : c
                          ));
                        }}
                        className="w-full p-1 border rounded"
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
                        className="w-16 p-1 border rounded text-center"
                      />
                    </td>
                    <td className="border px-2 py-1 text-center">
                      <button
                        className="px-2 py-1 border rounded text-red-600"
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
              className="mt-2 px-4 py-2 border rounded"
              onClick={() => setCards([...cards, { name: CARD_PRESETS[0].name, multiplier: CARD_PRESETS[0].multiplier, quantity: 1 }])}
            >
              Add Card
            </button>
          </div>
        )}

        <div className="text-center text-xl font-semibold mt-4">
          Total Tokens: <span className="text-green-600">{totalTokens}</span>
        </div>

        <div className="flex justify-between">
          <button
            className="px-4 py-2 border rounded"
            onClick={() => {
              setBaseTokens(1);
              setCards([{ name: CARD_PRESETS[0].name, multiplier: CARD_PRESETS[0].multiplier, quantity: 1 }]);
              setAdvancedMode(false);
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
