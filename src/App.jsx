import React, { useState } from "react";
import CustomQuantityInput from "./CustomQuantityInput";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [mode, setMode] = useState("simple");
  const [rows, setRows] = useState([]);
  const [selectedCard, setSelectedCard] = useState("");
  const [baseTokens, setBaseTokens] = useState(0);

  // Token multipliers for Simple Mode
  const simpleRows = [
    { name: "Doubler", multiplier: 2 },
    { name: "Tripler", multiplier: 3 },
    { name: "4x Multiplier", multiplier: 4 },
  ];

  const cardOptions = ["Doubler", "Tripler", "4x Multiplier"];

  const addRow = () => {
    if (!selectedCard) return;
    setRows([
      ...rows,
      { name: selectedCard, multiplier: parseInt(selectedCard), quantity: 1 },
    ]);
    setSelectedCard("");
  };

  const handleQuantityChange = (index, newValue) => {
    const updatedRows = [...rows];
    updatedRows[index].quantity = newValue;
    setRows(updatedRows);
  };

  const calculateTotal = () => {
    let total = baseTokens;

    const multipliers =
      mode === "simple"
        ? simpleRows
            .map((row) => Array(row.quantity).fill(row.multiplier))
            .flat()
        : rows
            .map((row) => Array(row.quantity).fill(row.multiplier))
            .flat();

    multipliers.forEach((multiplier) => {
      total *= multiplier;
    });

    return total;
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen flex flex-col items-center p-6`}>
      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-2xl mb-4">
        <h1 className="text-2xl font-bold">MTG Token Calculator</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Mode Switcher */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setMode("simple")}
          className={`px-4 py-2 rounded-lg ${mode === "simple" ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-200"}`}
        >
          Simple Mode
        </button>
        <button
          onClick={() => setMode("advanced")}
          className={`px-4 py-2 rounded-lg ${mode === "advanced" ? "bg-blue-600 text-white" : "bg-gray-600 text-gray-200"}`}
        >
          Advanced Mode
        </button>
      </div>

      {/* Base Tokens */}
      <div className="flex items-center mb-4">
        <span className="mr-3 font-semibold">Base Tokens:</span>
        <CustomQuantityInput
          value={baseTokens}
          onChange={setBaseTokens}
          rowIndex={0}
        />
      </div>

      {/* Simple Mode */}
      {mode === "simple" && (
        <table className="w-full max-w-2xl border-collapse mb-6">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-4 py-2 text-left">Multiplier</th>
              <th className="px-4 py-2 text-center">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {simpleRows.map((row, index) => (
              <tr key={row.name} className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}>
                <td className="px-4 py-2">{row.name}</td>
                <td className="px-4 py-2 text-center">
                  <CustomQuantityInput
                    value={row.quantity || 0}
                    onChange={(newValue) => {
                      simpleRows[index].quantity = newValue;
                    }}
                    rowIndex={index}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Advanced Mode */}
      {mode === "advanced" && (
        <div className="w-full max-w-2xl mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <select
              value={selectedCard}
              onChange={(e) => setSelectedCard(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white"
            >
              <option value="">Select a multiplier</option>
              {cardOptions.map((card) => (
                <option key={card} value={card.includes("Doubler") ? 2 : card.includes("Tripler") ? 3 : 4}>
                  {card}
                </option>
              ))}
            </select>
            <button
              onClick={addRow}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500"
            >
              Add Card
            </button>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2 text-left">Card</th>
                <th className="px-4 py-2 text-center">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}>
                  <td className="px-4 py-2">{row.name}</td>
                  <td className="px-4 py-2 text-center">
                    <CustomQuantityInput
                      value={row.quantity}
                      onChange={(newValue) => handleQuantityChange(index, newValue)}
                      rowIndex={index}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Total */}
      <div className="mt-6 text-xl font-bold">
        Total Tokens: {calculateTotal()}
      </div>
    </div>
  );
}
