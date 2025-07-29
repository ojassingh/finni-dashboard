import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { AddPatientDialog } from "./add-patient-dialog";
import { Patient } from "@/types";

async function getData(): Promise<Patient[]> {
  return [
    {
        id: 1,
        firstName: "John",
        middleName: "Doe",
        lastName: "Smith",
        dateOfBirth: "1990-01-01",
        status: "Active",
        email: "john.smith@example.com",
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        conditions: ["High blood pressure", "Diabetes"],
    },
    {
        id: 2,
        firstName: "Jane",
        middleName: "Doe",
        lastName: "Johnson",
        dateOfBirth: "1995-02-02",
        status: "Onboarding",
        email: "jane.johnson@example.com",
        street: "456 Elm St",
        city: "Othertown",
        state: "NY",
        zip: "67890",
        conditions: ["Asthma", "Migraines"],
    },
    {
        id: 3,
        firstName: "Michael",
        middleName: "Brown",
        lastName: "Davis",
        dateOfBirth: "1985-03-03",
        status: "Inquiry",
        email: "michael.davis@example.com",
        street: "789 Oak St",
        city: "Thistown",
        state: "TX",
        zip: "13579",
        conditions: ["Depression", "Anxiety"],
    },
   
  ]
}

export default async function Page() {
  const data = await getData()
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
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
