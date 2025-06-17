import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import type { Country } from "@shared/schema";

export default function Contact() {
  const [consultationForm, setConsultationForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    destinationCountry: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const { data: countries = [] } = useQuery<Country[]>({
    queryKey: ["/api/countries"],
  });

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

      {/* Hero Section */}
      <section className="gradient-hero text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            İletişim
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Vize konularında uzman desteği almak için bizimle iletişime geçin
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              {
                icon: <Phone className="h-8 w-8" />,
                title: "Telefon",
                info: "+90 (212) 123-4567",
                description: "7/24 destek hattı"
              },
              {
                icon: <Mail className="h-8 w-8" />,
                title: "E-posta",
                info: "info@vizehizmet.com",
                description: "Sorularınız için"
              },
              {
                icon: <MapPin className="h-8 w-8" />,
                title: "Adres",
                info: "Levent Mahallesi, Büyükdere Cad. No:123",
                description: "İstanbul, Türkiye"
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: "Çalışma Saatleri",
                info: "Pzt-Cum: 09:00-18:00",
                description: "Hafta sonu randevu ile"
              }
            ].map((contact, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-visa-blue-lighter rounded-full flex items-center justify-center mx-auto mb-6 text-visa-blue">
                    {contact.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{contact.title}</h3>
                  <p className="text-visa-blue font-medium mb-2">{contact.info}</p>
                  <p className="text-gray-600 text-sm">{contact.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Uzman Vize Danışmanlığı
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Vize gereksinimleri hakkında sorularınız mı var? Uzman danışmanlarımız size yardımcı olmak için burada.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-visa-blue-lighter rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <MessageCircle className="h-5 w-5 text-visa-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Ücretsiz Ön Danışmanlık</h3>
                    <p className="text-gray-600">İlk görüşmeniz tamamen ücretsiz. Vize süreciniz hakkında genel bilgi alın.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-visa-blue-lighter rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock className="h-5 w-5 text-visa-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Hızlı Yanıt</h3>
                    <p className="text-gray-600">Taleplerinize 24 saat içinde dönüş yapıyoruz. Acil durumlar için telefon desteği.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-visa-blue-lighter rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="h-5 w-5 text-visa-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Kişisel Destek</h3>
                    <p className="text-gray-600">Size özel danışman ataması ile süreç boyunca tek noktadan destek.</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="p-8 bg-white shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Danışmanlık Talep Formu</h3>
              <form onSubmit={handleConsultationSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adınız *
                    </label>
                    <Input
                      value={consultationForm.firstName}
                      onChange={(e) => setConsultationForm(prev => ({ ...prev, firstName: e.target.value }))}
                      placeholder="Adınız"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Soyadınız *
                    </label>
                    <Input
                      value={consultationForm.lastName}
                      onChange={(e) => setConsultationForm(prev => ({ ...prev, lastName: e.target.value }))}
                      placeholder="Soyadınız"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta Adresiniz *
                  </label>
                  <Input
                    type="email"
                    value={consultationForm.email}
                    onChange={(e) => setConsultationForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="ornek@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon Numaranız *
                  </label>
                  <Input
                    type="tel"
                    value={consultationForm.phone}
                    onChange={(e) => setConsultationForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+90 (555) 123-4567"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hedef Ülke
                  </label>
                  <Select 
                    value={consultationForm.destinationCountry} 
                    onValueChange={(value) => setConsultationForm(prev => ({ ...prev, destinationCountry: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Gitmek istediğiniz ülkeyi seçin..." />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.name}>
                          {country.flag} {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mesajınız *
                  </label>
                  <Textarea
                    value={consultationForm.message}
                    onChange={(e) => setConsultationForm(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Vize başvurunuz hakkında detayları buraya yazabilirsiniz..."
                    rows={5}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-visa-blue hover:bg-blue-700 text-lg py-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Gönderiliyor..." : "Danışmanlık Talebi Gönder"}
                </Button>
                <p className="text-sm text-gray-500 text-center">
                  * Zorunlu alanlar. Kişisel verileriniz güvenlik altındadır.
                </p>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Ofis Lokasyonlarımız
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Size en yakın ofisimizden hizmet alabilirsiniz
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                city: "İstanbul - Levent",
                address: "Büyükdere Cad. No:123, Levent",
                phone: "+90 (212) 123-4567",
                hours: "Pzt-Cum: 09:00-18:00"
              },
              {
                city: "Ankara - Çankaya",
                address: "Atatürk Bulvarı No:456, Çankaya",
                phone: "+90 (312) 123-4567",
                hours: "Pzt-Cum: 09:00-18:00"
              },
              {
                city: "İzmir - Alsancak",
                address: "Cumhuriyet Cad. No:789, Alsancak",
                phone: "+90 (232) 123-4567",
                hours: "Pzt-Cum: 09:00-18:00"
              }
            ].map((office, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{office.city}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <MapPin className="h-4 w-4 text-visa-blue mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{office.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-visa-blue mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{office.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-visa-blue mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{office.hours}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 border-visa-blue text-visa-blue hover:bg-visa-blue hover:text-white">
                    Randevu Al
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}