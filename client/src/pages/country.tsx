import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, FileText, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import type { Country } from "@shared/schema";

export default function CountryPage() {
  const { code } = useParams();
  
  const { data: country, isLoading, error } = useQuery<Country>({
    queryKey: [`/api/countries/code/${code}`],
    enabled: !!code,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-visa-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Ülke bilgileri yükleniyor...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Ülke Bulunamadı</h1>
            <p className="text-gray-600 mb-6">İstenen ülke bilgisi bulunamadı.</p>
            <Link href="/">
              <Button className="bg-visa-blue hover:bg-blue-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Ana Sayfaya Dön
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative">
        <div className="h-64 lg:h-96 overflow-hidden">
          <img 
            src={country.image} 
            alt={`${country.name} landmarks`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-6xl lg:text-8xl mb-4">{country.flag}</div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-2">{country.name}</h1>
              <p className="text-xl lg:text-2xl">{country.description}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Ülkelere Dön
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Visa Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-visa-blue" />
                  Vize Gereksinimleri
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  {country.visaRequired ? (
                    <Badge variant="destructive">Vize Gerekli</Badge>
                  ) : (
                    <Badge className="bg-green-500">Vizesiz</Badge>
                  )}
                  {country.eVisaAvailable && (
                    <Badge className="bg-blue-500">e-Vize Mevcut</Badge>
                  )}
                  {country.visaOnArrival && (
                    <Badge className="bg-yellow-500">Varışta Vize</Badge>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-visa-blue" />
                      <h3 className="font-semibold">İşlem Süresi</h3>
                    </div>
                    <p className="text-gray-600">{country.processingTime}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">Vize Ücreti</h3>
                    </div>
                    <p className="text-green-600 font-medium">{country.fee}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Document Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Gerekli Belgeler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Temel Belgeler</h4>
                    <ul className="space-y-2">
                      {[
                        "Geçerli pasaport (6+ ay)",
                        "Pasaport fotoğrafları",
                        "Doldurulmuş vize başvuru formu",
                        "Seyahat sigortası belgesi"
                      ].map((doc, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Destekleyici Belgeler</h4>
                    <ul className="space-y-2">
                      {[
                        "Banka hesap özetleri (3-6 ay)",
                        "Uçak rezervasyonu",
                        "Otel rezervasyonları",
                        "İş belgesi"
                      ].map((doc, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Process */}
            <Card>
              <CardHeader>
                <CardTitle>Başvuru Süreci</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      step: "1",
                      title: "Belgeleri Hazırlayın",
                      description: "Yukarıdaki kontrol listesine göre gerekli tüm belgeleri toplayın."
                    },
                    {
                      step: "2",
                      title: "Başvuruyu Tamamlayın",
                      description: "Vize başvuru formunu eksiksiz ve doğru bir şekilde doldurun."
                    },
                    {
                      step: "3",
                      title: "Başvuruyu Gönderin",
                      description: "Başvurunuzu büyükelçilik veya konsolosluğa iletin."
                    },
                    {
                      step: "4",
                      title: "Durumu Takip Edin",
                      description: "Başvuru durumunuzu izleyin ve onay için bekleyin."
                    }
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="w-8 h-8 bg-visa-blue rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Hızlı İşlemler</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-visa-blue hover:bg-blue-700">
                  Vize Başvurusu Başlat
                </Button>
                <Button variant="outline" className="w-full">
                  Uzman Danışmanlığı Al
                </Button>
                <Button variant="outline" className="w-full">
                  Belge Listesini İndir
                </Button>
              </CardContent>
            </Card>

            {/* Important Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Önemli Notlar</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    İşlem süreleri büyükelçilik iş yoğunluğuna göre değişebilir
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    İşlem sırasında ek belgeler istenebilir
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    Vize ücretleri başvuru reddedilse bile iade edilmez
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    Planlanan seyahat tarihinden önce başvuru yapın
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card>
              <CardHeader>
                <CardTitle>Yardıma İhtiyacınız mı Var?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Vize uzmanlarımız başvurunuzda size yardımcı olmak için burada.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Telefon:</span>
                    <span>+90 (212) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">E-posta:</span>
                    <span>info@vizehizmet.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
