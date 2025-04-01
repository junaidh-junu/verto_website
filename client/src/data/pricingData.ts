export interface PricingPlan {
  id: number;
  name: string;
  description: string;
  price: number | 'Custom';
  isMostPopular?: boolean;
  features: {
    included: string[];
    excluded?: string[];
  };
  buttonText: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    name: "Essential",
    description: "Perfect for startups and small businesses getting started with branding.",
    price: 799,
    features: {
      included: [
        "Logo Design (2 concepts)",
        "Business Card Design",
        "Brand Style Guide",
        "Unlimited Revisions",
        "High-Resolution Files",
        "Source Files Included"
      ],
      excluded: [
        "Social Media Templates",
        "Marketing Collateral",
        "Website UI Design",
        "Custom Illustrations",
        "Brand Strategy Document"
      ]
    },
    buttonText: "Get Started"
  },
  {
    id: 2,
    name: "Professional",
    description: "Ideal for growing businesses that need comprehensive branding solutions.",
    price: 1499,
    isMostPopular: true,
    features: {
      included: [
        "Logo Design (5 concepts)",
        "Business Card Design",
        "Brand Style Guide",
        "Social Media Templates",
        "Marketing Collateral",
        "Stationery Design",
        "Unlimited Revisions",
        "High-Resolution Files",
        "Source Files Included"
      ],
      excluded: [
        "Website UI Design",
        "Custom Illustrations",
        "Brand Strategy Document"
      ]
    },
    buttonText: "Get Started"
  },
  {
    id: 3,
    name: "Enterprise",
    description: "Complete branding package for established businesses with complex needs.",
    price: "Custom",
    features: {
      included: [
        "Logo Design (Unlimited concepts)",
        "Comprehensive Brand Identity",
        "Brand Strategy Document",
        "Social Media Templates",
        "Marketing Collateral",
        "Website UI Design",
        "Custom Illustrations",
        "Print & Digital Assets",
        "Dedicated Brand Manager",
        "Lifetime Brand Support",
        "High-Resolution Files",
        "Source Files Included"
      ]
    },
    buttonText: "Contact Us"
  }
];

export interface PricingFAQ {
  question: string;
  answer: string;
}

export const pricingFAQs: PricingFAQ[] = [
  {
    question: "How long does a typical branding project take?",
    answer: "Our timeline varies based on project scope. Essential packages typically take 2-3 weeks, Professional packages 3-4 weeks, and Enterprise solutions 6-8 weeks. We'll provide a detailed timeline during our initial consultation."
  },
  {
    question: "What file formats will I receive?",
    answer: "You'll receive your logo and design assets in multiple formats including AI, EPS, PDF, PNG, and JPG. For web assets, we also provide SVG files. All deliverables come in both print and web-optimized versions."
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes, we offer flexible payment options. Typically, we require a 50% deposit to begin the project, with the remaining balance due upon completion. For larger projects, we can arrange milestone-based payment schedules."
  },
  {
    question: "Can I upgrade my package later?",
    answer: "Absolutely! You can upgrade your package at any time. We'll simply apply your current investment toward the higher-tier package and continue building on the work we've already completed."
  },
  {
    question: "What if I'm not satisfied with the designs?",
    answer: "Client satisfaction is our priority. All packages include revision rounds, and we'll work with you until you're completely satisfied with the results. If needed, we can discuss additional revision rounds beyond what's included in your package."
  }
];