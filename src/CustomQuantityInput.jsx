import React from "react";

export default function CustomQuantityInput({ value, onChange, darkMode, rowIndex }) {
  const increment = () => onChange(value + 1);
  const decrement = () => onChange(value > 0 ? value - 1 : 0);

  const bgColor =
    rowIndex % 2 === 0
      ? darkMode
        ? "bg-gray-800/70 text-gray-100 border-gray-600"
        : "bg-gray-50/80 text-gray-900 border-gray-300"
      : darkMode
      ? "bg-gray-700/70 text-gray-100 border-gray-600"
      : "bg-white/80 text-gray-900 border-gray-300";

  const hoverBg = darkMode ? "hover:bg-gray-600" : "hover:bg-gray-200";

  return (
    <div className="flex items-center justify-center space-x-1">
      <button
        type="button"
        onClick={decrement}
        className={`px-3 py-1 rounded-lg transition transform hover:scale-105 ${bgColor} ${hoverBg}`}
      >
        -
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={0}
        className={`w-16 text-center p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${bgColor}`}
      />
      <button
        type="button"
        onClick={increment}
        className={`px-3 py-1 rounded-lg transition transform hover:scale-105 ${bgColor} ${hoverBg}`}
      >
        +
      </button>
    </div>
  );
}
