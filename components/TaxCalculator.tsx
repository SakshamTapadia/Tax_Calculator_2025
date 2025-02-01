"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

export default function TaxCalculator() {
  const [income, setIncome] = useState<string>("")
  const [taxBreakdown, setTaxBreakdown] = useState<{ slab: string; tax: number }[]>([])
  const [totalTax, setTotalTax] = useState(0)

  const calculateTax = () => {
    const incomeValue = Number(income)
    if (isNaN(incomeValue) || incomeValue < 0) {
      alert("Please enter a valid income amount")
      return
    }

    let remainingIncome = incomeValue
    let totalTaxAmount = 0
    const breakdown: { slab: string; tax: number }[] = []

    const slabs = [
      { limit: 400000, rate: 0 },
      { limit: 800000, rate: 0.05 },
      { limit: 1200000, rate: 0.1 },
      { limit: 1600000, rate: 0.15 },
      { limit: 2000000, rate: 0.2 },
      { limit: 2400000, rate: 0.25 },
      { limit: Number.POSITIVE_INFINITY, rate: 0.3 },
    ]

    for (let i = 0; i < slabs.length; i++) {
      const slab = slabs[i]
      const prevLimit = i === 0 ? 0 : slabs[i - 1].limit
      const taxableInThisSlab = Math.max(0, Math.min(remainingIncome, slab.limit - prevLimit))
      const taxForThisSlab = taxableInThisSlab * slab.rate

      if (taxForThisSlab > 0) {
        breakdown.push({
          slab: `${prevLimit.toLocaleString()} - ${slab.limit === Number.POSITIVE_INFINITY ? "Above" : slab.limit.toLocaleString()}`,
          tax: taxForThisSlab,
        })
        totalTaxAmount += taxForThisSlab
      }

      remainingIncome -= taxableInThisSlab
      if (remainingIncome <= 0) break
    }

    setTaxBreakdown(breakdown)
    setTotalTax(totalTaxAmount)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <Card className="w-full max-w-md shadow-xl rounded-xl overflow-hidden">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Indian Tax Calculator (FY 2025-26)</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="income" className="text-sm font-medium text-gray-700">
                Annual Income (INR)
              </Label>
              <Input
                id="income"
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="w-full mt-1"
                placeholder="Enter your annual income"
              />
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={calculateTax}>
              Calculate Tax
            </Button>
          </div>
          {taxBreakdown.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-6 space-y-2"
            >
              <h3 className="text-lg font-semibold text-gray-800">Tax Breakdown:</h3>
              {taxBreakdown.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.slab}</span>
                  <span>₹{item.tax.toFixed(2)}</span>
                </div>
              ))}
              <div className="text-lg font-bold text-blue-600 mt-4">Total Tax Payable: ₹{totalTax.toFixed(2)}</div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

