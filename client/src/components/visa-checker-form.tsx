import { useState } from "react";
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
  documents: string[];
}

export default function VisaCheckerForm() {
  const [fromCountry, setFromCountry] = useState<string>("");
  const [toCountry, setToCountry] = useState<string>("");
  const [purpose, setPurpose] = useState<string>("");
  const [result, setResult] = useState<VisaCheckResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  const { data: countries = [] } = useQuery<Country[]>({
    queryKey: ["/api/countries"],
  });

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
          <CardTitle className="text-2xl text-center">Vize Gereksinim Kontrolü</CardTitle>
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
                  <SelectItem value="tourism">Turizm</SelectItem>
                  <SelectItem value="business">İş</SelectItem>
                  <SelectItem value="transit">Transit</SelectItem>
                  <SelectItem value="work">Çalışma</SelectItem>
                  <SelectItem value="study">Eğitim</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-visa-blue hover:bg-blue-700"
              disabled={isChecking}
            >
              {isChecking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Vize Gereksinimlerini Kontrol Et
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
