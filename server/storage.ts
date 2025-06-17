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
        name: "Hindistan",
        code: "IN",
        flag: "🇮🇳",
        image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
        description: "Çoğu vatandaşlık için e-Vize mevcut",
        processingTime: "3-5 gün",
        fee: "750 TL'den başlayan",
        visaRequired: true,
        eVisaAvailable: true,
        visaOnArrival: false,
      },
      {
        name: "Çin",
        code: "CN",
        flag: "🇨🇳",
        image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
        description: "Konsolosluk başvurusu gerekli",
        processingTime: "7-10 gün",
        fee: "1.800 TL'den başlayan",
        visaRequired: true,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Rusya",
        code: "RU",
        flag: "🇷🇺",
        image: "https://images.unsplash.com/photo-1513326738677-b964603b136d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
        description: "Davet mektubu gerekli",
        processingTime: "10-20 gün",
        fee: "4.800 TL'den başlayan",
        visaRequired: true,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Brezilya",
        code: "BR",
        flag: "🇧🇷",
        image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
        description: "Seçilmiş ülkeler için e-Vize",
        processingTime: "5-10 gün",
        fee: "1.200 TL'den başlayan",
        visaRequired: true,
        eVisaAvailable: true,
        visaOnArrival: false,
      },
      {
        name: "Türkiye",
        code: "TR",
        flag: "🇹🇷",
        image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
        description: "Online e-Vize mevcut",
        processingTime: "Anında",
        fee: "600 TL'den başlayan",
        visaRequired: true,
        eVisaAvailable: true,
        visaOnArrival: false,
      },
      {
        name: "Vietnam",
        code: "VN",
        flag: "🇻🇳",
        image: "https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
        description: "e-Vize veya varışta vize",
        processingTime: "3-5 gün",
        fee: "750 TL'den başlayan",
        visaRequired: true,
        eVisaAvailable: true,
        visaOnArrival: true,
      },
      {
        name: "Mısır",
        code: "EG",
        flag: "🇪🇬",
        image: "https://pixabay.com/get/gb9aa24cd19d9663af938e6af9636deceecfe65baadb05b6dc02906d10557183c32b4610e61da604fc025469a433380d66cbd653d931481f8bc0527bc222dc6f7_1280.jpg",
        description: "e-Vize veya varışta vize",
        processingTime: "1-3 gün",
        fee: "750 TL'den başlayan",
        visaRequired: true,
        eVisaAvailable: true,
        visaOnArrival: true,
      },
      {
        name: "Tayland",
        code: "TH",
        flag: "🇹🇭",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
        description: "Vizesiz veya varışta vize",
        processingTime: "Varışta",
        fee: "1.050 TL'den başlayan",
        visaRequired: false,
        eVisaAvailable: false,
        visaOnArrival: true,
      },
      {
        name: "Amerika Birleşik Devletleri",
        code: "US",
        flag: "🇺🇸",
        image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Çoğu vatandaşlık için gerekli",
        processingTime: "Çeşitli",
        fee: "Değişken",
        visaRequired: true,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Birleşik Krallık",
        code: "GB",
        flag: "🇬🇧",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Çoğu vatandaşlık için gerekli",
        processingTime: "Çeşitli",
        fee: "Değişken",
        visaRequired: true,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Almanya",
        code: "DE",
        flag: "🇩🇪",
        image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "AB üyesi",
        processingTime: "Çeşitli",
        fee: "Değişken",
        visaRequired: true,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Fransa",
        code: "FR",
        flag: "🇫🇷",
        image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "AB üyesi",
        processingTime: "Çeşitli",
        fee: "Değişken",
        visaRequired: true,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Kanada",
        code: "CA",
        flag: "🇨🇦",
        image: "https://images.unsplash.com/photo-1503614472-8c93d56cd96b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Çeşitli gereksinimler",
        processingTime: "Çeşitli",
        fee: "Değişken",
        visaRequired: true,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Avustralya",
        code: "AU",
        flag: "🇦🇺",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "ETA veya vize gerekli",
        processingTime: "Çeşitli",
        fee: "Değişken",
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
        price: null,
      },
      {
        name: "Başvuru Sunumu",
        description: "Elçilik ve konsolosluklara tüm başvuru sürecini sizin adınıza yönetiyoruz.",
        features: ["Elçilik sunumu", "Durum takibi", "Güvenli işlem"],
        icon: "paper-plane",
        price: null,
      },
      {
        name: "Hızlı İşlem",
        description: "Acil seyahat gereksinimleri için öncelikli işlem ile hızlandırılmış vize hizmetleri.",
        features: ["24-48 saat işlem", "Öncelikli başvuru", "Özel destek"],
        icon: "rocket",
        price: null,
      },
      {
        name: "Seyahat Sigortası",
        description: "Birçok vize başvurusu için gerekli olan kapsamlı seyahat sigortası kapsamı.",
        features: ["Vize uyumlu poliçeler", "Anında sertifikalar", "Dünya çapında kapsam"],
        icon: "shield-alt",
        price: null,
      },
      {
        name: "7/24 Destek",
        description: "Vize ile ilgili tüm soru ve endişeleriniz için 24 saat müşteri desteği.",
        features: ["Canlı sohbet desteği", "Telefon yardımı", "E-posta desteği"],
        icon: "headset",
        price: null,
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
