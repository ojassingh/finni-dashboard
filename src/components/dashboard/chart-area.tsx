"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, Line } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "Patient onboarding & churn trends"

type DayDatum = {
  date: string        // YYYY-MM-DD
  newPatients: number
  churnedPatients: number
  activeCount: number
}

// generate 90 days of mock data
const generateMockData = (): DayDatum[] => {
  const data: DayDatum[] = []
  const start = new Date()
  start.setDate(start.getDate() - 89) // 90 days total

  let runningActive = 200 // starting active base
  for (let i = 0; i < 90; i++) {
    const day = new Date(start)
    day.setDate(start.getDate() + i)

    const newPatients = Math.floor(Math.random() * 20) + 5    // 5–24
    const churnedPatients = Math.floor(Math.random() * 10)    // 0–9

    runningActive = runningActive + newPatients - churnedPatients

    data.push({
      date: day.toISOString().slice(0, 10),
      newPatients,
      churnedPatients,
      activeCount: runningActive,
    })
  }

  return data
}

const mockData = generateMockData()

const chartConfig = {
  newPatients: { label: "New", color: "var(--color-primary)" },
  churnedPatients: { label: "Churned", color: "var(--color-red)" },
  activeCount: { label: "Active", color: "var(--color-accent)" },
} satisfies ChartConfig

export function ChartArea() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState<"90d" | "30d" | "7d">("90d")

  React.useEffect(() => {
    if (isMobile) setTimeRange("7d")
  }, [isMobile])

  const referenceDate = new Date()
  const daysToSubtract = timeRange === "30d" ? 30 : timeRange === "7d" ? 7 : 90
  const cutoff = new Date(referenceDate)
  cutoff.setDate(referenceDate.getDate() - daysToSubtract)

  const filteredData = mockData.filter((d) => new Date(d.date) >= cutoff)

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Patient Trends</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Sign-ups, churn & active headcount
          </span>
          <span className="@[540px]/card:hidden">Last {timeRange}</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(v) => v && setTimeRange(v as "90d" | "30d" | "7d")}
            variant="outline"
            className="hidden @[767px]/card:flex *:data-[slot=toggle-group-item]:!px-4"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={(v) => v && setTimeRange(v as "90d" | "30d" | "7d")}>
            <SelectTrigger
              className="flex w-32 @[767px]/card:hidden"
              size="sm"
              aria-label="Select time range"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart data={filteredData} margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gradNew" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="gradChurn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-red)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="var(--color-red)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={20}
              tickFormatter={(val) => {
                const d = new Date(val)
                return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
              }}
            />
            <ChartTooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={
                <ChartTooltipContent
                  labelFormatter={(val) => new Date(val).toLocaleDateString()}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="newPatients"
              type="monotone"
              fill="url(#gradNew)"
              stroke="var(--color-primary)"
              stackId="1"
            />
            <Area
              dataKey="churnedPatients"
              type="monotone"
              fill="url(#gradChurn)"
              stroke="var(--color-red)"
              stackId="1"
            />
            <Line
              dataKey="activeCount"
              type="monotone"
              stroke="var(--color-accent)"
              strokeWidth={2}
              dot={false}
              name="Active Patients"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}