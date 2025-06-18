import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Lock, User, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Eksik Bilgi",
        description: "Lütfen kullanıcı adı ve şifre alanlarını doldurun",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simple authentication - in production, this would be server-side
      if (username === "admin" && password === "vizeprotr2024") {
        // Store admin session
        localStorage.setItem('admin-authenticated', 'true');
        localStorage.setItem('admin-login-time', Date.now().toString());
        
        toast({
          title: "Giriş Başarılı",
          description: "Yönetici paneline yönlendiriliyorsunuz...",
        });
        
        setTimeout(() => {
          setLocation('/admin');
        }, 1000);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast({
        title: "Giriş Hatası",
        description: "Kullanıcı adı veya şifre hatalı. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-violet-50/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-gradient-to-br from-white via-purple-50/20 to-violet-50/10">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-500 to-violet-500 p-4 rounded-full shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
            Yönetici Girişi
          </CardTitle>
          <p className="text-gray-600 text-lg">
            Yönetim paneline erişim için giriş yapın
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-base font-medium">
                Kullanıcı Adı
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Kullanıcı adınızı girin"
                  className="pl-12 h-12 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-medium">
                Şifre
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Şifrenizi girin"
                  className="pl-12 h-12 text-base border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 shadow-lg disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </Button>
          </form>

          <div className="mt-8 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200/50">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-orange-700">
                <p className="font-medium mb-1">Güvenlik Uyarısı</p>
                <p>Bu alan sadece yetkili personel içindir. Giriş bilgilerinizi kimseyle paylaşmayın.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}