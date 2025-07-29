import db from "@/index";
import { Patient, PatientUpdateDTO } from "@/types";
import { patients } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function addPatient(patient: Patient) {
  const result = await db.insert(patients).values({
    firstName: patient.firstName,
    middleName: patient.middleName || "",
    lastName: patient.lastName || "",
    email: patient.email,
    phone: patient.phone,
    dateOfBirth: patient.dateOfBirth || "",
    street: patient.street || "",
    city: patient.city || "",
    state: patient.state || "",
    zip: patient.zip || "",
    status: patient.status,
    conditions: patient.conditions || [],
    allergies: patient.allergies || [],
    emergencyContact: patient.emergencyContact,
    recentActivity: patient.recentActivity || [],
  });
  return result;
}

export async function updatePatient(id: string, patient: PatientUpdateDTO) {
  const result = await db.update(patients).set(patient).where(eq(patients.id, id));
  return result;
}

export async function deletePatient(id: string) {
  const result = await db.delete(patients).where(eq(patients.id, id));
  return result;
}

export async function getPatient(id: string) {
  const result = await db.select().from(patients).where(eq(patients.id, id));
  return result;
}

export async function getPatients() {
  const result = await db.select().from(patients);
  return result;
}