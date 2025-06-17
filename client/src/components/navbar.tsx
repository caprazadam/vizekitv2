import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Menu, Globe, FileText, Building, Info, MessageCircle, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [location] = useLocation();

  const navItems = [
    { href: "/visa-checker", label: "Vize Kontrol", icon: Search, description: "Vize gereksinimlerini kontrol edin" },
    { href: "/countries", label: "Ülkeler", icon: Globe, description: "Tüm ülkeleri keşfedin" },
    { href: "/services", label: "Hizmetler", icon: Building, description: "Profesyonel vize hizmetleri" },
    { href: "/about", label: "Hakkımızda", icon: Info, description: "Şirketimizi tanıyın" },
    { href: "/contact", label: "İletişim", icon: MessageCircle, description: "Bizimle iletişime geçin" },
  ];

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location === item.href;
        
        return mobile ? (
          <Link
            key={item.href}
            href={item.href}
            className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-visa-blue text-white shadow-md"
                : "text-gray-600 hover:bg-gray-50 hover:text-visa-blue"
            }`}
          >
            <Icon className={`h-5 w-5 mr-3 transition-colors ${
              isActive ? "text-white" : "text-gray-400 group-hover:text-visa-blue"
            }`} />
            <div>
              <div>{item.label}</div>
              <div className={`text-xs ${
                isActive ? "text-blue-100" : "text-gray-400"
              }`}>
                {item.description}
              </div>
            </div>
          </Link>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            className={`group relative flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              isActive
                ? "text-visa-blue bg-blue-50"
                : "text-gray-600 hover:text-visa-blue hover:bg-gray-50"
            }`}
          >
            <Icon className={`h-4 w-4 mr-2 transition-colors ${
              isActive ? "text-visa-blue" : "text-gray-400 group-hover:text-visa-blue"
            }`} />
            {item.label}
            {isActive && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-visa-blue rounded-full"></div>
            )}
          </Link>
        );
      })}
    </>
  );

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 sticky top-0 z-50 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          <div className="flex items-center">
            <div className="flex-shrink-0 group">
              <Link href="/">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <div className="w-8 h-8 bg-gradient-to-br from-visa-blue to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-visa-blue to-blue-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-visa-blue transition-all duration-200">
                    VizeHizmet
                  </h1>
                </div>
              </Link>
            </div>
            <nav className="hidden lg:ml-12 lg:flex lg:space-x-2">
              <NavLinks />
            </nav>
          </div>
          
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-600 hover:text-visa-blue hover:bg-blue-50 transition-all duration-200 rounded-full px-4"
            >
              <Phone className="h-4 w-4 mr-2" />
              +90 (212) 123-4567
            </Button>
            <Button className="bg-gradient-to-r from-visa-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-full px-6">
              Başla
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full hover:bg-gray-100">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-80">
                <div className="flex flex-col space-y-6 mt-8">
                  <div className="text-center pb-4 border-b border-gray-100">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-visa-blue to-blue-600 rounded-lg flex items-center justify-center">
                        <FileText className="h-4 w-4 text-white" />
                      </div>
                      <h2 className="text-xl font-bold bg-gradient-to-r from-visa-blue to-blue-600 bg-clip-text text-transparent">
                        VizeHizmet
                      </h2>
                    </div>
                    <p className="text-sm text-gray-500">Güvenilir vize hizmetiniz</p>
                  </div>
                  
                  <div className="space-y-2">
                    <NavLinks mobile />
                  </div>
                  
                  <div className="border-t pt-6 space-y-3">
                    <Button variant="ghost" size="sm" className="w-full justify-start rounded-lg hover:bg-gray-50">
                      <Phone className="h-4 w-4 mr-3" />
                      +90 (212) 123-4567
                    </Button>
                    <Button className="w-full bg-gradient-to-r from-visa-blue to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg rounded-lg">
                      Başla
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
