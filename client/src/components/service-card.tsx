import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Bot, Sparkles, Zap } from "lucide-react";
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
    <Card className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ai-glow group h-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardContent className="p-8 relative">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 floating-animation group-hover:scale-110 transition-transform duration-300">
          <span className="text-2xl">{iconMap[service.icon] || "⚙️"}</span>
          <div className="absolute -top-1 -right-1">
            <Sparkles className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
        <h3 className="text-xl font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-cyan-600 transition-all duration-300 mb-4">{service.name}</h3>
        <p className="text-gray-600 mb-6">{service.description}</p>
        <ul className="text-sm text-gray-600 space-y-2 mb-6">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-center justify-center">
              <Zap className="h-4 w-4 text-cyan-500 mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white ai-glow transition-all duration-300">
          <Bot className="h-4 w-4 mr-2" />
          AI Destekli Bilgi
        </Button>
      </CardContent>
    </Card>
  );
}
