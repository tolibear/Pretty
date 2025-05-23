"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card } from "@/components/ui/card"

export function AnalyticsCharts() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <p className="text-muted-foreground">Loading charts...</p>
      </div>
    )
  }

  return (
    <Tabs defaultValue="views" className="space-y-4">
      <TabsList>
        <TabsTrigger value="views">Views & Conversions</TabsTrigger>
        <TabsTrigger value="revenue">Revenue</TabsTrigger>
        <TabsTrigger value="distribution">Distribution</TabsTrigger>
      </TabsList>
      <TabsContent value="views" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-4">
            <h3 className="text-sm font-medium mb-4">Views Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={viewsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6D6DFF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6D6DFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} className="text-xs text-muted-foreground" />
                <YAxis tickLine={false} axisLine={false} className="text-xs text-muted-foreground" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <Card className="p-2 border shadow-sm">
                          <div className="text-sm font-medium">{payload[0].payload.date}</div>
                          <div className="text-xs text-muted-foreground">Views: {payload[0].value}</div>
                        </Card>
                      )
                    }
                    return null
                  }}
                />
                <Area type="monotone" dataKey="views" stroke="#6D6DFF" fillOpacity={1} fill="url(#colorViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium mb-4">Conversion Rate</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={conversionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} className="text-xs text-muted-foreground" />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  className="text-xs text-muted-foreground"
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <Card className="p-2 border shadow-sm">
                          <div className="text-sm font-medium">{payload[0].payload.date}</div>
                          <div className="text-xs text-muted-foreground">Conversion: {payload[0].value}%</div>
                        </Card>
                      )
                    }
                    return null
                  }}
                />
                <Line type="monotone" dataKey="conversion" stroke="#6D6DFF" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="revenue" className="space-y-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium mb-4">Revenue by Style</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                        <div className="text-xs text-muted-foreground">Revenue: ${payload[0].value}</div>
                      </Card>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="revenue" fill="#6D6DFF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </TabsContent>
      <TabsContent value="distribution" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-4">
            <h3 className="text-sm font-medium mb-4">Revenue by Currency</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={currencyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {currencyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <Card className="p-2 border shadow-sm">
                          <div className="text-sm font-medium">{payload[0].name}</div>
                          <div className="text-xs text-muted-foreground">
                            ${payload[0].value} ({((payload[0].payload.value / totalCurrencyValue) * 100).toFixed(1)}%)
                          </div>
                        </Card>
                      )
                    }
                    return null
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
          <Card className="p-4">
            <h3 className="text-sm font-medium mb-4">Generations by Aspect Ratio</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={aspectRatioData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {aspectRatioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <Card className="p-2 border shadow-sm">
                          <div className="text-sm font-medium">{payload[0].name}</div>
                          <div className="text-xs text-muted-foreground">
                            {payload[0].value} generations (
                            {((payload[0].payload.value / totalAspectRatioValue) * 100).toFixed(1)}%)
                          </div>
                        </Card>
                      )
                    }
                    return null
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  )
}

// Sample data
const viewsData = [
  { date: "May 1", views: 1200 },
  { date: "May 2", views: 1300 },
  { date: "May 3", views: 1400 },
  { date: "May 4", views: 1200 },
  { date: "May 5", views: 1500 },
  { date: "May 6", views: 1800 },
  { date: "May 7", views: 2000 },
  { date: "May 8", views: 2200 },
  { date: "May 9", views: 2100 },
  { date: "May 10", views: 2300 },
  { date: "May 11", views: 2500 },
  { date: "May 12", views: 2400 },
  { date: "May 13", views: 2600 },
  { date: "May 14", views: 2800 },
]

const conversionData = [
  { date: "May 1", conversion: 3.2 },
  { date: "May 2", conversion: 3.5 },
  { date: "May 3", conversion: 3.8 },
  { date: "May 4", conversion: 3.6 },
  { date: "May 5", conversion: 4.0 },
  { date: "May 6", conversion: 4.2 },
  { date: "May 7", conversion: 4.5 },
  { date: "May 8", conversion: 4.3 },
  { date: "May 9", conversion: 4.6 },
  { date: "May 10", conversion: 4.8 },
  { date: "May 11", conversion: 4.7 },
  { date: "May 12", conversion: 5.0 },
  { date: "May 13", conversion: 4.9 },
  { date: "May 14", conversion: 5.2 },
]

const revenueData = [
  { name: "Neon Dreams", revenue: 1250.45 },
  { name: "Vintage Film", revenue: 980.2 },
  { name: "Abstract Waves", revenue: 720.8 },
  { name: "Pixel Art", revenue: 1100.5 },
  { name: "Watercolor Dreams", revenue: 850.3 },
  { name: "Sci-Fi Worlds", revenue: 630.9 },
  { name: "Anime Portraits", revenue: 0 },
  { name: "Minimal Lines", revenue: 290.5 },
]

const currencyData = [
  { name: "USDC", value: 3500 },
  { name: "ETH", value: 1200 },
  { name: "PENGU", value: 530 },
]

const totalCurrencyValue = currencyData.reduce((sum, item) => sum + item.value, 0)

const aspectRatioData = [
  { name: "1:1", value: 1250 },
  { name: "4:5", value: 850 },
  { name: "16:9", value: 745 },
]

const totalAspectRatioValue = aspectRatioData.reduce((sum, item) => sum + item.value, 0)

const COLORS = ["#6D6DFF", "#9E9EFF", "#BDBDFF", "#DEDEFF"]

// This is needed for the PieChart component
import { Cell } from "recharts"
