import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-6">VizeHizmet</h3>
            <p className="text-gray-300 mb-6">
              Dünya çapında vize gereksinimleri ve başvuru hizmetleri için güvenilir ortağınız.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Hızlı Linkler</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/visa-checker" className="text-gray-300 hover:text-white transition-colors">
                  Vize Kontrol
                </Link>
              </li>
              <li>
                <Link href="/countries" className="text-gray-300 hover:text-white transition-colors">
                  Ülkeler
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">
                  Hizmetler
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Popüler Destinasyonlar</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/country/IN" className="text-gray-300 hover:text-white transition-colors">
                  Hindistan Vizesi
                </Link>
              </li>
              <li>
                <Link href="/country/CN" className="text-gray-300 hover:text-white transition-colors">
                  Çin Vizesi
                </Link>
              </li>
              <li>
                <Link href="/country/RU" className="text-gray-300 hover:text-white transition-colors">
                  Rusya Vizesi
                </Link>
              </li>
              <li>
                <Link href="/country/BR" className="text-gray-300 hover:text-white transition-colors">
                  Brezilya Vizesi
                </Link>
              </li>
              <li>
                <Link href="/country/TR" className="text-gray-300 hover:text-white transition-colors">
                  Türkiye Vizesi
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">İletişim Bilgileri</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-2" />
                +90 (212) 123-4567
              </li>
              <li className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                destek@vizehizmet.com
              </li>
              <li className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                Levent Mahallesi, Büyükdere Cad. No:123
              </li>
              <li className="text-gray-300 ml-5">İstanbul, Türkiye</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">© 2024 VizeHizmet. Tüm hakları saklıdır.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                Gizlilik Politikası
              </a>
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                Hizmet Şartları
              </a>
              <a href="#" className="text-gray-300 hover:text-white text-sm transition-colors">
                Çerez Politikası
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
