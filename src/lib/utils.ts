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

export const metricDisplayNames = {
  ptr: {
    short: "PTR",
    medium: "AI Pathway Risk",
    full: "AI Pathway Risk (PTR)",
    subtitle:
      "How exposed is this role to AI, and how few escape routes does it have?",
  },
  nfc: {
    short: "NFC",
    medium: "Career Network Constraint",
    full: "Career Network Constraint (NFC)",
    subtitle: "Are the roles you could move to also at risk?",
  },
} as const;

export const quadrantNames = {
  HH: "Double Jeopardy",
  HL: "Exposed but Mobile",
  LH: "Network Trapped",
  LL: "Structurally Resilient",
} as const;

export const quadrantLabels = {
  HH: "High Pathway Risk, High Network Constraint",
  HL: "High Pathway Risk, Low Network Constraint",
  LH: "Low Pathway Risk, High Network Constraint",
  LL: "Low Pathway Risk, Low Network Constraint",
} as const;

export const quadrantDescriptions = {
  HH: "High direct AI exposure combined with constrained escape routes",
  HL: "High AI exposure, but the career network provides viable alternatives",
  LH: "Currently safe from direct AI impact, but surrounded by constrained positions",
  LL: "Low AI exposure and high network flexibility",
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
