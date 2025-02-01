"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function TaxCalculator() {
  const [income, setIncome] = useState(0);
  const [deductions, setDeductions] = useState(0);
  const [exemptions, setExemptions] = useState(0);
  const [newRegime, setNewRegime] = useState(true);
  const [tax, setTax] = useState(0);

  const calculateTax = () => {
    let taxableIncome = income - deductions - exemptions;
    if (taxableIncome < 0) taxableIncome = 0;
    
    let taxAmount = 0;
    if (newRegime) {
      if (taxableIncome <= 1200000) taxAmount = 0;
      else if (taxableIncome <= 1500000) taxAmount = (taxableIncome - 1200000) * 0.1;
      else taxAmount = 30000 + (taxableIncome - 1500000) * 0.2;
    } else {
      if (taxableIncome <= 250000) taxAmount = 0;
      else if (taxableIncome <= 500000) taxAmount = (taxableIncome - 250000) * 0.05;
      else if (taxableIncome <= 750000) taxAmount = 12500 + (taxableIncome - 500000) * 0.1;
      else if (taxableIncome <= 1000000) taxAmount = 37500 + (taxableIncome - 750000) * 0.15;
      else if (taxableIncome <= 1250000) taxAmount = 75000 + (taxableIncome - 1000000) * 0.2;
      else if (taxableIncome <= 1500000) taxAmount = 125000 + (taxableIncome - 1250000) * 0.25;
      else taxAmount = 187500 + (taxableIncome - 1500000) * 0.3;
    }
    setTax(taxAmount);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-lg">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Indian Tax Calculator</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Annual Income (INR)</label>
            <Input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))} className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Deductions (INR)</label>
            <Input type="number" value={deductions} onChange={(e) => setDeductions(Number(e.target.value))} className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Exemptions (INR)</label>
            <Input type="number" value={exemptions} onChange={(e) => setExemptions(Number(e.target.value))} className="w-full p-2 border rounded" />
          </div>
          <div className="flex items-center justify-between mb-4">
            <span>Old Regime</span>
            <Switch checked={newRegime} onCheckedChange={setNewRegime} />
            <span>New Regime</span>
          </div>
          <Button className="w-full" onClick={calculateTax}>Calculate Tax</Button>
          <div className="mt-4 text-lg font-semibold">Tax Payable: ₹{tax.toFixed(2)}</div>
        </CardContent>
      </Card>
    </div>
  );
}