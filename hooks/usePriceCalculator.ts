"use client"

import { useMemo } from "react"
import type { OrderData, PricingStructure } from "@/lib/types"

export function usePriceCalculator(orderData: OrderData | null, pricing: PricingStructure) {
  return useMemo(() => {
    if (!orderData) return 0

    let basePrice = Number.parseFloat(orderData.weight || "1") * pricing.basePricePerKg

    // Floor multiplier
    const floors = Number.parseInt(orderData.floors || "1")
    if (floors > 1) {
      basePrice *= Math.pow(pricing.floorMultiplier, floors - 1)
    }

    // Coverage price
    if (orderData.coverage && pricing.coveragePrices[orderData.coverage]) {
      basePrice += pricing.coveragePrices[orderData.coverage]
    }

    // Diabetic surcharge
    if (orderData.sugarType === "diabetic") {
      basePrice += pricing.diabeticSurcharge
    }

    // Quantity multiplier
    const quantity = Number.parseInt(orderData.quantity || "1")
    basePrice *= quantity

    return Math.round(basePrice)
  }, [orderData, pricing])
}
