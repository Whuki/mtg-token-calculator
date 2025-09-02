import React from "react";

export default function CustomQuantityInput({ value, onChange, darkMode, rowIndex }) {
  const isEven = rowIndex % 2 === 0;

  const backgroundClass =
    rowIndex === -1
      ? darkMode
        ? "bg-gray-700 text-gray-100"
        : "bg-gray-200 text-gray-900"
      : darkMode
      ? isEven
        ? "bg-gray-800 text-gray-100"
        : "bg-gray-700 text-gray-100"
      : isEven
      ? "bg-gray-100 text-gray-900"
      : "bg-gray-200 text-gray-900";

  return (
    <div className={`flex items-center border rounded ${backgroundClass} w-[120px]`}>
      <button
        onClick={() => onChange(Math.max(0, value - 1))}
        className="px-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        -
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 text-center bg-transparent outline-none"
      />
      <button
        onClick={() => onChange(value + 1)}
        className="px-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        +
      </button>
    </div>
  );
}
