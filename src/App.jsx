// src/App.jsx
import React, { useState } from "react";
import CustomQuantityInput from "./components/CustomQuantityInput";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [advancedMode, setAdvancedMode] = useState(false);
  const [baseTokens, setBaseTokens] = useState(0);
  const [rows, setRows] = useState([]);
  const [cardType, setCardType] = useState("Soldier"); // dropdown selection

  const cardOptions = [
    "Soldier",
    "Zombie",
    "Elf",
    "Goblin",
    "Dragon",
    "Saproling",
  ];

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleAdvancedMode = () => setAdvancedMode(!advancedMode);

  const addRow = () => {
    setRows([
      ...rows,
      { id: Date.now(), type: cardType, multiplier: 1, quantity: 1 },
    ]);
  };

  const updateRow = (id, field, value) => {
    setRows(
      rows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  const removeRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const calculateTotal = () => {
    let total = baseTokens;
    rows.forEach((row) => {
      total += row.multiplier * row.quantity;
    });
    return total;
  };

  return (
    <div className={`${darkMode ? "dark" : ""} min-h-screen`}>
      <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">MTG Token Calculator</h1>
          <div className="flex items-center space-x-3">
            <label className="flex items-center space-x-2">
              <span>Dark Mode</span>
              <input
                type="checkbox"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
            </label>
            <label className="flex items-center space-x-2">
              <span>Advanced Mode</span>
              <input
                type="checkbox"
                checked={advancedMode}
                onChange={toggleAdvancedMode}
              />
            </label>
          </div>
        </div>

        {/* Base Tokens */}
        <div className="flex items-center space-x-4 mb-6">
          <h2 className="text-lg font-semibold">Base Tokens Created:</h2>
          <CustomQuantityInput
            value={baseTokens}
            onChange={setBaseTokens}
          />
        </div>

        {/* Add Card with Dropdown */}
        <div className="flex items-center space-x-3 mb-6">
          <select
            value={cardType}
            onChange={(e) => setCardType(e.target.value)}
            className="p-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            {cardOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <button
            onClick={addRow}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Add Card
          </button>
        </div>

        {/* Rows Table */}
        {rows.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-700">
                  <th className="p-3">Card Type</th>
                  {advancedMode && <th className="p-3">Multiplier</th>}
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Remove</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr
                    key={row.id}
                    className={
                      idx % 2 === 0
                        ? "bg-gray-100 dark:bg-gray-800"
                        : "bg-white dark:bg-gray-900"
                    }
                  >
                    <td className="p-3">{row.type}</td>
                    {advancedMode && (
                      <td className="p-3">
                        <CustomQuantityInput
                          value={row.multiplier}
                          onChange={(val) =>
                            updateRow(row.id, "multiplier", val)
                          }
                        />
                      </td>
                    )}
                    <td className="p-3">
                      <CustomQuantityInput
                        value={row.quantity}
                        onChange={(val) =>
                          updateRow(row.id, "quantity", val)
                        }
                      />
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => removeRow(row.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      >
                        ✕
                      </button>
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
      <Analytics />
    </div>
  );
}
