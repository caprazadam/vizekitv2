import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, MapPin, CreditCard, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatFee } from "@/lib/utils";

interface ApplicationData {
  applicationNumber: string;
  country: string;
  purpose: string;
  fee: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
  };
  status: string;
  submissionDate: string;
  estimatedProcessingDate: string;
}

export default function ApplicationStatus() {
  const [searchNumber, setSearchNumber] = useState("");
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchNumber.trim()) {
      toast({
        title: "Hata",
        description: "Lütfen başvuru numaranızı girin",
        variant: "destructive",
      });
      return;
    }

    if (!searchNumber.startsWith("VK")) {
      toast({
        title: "Geçersiz Format",
        description: "Başvuru numarası VK ile başlamalıdır",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get applications from localStorage (in production, this would be an API call)
      const applications = JSON.parse(localStorage.getItem('visa-applications') || '[]');
      const foundApplication = applications.find((app: ApplicationData) => 
        app.applicationNumber === searchNumber.toUpperCase()
      );

      if (foundApplication) {
        setApplicationData(foundApplication);
      } else {
        setApplicationData(null);
        toast({
          title: "Başvuru Bulunamadı",
          description: "Girdiğiniz numaraya ait bir başvuru bulunamadı. Lütfen numarayı kontrol edin.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Hata",
        description: "Başvuru sorgulanırken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Ödeme Alındı":
        return <CreditCard className="h-5 w-5 text-blue-600" />;
      case "İnceleniyor":
        return <Clock className="h-5 w-5 text-orange-600" />;
      case "Onaylandı":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "Reddedildi":
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ödeme Alındı":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "İnceleniyor":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Onaylandı":
        return "bg-green-100 text-green-800 border-green-200";
      case "Reddedildi":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-violet-50/30 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-4">
            Başvuru Durumu Sorgulama
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Vize başvurunuzun durumunu öğrenmek için başvuru numaranızı girin
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8 shadow-xl border-0 bg-gradient-to-br from-white via-purple-50/20 to-violet-50/10">
          <CardHeader className="bg-gradient-to-r from-purple-600/5 to-violet-600/5 border-b border-purple-200/30">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
              <Search className="h-6 w-6 mr-3 text-purple-600" />
              Başvuru Sorgulama
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="applicationNumber" className="text-base font-medium">
                  Başvuru Numarası
                </Label>
                <Input
                  id="applicationNumber"
                  value={searchNumber}
                  onChange={(e) => setSearchNumber(e.target.value.toUpperCase())}
                  placeholder="VK12345678"
                  className="mt-2 text-lg h-12"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <p className="text-sm text-gray-500 mt-2">
                  Başvuru numaranız VK ile başlar ve 10 haneden oluşur
                </p>
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="h-12 px-8 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 shadow-lg"
                >
                  {isSearching ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                      Sorgulanıyor...
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5 mr-2" />
                      Sorgula
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Details */}
        {applicationData && (
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white via-purple-50/20 to-violet-50/10">
            <CardHeader className="bg-gradient-to-r from-purple-600/5 to-violet-600/5 border-b border-purple-200/30">
              <CardTitle className="text-2xl font-bold text-gray-800">
                Başvuru Detayları
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Basic Info */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-purple-200/50 pb-2">
                      Genel Bilgiler
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Başvuru Numarası:</span>
                        <span className="font-mono font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded">
                          {applicationData.applicationNumber}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Hedef Ülke:</span>
                        <span className="font-medium flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-purple-600" />
                          {applicationData.country}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Seyahat Amacı:</span>
                        <span className="font-medium">{applicationData.purpose}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Ödenen Tutar:</span>
                        <span className="font-bold text-green-700">{formatFee(applicationData.fee)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-purple-200/50 pb-2">
                      Başvuru Sahibi
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ad Soyad:</span>
                        <span className="font-medium">
                          {applicationData.personalInfo.firstName} {applicationData.personalInfo.lastName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">E-posta:</span>
                        <span className="font-medium">{applicationData.personalInfo.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Info */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-purple-200/50 pb-2">
                      Durum Bilgisi
                    </h3>
                    <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200/50">
                      <div className="flex items-center justify-center mb-4">
                        <Badge className={`text-base px-4 py-2 ${getStatusColor(applicationData.status)}`}>
                          {getStatusIcon(applicationData.status)}
                          <span className="ml-2">{applicationData.status}</span>
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Başvuru Tarihi:
                          </span>
                          <span className="font-medium">
                            {new Date(applicationData.submissionDate).toLocaleDateString('tr-TR')}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            Tahmini Sonuç:
                          </span>
                          <span className="font-medium">
                            {new Date(applicationData.estimatedProcessingDate).toLocaleDateString('tr-TR')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200/50">
                    <h4 className="font-semibold text-blue-900 mb-3 text-lg">Önemli Bilgiler</h4>
                    <ul className="text-sm text-blue-700 space-y-2">
                      <li>• Başvuru durumunuz değiştiğinde e-posta ile bilgilendirileceksiniz</li>
                      <li>• Eksik evrak olması durumunda sizinle iletişime geçilecektir</li>
                      <li>• Başvuru numaranızı güvenli bir yerde saklayın</li>
                      <li>• Sorularınız için 0212 123 45 67 numaralı hattı arayabilirsiniz</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-8 shadow-xl border-0 bg-gradient-to-br from-white via-orange-50/20 to-yellow-50/10">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Yardıma mı ihtiyacınız var?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Search className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Başvuru Numaranızı Bulamıyor musunuz?</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Başvuru numaranız VK ile başlar ve başvuru sonrası size gönderilen e-postada bulunur.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <AlertCircle className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Başka Sorularınız mı var?</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Müşteri hizmetlerimizle iletişime geçin: 0212 123 45 67
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}