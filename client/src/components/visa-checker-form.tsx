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
        title: "Missing Information",
        description: "Please fill in all fields",
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
          <CardTitle className="text-2xl text-center">Visa Requirement Checker</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Nationality
              </label>
              <Select value={fromCountry} onValueChange={setFromCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your country..." />
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
                Destination Country
              </label>
              <Select value={toCountry} onValueChange={setToCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination..." />
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
                Purpose of Travel
              </label>
              <Select value={purpose} onValueChange={setPurpose}>
                <SelectTrigger>
                  <SelectValue placeholder="Select purpose..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tourism">Tourism</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="transit">Transit</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="study">Study</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-visa-blue hover:bg-blue-700"
              disabled={isChecking}
            >
              {isChecking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Check Visa Requirements
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {result.toCountry.flag} {result.toCountry.name} - Visa Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {result.visaRequired ? (
                <Badge variant="destructive">Visa Required</Badge>
              ) : (
                <Badge className="bg-green-500">Visa Free</Badge>
              )}
              {result.eVisaAvailable && (
                <Badge className="bg-blue-500">e-Visa Available</Badge>
              )}
              {result.visaOnArrival && (
                <Badge className="bg-yellow-500">Visa on Arrival</Badge>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-visa-blue" />
                <div>
                  <div className="text-sm text-gray-600">Processing Time</div>
                  <div className="font-medium">{result.processingTime}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-visa-blue" />
                <div>
                  <div className="text-sm text-gray-600">Fee</div>
                  <div className="font-medium text-green-600">{result.fee}</div>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-4 w-4 text-visa-blue" />
                <h4 className="font-semibold">Required Documents</h4>
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
              Start Application Process
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
