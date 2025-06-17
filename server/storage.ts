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
      // Ücretsiz Giriş (Vizesiz Seyahat)
      {
        name: "Arnavutluk",
        code: "AL",
        flag: "🇦🇱",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Ücretsiz giriş - Türk pasaportunuz varsa Arnavutluk seyahat etmek için vizeye ihtiyacınız yoktur",
        processingTime: "Vizesiz - 90 gün kalmak",
        fee: "Vize ücreti yok",
        visaRequired: false,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Bosna Hersek",
        code: "BA",
        flag: "🇧🇦",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Ücretsiz giriş - Türk pasaportunuz varsa Bosna Hersek seyahat etmek için vizeye ihtiyacınız yoktur",
        processingTime: "Vizesiz - 90 gün kalmak",
        fee: "Vize ücreti yok",
        visaRequired: false,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Karadağ",
        code: "ME",
        flag: "🇲🇪",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Ücretsiz giriş - Türk pasaportunuz varsa Karadağ seyahat etmek için vizeye ihtiyacınız yoktur",
        processingTime: "Vizesiz - 90 gün kalmak",
        fee: "Vize ücreti yok",
        visaRequired: false,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Sırbistan",
        code: "RS",
        flag: "🇷🇸",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Ücretsiz giriş - Türk pasaportunuz varsa Sırbistan seyahat etmek için vizeye ihtiyacınız yoktur",
        processingTime: "Vizesiz - 90 gün kalmak",
        fee: "Vize ücreti yok",
        visaRequired: false,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Makedonya",
        code: "MK",
        flag: "🇲🇰",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Ücretsiz giriş - Türk pasaportunuz varsa Makedonya seyahat etmek için vizeye ihtiyacınız yoktur",
        processingTime: "Vizesiz - 90 gün kalmak",
        fee: "Vize ücreti yok",
        visaRequired: false,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Gürcistan",
        code: "GE",
        flag: "🇬🇪",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Ücretsiz giriş - Türk pasaportunuz varsa Gürcistan seyahat etmek için vizeye ihtiyacınız yoktur",
        processingTime: "Vizesiz - 365 gün kalmak",
        fee: "Vize ücreti yok",
        visaRequired: false,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Ukrayna",
        code: "UA",
        flag: "🇺🇦",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Ücretsiz giriş - Türk pasaportunuz varsa Ukrayna seyahat etmek için vizeye ihtiyacınız yoktur",
        processingTime: "Vizesiz - 90 gün kalmak",
        fee: "Vize ücreti yok",
        visaRequired: false,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Moldova",
        code: "MD",
        flag: "🇲🇩",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Ücretsiz giriş - Türk pasaportunuz varsa Moldova seyahat etmek için vizeye ihtiyacınız yoktur",
        processingTime: "Vizesiz - 90 gün kalmak",
        fee: "Vize ücreti yok",
        visaRequired: false,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Belarus",
        code: "BY",
        flag: "🇧🇾",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Ücretsiz giriş - Türk pasaportunuz varsa Belarus seyahat etmek için vizeye ihtiyacınız yoktur",
        processingTime: "Vizesiz - 30 gün kalmak",
        fee: "Vize ücreti yok",
        visaRequired: false,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Azerbaycan",
        code: "AZ",
        flag: "🇦🇿",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Ücretsiz giriş - Türk pasaportunuz varsa Azerbaycan seyahat etmek için vizeye ihtiyacınız yoktur",
        processingTime: "Vizesiz - 90 gün kalmak",
        fee: "Vize ücreti yok",
        visaRequired: false,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Kazakistan",
        code: "KZ",
        flag: "🇰🇿",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Ücretsiz giriş - Türk pasaportunuz varsa Kazakistan seyahat etmek için vizeye ihtiyacınız yoktur",
        processingTime: "Vizesiz - 30 gün kalmak",
        fee: "Vize ücreti yok",
        visaRequired: false,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Kırgızistan",
        code: "KG",
        flag: "🇰🇬",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Ücretsiz giriş - Türk pasaportunuz varsa Kırgızistan seyahat etmek için vizeye ihtiyacınız yoktur",
        processingTime: "Vizesiz - 90 gün kalmak",
        fee: "Vize ücreti yok",
        visaRequired: false,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Japonya",
        code: "JP",
        flag: "🇯🇵",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Ücretsiz giriş - Türk pasaportunuz varsa Japonya seyahat etmek için vizeye ihtiyacınız yoktur",
        processingTime: "Vizesiz - 90 gün kalmak",
        fee: "Vize ücreti yok",
        visaRequired: false,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Güney Kore",
        code: "KR",
        flag: "🇰🇷",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Ücretsiz giriş - Türk pasaportunuz varsa Güney Kore seyahat etmek için vizeye ihtiyacınız yoktur",
        processingTime: "Vizesiz - 90 gün kalmak",
        fee: "Vize ücreti yok",
        visaRequired: false,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Singapur",
        code: "SG",
        flag: "🇸🇬",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Ücretsiz giriş - Türk pasaportunuz varsa Singapur seyahat etmek için vizeye ihtiyacınız yoktur",
        processingTime: "Vizesiz - 30 gün kalmak",
        fee: "Vize ücreti yok",
        visaRequired: false,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Malezya",
        code: "MY",
        flag: "🇲🇾",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Ücretsiz giriş - Türk pasaportunuz varsa Malezya seyahat etmek için vizeye ihtiyacınız yoktur",
        processingTime: "Vizesiz - 90 gün kalmak",
        fee: "Vize ücreti yok",
        visaRequired: false,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Hong Kong",
        code: "HK",
        flag: "🇭🇰",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Ücretsiz giriş - Türk pasaportunuz varsa Hong Kong seyahat etmek için vizeye ihtiyacınız yoktur",
        processingTime: "Vizesiz - 90 gün kalmak",
        fee: "Vize ücreti yok",
        visaRequired: false,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Endonezya",
        code: "ID",
        flag: "🇮🇩",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Ücretsiz giriş - Türk pasaportunuz varsa Endonezya seyahat etmek için vizeye ihtiyacınız yoktur",
        processingTime: "Vizesiz - 30 gün kalmak",
        fee: "Vize ücreti yok",
        visaRequired: false,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Tayland",
        code: "TH",
        flag: "🇹🇭",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Ücretsiz giriş - Türk pasaportunuz varsa Tayland seyahat etmek için vizeye ihtiyacınız yoktur",
        processingTime: "Vizesiz - 30 gün kalmak",
        fee: "Vize ücreti yok",
        visaRequired: false,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Filipinler",
        code: "PH",
        flag: "🇵🇭",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Ücretsiz giriş - Türk pasaportunuz varsa Filipinler seyahat etmek için vizeye ihtiyacınız yoktur",
        processingTime: "Vizesiz - 30 gün kalmak",
        fee: "Vize ücreti yok",
        visaRequired: false,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      // E-Vize Gerekli Ülkeler
      {
        name: "Hindistan",
        code: "IN",
        flag: "🇮🇳",
        image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "E-vize gerekli - Hizmet ücretimiz: 4.000 TL",
        processingTime: "E-vize hizmeti",
        fee: "4.000 TL (Hizmet ücreti)",
        visaRequired: true,
        eVisaAvailable: true,
        visaOnArrival: false,
      },
      {
        name: "Rusya",
        code: "RU",
        flag: "🇷🇺",
        image: "https://images.unsplash.com/photo-1513326738677-b964603b136d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "E-vize gerekli - Hizmet ücretimiz: 4.000 TL",
        processingTime: "E-vize hizmeti",
        fee: "4.000 TL (Hizmet ücreti)",
        visaRequired: true,
        eVisaAvailable: true,
        visaOnArrival: false,
      },
      {
        name: "Sri Lanka",
        code: "LK",
        flag: "🇱🇰",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "E-vize gerekli - Hizmet ücretimiz: 4.000 TL",
        processingTime: "E-vize hizmeti",
        fee: "4.000 TL (Hizmet ücreti)",
        visaRequired: true,
        eVisaAvailable: true,
        visaOnArrival: false,
      },
      {
        name: "Çin",
        code: "CN",
        flag: "🇨🇳",
        image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "E-vize gerekli - Hizmet ücretimiz: 4.000 TL",
        processingTime: "E-vize hizmeti",
        fee: "4.000 TL (Hizmet ücreti)",
        visaRequired: true,
        eVisaAvailable: true,
        visaOnArrival: false,
      },
      // Vize Gerekli Ülkeler
      {
        name: "Almanya",
        code: "DE",
        flag: "🇩🇪",
        image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Schengen vizesi gerekli - Hizmet ücretimiz: 8.000 TL",
        processingTime: "Vize randevu hizmeti",
        fee: "8.000 TL (Hizmet ücreti)",
        visaRequired: true,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Polonya",
        code: "PL",
        flag: "🇵🇱",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Schengen vizesi gerekli - Hizmet ücretimiz: 8.000 TL",
        processingTime: "Vize randevu hizmeti",
        fee: "8.000 TL (Hizmet ücreti)",
        visaRequired: true,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Bulgaristan",
        code: "BG",
        flag: "🇧🇬",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Schengen vizesi gerekli - Hizmet ücretimiz: 8.000 TL",
        processingTime: "Vize randevu hizmeti",
        fee: "8.000 TL (Hizmet ücreti)",
        visaRequired: true,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Avusturya",
        code: "AT",
        flag: "🇦🇹",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Schengen vizesi gerekli - Hizmet ücretimiz: 8.000 TL",
        processingTime: "Vize randevu hizmeti",
        fee: "8.000 TL (Hizmet ücreti)",
        visaRequired: true,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Belçika",
        code: "BE",
        flag: "🇧🇪",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Schengen vizesi gerekli - Hizmet ücretimiz: 8.000 TL",
        processingTime: "Vize randevu hizmeti",
        fee: "8.000 TL (Hizmet ücreti)",
        visaRequired: true,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Fransa",
        code: "FR",
        flag: "🇫🇷",
        image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Schengen vizesi gerekli - Hizmet ücretimiz: 8.000 TL",
        processingTime: "Vize randevu hizmeti",
        fee: "8.000 TL (Hizmet ücreti)",
        visaRequired: true,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Hollanda",
        code: "NL",
        flag: "🇳🇱",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Schengen vizesi gerekli - Hizmet ücretimiz: 8.000 TL",
        processingTime: "Vize randevu hizmeti",
        fee: "8.000 TL (Hizmet ücreti)",
        visaRequired: true,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "İtalya",
        code: "IT",
        flag: "🇮🇹",
        image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Schengen vizesi gerekli - Hizmet ücretimiz: 8.000 TL",
        processingTime: "Vize randevu hizmeti",
        fee: "8.000 TL (Hizmet ücreti)",
        visaRequired: true,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Birleşik Krallık",
        code: "GB",
        flag: "🇬🇧",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Vize gerekli - Hizmet ücretimiz: 8.000 TL",
        processingTime: "Vize randevu hizmeti",
        fee: "8.000 TL (Hizmet ücreti)",
        visaRequired: true,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Amerika Birleşik Devletleri",
        code: "US",
        flag: "🇺🇸",
        image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Göçmen olmayan vize (NIV) gerekli - Hizmet ücretimiz: 8.000 TL",
        processingTime: "Vize randevu hizmeti",
        fee: "8.000 TL (Hizmet ücreti)",
        visaRequired: true,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Kanada",
        code: "CA",
        flag: "🇨🇦",
        image: "https://images.unsplash.com/photo-1503614472-8c93d56cd96b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Vize gerekli - Hizmet ücretimiz: 8.000 TL",
        processingTime: "Vize randevu hizmeti",
        fee: "8.000 TL (Hizmet ücreti)",
        visaRequired: true,
        eVisaAvailable: false,
        visaOnArrival: false,
      },
      {
        name: "Türkiye",
        code: "TR",
        flag: "🇹🇷",
        image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
        description: "Yabancılar için vize gereksinimleri değişkendir",
        processingTime: "Çeşitli",
        fee: "Değişken",
        visaRequired: true,
        eVisaAvailable: true,
        visaOnArrival: false,
      }
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