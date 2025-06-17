import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Sparkles, Zap } from "lucide-react";
import type { Country } from "@shared/schema";

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <Link href={`/country/${country.code}`}>
      <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ai-glow group relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative">
          <img 
            src={country.image} 
            alt={`${country.name} landmarks`}
            className="w-full h-48 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <Sparkles className="h-5 w-5 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
        <CardContent className="p-6 relative">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl floating-animation">{country.flag}</span>
            <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-cyan-600 transition-all duration-300">{country.name}</h3>
          </div>
          <p className="text-gray-600 mb-4">{country.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {country.visaRequired && (
              <Badge variant="outline" className="border-purple-300 text-purple-700">
                <Zap className="h-3 w-3 mr-1" />
                Vize Gerekli
              </Badge>
            )}
            {country.eVisaAvailable && (
              <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                e-Vize
              </Badge>
            )}
            {country.visaOnArrival && (
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                Varışta Vize
              </Badge>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm text-purple-600 font-medium">
              <Clock className="h-4 w-4 mr-1" />
              İşlem: {country.processingTime}
            </div>
            <div className="text-sm text-cyan-600 font-medium">
              {country.fee}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
