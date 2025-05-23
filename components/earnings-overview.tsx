"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card } from "@/components/ui/card"

export function EarningsOverview() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <p className="text-muted-foreground">Loading chart...</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={earningsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
        <XAxis dataKey="name" tickLine={false} axisLine={false} className="text-xs text-muted-foreground" />
        <YAxis
          tickLine={false}
          axisLine={false}
          className="text-xs text-muted-foreground"
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <Card className="p-2 border shadow-sm">
                  <div className="text-sm font-medium">{payload[0].payload.name}</div>
                  <div className="text-xs text-muted-foreground">USDC: ${payload[0].value.toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground">ETH: ${payload[1].value.toFixed(2)}</div>
                  <div className="text-xs text-muted-foreground">PENGU: ${payload[2].value.toFixed(2)}</div>
                </Card>
              )
            }
            return null
          }}
        />
        <Legend />
        <Bar dataKey="usdc" name="USDC" fill="#6D6DFF" radius={[4, 4, 0, 0]} />
        <Bar dataKey="eth" name="ETH" fill="#9E9EFF" radius={[4, 4, 0, 0]} />
        <Bar dataKey="pengu" name="PENGU" fill="#BDBDFF" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

const earningsData = [
  {
    name: "Jan",
    usdc: 400,
    eth: 240,
    pengu: 100,
  },
  {
    name: "Feb",
    usdc: 300,
    eth: 198,
    pengu: 120,
  },
  {
    name: "Mar",
    usdc: 520,
    eth: 280,
    pengu: 150,
  },
  {
    name: "Apr",
    usdc: 480,
    eth: 300,
    pengu: 170,
  },
  {
    name: "May",
    usdc: 600,
    eth: 380,
    pengu: 220,
  },
  {
    name: "Jun",
    usdc: 750,
    eth: 420,
    pengu: 250,
  },
]
