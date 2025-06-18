import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ServiceCard from "@/components/service-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Users, Award } from "lucide-react";
import type { Service } from "@shared/schema";

export default function Services() {
  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="gradient-hero text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Vize Hizmetlerimiz
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Seyahat planlamanızı kolaylaştıran kapsamlı vize yardım hizmetleri
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Tüm Hizmetlerimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vize başvuru sürecinizin her aşamasında profesyonel destek
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Hizmet Sürecimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vize başvurunuzdan onaya kadar her adımda yanınızdayız
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Danışmanlık",
                description: "Uzman ekibimizle ücretsiz ön görüşme yapın",
                icon: <Users className="h-8 w-8" />
              },
              {
                step: "2",
                title: "Belge Hazırlığı",
                description: "Gerekli belgeleri hazırlama konusunda rehberlik",
                icon: <CheckCircle className="h-8 w-8" />
              },
              {
                step: "3",
                title: "Başvuru",
                description: "Başvurunuzu konsolosluk/elçiliğe iletim",
                icon: <Award className="h-8 w-8" />
              },
              {
                step: "4",
                title: "Takip",
                description: "Başvuru durumunuzu sürekli takip ediyoruz",
                icon: <Clock className="h-8 w-8" />
              }
            ].map((item) => (
              <Card key={item.step} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-20 h-20 bg-visa-blue rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                    <span className="text-2xl font-bold">{item.step}</span>
                  </div>
                  <div className="w-16 h-16 bg-visa-blue-lighter rounded-full flex items-center justify-center mx-auto mb-6 text-visa-blue">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Hizmet Paketleri
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              İhtiyacınıza uygun paket seçin
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Temel",
                price: "99₺",
                period: "/başvuru",
                features: [
                  "Vize gereksinim kontrolü",
                  "Belge listesi hazırlama",
                  "Temel danışmanlık",
                  "Email desteği"
                ],
                popular: false
              },
              {
                name: "Profesyonel",
                price: "199₺",
                period: "/başvuru",
                features: [
                  "Tüm temel hizmetler",
                  "Belge inceleme",
                  "Başvuru formu doldurmada yardım",
                  "Telefon desteği",
                  "Başvuru takibi"
                ],
                popular: true
              },
              {
                name: "Premium",
                price: "299₺",
                period: "/başvuru",
                features: [
                  "Tüm profesyonel hizmetler",
                  "Randevu alma yardımı",
                  "Hızlı işlem garantisi",
                  "24/7 destek",
                  "Kişisel danışman",
                  "Geri ödeme garantisi"
                ],
                popular: false
              }
            ].map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-visa-blue' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-visa-blue text-white px-4 py-1 rounded-full text-sm font-medium">
                      En Popüler
                    </span>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-4xl font-bold text-visa-blue">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-visa-blue hover:bg-blue-700' : 'bg-gray-800 hover:bg-gray-900'}`}
                  >
                    Paketi Seç
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Sık Sorulan Sorular
            </h2>
            <p className="text-xl text-gray-600">
              Hizmetlerimiz hakkında merak ettikleriniz
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "Vize başvurum reddedilirse ne olur?",
                answer: "Premium paketimizde geri ödeme garantisi sunuyoruz. Diğer paketlerde ise ücretsiz tekrar başvuru hakkı veriyoruz."
              },
              {
                question: "İşlem süresi ne kadar?",
                answer: "İşlem süresi ülkeye ve vize türüne göre değişir. Genellikle 3-15 iş günü arasında değişmektedir."
              },
              {
                question: "Hangi ülkeler için hizmet veriyorsunuz?",
                answer: "200'den fazla ülke için vize danışmanlığı ve başvuru hizmeti veriyoruz."
              },
              {
                question: "Acil durumlarda ne yapmalıyım?",
                answer: "Premium müşterilerimiz için 24/7 acil destek hattımız mevcuttur. Hızlı işlem seçeneği ile 1-3 gün içinde sonuç alabilirsiniz."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
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