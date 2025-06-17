import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Globe, Award, Shield } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="gradient-hero text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Hakkımızda
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Dünya çapında vize gereksinimlerini ve başvuru süreçlerini kolaylaştıran güvenilir ortağınız
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Misyonumuz
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Seyahat planlamanızı kolaylaştırmak ve vize başvuru sürecinizi sorunsuz hale getirmek için buradayız. 
                Uzman ekibimizle, 200'den fazla ülke için güncel vize bilgileri ve profesyonel rehberlik sunuyoruz.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Her yolculuğun benzersiz olduğunu biliyoruz. Bu yüzden kişiselleştirilmiş hizmetler sunarak, 
                vize sürecinizi en az stresli şekilde geçirmenizi sağlıyoruz.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-visa-blue mb-2">10K+</div>
                  <div className="text-gray-600">Başarılı Başvuru</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-visa-blue mb-2">200+</div>
                  <div className="text-gray-600">Ülke Kapsamı</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Takım çalışması"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Değerlerimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Her adımda size rehberlik eden temel ilkelerimiz
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Güvenilirlik",
                description: "Verilerinizin güvenliği ve gizliliği bizim için öncelik"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Uzman Destek",
                description: "Deneyimli vize uzmanlarından profesyonel rehberlik"
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Küresel Kapsam",
                description: "Dünya genelinde 200+ ülke için güncel bilgiler"
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "Kalite",
                description: "Her başvuruda en yüksek kalite standartları"
              }
            ].map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-visa-blue-lighter rounded-full flex items-center justify-center mx-auto mb-6 text-visa-blue">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Uzman Ekibimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Alanında uzman vize danışmanlarımız size en iyi hizmeti sunmak için burada
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Ahmet Kaya",
                role: "Baş Vize Uzmanı",
                experience: "15+ yıl deneyim",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
              },
              {
                name: "Elif Demir",
                role: "Avrupa Vize Uzmanı",
                experience: "12+ yıl deneyim",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
              },
              {
                name: "Mehmet Şahin",
                role: "Amerika Vize Uzmanı",
                experience: "10+ yıl deneyim",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
              }
            ].map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-visa-blue font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Neden Bizi Tercih Etmelisiniz?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vize sürecinizde size özel avantajlar
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              "Hızlı ve güvenilir vize bilgi sistemi",
              "24/7 müşteri destek hizmeti",
              "Güncel vize gereksinimleri ve ücretleri",
              "Kapsamlı belge kontrol listesi",
              "Uzman vize danışmanlığı",
              "Başvuru durumu takip sistemi",
              "Çoklu dil desteği",
              "Güvenli ödeme sistemleri"
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}