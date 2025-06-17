import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, CreditCard, FileText, User, ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Country } from "@shared/schema";

interface VisaApplicationFormProps {
  country: Country;
  purpose: string;
  fee: string;
  onClose: () => void;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  nationality: string;
  address: string;
  city: string;
  zipCode: string;
}

interface PassportInfo {
  passportNumber: string;
  issueDate: string;
  expiryDate: string;
  placeOfIssue: string;
}

interface PaymentInfo {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardholderName: string;
}

export default function VisaApplicationForm({ country, purpose, fee, onClose }: VisaApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    nationality: "Türkiye",
    address: "",
    city: "",
    zipCode: "",
  });

  const [passportInfo, setPassportInfo] = useState<PassportInfo>({
    passportNumber: "",
    issueDate: "",
    expiryDate: "",
    placeOfIssue: "",
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardholderName: "",
  });

  const validatePersonalInfo = () => {
    const missing = [];
    if (!personalInfo.firstName) missing.push("Ad");
    if (!personalInfo.lastName) missing.push("Soyad");
    if (!personalInfo.email) missing.push("E-posta");
    if (!personalInfo.phone) missing.push("Telefon");
    if (!personalInfo.birthDate) missing.push("Doğum Tarihi");
    if (!personalInfo.nationality) missing.push("Uyruk");
    if (!personalInfo.address) missing.push("Adres");
    return missing;
  };

  const validatePassportInfo = () => {
    const missing = [];
    if (!passportInfo.passportNumber) missing.push("Pasaport Numarası");
    if (!passportInfo.issueDate) missing.push("Veriliş Tarihi");
    if (!passportInfo.expiryDate) missing.push("Son Geçerlilik Tarihi");
    if (!passportInfo.placeOfIssue) missing.push("Veriliş Yeri");
    return missing;
  };

  const validatePaymentInfo = () => {
    // PayTR integration - no form validation needed for payment step
    // Payment will be handled through PayTR's secure gateway
    return [];
  };

  const handleNext = () => {
    if (currentStep === 1) {
      const missingFields = validatePersonalInfo();
      if (missingFields.length > 0) {
        toast({
          title: "Eksik Bilgi",
          description: `Lütfen şu alanları doldurun: ${missingFields.join(", ")}`,
          variant: "destructive",
        });
        return;
      }
    }
    if (currentStep === 2) {
      const missingFields = validatePassportInfo();
      if (missingFields.length > 0) {
        toast({
          title: "Eksik Bilgi", 
          description: `Lütfen şu alanları doldurun: ${missingFields.join(", ")}`,
          variant: "destructive",
        });
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    const missingFields = validatePaymentInfo();
    if (missingFields.length > 0) {
      toast({
        title: "Eksik Bilgi",
        description: `Lütfen şu alanları doldurun: ${missingFields.join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Generate application number with VK prefix
      const applicationNumber = `VK${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 100).toString().padStart(2, '0')}`;
      
      // Simulate PayTR payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store application data (in real implementation, this would go to backend)
      const applicationData = {
        applicationNumber,
        country: country.name,
        purpose,
        fee,
        personalInfo,
        passportInfo,
        status: "Ödeme Alındı",
        submissionDate: new Date().toISOString(),
        estimatedProcessingDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days from now
      };
      
      // Store in localStorage for demo (in production, use backend)
      const existingApplications = JSON.parse(localStorage.getItem('visa-applications') || '[]');
      existingApplications.push(applicationData);
      localStorage.setItem('visa-applications', JSON.stringify(existingApplications));
      
      toast({
        title: "Ödeme Başarılı",
        description: `Başvuru numaranız: ${applicationNumber}. Bu numarayı saklayın ve başvuru durumunuzu takip edin.`,
        duration: 8000,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Ödeme Hatası",
        description: "Ödeme işlemi gerçekleştirilemedi. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { number: 1, title: "Kişisel Bilgiler", icon: User },
    { number: 2, title: "Pasaport Bilgileri", icon: FileText },
    { number: 3, title: "Ödeme", icon: CreditCard },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
      <Card className="w-full max-w-5xl max-h-[95vh] overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-white via-purple-50/30 to-violet-50/20">
        <div className="max-h-[95vh] overflow-y-auto">
          <CardHeader className="bg-gradient-to-r from-purple-600/5 to-violet-600/5 border-b border-purple-200/30">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                {country.flag} {country.name} Vize Başvurusu
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClose}
                className="w-10 h-10 p-0 hover:bg-purple-100 rounded-full border border-purple-200 shadow-sm"
              >
                <span className="text-purple-600 font-bold">✕</span>
              </Button>
            </div>
            
            {/* Step indicator */}
            <div className="flex justify-center mt-8">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    currentStep >= step.number 
                      ? 'bg-gradient-to-r from-purple-500 to-violet-500 border-purple-500 text-white shadow-lg' 
                      : 'border-gray-300 text-gray-400 bg-white'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <step.icon className="h-6 w-6" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-20 h-1 rounded transition-all duration-300 ${
                      currentStep > step.number ? 'bg-gradient-to-r from-purple-500 to-violet-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold text-gray-800">{steps[currentStep - 1].title}</h3>
            </div>
          </CardHeader>

          <CardContent className="space-y-8 p-6 sm:p-8">
            {/* Application Summary */}
            <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200/50 shadow-sm">
            <h4 className="font-medium mb-2">Başvuru Özeti</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <div>Hedef Ülke: {country.name}</div>
              <div>Seyahat Amacı: {purpose}</div>
              <div>Hizmet Ücreti: <span className="font-medium text-green-600">{fee}</span></div>
            </div>
          </div>

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h4 className="font-semibold text-xl text-gray-800 border-b border-purple-200/50 pb-3">Kişisel Bilgiler</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">Ad *</Label>
                  <Input
                    id="firstName"
                    value={personalInfo.firstName}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, firstName: e.target.value }))}
                    placeholder="Adınız"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Soyad *</Label>
                  <Input
                    id="lastName"
                    value={personalInfo.lastName}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, lastName: e.target.value }))}
                    placeholder="Soyadınız"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email">E-posta *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="ornek@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefon *</Label>
                  <Input
                    id="phone"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+90 555 123 45 67"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="birthDate">Doğum Tarihi *</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={personalInfo.birthDate}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, birthDate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="nationality">Vatandaşlık *</Label>
                  <Select value={personalInfo.nationality} onValueChange={(value) => setPersonalInfo(prev => ({ ...prev, nationality: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Türkiye">Türkiye</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="address">Adres *</Label>
                <Textarea
                  id="address"
                  value={personalInfo.address}
                  onChange={(e) => setPersonalInfo(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Tam adresinizi yazın"
                  rows={3}
                />
              </div>


            </div>
          )}

          {/* Step 2: Passport Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h4 className="font-semibold text-xl text-gray-800 border-b border-purple-200/50 pb-3">Pasaport Bilgileri</h4>
              <div>
                <Label htmlFor="passportNumber">Pasaport Numarası *</Label>
                <Input
                  id="passportNumber"
                  value={passportInfo.passportNumber}
                  onChange={(e) => setPassportInfo(prev => ({ ...prev, passportNumber: e.target.value }))}
                  placeholder="T12345678"
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="issueDate">Veriliş Tarihi *</Label>
                  <Input
                    id="issueDate"
                    type="date"
                    value={passportInfo.issueDate}
                    onChange={(e) => setPassportInfo(prev => ({ ...prev, issueDate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="expiryDate">Son Geçerlilik Tarihi *</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={passportInfo.expiryDate}
                    onChange={(e) => setPassportInfo(prev => ({ ...prev, expiryDate: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="placeOfIssue">Veriliş Yeri *</Label>
                <Input
                  id="placeOfIssue"
                  value={passportInfo.placeOfIssue}
                  onChange={(e) => setPassportInfo(prev => ({ ...prev, placeOfIssue: e.target.value }))}
                  placeholder="İstanbul"
                  className="mt-2"
                />
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200/50 shadow-sm">
                <h5 className="font-semibold text-blue-900 mb-3 text-lg">Önemli Not</h5>
                <p className="text-base text-blue-700">
                  Pasaportunuzun vize başvurusu tarihinden itibaren en az 6 ay geçerli olması gerekmektedir.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h4 className="font-semibold text-xl text-gray-800 border-b border-purple-200/50 pb-3">Güvenli Ödeme</h4>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200/50 shadow-sm">
                <h5 className="font-semibold text-green-900 mb-4 text-lg">Ödeme Özeti</h5>
                <div className="text-base text-green-700">
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Hizmet Ücreti:</span>
                    <span className="font-bold text-xl text-green-800">{fee}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200/50 shadow-sm">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm border">
                    <div className="text-2xl font-bold text-blue-600">PayTR</div>
                  </div>
                </div>
                <h5 className="font-semibold text-blue-900 mb-3 text-lg text-center">PayTR Güvenli Ödeme</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="text-sm text-blue-700 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      256-bit SSL şifrelemesi
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      3D Secure doğrulama
                    </li>
                  </ul>
                  <ul className="text-sm text-blue-700 space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      Visa, Mastercard, Amex
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      Anında ödeme onayı
                    </li>
                  </ul>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-xs text-blue-600">
                    Kredi kartı bilgileriniz PayTR güvenli ödeme altyapısında işlenir
                  </p>
                </div>
              </div>


            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-purple-200/30">
            {currentStep > 1 && (
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                className="px-8 py-3 text-lg border-purple-300 hover:bg-purple-50 hover:border-purple-400"
              >
                <ArrowLeft className="h-5 w-5 mr-3" />
                Geri
              </Button>
            )}
            
            <div className="ml-auto">
              {currentStep < 3 ? (
                <Button 
                  onClick={handleNext} 
                  className="px-8 py-3 text-lg bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 shadow-lg"
                >
                  İleri
                  <ArrowRight className="h-5 w-5 ml-3" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                  className="px-8 py-3 text-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? "PayTR ile Ödeme Yapılıyor..." : "PayTR ile Güvenli Ödeme"}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
        </div>
      </Card>
    </div>
  );
}