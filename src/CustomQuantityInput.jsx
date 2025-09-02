import React from "react";

export default function CustomQuantityInput({ value, onChange, darkMode }) {
  const increment = () => onChange(value + 1);
  const decrement = () => onChange(value > 0 ? value - 1 : 0);

  const bgColor = darkMode
    ? "bg-gray-700/70 text-gray-100 border-gray-600"
    : "bg-gray-200/70 text-gray-900 border-gray-300";

  return (
    <div className="flex items-center justify-center space-x-1">
      <button
        type="button"
        onClick={decrement}
        className={`px-3 py-1 rounded-lg transition transform hover:scale-105 ${bgColor}`}
      >
        -
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={0}
        className={`w-16 text-center p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 tabular-nums ${bgColor}`}
      />
      <button
        type="button"
        onClick={increment}
        className={`px-3 py-1 rounded-lg transition transform hover:scale-105 ${bgColor}`}
      >
        +
      </button>
    </div>
  );
}
