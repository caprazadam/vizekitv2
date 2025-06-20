import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import type { Service } from "@shared/schema";

interface ServiceCardProps {
  service: Service;
}

const iconMap: Record<string, string> = {
  "user-tie": "👔",
  "file-alt": "📄",
  "paper-plane": "✈️",
  "rocket": "🚀",
  "shield-alt": "🛡️",
  "headset": "🎧",
};

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="text-center hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1 h-full border border-gray-200/50 hover:border-purple-400/50 bg-gradient-to-br from-white via-purple-50/20 to-violet-50/20 backdrop-blur-sm relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 via-violet-400/5 to-pink-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 via-violet-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-purple-400/10 to-violet-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <CardContent className="p-8 relative z-10">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400/20 to-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300 group-hover:scale-110">
          <span className="text-2xl group-hover:animate-pulse">{iconMap[service.icon] || "⚙️"}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-purple-700 transition-colors duration-300 mb-4">{service.name}</h3>
        <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 mb-6">{service.description}</p>
        <ul className="text-sm text-gray-600 space-y-2 mb-6">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-center justify-center group-hover:text-gray-700 transition-colors duration-300">
              <CheckCircle className="h-4 w-4 text-green-500 group-hover:text-green-600 mr-2 flex-shrink-0 transition-colors duration-300" />
              {feature}
            </li>
          ))}
        </ul>
        <Button className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-105">
          Daha Fazla Bilgi
        </Button>
      </CardContent>
    </Card>
  );
}
