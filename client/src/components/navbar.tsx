import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Menu, ChevronDown, Globe, Zap, Map, Users, MessageCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { 
      href: "/visa-checker", 
      label: "Vize Kontrol", 
      icon: Globe,
      description: "Vize gereksinimlerini kontrol et"
    },
    { 
      href: "/countries", 
      label: "Ülkeler", 
      icon: Map,
      description: "Destinasyon rehberi"
    },
    { 
      href: "/services", 
      label: "Hizmetler", 
      icon: Zap,
      description: "Profesyonel danışmanlık"
    },
    { 
      href: "/about", 
      label: "Hakkımızda", 
      icon: Users,
      description: "Hikayemizi öğren"
    },
    { 
      href: "/contact", 
      label: "İletişim", 
      icon: MessageCircle,
      description: "Bizimle iletişime geç"
    },
  ];

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => {
        const isActive = location === item.href;
        const Icon = item.icon;
        
        return (
          <div key={item.href} className="relative group">
            <Link
              href={item.href}
              className={`${
                mobile 
                  ? "flex items-center px-4 py-3 rounded-xl transition-all duration-300 hover:bg-blue-50" 
                  : "flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden"
              } ${
                isActive
                  ? mobile
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                    : "text-white bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg transform scale-105"
                  : mobile
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:shadow-md hover:scale-105"
              }`}
            >
              {Icon && (
                <Icon className={`${mobile ? "h-5 w-5 mr-3" : "h-4 w-4 mr-2"} ${isActive ? "animate-pulse" : ""}`} />
              )}
              <span className="relative z-10">{item.label}</span>
              
              {!mobile && !isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full transform scale-0 group-hover:scale-100" />
              )}
            </Link>
            
            {!mobile && item.description && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50">
                {item.description}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
              </div>
            )}
          </div>
        );
      })}
    </>
  );

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200/50" 
        : "bg-white shadow-sm border-b border-gray-200"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <div className="flex items-center group cursor-pointer">
                  <div className="relative">
                    <Globe className="h-8 w-8 text-blue-600 mr-3 transition-transform duration-300 group-hover:rotate-12" />
                    <div className="absolute inset-0 bg-blue-600 rounded-full opacity-20 animate-ping group-hover:animate-none" />
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-blue-700 transition-all duration-300">
                    VizeHizmet
                  </h1>
                </div>
              </Link>
            </div>
            <nav className="hidden md:ml-10 md:flex md:space-x-2">
              <NavLinks />
            </nav>
          </div>
          
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 rounded-full px-4"
            >
              <Phone className="h-4 w-4 mr-2 animate-bounce" />
              +90 (212) 123-4567
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full px-6 py-2 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <Zap className="h-4 w-4 mr-2" />
              Başla
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="rounded-full p-2 hover:bg-blue-50 transition-all duration-300"
                >
                  <Menu className="h-6 w-6 text-gray-600" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-80 bg-gradient-to-br from-white to-blue-50">
                <div className="flex flex-col space-y-6 mt-8">
                  <div className="text-center pb-4 border-b border-gray-200">
                    <div className="flex items-center justify-center mb-3">
                      <Globe className="h-8 w-8 text-blue-600 mr-2" />
                      <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                        VizeHizmet
                      </h2>
                    </div>
                    <p className="text-sm text-gray-600">Güvenilir vize danışmanlığı</p>
                  </div>
                  
                  <nav className="space-y-2">
                    <NavLinks mobile />
                  </nav>
                  
                  <div className="border-t pt-6 space-y-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start rounded-xl hover:bg-blue-50 transition-all duration-300"
                    >
                      <Phone className="h-5 w-5 mr-3 text-blue-600" />
                      <div className="text-left">
                        <div className="font-medium text-gray-900">Bizi Arayın</div>
                        <div className="text-sm text-gray-600">+90 (212) 123-4567</div>
                      </div>
                    </Button>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl py-3 shadow-lg transform hover:scale-105 transition-all duration-300">
                      <Zap className="h-5 w-5 mr-2" />
                      Hemen Başla
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
