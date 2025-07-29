import {
  date,
  pgEnum,
  pgTable,
  varchar,
  jsonb,
  uuid,
} from "drizzle-orm/pg-core";

export const PatientStatus = pgEnum("patient_status", [
  "Inquiry",
  "Onboarding",
  "Active",
  "Churned",
]);

export const patients = pgTable("patients", {
  id: uuid().primaryKey().defaultRandom(),
  firstName: varchar({ length: 255 }).notNull(),
  middleName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  dateOfBirth: date().notNull(),
  street: varchar({ length: 255 }).notNull(),
  city: varchar({ length: 100 }).notNull(),
  state: varchar({ length: 100 }).notNull(),
  zip: varchar({ length: 20 }).notNull(),
  status: PatientStatus(),
  conditions: jsonb().notNull().default("[]"),
});