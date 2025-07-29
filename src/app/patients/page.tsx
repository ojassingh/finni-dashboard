import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { AddPatientDialog } from "./add-patient-dialog";
import { Patient } from "@/types";

async function getData(): Promise<Patient[]> {
  return [
    {
        id: "1",
        firstName: "John",
        middleName: "Doe",
        lastName: "Smith",
        dateOfBirth: "1990-01-01",
        status: "Active",
        email: "john.smith@example.com",
        phone: "(555) 123-4567",
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
        conditions: ["High blood pressure", "Diabetes"],
        allergies: ["Penicillin", "Shellfish"],
        emergencyContact: {
          name: "Jane Smith",
          relationship: "Spouse",
          phone: "(555) 123-4568"
        },
        recentActivity: [
          { procedure: "Blood test", date: "2024-01-15" },
          { procedure: "Annual checkup", date: "2024-01-10" }
        ]
        },
    {
        id: "2",
        firstName: "Jane",
        middleName: "Doe",
        lastName: "Johnson",
        dateOfBirth: "1995-02-02",
        status: "Onboarding",
        email: "jane.johnson@example.com",
        phone: "(555) 234-5678",
        street: "456 Elm St",
        city: "Othertown",
        state: "NY",
        zip: "67890",
        conditions: ["Asthma", "Migraines"],
        allergies: ["Peanuts", "Latex"],
        emergencyContact: {
          name: "Mike Johnson",
          relationship: "Brother",
          phone: "(555) 234-5679"
        },
        recentActivity: [
          { procedure: "Migraine consultation", date: "2024-01-20" },
          { procedure: "Inhaler prescription", date: "2024-01-12" }
        ]
    },
    {
        id: "3",
        firstName: "Michael",
        middleName: "Brown",
        lastName: "Davis",
        dateOfBirth: "1985-03-03",
        status: "Inquiry",
        email: "michael.davis@example.com",
        phone: "(555) 345-6789",
        street: "789 Oak St",
        city: "Thistown",
        state: "TX",
        zip: "13579",
        conditions: ["Depression", "Anxiety"],
        allergies: ["Sulfa drugs"],
        emergencyContact: {
          name: "Lisa Davis",
          relationship: "Mother",
          phone: "(555) 345-6790"
        },
        recentActivity: [
          { procedure: "Therapy session", date: "2024-01-18" },
          { procedure: "Medication review", date: "2024-01-05" }
        ]
     },
     {
         id: "4",
         firstName: "Ally",
         middleName: "",
         lastName: "Smith",
         dateOfBirth: "1988-07-15",
         status: "Active",
         email: "ally.smith@example.com",
         phone: "(555) 456-7890",
         street: "321 Broadway Ave",
         city: "New York",
         state: "NY",
         zip: "10001",
         conditions: ["Diabetes", "High cholesterol"],
         allergies: ["Iodine"],
         emergencyContact: {
           name: "Tom Smith",
           relationship: "Husband",
           phone: "(555) 456-7891"
         },
         recentActivity: [
           { procedure: "Diabetes monitoring", date: "2024-01-22" },
           { procedure: "Cholesterol screening", date: "2024-01-08" }
         ]
     },
     {
         id: "5",
         firstName: "Robert",
         middleName: "James",
         lastName: "Wilson",
         dateOfBirth: "1975-12-10",
         status: "Churned",
         email: "robert.wilson@example.com",
         phone: "(555) 567-8901",
         street: "555 Fifth Ave",
         city: "New York",
         state: "NY",
         zip: "10003",
         conditions: ["Heart disease", "Diabetes"],
         allergies: ["Aspirin", "Codeine"],
         emergencyContact: {
           name: "Mary Wilson",
           relationship: "Wife",
           phone: "(555) 567-8902"
         },
         recentActivity: [
           { procedure: "Cardiac consultation", date: "2023-12-15" },
           { procedure: "EKG", date: "2023-12-10" }
         ]
     },
     {
         id: "6",
         firstName: "Sarah",
         middleName: "Ann",
         lastName: "Miller",
         dateOfBirth: "1992-04-22",
         status: "Active",
         email: "sarah.miller@example.com",
         phone: "(555) 678-9012",
         street: "888 Pine St",
         city: "Los Angeles",
         state: "CA",
         zip: "90210",
         conditions: ["Asthma"],
         allergies: ["Tree pollen", "Dust mites"],
         emergencyContact: {
           name: "John Miller",
           relationship: "Father",
           phone: "(555) 678-9013"
         },
         recentActivity: [
           { procedure: "Allergy testing", date: "2024-01-25" },
           { procedure: "Asthma follow-up", date: "2024-01-14" }
         ]
     },
     {
         id: "7",
         firstName: "David",
         middleName: "",
         lastName: "Brown",
         dateOfBirth: "1982-11-08",
         status: "Onboarding",
         email: "david.brown@example.com",
         phone: "(555) 789-0123",
         street: "777 Market St",
         city: "San Francisco",
         state: "CA",
         zip: "94102",
         conditions: ["Hypertension", "Diabetes"],
         allergies: ["None known"],
         emergencyContact: {
           name: "Sarah Brown",
           relationship: "Sister",
           phone: "(555) 789-0124"
         },
         recentActivity: [
           { procedure: "Initial consultation", date: "2024-01-23" },
           { procedure: "Lab work ordered", date: "2024-01-20" }
         ]
     },
     {
         id: "8",
        firstName: "Emily",
        middleName: "Rose",
        lastName: "Garcia",
        dateOfBirth: "1998-06-30",
        status: "Inquiry",
        email: "emily.garcia@example.com",
        phone: "(555) 890-1234",
        street: "444 Congress Ave",
        city: "Austin",
        state: "TX",
        zip: "73301",
        conditions: ["Anxiety", "Depression"],
        allergies: ["Cats", "Seasonal allergies"],
        emergencyContact: {
          name: "Carmen Garcia",
          relationship: "Mother",
          phone: "(555) 890-1235"
        },
        recentActivity: [
          { procedure: "Initial inquiry call", date: "2024-01-26" },
          { procedure: "Insurance verification", date: "2024-01-24" }
        ]
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
