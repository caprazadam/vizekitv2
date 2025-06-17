import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import VisaCheckerForm from "@/components/visa-checker-form";
import CountryCard from "@/components/country-card";
import ServiceCard from "@/components/service-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Country, Service } from "@shared/schema";

export default function Home() {
  const [consultationForm, setConsultationForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    destinationCountry: "",
    message: "",
  });
  const [heroForm, setHeroForm] = useState({
    fromCountry: "TR",
    toCountry: "",
    purpose: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  const { data: countries = [] } = useQuery<Country[]>({
    queryKey: ["/api/countries"],
  });

  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  // Show first 8 countries as popular destinations
  const popularCountries = countries.slice(0, 8);

  const handleHeroFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!heroForm.fromCountry || !heroForm.toCountry || !heroForm.purpose) {
      toast({
        title: "Eksik Bilgi",
        description: "Lütfen tüm alanları doldurun",
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);
    try {
      const response = await apiRequest("POST", "/api/visa-check", {
        fromCountry: heroForm.fromCountry,
        toCountry: heroForm.toCountry,
        purpose: heroForm.purpose,
      });
      const data = await response.json();
      
      // Redirect to visa checker page with results
      window.location.href = `/visa-checker?from=${heroForm.fromCountry}&to=${heroForm.toCountry}&purpose=${heroForm.purpose}`;
    } catch (error) {
      toast({
        title: "Hata",
        description: "Vize gereksinimleri kontrol edilemedi. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/consultations", consultationForm);
      toast({
        title: "Danışmanlık Talebi Gönderildi",
        description: "24 saat içinde size dönüş yapacağız.",
      });
      setConsultationForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        destinationCountry: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Danışmanlık talebi gönderilemedi. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section with Search Form */}
      <section className="gradient-hero text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Vize Gereksinimlerini Kontrol Edin
          </h1>
          <p className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto">
            200+ ülke için anında vize gereksinimleri, işlem süreleri ve başvuru rehberliği alın
          </p>
          
          {/* Horizontal Search Form */}
          <div className="bg-white rounded-xl shadow-2xl p-8 text-gray-900 max-w-5xl mx-auto">
            <form onSubmit={handleHeroFormSubmit} className="grid md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 text-left">
                  Vatandaşlığınız
                </label>
                <Select value={heroForm.fromCountry} onValueChange={(value) => setHeroForm(prev => ({ ...prev, fromCountry: value }))}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Ülke seçin..." />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.flag} {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 text-left">
                  Gideceğiniz Ülke
                </label>
                <Select value={heroForm.toCountry} onValueChange={(value) => setHeroForm(prev => ({ ...prev, toCountry: value }))}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Hedef ülke..." />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.flag} {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 text-left">
                  Seyahat Amacı
                </label>
                <Select value={heroForm.purpose} onValueChange={(value) => setHeroForm(prev => ({ ...prev, purpose: value }))}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Amaç seçin..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tourism">Turizm</SelectItem>
                    <SelectItem value="business">İş</SelectItem>
                    <SelectItem value="transit">Transit</SelectItem>
                    <SelectItem value="work">Çalışma</SelectItem>
                    <SelectItem value="study">Eğitim</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 text-left opacity-0">
                  Ara
                </label>
                <Button 
                  type="submit" 
                  disabled={isChecking}
                  className="w-full h-12 bg-visa-blue hover:bg-blue-700 text-lg font-semibold"
                >
                  {isChecking ? "Kontrol Ediliyor..." : "Vize Gereksinimlerini Kontrol Et"}
                </Button>
              </div>
            </form>
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="flex items-center text-blue-100">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Anında Sonuç</span>
            </div>
            <div className="flex items-center text-blue-100">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>200+ Ülke</span>
            </div>
            <div className="flex items-center text-blue-100">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Uzman Desteği</span>
            </div>
            <div className="flex items-center text-blue-100">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>7/24 Hizmet</span>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section id="countries" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Popüler Vize Destinasyonları
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dünya çapında en çok ziyaret edilen ülkeler için vize gereksinimlerini keşfedin
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularCountries.map((country) => (
              <CountryCard key={country.id} country={country} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/countries">
              <Button variant="outline" className="border-visa-blue text-visa-blue hover:bg-visa-blue hover:text-white">
                Tüm Ülkeleri Gör
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Vize Hizmetlerimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Seyahat planlamanızı kolaylaştırmak için kapsamlı vize yardımı
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Nasıl Çalışır
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vizenizin hızlı ve verimli bir şekilde onaylanması için basit adımlar
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Vizeyi Kontrol Et",
                description: "Hedef ülkeniz için gereksinimleri belirlemek üzere vize kontrol aracımızı kullanın."
              },
              {
                step: "2",
                title: "Belgeleri Hazırla",
                description: "Detaylı kontrol listelerimiz ve uzman rehberliğimizle gerekli belgeleri toplayın."
              },
              {
                step: "3",
                title: "Başvuru Yap",
                description: "Başvurunuzu gözden geçirip elçilik veya konsolosluğa sunuyoruz."
              },
              {
                step: "4",
                title: "Vize Al",
                description: "Başvuru durumunuzu takip edin ve onaylanan vizenizi alın."
              }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-20 h-20 bg-visa-blue rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Requirements */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Common Document Requirements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Essential documents needed for most visa applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Passport & Identity",
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
                items: ["Valid passport (6+ months)", "Passport photographs", "National ID copy"]
              },
              {
                title: "Financial Proof",
                image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
                items: ["Bank statements (3-6 months)", "Income tax returns", "Employment certificate"]
              },
              {
                title: "Travel Plans",
                image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
                items: ["Flight itinerary", "Hotel reservations", "Travel insurance"]
              },
              {
                title: "Business Travel",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
                items: ["Invitation letter", "Company registration", "Meeting agenda"]
              },
              {
                title: "Health Requirements",
                image: "https://pixabay.com/get/g0275fefd29d11cc446f2caebcecf19a5b452be4de581425f204433da8ad296aa22e6e23c73a20736e083a07ea09ec27c2b356f485de31f4b95c5dc5523c03de1_1280.jpg",
                items: ["Vaccination certificates", "Medical examination", "Health insurance"]
              },
              {
                title: "Student Visas",
                image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=300",
                items: ["Admission letter", "Academic transcripts", "Financial sponsorship"]
              }
            ].map((doc, index) => (
              <Card key={index} className="overflow-hidden">
                <img 
                  src={doc.image} 
                  alt={doc.title}
                  className="w-full h-32 object-cover"
                />
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{doc.title}</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    {doc.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Get Expert Visa Assistance
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Have questions about visa requirements? Our expert consultants are here to help you navigate the application process.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-visa-blue-lighter rounded-full flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5 text-visa-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone Support</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-visa-blue-lighter rounded-full flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5 text-visa-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Support</h3>
                    <p className="text-gray-600">support@visaservice.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-visa-blue-lighter rounded-full flex items-center justify-center mr-4">
                    <Clock className="h-5 w-5 text-visa-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Business Hours</h3>
                    <p className="text-gray-600">Mon-Fri: 9AM-6PM EST</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-8 bg-gray-50">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Request Consultation</h3>
              <form onSubmit={handleConsultationSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <Input
                      value={consultationForm.firstName}
                      onChange={(e) => setConsultationForm(prev => ({ ...prev, firstName: e.target.value }))}
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <Input
                      value={consultationForm.lastName}
                      onChange={(e) => setConsultationForm(prev => ({ ...prev, lastName: e.target.value }))}
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={consultationForm.email}
                    onChange={(e) => setConsultationForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <Input
                    type="tel"
                    value={consultationForm.phone}
                    onChange={(e) => setConsultationForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination Country
                  </label>
                  <Select 
                    value={consultationForm.destinationCountry} 
                    onValueChange={(value) => setConsultationForm(prev => ({ ...prev, destinationCountry: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination..." />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.name}>
                          {country.flag} {country.name}
                        </SelectItem>
                      ))}
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    value={consultationForm.message}
                    onChange={(e) => setConsultationForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell us about your travel plans..."
                    rows={4}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-visa-blue hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Request Consultation"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
