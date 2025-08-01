"use server";

import db from "@/index";
import { Patient, PatientUpdateDTO, PatientsFilterDTO } from "@/types";
import { patients } from "@/db/schema";
import { eq, or, ilike, and, sql, desc } from "drizzle-orm";

export async function addPatient(patient: Omit<Patient, 'id'>) {
  const insertData = {
    ...patient,
    emergencyContact: patient.emergencyContact || {},
    createdAt: new Date(),
  };
  const result = await db.insert(patients).values(insertData).returning();
  return JSON.parse(JSON.stringify(result[0])) as Patient;
}

export async function updatePatient(id: number, patient: PatientUpdateDTO) {
  const result = await db.update(patients).set(patient).where(eq(patients.id, id));
  return JSON.parse(JSON.stringify(result)) as Patient;
}

export async function deletePatient(id: number) {
  await db.delete(patients).where(eq(patients.id, id));
}

export async function getPatient(id: number) {
  const result = await db.select().from(patients).where(eq(patients.id, id));
  return JSON.parse(JSON.stringify(result[0])) as Patient;
}

export async function getPatients() {
  const result = await db.select().from(patients).orderBy(desc(patients.createdAt));
  return JSON.parse(JSON.stringify(result)) as Patient[];
}

export async function searchPatients(criteria: PatientsFilterDTO) {
  const conditions = [];
  
  if (criteria.name) {
    const nameWords = criteria.name.trim().split(/\s+/);
    const nameConditions = nameWords.map(word => 
      or(
        ilike(patients.firstName, `%${word}%`),
        ilike(patients.middleName, `%${word}%`),
        ilike(patients.lastName, `%${word}%`)
      )
    );
    conditions.push(and(...nameConditions));
  }
  
  if (criteria.state) {
    conditions.push(ilike(patients.state, `%${criteria.state}%`));
  }

  if (criteria.city) {
    conditions.push(ilike(patients.city, `%${criteria.city}%`));
  }

  if (criteria.createdAt) {
    conditions.push(sql`${patients.createdAt} >= ${criteria.createdAt}`);
  }
  
  if (criteria.status) {
    conditions.push(eq(patients.status, criteria.status));
  }
  
  if (criteria.condition) {
    conditions.push(
      sql`array_to_string(${patients.conditions}, ',') ILIKE ${'%' + criteria.condition + '%'}`
    );
  }
  
  if (criteria.allergy) {
    conditions.push(
      sql`array_to_string(${patients.allergies}, ',') ILIKE ${'%' + criteria.allergy + '%'}`
    );
  }
  
  if (criteria.ageMin) {
    const maxBirthYear = new Date().getFullYear() - criteria.ageMin;
    conditions.push(sql`EXTRACT(YEAR FROM ${patients.dateOfBirth}) <= ${maxBirthYear}`);
  }
  
  if (criteria.ageMax) {
    const minBirthYear = new Date().getFullYear() - criteria.ageMax;
    conditions.push(sql`EXTRACT(YEAR FROM ${patients.dateOfBirth}) >= ${minBirthYear}`);
  }
  
  const results = await db
    .select()
    .from(patients)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .limit(10);

  return JSON.parse(JSON.stringify(results)) as Patient[];
}