import {
  Palette,
  Camera,
  Printer,
  Laptop, // Changed from LaptopCode
  PenTool,
  Megaphone,
} from "lucide-react";

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: any;
  features: string[];
}

export const services: Service[] = [
  {
    id: 1,
    title: "Branding & Identity",
    description:
      "We create distinctive brand identities that resonate with your audience and set you apart from competitors.",
    icon: Palette,
    features: [
      "Logo Design & Brand Guidelines",
      "Visual Identity Systems",
      "Brand Strategy & Positioning",
    ],
  },
  {
    id: 2,
    title: "Photography & Retouching",
    description:
      "Professional photography and image manipulation services to showcase your products and services.",
    icon: Camera,
    features: [
      "Product Photography",
      "Photo Retouching & Manipulation",
      "Corporate Photography",
    ],
  },
  {
    id: 3,
    title: "Print Management",
    description:
      "End-to-end print design and production management for all your physical marketing materials.",
    icon: Printer,
    features: [
      "Business Cards & Stationery",
      "Brochures & Catalogs",
      "Packaging Design",
    ],
  },
  {
    id: 4,
    title: "Digital Design",
    description:
      "Engaging digital experiences that combine aesthetics with functionality for optimal user experience.",
    icon: Laptop,
    features: [
      "Website UI/UX Design",
      "Mobile App Interfaces",
      "Email Templates & Digital Ads",
    ],
  },
  {
    id: 5,
    title: "Custom Illustrations",
    description:
      "Bespoke illustrations and graphical elements tailored to your brand's visual language.",
    icon: PenTool,
    features: [
      "Brand Illustrations",
      "Infographics & Data Visualization",
      "Character Design",
    ],
  },
  {
    id: 6,
    title: "Marketing Collateral",
    description:
      "Comprehensive marketing materials that strengthen your brand and drive engagement.",
    icon: Megaphone,
    features: [
      "Social Media Graphics",
      "Presentations & Pitch Decks",
      "Event Materials & Signage",
    ],
  },
];
