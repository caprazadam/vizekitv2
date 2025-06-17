import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import VisaCheckerForm from "@/components/visa-checker-form";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function VisaChecker() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Ana Sayfaya Dön
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Vizeyi Kontrol Et
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Herhangi bir hedef ülke için vize gereksinimlerini, işlem sürelerini ve ücretleri kontrol edin
          </p>
        </div>

        <VisaCheckerForm />
      </div>

      <Footer />
    </div>
  );
}
