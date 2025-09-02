import React, { useState } from "react";

export default function App() {
  const [baseTokens, setBaseTokens] = useState(1);
  const [doublers, setDoublers] = useState(0);
  const [triplers, setTriplers] = useState(0);
  const [quadruplers, setQuadruplers] = useState(0);

  const totalMultiplier =
    Math.pow(2, doublers) * Math.pow(3, triplers) * Math.pow(4, quadruplers);
  const totalTokens = baseTokens * totalMultiplier;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">MTG Token Calculator</h1>

        <div className="space-y-4">
          {/* Base tokens input */}
          <div>
            <label className="block font-medium mb-1">Base Tokens Created</label>
            <input
              type="number"
              min="0"
              value={baseTokens}
              onChange={(e) => setBaseTokens(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Modifier counts */}
          <div className="space-y-2">
            <h2 className="font-medium mb-2">Doublers / Triplers / Quadruplers</h2>

            <div className="flex gap-2 items-center">
              <label className="flex-1">Doublers (x2)</label>
              <input
                type="number"
                min="0"
                value={doublers}
                onChange={(e) => setDoublers(Number(e.target.value))}
                className="w-16 p-1 border rounded text-center"
              />
            </div>

            <div className="flex gap-2 items-center">
              <label className="flex-1">Triplers (x3)</label>
              <input
                type="number"
                min="0"
                value={triplers}
                onChange={(e) => setTriplers(Number(e.target.value))}
                className="w-16 p-1 border rounded text-center"
              />
            </div>

            <div className="flex gap-2 items-center">
              <label className="flex-1">Quadruplers (x4)</label>
              <input
                type="number"
                min="0"
                value={quadruplers}
                onChange={(e) => setQuadruplers(Number(e.target.value))}
                className="w-16 p-1 border rounded text-center"
              />
            </div>
          </div>

          {/* Total tokens */}
          <div className="text-center text-xl font-semibold">
            Total Tokens: <span className="text-green-600">{totalTokens}</span>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            className="px-4 py-2 border rounded"
            onClick={() => {
              setBaseTokens(1);
              setDoublers(0);
              setTriplers(0);
              setQuadruplers(0);
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
