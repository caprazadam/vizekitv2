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
    return personalInfo.firstName && personalInfo.lastName && personalInfo.email && 
           personalInfo.phone && personalInfo.birthDate && personalInfo.address && 
           personalInfo.city && personalInfo.zipCode;
  };

  const validatePassportInfo = () => {
    return passportInfo.passportNumber && passportInfo.issueDate && 
           passportInfo.expiryDate && passportInfo.placeOfIssue;
  };

  const validatePaymentInfo = () => {
    return paymentInfo.cardNumber && paymentInfo.expiryMonth && 
           paymentInfo.expiryYear && paymentInfo.cvv && paymentInfo.cardholderName;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validatePersonalInfo()) {
      toast({
        title: "Eksik Bilgi",
        description: "Lütfen tüm kişisel bilgileri doldurun",
        variant: "destructive",
      });
      return;
    }
    if (currentStep === 2 && !validatePassportInfo()) {
      toast({
        title: "Eksik Bilgi", 
        description: "Lütfen tüm pasaport bilgileri doldurun",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!validatePaymentInfo()) {
      toast({
        title: "Eksik Bilgi",
        description: "Lütfen tüm ödeme bilgileri doldurun",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Başvuru Gönderildi",
        description: "Vize başvurunuz başarıyla alındı. 24 saat içinde size dönüş yapacağız.",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Hata",
        description: "Başvuru gönderilemedi. Lütfen tekrar deneyin.",
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
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 overflow-hidden">
      <Card className="w-full h-full rounded-none border-0 flex flex-col">
        <CardHeader className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-violet-600 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">
              {country.flag} {country.name} Vize Başvurusu
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="text-white hover:bg-white/20 hover:text-white w-10 h-10 rounded-full"
            >
              ✕
            </Button>
          </div>
          
          {/* Step indicator */}
          <div className="flex justify-center mt-6">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.number 
                    ? 'bg-white border-white text-purple-600' 
                    : 'border-white/50 text-white/70'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 ${
                    currentStep > step.number ? 'bg-white' : 'bg-white/30'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-3">
            <h3 className="font-medium text-white">{steps[currentStep - 1].title}</h3>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto space-y-6 p-6">
          {/* Application Summary */}
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-medium mb-2">Başvuru Özeti</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <div>Hedef Ülke: {country.name}</div>
              <div>Seyahat Amacı: {purpose}</div>
              <div>Hizmet Ücreti: <span className="font-medium text-green-600">{fee}</span></div>
            </div>
          </div>

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
              
              <div className="grid grid-cols-2 gap-4">
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

              <div className="grid grid-cols-2 gap-4">
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">Şehir *</Label>
                  <Input
                    id="city"
                    value={personalInfo.city}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="İstanbul"
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">Posta Kodu *</Label>
                  <Input
                    id="zipCode"
                    value={personalInfo.zipCode}
                    onChange={(e) => setPersonalInfo(prev => ({ ...prev, zipCode: e.target.value }))}
                    placeholder="34000"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Passport Information */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="passportNumber">Pasaport Numarası *</Label>
                <Input
                  id="passportNumber"
                  value={passportInfo.passportNumber}
                  onChange={(e) => setPassportInfo(prev => ({ ...prev, passportNumber: e.target.value }))}
                  placeholder="T12345678"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-medium text-blue-900 mb-2">Önemli Not</h5>
                <p className="text-sm text-blue-700">
                  Pasaportunuzun vize başvurusu tarihinden itibaren en az 6 ay geçerli olması gerekmektedir.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardholderName">Kart Sahibinin Adı *</Label>
                <Input
                  id="cardholderName"
                  value={paymentInfo.cardholderName}
                  onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardholderName: e.target.value }))}
                  placeholder="JOHN DOE"
                />
              </div>

              <div>
                <Label htmlFor="cardNumber">Kart Numarası *</Label>
                <Input
                  id="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={(e) => setPaymentInfo(prev => ({ ...prev, cardNumber: e.target.value }))}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="expiryMonth">Ay *</Label>
                  <Select value={paymentInfo.expiryMonth} onValueChange={(value) => setPaymentInfo(prev => ({ ...prev, expiryMonth: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ay" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                          {String(i + 1).padStart(2, '0')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="expiryYear">Yıl *</Label>
                  <Select value={paymentInfo.expiryYear} onValueChange={(value) => setPaymentInfo(prev => ({ ...prev, expiryYear: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Yıl" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => (
                        <SelectItem key={i} value={String(new Date().getFullYear() + i)}>
                          {new Date().getFullYear() + i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="cvv">CVV *</Label>
                  <Input
                    id="cvv"
                    value={paymentInfo.cvv}
                    onChange={(e) => setPaymentInfo(prev => ({ ...prev, cvv: e.target.value }))}
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-medium text-green-900 mb-2">Ödeme Özeti</h5>
                <div className="text-sm text-green-700">
                  <div className="flex justify-between">
                    <span>Hizmet Ücreti:</span>
                    <span className="font-medium">{fee}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-purple-200 bg-gray-50 p-4 -m-6 mt-6">
            {currentStep > 1 && (
              <Button variant="outline" onClick={handlePrevious} className="border-purple-300 text-purple-600 hover:bg-purple-50">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Geri
              </Button>
            )}
            
            <div className="ml-auto">
              {currentStep < 3 ? (
                <Button onClick={handleNext} className="bg-purple-600 hover:bg-purple-700">
                  İleri
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? "Gönderiliyor..." : "Başvuruyu Gönder"}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}