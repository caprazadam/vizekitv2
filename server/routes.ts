import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertConsultationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all countries
  app.get("/api/countries", async (_req, res) => {
    try {
      const countries = await storage.getCountries();
      res.json(countries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch countries" });
    }
  });

  // Get country by ID
  app.get("/api/countries/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid country ID" });
      }
      
      const country = await storage.getCountry(id);
      if (!country) {
        return res.status(404).json({ message: "Country not found" });
      }
      
      res.json(country);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch country" });
    }
  });

  // Get country by code
  app.get("/api/countries/code/:code", async (req, res) => {
    try {
      const code = req.params.code.toUpperCase();
      const country = await storage.getCountryByCode(code);
      if (!country) {
        return res.status(404).json({ message: "Country not found" });
      }
      
      res.json(country);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch country" });
    }
  });

  // Get all services
  app.get("/api/services", async (_req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  // Check visa requirements
  app.post("/api/visa-check", async (req, res) => {
    try {
      const { fromCountry, toCountry, purpose } = req.body;
      
      if (!fromCountry || !toCountry || !purpose) {
        return res.status(400).json({ 
          message: "Missing required fields: fromCountry, toCountry, purpose" 
        });
      }

      // Get countries by code
      const fromCountryData = await storage.getCountryByCode(fromCountry);
      const toCountryData = await storage.getCountryByCode(toCountry);

      if (!fromCountryData) {
        return res.status(404).json({ message: "Source country not found" });
      }

      if (!toCountryData) {
        return res.status(404).json({ message: "Destination country not found" });
      }

      // For now, return the destination country info as visa requirement
      // In a real app, this would check specific visa requirements
      const result = {
        fromCountry: fromCountryData,
        toCountry: toCountryData,
        purpose,
        visaRequired: toCountryData.visaRequired,
        eVisaAvailable: toCountryData.eVisaAvailable,
        visaOnArrival: toCountryData.visaOnArrival,
        processingTime: toCountryData.processingTime,
        fee: toCountryData.fee,
        documents: [
          "Geçerli pasaport (6+ ay geçerlilik)",
          "Pasaport fotoğrafları",
          "Banka ekstreleri (3-6 ay)",
          "Seyahat programı",
          "Otel rezervasyonları",
          "Seyahat sigortası"
        ]
      };

      res.json(result);
    } catch (error) {
      res.status(500).json({ message: "Failed to check visa requirements" });
    }
  });

  // Submit consultation request
  app.post("/api/consultations", async (req, res) => {
    try {
      const validatedData = insertConsultationSchema.parse(req.body);
      const consultation = await storage.createConsultation(validatedData);
      res.status(201).json(consultation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid consultation data", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Failed to submit consultation request" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
