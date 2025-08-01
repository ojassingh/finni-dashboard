import {
  date,
  pgEnum,
  pgTable,
  varchar,
  jsonb,
  integer,
  text,
  timestamp,
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
  email: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 20 }).notNull(),
  dateOfBirth: date().notNull(),
  street: varchar({ length: 255 }).notNull(),
  city: varchar({ length: 100 }).notNull(),
  state: varchar({ length: 100 }).notNull(),
  zip: varchar({ length: 20 }).notNull(),
  status: PatientStatus(),
  conditions: text("conditions").array(),
  allergies: text("allergies").array(),
  emergencyContact: jsonb().notNull(),
  recentActivity: jsonb().notNull().default("[]"),
  createdAt: timestamp().notNull().defaultNow(),
});