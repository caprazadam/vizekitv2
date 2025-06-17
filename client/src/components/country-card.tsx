import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import type { Country } from "@shared/schema";

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <Link href={`/country/${country.code}`}>
      <Card className="cursor-pointer ai-card hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group">
        <img 
          src={country.image} 
          alt={`${country.name} landmarks`}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{country.flag}</span>
            <h3 className="text-xl font-semibold text-gray-900">{country.name}</h3>
          </div>
          <p className="text-gray-600 mb-4">{country.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {country.visaRequired && (
              <Badge variant="outline">Vize Gerekli</Badge>
            )}
            {country.eVisaAvailable && (
              <Badge className="bg-blue-500">e-Vize</Badge>
            )}
            {country.visaOnArrival && (
              <Badge className="bg-yellow-500">Varışta Vize</Badge>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm text-visa-blue font-medium">
              <Clock className="h-4 w-4 mr-1" />
              İşlem: {country.processingTime}
            </div>
            <div className="text-sm text-green-600 font-medium">
              {country.fee}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
