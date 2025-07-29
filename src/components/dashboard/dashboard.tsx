import React from "react";
import { DataTable } from "./data-table";
import { columns, Customer } from "./columns";
import { AddPatientDialog } from "./add-patient-dialog";

async function getData(): Promise<Customer[]> {
  return [
    {
        id: "728ed52f",
        firstName: "John",
        middleName: "Doe",
        lastName: "Smith",
        dateOfBirth: "1990-01-01",
        status: "Active",
        address: "123 Main St, Anytown, USA",
    },
    {
        id: "a1b2c3d4",
        firstName: "Jane",
        middleName: "Doe",
        lastName: "Johnson",
        dateOfBirth: "1995-02-02",
        status: "Onboarding",
        address: "456 Elm St, Othertown, USA",
    },
    {
        id: "e5f6g7h8",
        firstName: "Michael",
        middleName: "Brown",
        lastName: "Davis",
        dateOfBirth: "1985-03-03",
        status: "Inquiry",
        address: "789 Oak St, Thistown, USA",
    },
    {
        id: "i9j0k1l2",
        firstName: "Emily",
        middleName: "Taylor",
        lastName: "Miller",
        dateOfBirth: "1992-04-04",
        status: "Active",
        address: "1011 Maple St, Thatcity, USA",
    },
    {
        id: "m3n4o5p6",
        firstName: "William",
        middleName: "Harris",
        lastName: "Wilson",
        dateOfBirth: "1980-05-05",
        status: "Churned",
        address: "1213 Pine St, Thiscity, USA",
    },
    {
        id: "q7r8s9t0",
        firstName: "Olivia",
        middleName: "Martin",
        lastName: "Moore",
        dateOfBirth: "1998-06-06",
        status: "Onboarding",
        address: "1415 Cedar St, Theothercity, USA",
    },
    {
        id: "u2v3w4x5",
        firstName: "Benjamin",
        middleName: "Thompson",
        lastName: "Hall",
        dateOfBirth: "1982-07-07",
        status: "Inquiry",
        address: "1617 Cypress St, Anothercity, USA",
    },
    {
        id: "y6z5x4c3",
        firstName: "Hannah",
        middleName: "White",
        lastName: "Lewis",
        dateOfBirth: "1991-08-08",
        status: "Active",
        address: "1819 Spruce St, Yetanothercity, USA",
    },
    {
        id: "b5n6m7k8",
        firstName: "Alexander",
        middleName: "Harris",
        lastName: "Walker",
        dateOfBirth: "1987-09-09",
        status: "Churned",
        address: "2021 Fir St, OneMoreCity, USA",
    },
  ]
}

export async function Dashboard() {
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
