import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, DollarSign, FileText, Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Country } from "@shared/schema";

interface VisaCheckResult {
  fromCountry: Country;
  toCountry: Country;
  purpose: string;
  visaRequired: boolean;
  eVisaAvailable: boolean;
  visaOnArrival: boolean;
  processingTime: string;
  fee: string;
  customMessage?: string;
  documents: string[];
}

export default function VisaCheckerForm() {
  const [fromCountry, setFromCountry] = useState<string>("TR");
  const [toCountry, setToCountry] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [result, setResult] = useState<VisaCheckResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  const { data: countries = [] } = useQuery<Country[]>({
    queryKey: ["/api/countries"],
  });

  // Auto-fill form from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const fromParam = urlParams.get('from');
    const toParam = urlParams.get('to');
    const purposeParam = urlParams.get('purpose');

    if (fromParam) setFromCountry(fromParam);
    if (toParam) setToCountry(toParam);
    if (purposeParam) setPurpose(purposeParam);

    // Auto-submit if all parameters are present
    if (fromParam && toParam && purposeParam) {
      const autoSubmit = async () => {
        setIsChecking(true);
        try {
          const response = await apiRequest("POST", "/api/visa-check", {
            fromCountry: fromParam,
            toCountry: toParam,
            purpose: purposeParam,
          });
          const data = await response.json();
          setResult(data);
        } catch (error) {
          toast({
            title: "Hata",
            description: "Vize gereksinimleri kontrol edilemedi. Lütfen tekrar deneyin.",
            variant: "destructive",
          });
        } finally {
          setIsChecking(false);
        }
      };
      autoSubmit();
    }
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fromCountry || !toCountry || !purpose) {
      toast({
        title: "Eksik Bilgi",
        description: "Lütfen tüm alanları doldurun",
        variant: "destructive",
      });
      return;
    }

    setIsChecking(true);
    try {
      const response = await apiRequest("POST", "/api/visa-check", {
        fromCountry,
        toCountry,
        purpose,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to check visa requirements. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card className="shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Vizeyi Kontrol Et</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vatandaşlığınız
              </label>
              <Select value={fromCountry} onValueChange={setFromCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Ülkenizi seçin..." />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.flag} {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gideceğiniz Ülke
              </label>
              <Select value={toCountry} onValueChange={setToCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Hedef ülke seçin..." />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                      {country.flag} {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seyahat Amacı
              </label>
              <Select value={purpose} onValueChange={setPurpose}>
                <SelectTrigger>
                  <SelectValue placeholder="Amaç seçin..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tourist">Turistik Vize</SelectItem>
                  <SelectItem value="business">Ticari Vize / İş Vizesi</SelectItem>
                  <SelectItem value="student">Öğrenci / Eğitim Vizesi</SelectItem>
                  <SelectItem value="family">Aile Birleşimi Vizesi</SelectItem>
                  <SelectItem value="work">Çalışma Vizesi</SelectItem>
                  <SelectItem value="transit">Transit Vize</SelectItem>
                  <SelectItem value="medical">Sağlık (Tedavi) Vizesi</SelectItem>
                  <SelectItem value="official">Resmi/Diplomatik Vize</SelectItem>
                  <SelectItem value="cultural">Kültürel Etkinlik Vizesi</SelectItem>
                  <SelectItem value="investor">Yatırımcı / Girişimci Vizesi</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-visa-blue hover:bg-blue-700"
              disabled={isChecking}
            >
              {isChecking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Vizeyi Kontrol Et
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {result.toCountry.flag} {result.toCountry.name} - Vize Gereksinimleri
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {result.customMessage && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="space-y-2">
                    <h4 className="font-medium text-green-800">Ücretsiz Giriş</h4>
                    <p className="text-sm text-green-700 whitespace-pre-line">{result.customMessage}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {result.visaRequired ? (
                <Badge variant="destructive">Vize Gerekli</Badge>
              ) : (
                <Badge className="bg-green-500">Vizesiz</Badge>
              )}
              {result.eVisaAvailable && (
                <Badge className="bg-blue-500">e-Vize Mevcut</Badge>
              )}
              {result.visaOnArrival && (
                <Badge className="bg-yellow-500">Varışta Vize</Badge>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-visa-blue" />
                <div>
                  <div className="text-sm text-gray-600">İşlem Süresi</div>
                  <div className="font-medium">{result.processingTime}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-visa-blue" />
                <div>
                  <div className="text-sm text-gray-600">Ücret</div>
                  <div className="font-medium text-green-600">{result.fee}</div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-4 w-4 text-visa-blue" />
                <h4 className="font-semibold">Gerekli Belgeler</h4>
              </div>
              <ul className="space-y-2">
                {result.documents.map((doc, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            <Button className="w-full bg-visa-blue hover:bg-blue-700">
              Başvuru Sürecini Başlat
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
