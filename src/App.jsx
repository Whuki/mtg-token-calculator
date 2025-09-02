import React, { useState } from "react";
import CustomQuantityInput from "./CustomQuantityInput";

export default function App() {
  const [mode, setMode] = useState("simple");
  const [baseTokens, setBaseTokens] = useState(0);
  const [multipliers, setMultipliers] = useState([]);
  const [selectedCard, setSelectedCard] = useState("Doubler");

  const multiplierOptions = [
    { label: "Doubler (x2)", value: 2 },
    { label: "Tripler (x3)", value: 3 },
    { label: "Quadrupler (x4)", value: 4 },
  ];

  const handleAddCard = () => {
    if (selectedCard) {
      const option = multiplierOptions.find(opt => opt.label === selectedCard);
      setMultipliers([
        ...multipliers,
        { name: option.label, multiplier: option.value, quantity: 1 },
      ]);
    }
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updated = [...multipliers];
    updated[index].quantity = newQuantity;
    setMultipliers(updated);
  };

  const totalMultiplier = multipliers.reduce(
    (acc, curr) => acc * Math.pow(curr.multiplier, curr.quantity),
    1
  );

  const totalTokens = baseTokens * totalMultiplier;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center p-6">
      <div className="w-full max-w-4xl bg-gray-900/80 rounded-2xl shadow-lg p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center mb-6">
          MTG Token Calculator
        </h1>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => setMode("simple")}
            className={`px-4 py-2 rounded-xl transition ${
              mode === "simple"
                ? "bg-blue-600"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Simple Mode
          </button>
          <button
            onClick={() => setMode("advanced")}
            className={`px-4 py-2 rounded-xl transition ${
              mode === "advanced"
                ? "bg-blue-600"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Advanced Mode
          </button>
        </div>

        {/* Base Tokens (shown in both modes) */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Base Tokens Created</h2>
          <CustomQuantityInput
            value={baseTokens}
            onChange={setBaseTokens}
            rowIndex={-1} // ensures it doesn’t inherit zebra-striping
          />
        </div>

        {/* Advanced Mode */}
        {mode === "advanced" && (
          <>
            {/* Dropdown + Add Button */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <input
                list="multiplier-options"
                value={selectedCard}
                onChange={(e) => setSelectedCard(e.target.value)}
                className="bg-gray-800 text-white px-3 py-2 rounded-lg flex-1"
                placeholder="Select multiplier..."
              />
              <datalist id="multiplier-options">
                {multiplierOptions.map((opt) => (
                  <option key={opt.label} value={opt.label} />
                ))}
              </datalist>
              <button
                onClick={handleAddCard}
                className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-xl"
              >
                Add Card
              </button>
            </div>

            {/* Multipliers Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="px-4 py-2">Card</th>
                    <th className="px-4 py-2">Multiplier</th>
                    <th className="px-4 py-2">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {multipliers.map((m, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}
                    >
                      <td className="px-4 py-2">{m.name}</td>
                      <td className="px-4 py-2">x{m.multiplier}</td>
                      <td className="px-4 py-2">
                        <CustomQuantityInput
                          value={m.quantity}
                          onChange={(newQty) =>
                            handleQuantityChange(index, newQty)
                          }
                          rowIndex={index}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Total Tokens */}
        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold">Total Tokens</h2>
          <p className="text-3xl mt-2 text-green-400">{totalTokens}</p>
        </div>
      </div>
    </div>
  );
}
