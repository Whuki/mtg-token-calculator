import React from "react";

export default function CustomQuantityInput({ value, onChange, rowIndex }) {
  const handleDecrement = () => {
    if (value > 0) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    onChange(value + 1);
  };

  // Alternate background color based on rowIndex
  const bgColor = rowIndex % 2 === 0 ? "bg-gray-800" : "bg-gray-700";

  return (
    <div
      className={`flex items-center justify-center rounded-lg ${bgColor} px-2`}
    >
      <button
        onClick={handleDecrement}
        className="px-2 py-1 text-lg font-bold text-white rounded-lg hover:bg-gray-600"
      >
        -
      </button>
      <input
        type="number"
        value={value}
        min="0"
        onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        className="w-12 mx-1 text-center text-white bg-transparent focus:outline-none"
      />
      <button
        onClick={handleIncrement}
        className="px-2 py-1 text-lg font-bold text-white rounded-lg hover:bg-gray-600"
      >
        +
      </button>
    </div>
  );
}
