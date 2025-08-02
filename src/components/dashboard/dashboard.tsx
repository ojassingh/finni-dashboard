"use client";

import React, { useState } from "react";
import { Globe } from "./globe";
import { BentoCards } from "./bento-cards";
import { ChartArea } from "./chart-area";
import { RecentActivity } from "./recent-activity";

export function Dashboard() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  return (
    <div className="p-10 min-h-screen">
      <div className="flex w-full justify-between items-start">
        <div>
          <h1 className="text-3xl tracking-tighter font-medium">
            Hey, welcome back!
          </h1>
          <p className="text-muted-foreground mt-2">
            Here&apos;s a quick overview of your patients.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4 mt-10">
        <div className="col-span-3">
          <BentoCards selectedState={selectedState} />
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
          <Globe onStateSelect={setSelectedState} />
        </div>
      </div>
             <div className="mt-4 grid grid-cols-6 gap-4">
         <div className="col-span-4">
           <ChartArea />
         </div>
         <div className="col-span-2">
           <RecentActivity />
         </div>
       </div>
    </div>
  );
}
