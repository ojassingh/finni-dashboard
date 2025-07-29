import {
  date,
  integer,
  pgEnum,
  pgTable,
  varchar,
  jsonb,
} from "drizzle-orm/pg-core";

export const PatientStatus = pgEnum("patient_status", [
  "Inquiry",
  "Onboarding",
  "Active",
  "Churned",
]);

export const patients = pgTable("patients", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar({ length: 255 }).notNull(),
  middleName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  dateOfBirth: date().notNull(),
  street: varchar({ length: 255 }).notNull(),
  city: varchar({ length: 100 }).notNull(),
  state: varchar({ length: 50 }).notNull(),
  zip: varchar({ length: 20 }).notNull(),
  status: PatientStatus(),
  conditions: jsonb().notNull().default("[]"),
});