import { users, countries, visaRequirements, services, consultations, type User, type InsertUser, type Country, type InsertCountry, type VisaRequirement, type InsertVisaRequirement, type Service, type InsertService, type Consultation, type InsertConsultation } from "@shared/schema";
import { serviceCountries } from "./countries-service";

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
  getConsultations(): Promise<Consultation[]>;
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
    // Initialize countries with exact visa requirements for Turkish passport holders - Only countries we provide services for
    const countriesData: Omit<Country, 'id'>[] = serviceCountries;

    countriesData.forEach(countryData => {
      const country: Country = { ...countryData, id: this.currentCountryId++ };
      this.countries.set(country.id, country);
    });

    // Initialize services
    const servicesData: Omit<Service, 'id'>[] = [
      {
        name: "Vize Danışmanlığı",
        description: "Herhangi bir destinasyon için vize gereksinimleri, başvuru süreci ve belge hazırlığı konusunda uzman rehberliği.",
        features: ["Ücretsiz ilk danışmanlık", "Belge inceleme", "Başvuru stratejisi"],
        icon: "user-tie",
        price: null,
      },
      {
        name: "Belge Hazırlığı",
        description: "Vize başvurunuz için gerekli tüm belgelerin hazırlanmasında profesyonel yardım.",
        features: ["Belge kontrol listesi", "Form doldurma", "Kalite incelemesi"],
        icon: "file-alt",
        price: "₺500",
      },
      {
        name: "Başvuru Takibi",
        description: "Vize başvuru sürecinizin her adımında profesyonel takip ve güncellemeler.",
        features: ["7/24 takip", "SMS/email bildirimleri", "Durum güncellemeleri"],
        icon: "search",
        price: "₺300",
      },
      {
        name: "Acil Vize Hizmeti",
        description: "Son dakika seyahat planları için hızlandırılmış vize başvuru hizmeti.",
        features: ["48 saat işlem", "Öncelikli randevu", "Acil belge hazırlığı"],
        icon: "zap",
        price: "₺1500",
      },
      {
        name: "Vize Reddi Danışmanlığı",
        description: "Daha önce vize reddedilen başvurular için özel danışmanlık ve yeniden başvuru stratejisi.",
        features: ["Red analizi", "Güçlendirme stratejisi", "Yeniden başvuru planı"],
        icon: "shield",
        price: "₺800",
      },
      {
        name: "Aile Vize Paketi",
        description: "Ailece seyahat planları için özel fiyatlı kapsamlı vize danışmanlığı paketi.",
        features: ["Aile indirimi", "Çocuk başvuruları", "Grup koordinasyonu"],
        icon: "users",
        price: "₺2000",
      }
    ];

    servicesData.forEach(serviceData => {
      const service: Service = { ...serviceData, id: this.currentServiceId++ };
      this.services.set(service.id, service);
    });

    // Initialize default admin user
    const adminUser: User = {
      id: 1,
      username: "admin",
      passwordHash: "$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa", // "vizeprotr2024"
      role: "admin"
    };
    this.users.set(1, adminUser);
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.username === username) {
        return user;
      }
    }
    return undefined;
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
    for (const country of this.countries.values()) {
      if (country.code === code) {
        return country;
      }
    }
    return undefined;
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

  async getConsultations(): Promise<Consultation[]> {
    return Array.from(this.consultations.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}

export const storage = new MemStorage();