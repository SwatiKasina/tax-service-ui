"use client";
import React, { useState } from "react";
import { TaxConfig } from "../types/TaxConfig";

interface TaxCalculatorProps {
  taxData: TaxConfig[];
}

const TaxCalculator: React.FC<TaxCalculatorProps> = ({ taxData }) => {
  const [amount, setAmount] = useState<number>(0);

  const totalTax = taxData.reduce(
    (sum, t) => sum + (amount * t.percentage) / 100,
    0
  );

  const grandTotal = amount + totalTax;

  return (
    <div style={{ marginTop: "2rem" }}>
      <label>Enter Amount: </label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value || "0"))}
        style={{
          border: "1px solid gray",
          borderRadius: "5px",
          padding: "5px",
          marginLeft: "10px",
        }}
      />

      <div style={{ marginTop: "1rem" }}>
        <p>Subtotal: ${amount.toFixed(2)}</p>
        <p>Total Tax: ${totalTax.toFixed(2)}</p>
        <p>
          <b>Grand Total: ${grandTotal.toFixed(2)}</b>
        </p>
      </div>
    </div>
  );
};

export default TaxCalculator;
