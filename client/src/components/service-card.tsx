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
    <Card className="text-center hover:shadow-lg transition-shadow h-full">
      <CardContent className="p-8">
        <div className="w-16 h-16 bg-visa-blue-lighter rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">{iconMap[service.icon] || "⚙️"}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.name}</h3>
        <p className="text-gray-600 mb-6">{service.description}</p>
        <ul className="text-sm text-gray-600 space-y-2 mb-6">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        <Button className="w-full bg-visa-blue hover:bg-blue-700">
          Learn More
        </Button>
      </CardContent>
    </Card>
  );
}
