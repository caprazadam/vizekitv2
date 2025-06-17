import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCountryName(name: string): string {
  return name.trim();
}

export function formatProcessingTime(time: string): string {
  return time;
}

export function formatFee(fee: string): string {
  return fee;
}
