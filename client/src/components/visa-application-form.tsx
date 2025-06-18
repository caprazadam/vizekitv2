import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, CreditCard, FileText, User, ArrowLeft, ArrowRight, Building2, AlertCircle, Upload, X, Eye } from "lucide-react";
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
  passportImage?: string;
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
  const [paymentMethod, setPaymentMethod] = useState<'paytr' | 'bank' | 'paypal'>('paytr');
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
    passportImage: "",
  });
  const [passportImagePreview, setPassportImagePreview] = useState<string | null>(null);

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
    if (!passportInfo.passportImage) missing.push("Pasaport Görseli");
    return missing;
  };

  const handlePassportImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Geçersiz Dosya Türü",
        description: "Lütfen JPG, PNG veya PDF formatında dosya yükleyin",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "Dosya Çok Büyük",
        description: "Dosya boyutu 5MB'dan küçük olmalıdır",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target?.result as string;
      setPassportInfo(prev => ({ ...prev, passportImage: base64String }));
      setPassportImagePreview(base64String);
    };
    reader.readAsDataURL(file);
  };

  const removePassportImage = () => {
    setPassportInfo(prev => ({ ...prev, passportImage: "" }));
    setPassportImagePreview(null);
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
    // Skip payment validation for bank transfer since no card details needed
    if (paymentMethod !== 'bank') {
      const missingFields = validatePaymentInfo();
      if (missingFields.length > 0) {
        toast({
          title: "Eksik Bilgi",
          description: `Lütfen şu alanları doldurun: ${missingFields.join(", ")}`,
          variant: "destructive",
        });
        return;
      }
    }

    setIsSubmitting(true);
    try {
      // Generate application number with VK prefix
      const applicationNumber = `VK${Date.now().toString().slice(-8)}${Math.floor(Math.random() * 100).toString().padStart(2, '0')}`;
      
      let status = "";
      let successTitle = "";
      let successDescription = "";
      
      if (paymentMethod === 'paytr') {
        // Simulate PayTR payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        status = "Ödeme Alındı";
        successTitle = "PayTR Ödeme Başarılı";
        successDescription = `Başvuru numaranız: ${applicationNumber}. Kredi kartı ödemesi onaylandı. Başvuru özeti e-posta adresinize gönderilecektir.`;
      } else if (paymentMethod === 'bank') {
        // Bank transfer - no immediate payment processing
        await new Promise(resolve => setTimeout(resolve, 1000));
        status = "Transfer Bekleniyor";
        successTitle = "Başvuru Kaydedildi";
        successDescription = `Başvuru numaranız: ${applicationNumber}. Banka transfer bilgileri e-posta ile gönderildi. Transfer sonrası başvurunuz işleme alınacak.`;
      } else if (paymentMethod === 'paypal') {
        // Simulate PayPal payment processing
        await new Promise(resolve => setTimeout(resolve, 2500));
        status = "Ödeme Alındı";
        successTitle = "PayPal Ödeme Başarılı";
        successDescription = `Başvuru numaranız: ${applicationNumber}. PayPal ödemesi onaylandı. Başvuru özeti e-posta adresinize gönderilecektir.`;
      }
      
      // Store application data
      const applicationData = {
        applicationNumber,
        country: country.name,
        purpose,
        fee,
        personalInfo,
        passportInfo,
        paymentMethod,
        status,
        submissionDate: new Date().toISOString(),
        estimatedProcessingDate: new Date(Date.now() + (paymentMethod === 'bank' ? 7 : 5) * 24 * 60 * 60 * 1000).toISOString()
      };
      
      // Store in localStorage for demo
      const existingApplications = JSON.parse(localStorage.getItem('visa-applications') || '[]');
      existingApplications.push(applicationData);
      localStorage.setItem('visa-applications', JSON.stringify(existingApplications));
      
      toast({
        title: successTitle,
        description: successDescription,
        duration: 10000,
      });
      onClose();
    } catch (error) {
      const errorTitle = paymentMethod === 'bank' ? "Başvuru Hatası" : "Ödeme Hatası";
      const errorDescription = paymentMethod === 'bank' 
        ? "Başvuru kaydedilemedi. Lütfen tekrar deneyin."
        : "Ödeme işlemi gerçekleştirilemedi. Lütfen tekrar deneyin.";
        
      toast({
        title: errorTitle,
        description: errorDescription,
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

              {/* Passport Image Upload */}
              <div>
                <Label htmlFor="passportImage" className="text-base font-medium mb-3 block">
                  Pasaport Görseli *
                </Label>
                <div className="space-y-4">
                  {!passportImagePreview ? (
                    <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                      <input
                        id="passportImage"
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,application/pdf"
                        onChange={handlePassportImageUpload}
                        className="hidden"
                      />
                      <label
                        htmlFor="passportImage"
                        className="cursor-pointer flex flex-col items-center space-y-3"
                      >
                        <div className="bg-purple-100 p-3 rounded-full">
                          <Upload className="h-8 w-8 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-lg font-medium text-gray-700">Pasaport dosyasını yükleyin</p>
                          <p className="text-sm text-gray-500 mt-1">
                            JPG, PNG veya PDF formatında, maksimum 5MB
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          className="mt-3 border-purple-300 text-purple-700 hover:bg-purple-50"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Dosya Seç
                        </Button>
                      </label>
                    </div>
                  ) : (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="bg-green-100 p-2 rounded-full">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-green-800">Pasaport dosyası yüklendi</p>
                            <p className="text-sm text-green-600">
                              {passportImagePreview.includes('pdf') ? 'PDF Belgesi' : 'Görsel Dosyası'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!passportImagePreview.includes('pdf') && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const modal = document.createElement('div');
                                modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4';
                                modal.innerHTML = `
                                  <div class="bg-white rounded-lg p-4 max-w-4xl max-h-[90vh] overflow-auto">
                                    <div class="flex justify-between items-center mb-4">
                                      <h3 class="text-lg font-semibold">Pasaport Önizleme</h3>
                                      <button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
                                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                      </button>
                                    </div>
                                    <img src="${passportImagePreview}" class="w-full h-auto rounded-lg" alt="Pasaport Önizleme" />
                                  </div>
                                `;
                                document.body.appendChild(modal);
                              }}
                              className="border-blue-300 text-blue-700 hover:bg-blue-50"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Önizle
                            </Button>
                          )}
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={removePassportImage}
                            className="border-red-300 text-red-700 hover:bg-red-50"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Kaldır
                          </Button>
                        </div>
                      </div>
                      {!passportImagePreview.includes('pdf') && (
                        <div className="mt-3">
                          <img
                            src={passportImagePreview}
                            alt="Pasaport Önizleme"
                            className="w-32 h-20 object-cover rounded border"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200/50 shadow-sm">
                <h5 className="font-semibold text-blue-900 mb-3 text-lg">Önemli Notlar</h5>
                <ul className="text-base text-blue-700 space-y-2">
                  <li>• Pasaportunuzun vize başvurusu tarihinden itibaren en az 6 ay geçerli olması gerekmektedir</li>
                  <li>• Pasaport görseliniz net ve okunabilir olmalıdır</li>
                  <li>• Kabul edilen formatlar: JPG, PNG, PDF (maksimum 5MB)</li>
                </ul>
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

              {/* Payment Method Selection */}
              <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200/50 shadow-sm">
                <h5 className="font-semibold text-purple-900 mb-4 text-lg">Ödeme Yöntemi Seçin</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* PayTR Option */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paytr')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === 'paytr'
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="bg-white p-2 rounded-lg shadow-sm border mb-3 mx-auto w-fit">
                        <div className="text-lg font-bold text-blue-600">PayTR</div>
                      </div>
                      <h6 className="font-semibold text-gray-800 mb-2">Kredi Kartı</h6>
                      <p className="text-sm text-gray-600">Anında ödeme onayı</p>
                      <div className="flex justify-center mt-2">
                        <CheckCircle className={`h-5 w-5 ${paymentMethod === 'paytr' ? 'text-blue-600' : 'text-gray-300'}`} />
                      </div>
                    </div>
                  </button>

                  {/* Bank Transfer Option */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === 'bank'
                        ? 'border-green-500 bg-green-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-green-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="bg-white p-2 rounded-lg shadow-sm border mb-3 mx-auto w-fit">
                        <Building2 className="h-6 w-6 text-green-600" />
                      </div>
                      <h6 className="font-semibold text-gray-800 mb-2">Banka Transferi</h6>
                      <p className="text-sm text-gray-600">EFT/Havale ile ödeme</p>
                      <div className="flex justify-center mt-2">
                        <CheckCircle className={`h-5 w-5 ${paymentMethod === 'bank' ? 'text-green-600' : 'text-gray-300'}`} />
                      </div>
                    </div>
                  </button>

                  {/* PayPal Option */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      paymentMethod === 'paypal'
                        ? 'border-orange-500 bg-orange-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-orange-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="bg-white p-2 rounded-lg shadow-sm border mb-3 mx-auto w-fit">
                        <div className="text-lg font-bold text-orange-600">PayPal</div>
                      </div>
                      <h6 className="font-semibold text-gray-800 mb-2">PayPal</h6>
                      <p className="text-sm text-gray-600">Uluslararası ödeme</p>
                      <div className="flex justify-center mt-2">
                        <CheckCircle className={`h-5 w-5 ${paymentMethod === 'paypal' ? 'text-orange-600' : 'text-gray-300'}`} />
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* PayTR Payment Details */}
              {paymentMethod === 'paytr' && (
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
              )}

              {/* Bank Transfer Details */}
              {paymentMethod === 'bank' && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200/50 shadow-sm">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-white p-3 rounded-lg shadow-sm border">
                      <Building2 className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <h5 className="font-semibold text-green-900 mb-4 text-lg text-center">Banka Transferi Bilgileri</h5>
                  
                  <div className="bg-white p-4 rounded-lg border border-green-200/50 mb-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-600">Banka:</span>
                        <span className="font-bold">Türkiye İş Bankası</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-600">Hesap Sahibi:</span>
                        <span className="font-bold">VizeProTR Ltd. Şti.</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-600">IBAN:</span>
                        <span className="font-bold font-mono">TR64 0006 4000 0011 2345 6789 01</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-600">Şube Kodu:</span>
                        <span className="font-bold">1234</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200/50">
                    <h6 className="font-semibold text-orange-900 mb-2 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Önemli Bilgiler
                    </h6>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• Transfer açıklamasına adınızı ve telefon numaranızı yazın</li>
                      <li>• Dekont/makbuzun fotoğrafını e-posta ile gönderin</li>
                      <li>• İşlem süresi: 1-2 iş günü</li>
                      <li>• Transfer sonrası başvuru numaranız e-posta ile gönderilecek</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* PayPal Details */}
              {paymentMethod === 'paypal' && (
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl border border-orange-200/50 shadow-sm">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-white p-3 rounded-lg shadow-sm border">
                      <div className="text-2xl font-bold text-orange-600">PayPal</div>
                    </div>
                  </div>
                  <h5 className="font-semibold text-orange-900 mb-3 text-lg text-center">PayPal Güvenli Ödeme</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="text-sm text-orange-700 space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Uluslararası güvenli ödeme
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Kredi kartı koruması
                      </li>
                    </ul>
                    <ul className="text-sm text-orange-700 space-y-2">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Çoklu para birimi desteği
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                        Anında ödeme onayı
                      </li>
                    </ul>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-xs text-orange-600">
                      PayPal hesabınız veya kredi kartınız ile güvenli ödeme yapabilirsiniz
                    </p>
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-6 rounded-xl border border-violet-200/50 shadow-sm">
                <h5 className="font-semibold text-violet-900 mb-3 text-lg flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  Ödeme Sonrası Süreç
                </h5>
                <ul className="text-sm text-violet-700 space-y-2">
                  <li>• Başarılı ödeme sonrası başvuru numaranız oluşturulacak</li>
                  <li>• Başvuru özeti ve detayları e-posta adresinize gönderilecek</li>
                  <li>• E-postada başvuru numaranız ve takip bilgileri yer alacak</li>
                  <li>• Başvuru durumunuzu "Başvuru Sorgula" sayfasından takip edebilirsiniz</li>
                </ul>
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
                  className={`px-8 py-3 text-lg shadow-lg disabled:opacity-50 ${
                    paymentMethod === 'paytr' 
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                      : paymentMethod === 'bank'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                      : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600'
                  }`}
                >
                  {isSubmitting 
                    ? `${paymentMethod === 'paytr' ? 'PayTR ile Ödeme Yapılıyor...' : paymentMethod === 'bank' ? 'Başvuru Kaydediliyor...' : 'PayPal ile Ödeme Yapılıyor...'}`
                    : `${paymentMethod === 'paytr' ? 'PayTR ile Güvenli Ödeme' : paymentMethod === 'bank' ? 'Banka Transferi ile Başvur' : 'PayPal ile Güvenli Ödeme'}`
                  }
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