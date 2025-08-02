import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingDown, TrendingUp } from "lucide-react"
import { NumberTicker } from "../ui/number-ticker"

const stateData = {
  ny: {
    totalPatients: 2847,
    newPatients: 156,
    churnedPatients: 23,
    activePatients: 2670,
    totalGrowth: "+12.3%",
    newGrowth: "+8.7%",
    churnedGrowth: "-15.2%",
    activeGrowth: "+14.1%"
  },
  ca: {
    totalPatients: 5234,
    newPatients: 298,
    churnedPatients: 45,
    activePatients: 4891,
    totalGrowth: "+18.9%",
    newGrowth: "+22.1%",
    churnedGrowth: "+5.3%",
    activeGrowth: "+19.8%"
  },
  tx: {
    totalPatients: 3921,
    newPatients: 234,
    churnedPatients: 38,
    activePatients: 3647,
    totalGrowth: "+9.4%",
    newGrowth: "+11.2%",
    churnedGrowth: "-8.7%",
    activeGrowth: "+10.1%"
  },
  fl: {
    totalPatients: 3156,
    newPatients: 187,
    churnedPatients: 29,
    activePatients: 2940,
    totalGrowth: "+15.7%",
    newGrowth: "+13.4%",
    churnedGrowth: "-12.1%",
    activeGrowth: "+16.2%"
  },
  il: {
    totalPatients: 2189,
    newPatients: 134,
    churnedPatients: 19,
    activePatients: 2036,
    totalGrowth: "+7.8%",
    newGrowth: "+6.9%",
    churnedGrowth: "-18.3%",
    activeGrowth: "+8.5%"
  }
};

const defaultData = {
  totalPatients: 12345,
  newPatients: 312,
  churnedPatients: 27,
  activePatients: 11318,
  totalGrowth: "+8.2%",
  newGrowth: "-4.6%",
  churnedGrowth: "+12.5%",
  activeGrowth: "+5.3%"
};

export function BentoCards({ selectedState }: { selectedState: string | null }) {
  const data = selectedState ? stateData[selectedState as keyof typeof stateData] : defaultData;
  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      <Card className="@container/card bg-linear-to-b from-primary-dark to-primary">
        <CardHeader>
          <CardDescription>Total Patients</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <NumberTicker value={data.totalPatients} />
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              {data.totalGrowth}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Active Patients <TrendingUp className="size-4" />
          </div>
          <div>Total patients in the database</div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>New Patients</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <NumberTicker value={data.newPatients} />
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {data.newGrowth.startsWith('+') ? <TrendingUp /> : <TrendingDown />}
              {data.newGrowth}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {data.newGrowth.startsWith('+') ? 'Up' : 'Down'} {data.newGrowth} this period {data.newGrowth.startsWith('+') ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
          </div>
          <div className="text-muted-foreground">
            {Math.round(data.newPatients * (1 + (parseInt(data.newGrowth) / 100)))} last period
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Churned Patients</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <NumberTicker value={data.churnedPatients} />
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {data.churnedGrowth.startsWith('+') ? <TrendingUp /> : <TrendingDown />}
              {data.churnedGrowth}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {data.churnedGrowth.startsWith('+') ? 'Up' : 'Down'} {data.churnedGrowth} this month {data.churnedGrowth.startsWith('+') ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
          </div>
          <div className="text-muted-foreground">
            {Math.round(data.churnedPatients * (1 + (parseInt(data.churnedGrowth) / 100)))} last month
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Patients</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            <NumberTicker value={data.activePatients} />
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUp />
              {data.activeGrowth}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            +{Math.round(data.activePatients * (parseInt(data.activeGrowth) / 100))} since last month <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Net active growth
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}