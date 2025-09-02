import React from "react";

export default function CustomQuantityInput({ value, onChange, darkMode }) {
  const increment = () => onChange(value + 1);
  const decrement = () => onChange(value > 0 ? value - 1 : 0);

  return (
    <div className="flex items-center w-full md:w-auto border rounded-lg overflow-hidden">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`flex-1 p-1 text-center focus:outline-none focus:ring-2 transition-all duration-200
          ${darkMode ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-blue-400" 
                     : "bg-white border-gray-300 text-gray-900 focus:ring-blue-400"}`}
        min={0}
      />
      <div className="flex flex-col border-l divide-y">
        <button
          type="button"
          onClick={increment}
          className={`px-2 py-1 hover:bg-gray-500 transition-colors ${
            darkMode ? "bg-gray-700 text-gray-100" : "bg-gray-200 text-gray-900"
          }`}
        >
          ▲
        </button>
        <button
          type="button"
          onClick={decrement}
          className={`px-2 py-1 hover:bg-gray-500 transition-colors ${
            darkMode ? "bg-gray-700 text-gray-100" : "bg-gray-200 text-gray-900"
          }`}
        >
          ▼
        </button>
      </div>
    </div>
  );
}
