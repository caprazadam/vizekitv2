import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";
import { useState } from "react";
import type { Country } from "@shared/schema";

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
    console.log(`Image failed to load for ${country.name}:`, country.image);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Link href={`/country/${country.code}`}>
      <Card className="cursor-pointer hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:-translate-y-2 border border-gray-200/50 hover:border-purple-400/60 bg-gradient-to-br from-white via-purple-50/20 to-pink-50/20 backdrop-blur-sm relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 via-pink-400/5 to-violet-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-violet-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {country.image && !imageError ? (
          <img 
            src={country.image} 
            alt={`${country.name} landmarks`}
            className={`w-full h-48 object-cover rounded-t-xl relative z-10 transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-purple-100 via-blue-50 to-violet-100 rounded-t-xl relative z-10 flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-3 filter drop-shadow-lg">{country.flag}</div>
              <div className="text-lg text-purple-700 font-semibold">{country.name}</div>
            </div>
          </div>
        )}
        
        {!imageLoaded && !imageError && (
          <div className="absolute top-0 left-0 w-full h-48 bg-gray-200 rounded-t-xl z-20 flex items-center justify-center">
            <div className="animate-pulse text-gray-400">Yükleniyor...</div>
          </div>
        )}
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl group-hover:animate-pulse">{country.flag}</span>
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-300">{country.name}</h3>
          </div>
          <p className="text-gray-600 mb-4">{country.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {country.visaRequired && (
              <Badge variant="outline">Vize Gerekli</Badge>
            )}
            {country.eVisaAvailable && (
              <Badge className="bg-purple-500 hover:bg-purple-600 shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300">e-Vize</Badge>
            )}
            {country.visaOnArrival && (
              <Badge className="bg-pink-500 hover:bg-pink-600 shadow-lg shadow-pink-500/30 group-hover:shadow-pink-500/50 transition-all duration-300">Varışta Vize</Badge>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center text-sm text-purple-600 font-medium group-hover:text-purple-700 transition-colors duration-300">
              <Clock className="h-4 w-4 mr-1 group-hover:text-pink-500 transition-colors duration-300" />
              İşlem: {country.processingTime}
            </div>
            <div className="text-sm text-green-600 font-medium group-hover:text-green-700 group-hover:shadow-sm transition-all duration-300">
              {country.fee}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
