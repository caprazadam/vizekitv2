import { users, countries, visaRequirements, services, consultations, type User, type InsertUser, type Country, type InsertCountry, type VisaRequirement, type InsertVisaRequirement, type Service, type InsertService, type Consultation, type InsertConsultation } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getCountries(): Promise<Country[]>;
  getCountry(id: number): Promise<Country | undefined>;
  getCountryByCode(code: string): Promise<Country | undefined>;
  
  getVisaRequirement(fromCountryId: number, toCountryId: number, purpose: string): Promise<VisaRequirement | undefined>;
  
  getServices(): Promise<Service[]>;
  
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private countries: Map<number, Country>;
  private visaRequirements: Map<string, VisaRequirement>;
  private services: Map<number, Service>;
  private consultations: Map<number, Consultation>;
  private currentUserId: number;
  private currentCountryId: number;
  private currentVisaReqId: number;
  private currentServiceId: number;
  private currentConsultationId: number;

  constructor() {
    this.users = new Map();
    this.countries = new Map();
    this.visaRequirements = new Map();
    this.services = new Map();
    this.consultations = new Map();
    this.currentUserId = 1;
    this.currentCountryId = 1;
    this.currentVisaReqId = 1;
    this.currentServiceId = 1;
    this.currentConsultationId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Initialize countries
    const countriesData: Omit<Country, 'id'>[] = [
      {
        name: "India",
        code: "IN",
        flag: "🇮🇳",
        image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
        description: "e-Visa available for most nationalities",
        processingTime: "3-5 days",
        fee: "From $25",
        visaRequired: true,
        eVisaAvailable: true,
        visaOnArrival: false,
      },
      {
        name: "China",
        code: "CN",
        flag: "🇨🇳",
        image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
        description: "Embassy application required",
        processingTime: "7-10 days",
        fee: "From $60",
        visaRequired: true,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Russia",
        code: "RU",
        flag: "🇷🇺",
        image: "https://images.unsplash.com/photo-1513326738677-b964603b136d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
        description: "Invitation letter required",
        processingTime: "10-20 days",
        fee: "From $160",
        visaRequired: true,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Brazil",
        code: "BR",
        flag: "🇧🇷",
        image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
        description: "e-Visa for select countries",
        processingTime: "5-10 days",
        fee: "From $40",
        visaRequired: true,
        eVisaAvailable: true,
        visaOnArrival: false,
      },
      {
        name: "Turkey",
        code: "TR",
        flag: "🇹🇷",
        image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
        description: "e-Visa available online",
        processingTime: "Instant",
        fee: "From $20",
        visaRequired: true,
        eVisaAvailable: true,
        visaOnArrival: false,
      },
      {
        name: "Vietnam",
        code: "VN",
        flag: "🇻🇳",
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
        description: "e-Visa or visa on arrival",
        processingTime: "3-5 days",
        fee: "From $25",
        visaRequired: true,
        eVisaAvailable: true,
        visaOnArrival: true,
      },
      {
        name: "Egypt",
        code: "EG",
        flag: "🇪🇬",
        image: "https://pixabay.com/get/gb9aa24cd19d9663af938e6af9636deceecfe65baadb05b6dc02906d10557183c32b4610e61da604fc025469a433380d66cbd653d931481f8bc0527bc222dc6f7_1280.jpg",
        description: "e-Visa or visa on arrival",
        processingTime: "1-3 days",
        fee: "From $25",
        visaRequired: true,
        eVisaAvailable: true,
        visaOnArrival: true,
      },
      {
        name: "Thailand",
        code: "TH",
        flag: "🇹🇭",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
        description: "Visa-free or visa on arrival",
        processingTime: "On arrival",
        fee: "From $35",
        visaRequired: false,
        eVisaAvailable: false,
        visaOnArrival: true,
      },
      {
        name: "United States",
        code: "US",
        flag: "🇺🇸",
        image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Most nationalities",
        processingTime: "Various",
        fee: "Varies",
        visaRequired: true,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "United Kingdom",
        code: "GB",
        flag: "🇬🇧",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Most nationalities",
        processingTime: "Various",
        fee: "Varies",
        visaRequired: true,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Germany",
        code: "DE",
        flag: "🇩🇪",
        image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "EU member",
        processingTime: "Various",
        fee: "Varies",
        visaRequired: true,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "France",
        code: "FR",
        flag: "🇫🇷",
        image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "EU member",
        processingTime: "Various",
        fee: "Varies",
        visaRequired: true,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Canada",
        code: "CA",
        flag: "🇨🇦",
        image: "https://images.unsplash.com/photo-1503614472-8c93d56cd96b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Various requirements",
        processingTime: "Various",
        fee: "Varies",
        visaRequired: true,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Australia",
        code: "AU",
        flag: "🇦🇺",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "ETA or visa required",
        processingTime: "Various",
        fee: "Varies",
        visaRequired: true,
        eVisaAvailable: true,
        visaOnArrival: false,
      },
    ];

    countriesData.forEach(countryData => {
      const country: Country = { ...countryData, id: this.currentCountryId++ };
      this.countries.set(country.id, country);
    });

    // Initialize services
    const servicesData: Omit<Service, 'id'>[] = [
      {
        name: "Visa Consultation",
        description: "Expert guidance on visa requirements, application process, and document preparation for any destination.",
        features: ["Free initial consultation", "Document review", "Application strategy"],
        icon: "user-tie",
        price: undefined,
      },
      {
        name: "Document Preparation",
        description: "Professional assistance in preparing all required documents for your visa application.",
        features: ["Document checklist", "Form completion", "Quality review"],
        icon: "file-alt",
        price: undefined,
      },
      {
        name: "Application Submission",
        description: "We handle the entire submission process to embassies and consulates on your behalf.",
        features: ["Embassy submission", "Status tracking", "Secure handling"],
        icon: "paper-plane",
        price: undefined,
      },
      {
        name: "Express Processing",
        description: "Expedited visa services for urgent travel requirements with priority handling.",
        features: ["24-48 hour processing", "Priority submission", "Dedicated support"],
        icon: "rocket",
        price: undefined,
      },
      {
        name: "Travel Insurance",
        description: "Comprehensive travel insurance coverage required for many visa applications.",
        features: ["Visa-compliant policies", "Instant certificates", "Worldwide coverage"],
        icon: "shield-alt",
        price: undefined,
      },
      {
        name: "24/7 Support",
        description: "Round-the-clock customer support for all your visa-related questions and concerns.",
        features: ["Live chat support", "Phone assistance", "Email support"],
        icon: "headset",
        price: undefined,
      },
    ];

    servicesData.forEach(serviceData => {
      const service: Service = { ...serviceData, id: this.currentServiceId++ };
      this.services.set(service.id, service);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCountries(): Promise<Country[]> {
    return Array.from(this.countries.values());
  }

  async getCountry(id: number): Promise<Country | undefined> {
    return this.countries.get(id);
  }

  async getCountryByCode(code: string): Promise<Country | undefined> {
    return Array.from(this.countries.values()).find(
      (country) => country.code === code,
    );
  }

  async getVisaRequirement(fromCountryId: number, toCountryId: number, purpose: string): Promise<VisaRequirement | undefined> {
    const key = `${fromCountryId}-${toCountryId}-${purpose}`;
    return this.visaRequirements.get(key);
  }

  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async createConsultation(insertConsultation: InsertConsultation): Promise<Consultation> {
    const id = this.currentConsultationId++;
    const consultation: Consultation = { 
      ...insertConsultation, 
      id, 
      createdAt: new Date().toISOString() 
    };
    this.consultations.set(id, consultation);
    return consultation;
  }
}

export const storage = new MemStorage();
