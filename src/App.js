import React, { useState, useEffect } from "react";
import PriceInput from "./components/PriceInput";

export default function App() {
  const [precios, setPrecios] = useState(["", "", "", "", ""]);
  const [errores, setErrores] = useState(["", "", "", "", ""]);
  const [subtotal, setSubtotal] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const [total, setTotal] = useState(0);

  const handleChange = (index, value) => {
    const nuevos = [...precios];
    nuevos[index] = value;
    setPrecios(nuevos);
  };

  // Validar que sean números y no negativos
  const validar = () => {
    const nuevosErrores = precios.map((p) => {
      if (p === "") return "Ingrese un valor (use 0 si aplica)";
      const n = Number(p);
      if (isNaN(n)) return "Debe ser un número";
      if (n < 0) return "No puede ser negativo";
      return "";
    });
    setErrores(nuevosErrores);
    return nuevosErrores.every((e) => e === "");
  };

  const calcular = () => {
    const valores = precios.map((p) => parseFloat(p) || 0);
    const sub = valores.reduce((a, b) => a + b, 0);

    let porc = 0;
    if (sub >= 1000 && sub <= 4999.99) porc = 10;
    else if (sub >= 5000 && sub <= 8999.99) porc = 20;
    else if (sub >= 9000 && sub <= 12999.99) porc = 30;

    const desc = (sub * porc) / 100;
    const tot = sub - desc;

    setSubtotal(sub);
    setPorcentaje(porc);
    setDescuento(desc);
    setTotal(tot);
  };

  useEffect(() => {
    calcular();
  }, [precios]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validar()) calcular();
  };

  const limpiar = () => {
    setPrecios(["", "", "", "", ""]);
    setErrores(["", "", "", "", ""]);
    setSubtotal(0);
    setPorcentaje(0);
    setDescuento(0);
    setTotal(0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">
          Calculadora de Descuentos 💰
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {precios.map((p, i) => (
              <PriceInput
                key={i}
                index={i}
                value={p}
                onChange={handleChange}
                error={errores[i]}
              />
            ))}
          </div>

          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Calcular
            </button>
            <button
              type="button"
              onClick={limpiar}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Limpiar
            </button>
          </div>
        </form>

        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <p>
            <strong>Subtotal:</strong> L. {subtotal.toFixed(2)}
          </p>
          <p>
            <strong>Descuento:</strong> L. {descuento.toFixed(2)} ({porcentaje}
            %)
          </p>
          <p className="font-bold text-green-700 text-lg">
            Total a pagar: L. {total.toFixed(2)}
          </p>
        </div>

        <p className="text-sm text-gray-500 mt-3">
          Regla: 0–999.99 (0%), 1,000–4,999.99 (10%), 5,000–8,999.99 (20%), 9,000–12,999.99 (30%)
        </p>
      </div>
    </div>
  );
}
