import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useState } from "react";

export default function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/visa-checker", label: "Vize Kontrol" },
    { href: "/countries", label: "Ülkeler" },
    { href: "/services", label: "Hizmetler" },
    { href: "/about", label: "Hakkımızda" },
    { href: "/contact", label: "İletişim" },
  ];

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`${
            mobile ? "block px-3 py-2" : "px-3 py-2"
          } text-sm font-medium transition-colors ${
            location === item.href
              ? "text-purple-600"
              : "text-gray-600 hover:text-purple-600"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent cursor-pointer">
                  VizeHizmet
                </h1>
              </Link>
            </div>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <NavLinks />
            </nav>
          </div>
          
          <div className="hidden md:flex items-center">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-purple-600">
              <Phone className="h-4 w-4 mr-2" />
              +90 (212) 123-4567
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="relative w-10 h-10 p-0 hover:bg-purple-50"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <div className="relative w-6 h-6 flex flex-col justify-center items-center">
                    <span className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-0.5' : ''}`}></span>
                    <span className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 mt-1 ${isOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block h-0.5 w-6 bg-gray-600 transition-all duration-300 mt-1 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
                  </div>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-gradient-to-br from-white via-purple-50/30 to-violet-50/30 border-l border-purple-200/50">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                      Menü
                    </h2>
                    <SheetClose asChild>
                      <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                        <X className="h-5 w-5 text-gray-600" />
                      </Button>
                    </SheetClose>
                  </div>
                  
                  <nav className="flex flex-col space-y-2 flex-1">
                    {navItems.map((item) => (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                            location === item.href
                              ? "bg-gradient-to-r from-purple-500/10 to-violet-500/10 text-purple-700 border border-purple-200"
                              : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                  
                  <div className="border-t border-purple-200/50 pt-6 mt-6">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                    >
                      <Phone className="h-4 w-4 mr-3" />
                      +90 (212) 123-4567
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
