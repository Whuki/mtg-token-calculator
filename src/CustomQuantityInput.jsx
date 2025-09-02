import React from "react";

export default function CustomQuantityInput({ value, onChange, darkMode, rowIndex }) {
  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

  const increment = () => onChange(clamp(value + 1, 0, 100));
  const decrement = () => onChange(clamp(value - 1, 0, 100));

  // Row-based background colors
  const bgColor =
    rowIndex % 2 === 0
      ? darkMode
        ? "bg-gray-800 text-gray-100 border-gray-600"
        : "bg-gray-50 text-gray-900 border-gray-300"
      : darkMode
      ? "bg-gray-700 text-gray-100 border-gray-600"
      : "bg-white text-gray-900 border-gray-300";

  const hoverBg =
    rowIndex % 2 === 0
      ? darkMode
        ? "hover:bg-gray-700"
        : "hover:bg-gray-100"
      : darkMode
      ? "hover:bg-gray-600"
      : "hover:bg-gray-100";

  return (
    <div className="flex items-center justify-center space-x-1">
      <button
        type="button"
        onClick={decrement}
        className={`px-2 py-0.5 rounded transition-colors ${bgColor} ${hoverBg}`}
      >
        -
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(clamp(Number(e.target.value), 0, 100))}
        min={0}
        max={100}
        className={`w-16 text-center p-1 rounded-sm focus:outline-none focus:ring-1 ${bgColor} focus:ring-blue-400`}
      />
      <button
        type="button"
        onClick={increment}
        className={`px-2 py-0.5 rounded transition-colors ${bgColor} ${hoverBg}`}
      >
        +
      </button>
    </div>
  );
}
