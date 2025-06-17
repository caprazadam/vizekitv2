import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Menu, Bot, Sparkles } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [location] = useLocation();

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
              ? "text-visa-blue"
              : "text-gray-600 hover:text-visa-blue"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <div className="flex items-center cursor-pointer group">
                  <Bot className="h-8 w-8 mr-2 text-purple-600 group-hover:text-cyan-600 transition-colors duration-300" />
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                    AI VizeHizmet
                  </h1>
                  <Sparkles className="h-5 w-5 ml-2 text-cyan-500 opacity-70" />
                </div>
              </Link>
            </div>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <NavLinks />
            </nav>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-purple-600 transition-colors duration-300">
              <Phone className="h-4 w-4 mr-2" />
              +90 (212) 123-4567
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white ai-glow transition-all duration-300">
              <Bot className="h-4 w-4 mr-2" />
              AI Başla
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-6">
                  <NavLinks mobile />
                  <div className="border-t pt-4">
                    <Button variant="ghost" size="sm" className="w-full justify-start mb-2">
                      <Phone className="h-4 w-4 mr-2" />
                      +90 (212) 123-4567
                    </Button>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white ai-glow">
                      <Bot className="h-4 w-4 mr-2" />
                      AI Başla
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
