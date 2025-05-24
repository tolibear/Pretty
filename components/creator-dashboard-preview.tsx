"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, ChevronRight, Sparkles, TrendingUp, Wallet, Zap } from "lucide-react"
// Import creator dashboard components
import { EarningsOverview } from "@/components/earnings-overview"
import { StylesTable } from "@/components/styles-table"
import { WithdrawalHistory } from "@/components/withdrawal-history"
import { AnalyticsCharts } from "@/components/analytics-charts"

export function CreatorDashboardPreview() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <section className="bg-muted py-20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <Badge className="mb-4">Creator Dashboard</Badge>
            <h2 className="text-3xl font-bold mb-6">Powerful tools to manage your styles</h2>
            <p className="text-muted-foreground mb-8">
              Our comprehensive creator dashboard gives you everything you need to create, manage, and optimize your
              styles for maximum earnings.
            </p>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="styles">Styles</TabsTrigger>
                <TabsTrigger value="earnings">Earnings</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Real-time Performance</h3>
                      <p className="text-sm text-muted-foreground">
                        Track your styles' performance with real-time metrics on creations, revenue, and conversion
                        rates.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Activity Feed</h3>
                      <p className="text-sm text-muted-foreground">
                        See a chronological feed of all activity related to your styles, including creations and
                        earnings.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="styles">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Style Management</h3>
                      <p className="text-sm text-muted-foreground">
                        Create, edit, and manage all your styles from one central location. Clone successful styles
                        to iterate quickly.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Performance Insights</h3>
                      <p className="text-sm text-muted-foreground">
                        Get detailed insights into which styles are performing best and why, so you can optimize
                        your portfolio.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="earnings">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Wallet className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Revenue Tracking</h3>
                      <p className="text-sm text-muted-foreground">
                        Track your earnings across different cryptocurrencies with detailed breakdowns by style and
                        time period.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Withdrawal Management</h3>
                      <p className="text-sm text-muted-foreground">
                        Easily withdraw your earnings to your wallet with our seamless integration with Abstract
                        Global Wallet.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Detailed Analytics</h3>
                      <p className="text-sm text-muted-foreground">
                        Access comprehensive analytics on views, conversions, and revenue to optimize your styles
                        for maximum earnings.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Performance Optimization</h3>
                      <p className="text-sm text-muted-foreground">
                        Get AI-powered recommendations to improve your styles' performance and increase your
                        earnings.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-8">
              <Button asChild>
                <Link href="/dashboard">
                  Explore Dashboard <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4 w-full">
                <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                <TabsTrigger value="styles" className="flex-1">Styles</TabsTrigger>
                <TabsTrigger value="earnings" className="flex-1">Earnings</TabsTrigger>
                <TabsTrigger value="analytics" className="flex-1">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$5,231.89</div>
                      <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Generations</CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2,845</div>
                      <p className="text-xs text-muted-foreground">+180 in the last 24 hours</p>
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Earnings Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="h-[200px]">
                      <EarningsOverview />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="styles" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>My Styles</CardTitle>
                    <CardDescription>Manage and track performance of your published styles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="max-h-[400px] overflow-auto">
                      <StylesTable />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="earnings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Balance</CardTitle>
                    <CardDescription>Total earnings available for withdrawal</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="h-4 w-4 text-blue-600 dark:text-blue-400"
                            >
                              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                          </div>
                          <span>USDC</span>
                        </div>
                        <span className="font-bold">2,450.00</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="h-4 w-4 text-purple-600 dark:text-purple-400"
                            >
                              <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" />
                            </svg>
                          </div>
                          <span>ETH</span>
                        </div>
                        <span className="font-bold">0.8452</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              className="h-4 w-4 text-green-600 dark:text-green-400"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <path d="m8 14 2 2 6-6" />
                            </svg>
                          </div>
                          <span>PENGU</span>
                        </div>
                        <span className="font-bold">12,500</span>
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Estimated Value</span>
                          <span className="font-bold">$5,231.89</span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full mt-6">Withdraw to AGW</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Withdrawal History</CardTitle>
                    <CardDescription>Your past withdrawals and transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="max-h-[200px] overflow-auto">
                      <WithdrawalHistory />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Views</CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">24,685</div>
                      <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4.3%</div>
                      <p className="text-xs text-muted-foreground">+0.5% from last week</p>
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Analytics</CardTitle>
                    <CardDescription>View detailed analytics for your styles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <AnalyticsCharts />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  )
} 