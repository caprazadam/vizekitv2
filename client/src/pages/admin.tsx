import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Calendar, 
  MapPin, 
  CreditCard, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Eye, 
  Edit,
  Users,
  TrendingUp,
  DollarSign,
  LogOut,
  Shield,
  FileImage,
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatFee } from "@/lib/utils";
import { useLocation } from "wouter";

interface ApplicationData {
  applicationNumber: string;
  country: string;
  purpose: string;
  fee: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    birthDate: string;
    nationality: string;
    address: string;
  };
  passportInfo: {
    passportNumber: string;
    issueDate: string;
    expiryDate: string;
    placeOfIssue: string;
    passportImage?: string;
  };
  paymentMethod?: string;
  status: string;
  submissionDate: string;
  estimatedProcessingDate: string;
}

export default function Admin() {
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<ApplicationData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState<ApplicationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadApplications();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    filterApplications();
  }, [applications, searchTerm, statusFilter]);

  const checkAuthentication = () => {
    const isAuth = localStorage.getItem('admin-authenticated');
    const loginTime = localStorage.getItem('admin-login-time');
    
    if (isAuth === 'true' && loginTime) {
      const timeDiff = Date.now() - parseInt(loginTime);
      const hoursPassed = timeDiff / (1000 * 60 * 60);
      
      // Session expires after 8 hours
      if (hoursPassed < 8) {
        setIsAuthenticated(true);
      } else {
        handleLogout();
      }
    } else {
      setLocation('/admin-login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-authenticated');
    localStorage.removeItem('admin-login-time');
    setIsAuthenticated(false);
    toast({
      title: "Oturum Sonlandırıldı",
      description: "Güvenli bir şekilde çıkış yaptınız",
    });
    setLocation('/admin-login');
  };

  const loadApplications = () => {
    setIsLoading(true);
    try {
      const storedApplications = JSON.parse(localStorage.getItem('visa-applications') || '[]');
      setApplications(storedApplications);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Başvurular yüklenirken bir hata oluştu",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterApplications = () => {
    let filtered = applications;

    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.personalInfo.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.personalInfo.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.personalInfo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    setFilteredApplications(filtered);
  };

  const updateApplicationStatus = (applicationNumber: string, newStatus: string) => {
    const updatedApplications = applications.map(app => 
      app.applicationNumber === applicationNumber 
        ? { ...app, status: newStatus }
        : app
    );
    
    setApplications(updatedApplications);
    localStorage.setItem('visa-applications', JSON.stringify(updatedApplications));
    
    if (selectedApplication?.applicationNumber === applicationNumber) {
      setSelectedApplication({ ...selectedApplication, status: newStatus });
    }

    toast({
      title: "Durum Güncellendi",
      description: `Başvuru ${applicationNumber} durumu "${newStatus}" olarak güncellendi`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Ödeme Alındı":
        return <CreditCard className="h-4 w-4 text-blue-600" />;
      case "Transfer Bekleniyor":
        return <DollarSign className="h-4 w-4 text-purple-600" />;
      case "İnceleniyor":
        return <Clock className="h-4 w-4 text-orange-600" />;
      case "Onaylandı":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Reddedildi":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ödeme Alındı":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Transfer Bekleniyor":
        return "bg-purple-100 text-purple-800 border-purple-200";
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

  const getStatistics = () => {
    const total = applications.length;
    const paid = applications.filter(app => app.status === "Ödeme Alındı").length;
    const processing = applications.filter(app => app.status === "İnceleniyor").length;
    const approved = applications.filter(app => app.status === "Onaylandı").length;
    const totalRevenue = applications.reduce((sum, app) => {
      const amount = parseFloat(app.fee.replace(/[₺,\s]/g, '')) || 0;
      return sum + amount;
    }, 0);

    return { total, paid, processing, approved, totalRevenue };
  };

  const stats = getStatistics();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-violet-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Yetkilendirme kontrol ediliyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-violet-50/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-4">
              Yönetici Paneli
            </h1>
            <p className="text-xl text-gray-600">
              Vize başvurularını yönetin ve takip edin
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center space-x-2 px-6 py-3 border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400"
          >
            <LogOut className="h-5 w-5" />
            <span>Çıkış Yap</span>
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Toplam Başvuru</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-green-50/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Onaylanan</p>
                  <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-orange-50/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">İnceleniyor</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.processing}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-emerald-50/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Toplam Gelir</p>
                  <p className="text-3xl font-bold text-emerald-600">{formatFee(stats.totalRevenue.toString())}</p>
                </div>
                <DollarSign className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8 shadow-lg border-0 bg-gradient-to-br from-white via-purple-50/20 to-violet-50/10">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Başvuru Filtrele</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="search">Arama</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Başvuru no, ad, e-posta, ülke..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="status">Durum</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Durum seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tümü</SelectItem>
                    <SelectItem value="Ödeme Alındı">Ödeme Alındı</SelectItem>
                    <SelectItem value="Transfer Bekleniyor">Transfer Bekleniyor</SelectItem>
                    <SelectItem value="İnceleniyor">İnceleniyor</SelectItem>
                    <SelectItem value="Onaylandı">Onaylandı</SelectItem>
                    <SelectItem value="Reddedildi">Reddedildi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  onClick={loadApplications}
                  className="w-full bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600"
                >
                  Yenile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Applications List */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white via-purple-50/20 to-violet-50/10">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">
                Başvurular ({filteredApplications.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-[600px] overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full" />
                </div>
              ) : filteredApplications.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>Başvuru bulunamadı</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredApplications.map((application) => (
                    <div
                      key={application.applicationNumber}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                        selectedApplication?.applicationNumber === application.applicationNumber
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 bg-white hover:border-purple-300'
                      }`}
                      onClick={() => setSelectedApplication(application)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-mono font-bold text-purple-700">
                            {application.applicationNumber}
                          </p>
                          <p className="text-sm text-gray-600">
                            {application.personalInfo.firstName} {application.personalInfo.lastName}
                          </p>
                        </div>
                        <Badge className={`${getStatusColor(application.status)}`}>
                          {getStatusIcon(application.status)}
                          <span className="ml-1">{application.status}</span>
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {application.country}
                          </span>
                          {application.passportInfo.passportImage && (
                            <span className="flex items-center text-green-600">
                              <FileImage className="h-3 w-3 mr-1" />
                              Belge Var
                            </span>
                          )}
                        </div>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(application.submissionDate).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Application Details */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-white via-purple-50/20 to-violet-50/10">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-800">Başvuru Detayları</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedApplication ? (
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 border-b border-purple-200/50 pb-2">
                      Genel Bilgiler
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Başvuru No:</span>
                        <span className="font-mono font-bold">{selectedApplication.applicationNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ülke:</span>
                        <span>{selectedApplication.country}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amaç:</span>
                        <span>{selectedApplication.purpose}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ücret:</span>
                        <span className="font-bold text-green-700">{formatFee(selectedApplication.fee)}</span>
                      </div>
                      {selectedApplication.paymentMethod && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Ödeme Yöntemi:</span>
                          <span className="font-semibold">
                            {selectedApplication.paymentMethod === 'paytr' ? 'PayTR (Kredi Kartı)' :
                             selectedApplication.paymentMethod === 'bank' ? 'Banka Transferi' :
                             selectedApplication.paymentMethod === 'paypal' ? 'PayPal' :
                             'Belirtilmemiş'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 border-b border-purple-200/50 pb-2">
                      Kişisel Bilgiler
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ad Soyad:</span>
                        <span>{selectedApplication.personalInfo.firstName} {selectedApplication.personalInfo.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">E-posta:</span>
                        <span>{selectedApplication.personalInfo.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Telefon:</span>
                        <span>{selectedApplication.personalInfo.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Doğum Tarihi:</span>
                        <span>{new Date(selectedApplication.personalInfo.birthDate).toLocaleDateString('tr-TR')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Uyruk:</span>
                        <span>{selectedApplication.personalInfo.nationality}</span>
                      </div>
                    </div>
                  </div>

                  {/* Passport Info */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 border-b border-purple-200/50 pb-2">
                      Pasaport Bilgileri
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pasaport No:</span>
                        <span className="font-mono">{selectedApplication.passportInfo.passportNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Veriliş Tarihi:</span>
                        <span>{new Date(selectedApplication.passportInfo.issueDate).toLocaleDateString('tr-TR')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Son Geçerlilik:</span>
                        <span>{new Date(selectedApplication.passportInfo.expiryDate).toLocaleDateString('tr-TR')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Veriliş Yeri:</span>
                        <span>{selectedApplication.passportInfo.placeOfIssue}</span>
                      </div>
                      {selectedApplication.passportInfo.passportImage && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Pasaport Görseli:</span>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const modal = document.createElement('div');
                                modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4';
                                modal.innerHTML = `
                                  <div class="bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-auto">
                                    <div class="flex justify-between items-center mb-4">
                                      <h3 class="text-xl font-semibold">Pasaport Belgesi - ${selectedApplication.applicationNumber}</h3>
                                      <button class="text-gray-500 hover:text-gray-700 p-2" onclick="this.closest('.fixed').remove()">
                                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                      </button>
                                    </div>
                                    ${selectedApplication.passportInfo.passportImage.includes('pdf') 
                                      ? `<div class="text-center p-8">
                                          <div class="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                            <svg class="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 1H7a2 2 0 00-2 2v16a2 2 0 002 2z" />
                                            </svg>
                                          </div>
                                          <p class="text-lg font-medium text-gray-800 mb-2">PDF Belgesi</p>
                                          <p class="text-gray-600 mb-4">PDF dosyaları tarayıcıda görüntülenemez</p>
                                          <a href="${selectedApplication.passportInfo.passportImage}" download="pasaport-${selectedApplication.applicationNumber}.pdf" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                            <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            PDF İndir
                                          </a>
                                        </div>`
                                      : `<div class="text-center">
                                          <img src="${selectedApplication.passportInfo.passportImage}" class="w-full h-auto rounded-lg shadow-lg max-w-2xl mx-auto" alt="Pasaport Belgesi" />
                                          <div class="mt-4">
                                            <a href="${selectedApplication.passportInfo.passportImage}" download="pasaport-${selectedApplication.applicationNumber}.jpg" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                              <svg class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                              </svg>
                                              Görseli İndir
                                            </a>
                                          </div>
                                        </div>`
                                    }
                                  </div>
                                `;
                                document.body.appendChild(modal);
                              }}
                              className="border-blue-300 text-blue-700 hover:bg-blue-50"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Görüntüle
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = selectedApplication.passportInfo.passportImage!;
                                link.download = `pasaport-${selectedApplication.applicationNumber}${selectedApplication.passportInfo.passportImage!.includes('pdf') ? '.pdf' : '.jpg'}`;
                                link.click();
                              }}
                              className="border-green-300 text-green-700 hover:bg-green-50"
                            >
                              <Download className="h-4 w-4 mr-1" />
                              İndir
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Management */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 border-b border-purple-200/50 pb-2">
                      Durum Yönetimi
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Mevcut Durum:</span>
                        <Badge className={`${getStatusColor(selectedApplication.status)}`}>
                          {getStatusIcon(selectedApplication.status)}
                          <span className="ml-1">{selectedApplication.status}</span>
                        </Badge>
                      </div>
                      
                      <div>
                        <Label htmlFor="newStatus">Durum Güncelle</Label>
                        <div className="flex gap-2 mt-2">
                          <Select 
                            onValueChange={(value) => updateApplicationStatus(selectedApplication.applicationNumber, value)}
                          >
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="Yeni durum seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Ödeme Alındı">Ödeme Alındı</SelectItem>
                              <SelectItem value="Transfer Bekleniyor">Transfer Bekleniyor</SelectItem>
                              <SelectItem value="İnceleniyor">İnceleniyor</SelectItem>
                              <SelectItem value="Onaylandı">Onaylandı</SelectItem>
                              <SelectItem value="Reddedildi">Reddedildi</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Eye className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p>Detayları görüntülemek için bir başvuru seçin</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}