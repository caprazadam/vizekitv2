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
  DollarSign
} from "lucide-react";
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
  const { toast } = useToast();

  useEffect(() => {
    loadApplications();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, searchTerm, statusFilter]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-violet-50/30 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-4">
            Yönetici Paneli
          </h1>
          <p className="text-xl text-gray-600">
            Vize başvurularını yönetin ve takip edin
          </p>
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
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {application.country}
                        </span>
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