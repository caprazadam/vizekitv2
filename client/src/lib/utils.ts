import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCountryName(name: string): string {
  return name.trim();
}

export function formatProcessingTime(time: string): string {
  const timeMap: Record<string, string> = {
    "Instant": "Anında",
    "On arrival": "Varışta",
    "1-3 days": "1-3 gün",
    "3-5 days": "3-5 gün", 
    "5-10 days": "5-10 gün",
    "7-10 days": "7-10 gün",
    "10-20 days": "10-20 gün",
    "Various": "Çeşitli"
  };
  return timeMap[time] || time;
}

export function formatFee(fee: string): string {
  // Convert USD to ₺ (approximate rate: 1 USD = 30 ₺)
  if (fee.includes("$")) {
    const amount = fee.match(/\$(\d+)/);
    if (amount) {
      const tlAmount = parseInt(amount[1]) * 30;
      return fee.replace(/From \$\d+/, `${tlAmount}₺'den başlayan`);
    }
  }
  
  const feeMap: Record<string, string> = {
    "Varies": "Değişken",
    "Free": "Ücretsiz"
  };
  return feeMap[fee] || fee;
}
