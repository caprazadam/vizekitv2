import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const countries = pgTable("countries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  flag: text("flag").notNull(),
  image: text("image").notNull(),
  description: text("description").notNull(),
  processingTime: text("processing_time").notNull(),
  fee: text("fee").notNull(),
  visaRequired: boolean("visa_required").notNull().default(true),
  eVisaAvailable: boolean("e_visa_available").notNull().default(false),
  visaOnArrival: boolean("visa_on_arrival").notNull().default(false),
});

export const visaRequirements = pgTable("visa_requirements", {
  id: serial("id").primaryKey(),
  fromCountryId: integer("from_country_id").notNull(),
  toCountryId: integer("to_country_id").notNull(),
  travelPurpose: text("travel_purpose").notNull(),
  required: boolean("required").notNull().default(true),
  processingTime: text("processing_time").notNull(),
  fee: text("fee").notNull(),
  documents: text("documents").array().notNull(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  features: text("features").array().notNull(),
  icon: text("icon").notNull(),
  price: text("price"),
});

export const consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  destinationCountry: text("destination_country").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCountrySchema = createInsertSchema(countries).omit({
  id: true,
});

export const insertVisaRequirementSchema = createInsertSchema(visaRequirements).omit({
  id: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
});

export const insertConsultationSchema = createInsertSchema(consultations).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertCountry = z.infer<typeof insertCountrySchema>;
export type Country = typeof countries.$inferSelect;
export type InsertVisaRequirement = z.infer<typeof insertVisaRequirementSchema>;
export type VisaRequirement = typeof visaRequirements.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;
export type InsertConsultation = z.infer<typeof insertConsultationSchema>;
export type Consultation = typeof consultations.$inferSelect;
