import { date, integer, pgTable, varchar } from "drizzle-orm/pg-core";
export const patientsTable = pgTable("patients", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  firstName: varchar({ length: 255 }).notNull(),
  middleName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  dateOfBirth: date().notNull(),
  address: varchar({ length: 255 }).notNull(),
  status: varchar({ length: 255 }).notNull(),
});