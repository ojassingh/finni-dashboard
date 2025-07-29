"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

export type Customer = {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  status: string;
  address: string;
};

export const columns: ColumnDef<Customer>[] = [
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
      <div>
        {`${row.original.firstName} ${row.original.middleName} ${row.original.lastName}`.trim()}
      </div>
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
      return getStatusBadge(status);
    },
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const customer = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(customer.id)}
            >
              Copy patient email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete patient</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const getStatusBadge = (status: string) => {
  const baseClasses =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset";

  switch (status.toLowerCase()) {
    case "active":
      return (
        <span
          className={`${baseClasses} bg-green-50 text-green-700 ring-green-600/20 shadow-xs shadow-green-100`}
        >
          {status}
        </span>
      );
    case "onboarding":
      return (
        <span
          className={`${baseClasses} bg-blue-50 text-blue-700 ring-blue-600/20 shadow-xs shadow-blue-100`}
        >
          {status}
        </span>
      );
    case "inquiry":
      return (
        <span
          className={`${baseClasses} bg-yellow-50 text-yellow-700 ring-yellow-600/20 shadow-xs shadow-yellow-100`}
        >
          {status}
        </span>
      );
    case "churned": 
      return (
        <span
          className={`${baseClasses} bg-red-50 text-red-700 ring-red-600/20 shadow-xs shadow-red-100`}
        >
          {status}
        </span>
      );
    default:
      return (
        <span
          className={`${baseClasses} bg-gray-50 text-gray-700 ring-gray-600/20 shadow-xs shadow-gray-100`}
        >
          {status}
        </span>
      );
  }
};
