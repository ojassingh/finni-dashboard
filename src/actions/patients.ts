import db from "@/index";
import { Patient, PatientUpdateDTO } from "@/types";
import { patientsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function addPatient(patient: Patient) {
  const result = await db.insert(patientsTable).values({
    firstName: patient.firstName,
    middleName: patient.middleName || "",
    lastName: patient.lastName || "",
    dateOfBirth: patient.dateOfBirth || "",
    address: patient.address || "",
    status: patient.status || "",
  });
  return result;
}

export async function updatePatient(id: number, patient: PatientUpdateDTO) {
  const result = await db.update(patientsTable).set(patient).where(eq(patientsTable.id, id));
  return result;
}

export async function deletePatient(id: number) {
  const result = await db.delete(patientsTable).where(eq(patientsTable.id, id));
  return result;
}

export async function getPatient(id: number) {
  const result = await db.select().from(patientsTable).where(eq(patientsTable.id, id));
  return result;
}

export async function getPatients() {
  const result = await db.select().from(patientsTable);
  return result;
}