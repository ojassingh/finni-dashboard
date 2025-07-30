import React, { Suspense } from "react";
import { AddPatientDialog } from "./add-patient-dialog";
import { getPatients } from "@/actions/patients";
import { PatientsTable } from "./patients-table";
import { PatientsTableSkeleton } from "./patients-table-skeleton";

export default function Page() {
  const patientsPromise = getPatients()
  
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
      <div className="mt-10">
        <Suspense fallback={<PatientsTableSkeleton />}>
          <PatientsTable patientsPromise={patientsPromise} />
        </Suspense>
      </div>
    </div>
  );
}
