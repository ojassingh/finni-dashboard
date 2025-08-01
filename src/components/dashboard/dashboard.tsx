import React from "react";
import { Globe } from "./globe";
import { Card } from "../ui/card";

export async function Dashboard() {
  return (
    <div className="p-10 min-h-screen">
      <div className="flex w-full justify-between items-start">
        <div>
          <h1 className="text-2xl tracking-tighter font-medium">
            Hey, welcome back!
          </h1>
          <p className="text-muted-foreground mt-2">
            Here&apos;s a quick overview of your patients.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4 mt-10">
        <div id="analytics-bento" className="col-span-3 grid grid-cols-2 gap-4">
          <Card className="h-full w-full p-10">
            <p>Hello</p>
          </Card>
          <Card className="h-full w-full p-10">
            <p>Hello</p>
          </Card>
          <Card className="h-full w-full p-10">
            <p>Hello</p>
          </Card>
          <Card className="h-full w-full p-10">
            <p>Hello</p>
          </Card>
        </div>
        <div
          id="map-chart"
          className="col-span-3 rounded-md ring-1 ring-border bg-card"
        >
          <div className="mb-4 pt-6 px-6">
            <h2 className="text-lg font-medium tracking-tight">
              Patient Distribution
            </h2>
            <p className="text-sm text-muted-foreground">
              Geographic overview of patients across the United States
            </p>
          </div>
          <Globe />
        </div>
      </div>
    </div>
  );
}
