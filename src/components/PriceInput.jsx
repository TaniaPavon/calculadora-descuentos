// src/components/PriceInput.jsx
import React from "react";

export default function PriceInput({ index, value, onChange, error }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700">
        Producto {index + 1}
      </label>
      <input
        type="number"
        min="0"
        step="0.01"
        value={value}
        onChange={(e) => onChange(index, e.target.value)}
        className={`mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder="Ingrese el precio"
      />
      {error && <span className="text-xs text-red-600 mt-1">{error}</span>}
    </div>
  );
}
