"use client"

import { use } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Patient } from "@/types";

interface PatientsTableProps {
  patientsPromise: Promise<Patient[]>;
}

export function PatientsTable({ patientsPromise }: PatientsTableProps) {
  const patients = use(patientsPromise);
  
  return <DataTable columns={columns} data={patients} />;
}