import React from "react";
import { AddPatientDialog } from "@/components/dashboard/add-patient-dialog";

export async function Dashboard() {
  return (
    <div className="p-10">
      <div className="flex w-full justify-between items-start">
        <div>
          <h1 className="text-2xl tracking-tighter font-medium">
            Hey, welcome back!
          </h1>
          <p className="text-muted-foreground mt-2">
            Here&apos;s a quick overview of your patients.
          </p>
        </div>
        <AddPatientDialog />
      </div>
    </div>
  );
}
