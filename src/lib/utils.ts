import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const quadrantColors = {
  HH: "#DC2626", // red-600
  HL: "#EA580C", // orange-600
  LH: "#9333EA", // purple-600
  LL: "#16A34A", // green-600
} as const;

export const quadrantLabels = {
  HH: "High PTR, High NFC",
  HL: "High PTR, Low NFC",
  LH: "Low PTR, High NFC",
  LL: "Low PTR, Low NFC",
} as const;

export const quadrantDescriptions = {
  HH: "Positions with both high promotion traffic AND career flexibility constraints",
  HL: "High promotion traffic positions in less constrained networks",
  LH: "Lower traffic positions but in constrained network neighborhoods",
  LL: "Positions with both low promotion traffic AND high flexibility",
} as const;

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

export function formatPercent(num: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(num);
}

export function getQuadrantColor(quadrant: string): string {
  return quadrantColors[quadrant as keyof typeof quadrantColors] || "#6B7280";
}

export function getQuadrantLabel(quadrant: string): string {
  return quadrantLabels[quadrant as keyof typeof quadrantLabels] || quadrant;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
