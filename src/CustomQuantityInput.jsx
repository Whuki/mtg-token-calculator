import React from "react";

export default function CustomQuantityInput({ value, onChange, darkMode }) {
  const increment = () => onChange(value + 1);
  const decrement = () => onChange(value > 0 ? value - 1 : 0);

  return (
    <div className="flex items-center justify-center space-x-1">
      <button
        type="button"
        onClick={decrement}
        className={`px-2 py-0.5 rounded transition-colors ${
          darkMode ? "bg-gray-700 text-gray-100 hover:bg-gray-600" : "bg-gray-200 text-gray-900 hover:bg-gray-300"
        }`}
      >
        -
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={0}
        className={`w-12 text-center p-1 rounded-sm focus:outline-none focus:ring-1
          ${darkMode ? "bg-gray-800 text-gray-100 border-gray-700 focus:ring-blue-400" 
                     : "bg-white text-gray-900 border-gray-300 focus:ring-blue-400"}`}
      />
      <button
        type="button"
        onClick={increment}
        className={`px-2 py-0.5 rounded transition-colors ${
          darkMode ? "bg-gray-700 text-gray-100 hover:bg-gray-600" : "bg-gray-200 text-gray-900 hover:bg-gray-300"
        }`}
      >
        +
      </button>
    </div>
  );
}
