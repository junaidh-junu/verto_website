export interface PortfolioItem {
  id: number;
  title: string;
  category: PortfolioCategory;
  categories: string;
  image: string;
  rowSpan: number;
}

export type PortfolioCategory = 
  | "all" 
  | "branding" 
  | "business-cards" 
  | "brochures" 
  | "wedding-cards" 
  | "logo-design";

export const portfolioCategories = [
  { id: "all", label: "All" },
  { id: "branding", label: "Branding" },
  { id: "business-cards", label: "Business Cards" },
  { id: "brochures", label: "Brochures" },
  { id: "wedding-cards", label: "Wedding Cards" },
  { id: "logo-design", label: "Logo Design" },
];

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Tech Innovate Branding",
    category: "branding",
    categories: "Branding, Logo Design",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rowSpan: 35,
  },
  {
    id: 2,
    title: "Luxury Business Cards",
    category: "business-cards",
    categories: "Print Design, Business Cards",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rowSpan: 40,
  },
  {
    id: 3,
    title: "Eco Ventures Logo",
    category: "logo-design",
    categories: "Logo Design",
    image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rowSpan: 30,
  },
  {
    id: 4,
    title: "Travel Agency Catalog",
    category: "brochures",
    categories: "Print Design, Brochures",
    image: "https://images.unsplash.com/photo-1574351406668-7585cd5b3251?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rowSpan: 45,
  },
  {
    id: 5,
    title: "Elegant Wedding Invitation",
    category: "wedding-cards",
    categories: "Print Design, Wedding Cards",
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rowSpan: 35,
  },
  {
    id: 6,
    title: "Cafe Brand Identity",
    category: "branding",
    categories: "Branding, Packaging",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rowSpan: 38,
  },
  {
    id: 7,
    title: "Creative Studio Cards",
    category: "business-cards",
    categories: "Print Design, Business Cards",
    image: "https://images.unsplash.com/photo-1599740959545-144ed68b785c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rowSpan: 42,
  },
  {
    id: 8,
    title: "Minimalist Fashion Logo",
    category: "logo-design",
    categories: "Logo Design, Branding",
    image: "https://images.unsplash.com/photo-1575505586569-646b2ca898fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    rowSpan: 32,
  },
];
