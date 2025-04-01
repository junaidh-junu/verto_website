export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  company: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "VERTO transformed our brand identity completely. Their team took the time to understand our values and created a visual language that perfectly represents who we are. The response from our customers has been incredible.",
    author: "Jennifer Adams",
    company: "CEO, Luminary Brands",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    id: 2,
    quote: "Working with VERTO on our product packaging redesign was a game-changer. Their attention to detail and creative approach resulted in packaging that stands out on shelves and has significantly boosted our sales.",
    author: "Michael Roberts",
    company: "Marketing Director, EcoProducts",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    quote: "The wedding invitations VERTO designed for us were absolutely stunning. They captured the essence of our relationship and the theme of our wedding perfectly. We received so many compliments from our guests.",
    author: "Sophia Martinez",
    company: "Private Client",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];
