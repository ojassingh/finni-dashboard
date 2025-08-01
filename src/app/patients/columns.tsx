"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { Patient } from "@/types";
import Link from "next/link";
import { getStatusIcon } from "@/utils/get-status";
import { Badge } from "@/components/ui/badge";
import { PatientActionsDropdown } from "./patient-actions-dropdown";

export const columns: ColumnDef<Patient>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "name",
    accessorFn: (row) =>
      `${row.firstName} ${row.middleName} ${row.lastName}`.trim(),
    header: "Name",
    cell: ({ row }) => (
      <Link href={`/patients/${row.original.id}`}>
        <div>
          {`${row.original.firstName} ${row.original.middleName} ${row.original.lastName}`.trim()}
        </div>
      </Link>
    ),
  },
  {
    accessorKey: "dateOfBirth",
    header: "Date of Birth",
    cell: ({ row }) => {
      const dateOfBirth = row.getValue("dateOfBirth") as string;
      return <div>{format(new Date(dateOfBirth), "MMM d, yyyy")}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return <Badge>{getStatusIcon(status)} {status}</Badge>;
    },
  },
  {
    accessorKey: "street",
    header: "Address",
    cell: ({ row }) => {
      const address = row.original;
      return <p>{`${address.street}, ${address.city}, ${address.state} ${address.zip}`}</p>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <PatientActionsDropdown patient={row.original} />;
    },
  },
];
