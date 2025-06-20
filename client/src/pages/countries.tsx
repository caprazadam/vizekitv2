import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CountryCard from "@/components/country-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import type { Country } from "@shared/schema";

export default function Countries() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedVisaType, setSelectedVisaType] = useState("all");

  const { data: countries = [], isLoading } = useQuery<Country[]>({
    queryKey: ["/api/countries"],
  });

  // Filter countries based on search and filters
  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = selectedRegion === "all" || getRegion(country.code) === selectedRegion;
    
    const matchesVisaType = selectedVisaType === "all" || 
      (selectedVisaType === "visa-free" && !country.visaRequired) ||
      (selectedVisaType === "e-visa" && country.eVisaAvailable) ||
      (selectedVisaType === "visa-on-arrival" && country.visaOnArrival) ||
      (selectedVisaType === "embassy" && country.visaRequired && !country.eVisaAvailable && !country.visaOnArrival);

    return matchesSearch && matchesRegion && matchesVisaType;
  });

  function getRegion(countryCode: string): string {
    const regions: Record<string, string> = {
      // Avrupa
      'TR': 'europe', 'DE': 'europe', 'PL': 'europe', 'BG': 'europe', 'AT': 'europe', 'BE': 'europe', 
      'FR': 'europe', 'NL': 'europe', 'IT': 'europe', 'GB': 'europe', 'BA': 'europe', 
      'RS': 'europe', 'BY': 'europe', 'UA': 'europe',
      // Asya
      'AZ': 'asia', 'KR': 'asia', 'JP': 'asia', 'QA': 'asia', 'MY': 'asia', 'TH': 'asia',
      'IN': 'asia', 'UZ': 'asia', 'LK': 'asia', 'BH': 'asia', 'AE': 'asia',
      // Kuzey Amerika
      'US': 'north-america', 'CA': 'north-america',
      // Güney Amerika
      'AR': 'south-america', 'BR': 'south-america',
      // Afrika
      'MA': 'africa', 'KE': 'africa',
      // Okyanusya
      'BS': 'oceania', 'PH': 'oceania'
    };
    return regions[countryCode] || 'other';
  }

  function getRegionName(region: string): string {
    const regionNames: Record<string, string> = {
      'europe': 'Avrupa',
      'asia': 'Asya',
      'africa': 'Afrika',
      'north-america': 'Kuzey Amerika',
      'south-america': 'Güney Amerika',
      'oceania': 'Okyanusya',
      'other': 'Diğer'
    };
    return regionNames[region] || region;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-visa-blue mx-auto"></div>
            <p className="mt-4 text-gray-600">Ülke bilgileri yükleniyor...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="gradient-hero text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Tüm Ülkeler
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            200+ ülke için güncel vize gereksinimleri ve başvuru bilgileri
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Ülke ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Bölge seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Bölgeler</SelectItem>
                <SelectItem value="europe">Avrupa</SelectItem>
                <SelectItem value="asia">Asya</SelectItem>
                <SelectItem value="africa">Afrika</SelectItem>
                <SelectItem value="north-america">Kuzey Amerika</SelectItem>
                <SelectItem value="south-america">Güney Amerika</SelectItem>
                <SelectItem value="oceania">Okyanusya</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedVisaType} onValueChange={setSelectedVisaType}>
              <SelectTrigger>
                <SelectValue placeholder="Vize türü" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Vize Türleri</SelectItem>
                <SelectItem value="visa-free">Vizesiz</SelectItem>
                <SelectItem value="e-visa">e-Vize</SelectItem>
                <SelectItem value="visa-on-arrival">Varışta Vize</SelectItem>
                <SelectItem value="embassy">Konsolosluk Vizesi</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {filteredCountries.length} ülke bulundu
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-visa-blue mb-1">
                {countries.filter(c => !c.visaRequired).length}
              </div>
              <div className="text-sm text-gray-600">Vizesiz Ülke</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500 mb-1">
                {countries.filter(c => c.eVisaAvailable).length}
              </div>
              <div className="text-sm text-gray-600">e-Vize Mevcut</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-500 mb-1">
                {countries.filter(c => c.visaOnArrival).length}
              </div>
              <div className="text-sm text-gray-600">Varışta Vize</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500 mb-1">
                {countries.filter(c => c.visaRequired && !c.eVisaAvailable && !c.visaOnArrival).length}
              </div>
              <div className="text-sm text-gray-600">Konsolosluk Vizesi</div>
            </div>
          </div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCountries.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ülke bulunamadı</h3>
              <p className="text-gray-600">Arama kriterlerinizi değiştirmeyi deneyin.</p>
            </div>
          ) : (
            <>
              {/* Group by regions if no specific region is selected */}
              {selectedRegion === "all" ? (
                <>
                  {['europe', 'asia', 'africa', 'north-america', 'south-america', 'oceania'].map(region => {
                    const regionCountries = filteredCountries.filter(country => getRegion(country.code) === region);
                    if (regionCountries.length === 0) return null;

                    return (
                      <div key={region} className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                          <h2 className="text-2xl font-bold text-gray-900">{getRegionName(region)}</h2>
                          <Badge variant="outline" className="text-sm">
                            {regionCountries.length} ülke
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                          {regionCountries.map((country) => (
                            <CountryCard key={country.id} country={country} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredCountries.map((country) => (
                    <CountryCard key={country.id} country={country} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Popüler Destinasyonlar
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              En çok ziyaret edilen ülkeler için hızlı erişim
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['IN', 'CN', 'US', 'GB', 'DE', 'FR', 'TR', 'TH', 'AU', 'BR', 'EG', 'RU'].map(code => {
              const country = countries.find(c => c.code === code);
              if (!country) return null;
              
              return (
                <a
                  key={code}
                  href={`/country/${code}`}
                  className="group block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{country.flag}</div>
                    <div className="text-sm font-medium text-gray-900 group-hover:text-visa-blue transition-colors">
                      {country.name}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}